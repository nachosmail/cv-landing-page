import { chromium } from "playwright";
import { mkdir, readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { resolve, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(currentDirectory, "..");
const requestedLanguage = process.argv[2]?.toLowerCase();
const supportedLanguages = ["es", "en"];
const languages = supportedLanguages.includes(requestedLanguage)
  ? [requestedLanguage]
  : supportedLanguages;
const outputDirectory = resolve(projectRoot, "dist");

const filenames = {
  es: "Ignacio-Smail-CV-ATS-ES.pdf",
  en: "Ignacio-Smail-CV-ATS-EN.pdf"
};

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8"
};

function startStaticServer() {
  return new Promise((resolveServer, rejectServer) => {
    const server = createServer(async (request, response) => {
      try {
        const requestUrl = new URL(request.url, "http://127.0.0.1");
        const relativePath = decodeURIComponent(
          requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname
        );
        const requestedPath = resolve(projectRoot, `.${relativePath}`);

        if (!requestedPath.startsWith(projectRoot)) {
          response.writeHead(403);
          response.end("Forbidden");
          return;
        }

        let finalPath = requestedPath;
        if ((await stat(finalPath)).isDirectory()) {
          finalPath = resolve(finalPath, "index.html");
        }

        const extension = extname(finalPath).toLowerCase();
        response.writeHead(200, {
          "Content-Type": mimeTypes[extension] || "application/octet-stream"
        });
        response.end(await readFile(finalPath));
      } catch {
        response.writeHead(404);
        response.end("Not found");
      }
    });

    server.on("error", rejectServer);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      resolveServer({ server, baseUrl: `http://127.0.0.1:${address.port}` });
    });
  });
}

async function generatePdf(browser, baseUrl, language) {
  const page = await browser.newPage();
  await page.goto(`${baseUrl}/ats/index.html?lang=${language}`, {
    waitUntil: "networkidle"
  });
  await page.waitForFunction(() =>
    document.documentElement.getAttribute("data-cv-ready") === "true"
  );
  await page.emulateMedia({ media: "print" });
  const outputPath = resolve(outputDirectory, filenames[language]);
  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: false,
    preferCSSPageSize: true,
    margin: { top: "0", right: "0", bottom: "0", left: "0" }
  });
  await page.close();
  console.log(`Generated: ${outputPath}`);
}

async function main() {
  await mkdir(outputDirectory, { recursive: true });
  const { server, baseUrl } = await startStaticServer();
  const browser = await chromium.launch({ headless: true });

  try {
    for (const language of languages) {
      await generatePdf(browser, baseUrl, language);
    }
  } finally {
    await browser.close();
    await new Promise((resolveClose) => server.close(resolveClose));
  }
}

main().catch((error) => {
  console.error("ATS CV generation failed:");
  console.error(error);
  process.exitCode = 1;
});
