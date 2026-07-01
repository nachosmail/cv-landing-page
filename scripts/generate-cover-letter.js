import { chromium } from "playwright";
import { mkdir, readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { resolve, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const currentFilePath =
  fileURLToPath(import.meta.url);

const currentDirectory =
  dirname(currentFilePath);

const projectRoot =
  resolve(currentDirectory, "..");

const requestedLanguage =
  process.argv[2]?.toLowerCase();

const supportedLanguages = ["es", "en"];

const languages =
  supportedLanguages.includes(requestedLanguage)
    ? [requestedLanguage]
    : supportedLanguages;

const outputDirectory =
  resolve(projectRoot, "dist");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};


function startStaticServer() {
  return new Promise(
    (resolveServer, rejectServer) => {
      const server = createServer(
        async (request, response) => {
          try {
            const requestUrl =
              new URL(
                request.url,
                "http://127.0.0.1"
              );

            let relativePath =
              decodeURIComponent(
                requestUrl.pathname
              );

            if (relativePath === "/") {
              relativePath =
                "/index.html";
            }

            const requestedPath =
              resolve(
                projectRoot,
                `.${relativePath}`
              );

            if (
              !requestedPath.startsWith(
                projectRoot
              )
            ) {
              response.writeHead(403);
              response.end("Forbidden");
              return;
            }

            let finalPath =
              requestedPath;

            const fileStat =
              await stat(finalPath);

            if (fileStat.isDirectory()) {
              finalPath =
                resolve(
                  finalPath,
                  "index.html"
                );
            }

            const fileContent =
              await readFile(finalPath);

            const extension =
              extname(
                finalPath
              ).toLowerCase();

            response.writeHead(200, {
              "Content-Type":
                mimeTypes[extension] ||
                "application/octet-stream"
            });

            response.end(fileContent);
          } catch {
            response.writeHead(404);
            response.end("Not found");
          }
        }
      );

      server.on(
        "error",
        rejectServer
      );

      server.listen(
        0,
        "127.0.0.1",
        () => {
          const address =
            server.address();

          resolveServer({
            server,
            baseUrl:
              `http://127.0.0.1:${address.port}`
          });
        }
      );
    }
  );
}

async function generatePdf(
  browser,
  baseUrl,
  language
) {
  const page =
    await browser.newPage({
      viewport: {
        width: 1400,
        height: 1200
      }
    });

  page.on("pageerror", (error) => {
    console.error(
      "Page error:",
      error.message
    );
  });

  const params =
    new URLSearchParams({
      lang: language
    });

  await page.goto(
    `${baseUrl}/cover-letter/index.html?${params.toString()}`,
    {
      waitUntil: "networkidle"
    }
  );

  await page.waitForFunction(
    () =>
      document.documentElement.getAttribute(
        "data-cover-ready"
      ) === "true",
    null,
    {
      timeout: 30000
    }
  );

  await page.emulateMedia({
    media: "print"
  });

  const filename =
    `Ignacio-Smail-Cover-Letter-${language.toUpperCase()}.pdf`;

  const outputPath =
    resolve(
      outputDirectory,
      filename
    );

  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: {
      top: "0mm",
      right: "0mm",
      bottom: "0mm",
      left: "0mm"
    }
  });

  await page.close();

  console.log(
    `Generated: ${outputPath}`
  );
}

async function main() {
  await mkdir(
    outputDirectory,
    {
      recursive: true
    }
  );

  const {
    server,
    baseUrl
  } = await startStaticServer();

  const browser =
    await chromium.launch({
      headless: true
    });

  try {
    for (
      const language of languages
    ) {
      await generatePdf(
        browser,
        baseUrl,
        language
      );
    }
  } finally {
    await browser.close();

    await new Promise(
      (resolveClose) => {
        server.close(
          resolveClose
        );
      }
    );
  }
}

main().catch((error) => {
  console.error(
    "Cover letter generation failed:"
  );

  console.error(error);

  process.exitCode = 1;
});