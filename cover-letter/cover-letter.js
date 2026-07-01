"use strict";

import {
  getCvData
} from "../data/cv-data.js";

import {
  getCoverLetterData
} from "../data/cover-letter-data.js";

/* ========================================================= */
/* DOM                                                       */
/* ========================================================= */

const coverPage =
  document.getElementById("cover-page");

const languageButtons =
  document.querySelectorAll("[data-language-button]");

const printButton =
  document.getElementById("print-cover-letter-button");

const nameElement =
  document.getElementById("cover-name");

const titleElement =
  document.getElementById("cover-professional-title");

const subtitleElement =
  document.getElementById("cover-professional-subtitle");

const contactElement =
  document.getElementById("cover-contact");



const subjectElement =
  document.getElementById("cover-subject");

const contentElement =
  document.getElementById("cover-letter-content");

const signatureTextElement =
  document.getElementById("cover-signature-text");

const signatureNameElement =
  document.getElementById("cover-signature-name");

const portfolioLinkElement =
  document.getElementById("cover-portfolio-link");

const footerLanguageElement =
  document.getElementById("cover-footer-language");

/* ========================================================= */
/* TEXTOS                                                    */
/* ========================================================= */

const interfaceText = {
  en: {
    date: "Date",
    recipient: "Recipient",
    subject: "Subject",
    email: "Email",
    phone: "Phone",
    linkedin: "LinkedIn",
    github: "GitHub",
    portfolio: "Portfolio",
    linkedinText: "LinkedIn profile",
    githubText: "GitHub profile",
    portfolioText: "Online portfolio",
    print: "Print / Save PDF",
    footer: "Explore the interactive portfolio",
    version: "English version"
  },

  es: {
    date: "Fecha",
    recipient: "Destinatario",
    subject: "Asunto",
    email: "Email",
    phone: "Teléfono",
    linkedin: "LinkedIn",
    github: "GitHub",
    portfolio: "Portfolio",
    linkedinText: "Perfil de LinkedIn",
    githubText: "Perfil de GitHub",
    portfolioText: "Portfolio online",
    print: "Imprimir / Guardar PDF",
    footer: "Ver portfolio interactivo",
    version: "Versión en español"
  }
};

/* ========================================================= */
/* URL Y PARÁMETROS                                          */
/* ========================================================= */

function getParameters() {
  const params =
    new URLSearchParams(
      window.location.search
    );

  return {
    language:
      params.get("lang") === "es"
        ? "es"
        : "en",

    company:
      params.get("company") || "",

    position:
      params.get("position") || "",

    recipient:
      params.get("recipient") || ""
  };
}

function updateLanguageInUrl(language) {
  const url =
    new URL(window.location.href);

  url.searchParams.set(
    "lang",
    language
  );

  window.history.replaceState(
    {},
    "",
    url
  );
}

/* ========================================================= */
/* UTILIDADES                                                */
/* ========================================================= */

function isValidUrl(value) {
  if (!value) {
    return false;
  }

  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function createElement(
  tagName,
  className = "",
  textContent = ""
) {
  const element =
    document.createElement(tagName);

  if (className) {
    element.className =
      className;
  }

  if (textContent) {
    element.textContent =
      textContent;
  }

  return element;
}

function createContactItem(
  label,
  value,
  href = ""
) {
  const item =
    createElement(
      "div",
      "cover-contact-item"
    );

  const labelElement =
    createElement(
      "span",
      "cover-contact-label",
      label
    );

  const valueElement =
    createElement(
      "span",
      "cover-contact-value"
    );

  if (href) {
    const link =
      createElement(
        "a",
        "",
        value
      );

    link.href = href;

    if (
      href.startsWith("http")
    ) {
      link.target = "_blank";
      link.rel =
        "noopener noreferrer";
    }

    valueElement.appendChild(
      link
    );
  } else {
    valueElement.textContent =
      value;
  }

  item.append(
    labelElement,
    valueElement
  );

  return item;
}



/* ========================================================= */
/* RENDER                                                    */
/* ========================================================= */

function renderContact(
  cvData,
  labels
) {
  contactElement.replaceChildren();

  contactElement.appendChild(
    createContactItem(
      labels.email,
      cvData.personal.email,
      `mailto:${cvData.personal.email}`
    )
  );

  contactElement.appendChild(
    createContactItem(
      labels.phone,
      cvData.personal.phone,
      `tel:${cvData.personal.phone.replace(/\s+/g, "")}`
    )
  );

  if (
    isValidUrl(
      cvData.personal.linkedin
    )
  ) {
    contactElement.appendChild(
      createContactItem(
        labels.linkedin,
        labels.linkedinText,
        cvData.personal.linkedin
      )
    );
  }

  if (
    isValidUrl(
      cvData.personal.github
    )
  ) {
    contactElement.appendChild(
      createContactItem(
        labels.github,
        labels.githubText,
        cvData.personal.github
      )
    );
  }

  if (
    isValidUrl(
      cvData.personal.portfolio
    )
  ) {
    contactElement.appendChild(
      createContactItem(
        labels.portfolio,
        labels.portfolioText,
        cvData.personal.portfolio
      )
    );
  }
}

function renderParagraphs(
  paragraphs
) {
  contentElement.replaceChildren();

  paragraphs.forEach(
    (paragraph) => {
      contentElement.appendChild(
        createElement(
          "p",
          "",
          paragraph
        )
      );
    }
  );
}

async function fitToOnePage() {
  coverPage.classList.remove(
    "compact"
  );

  await new Promise(
    (resolve) => {
      requestAnimationFrame(
        () => requestAnimationFrame(
          resolve
        )
      );
    }
  );

  if (
    coverPage.scrollHeight >
    coverPage.clientHeight + 1
  ) {
    coverPage.classList.add(
      "compact"
    );
  }
}

async function renderCoverLetter(
  language
) {
  const parameters =
    getParameters();

  const cvData =
    getCvData(language);

  const letterData =
    getCoverLetterData(
      language,
      {
        company:
          parameters.company,

        position:
          parameters.position,

        recipient:
          parameters.recipient
      }
    );

  const labels =
    interfaceText[language];

  document.documentElement.lang =
    language;

  document.title =
    language === "es"
      ? `Carta de Presentación - ${letterData.company}`
      : `Cover Letter - ${letterData.company}`;

  nameElement.textContent =
    cvData.personal.name;

  titleElement.textContent =
    cvData.professionalTitle;

  subtitleElement.textContent =
    cvData.professionalSubtitle;

  renderContact(
    cvData,
    labels
  );


  subjectElement.textContent =
    letterData.subject;

  renderParagraphs(
    letterData.paragraphs
  );

  signatureTextElement.textContent =
    letterData.signature;

  signatureNameElement.textContent =
    cvData.personal.name;

  printButton.textContent =
    labels.print;

  footerLanguageElement.textContent =
    labels.version;

  portfolioLinkElement.textContent =
    labels.footer;

  if (
    isValidUrl(
      cvData.personal.portfolio
    )
  ) {
    portfolioLinkElement.href =
      cvData.personal.portfolio;
  } else {
    portfolioLinkElement.style.display =
      "none";
  }

  languageButtons.forEach(
    (button) => {
      const active =
        button.dataset.languageButton ===
        language;

      button.classList.toggle(
        "active",
        active
      );
    }
  );

  updateLanguageInUrl(language);

  await fitToOnePage();

  document.documentElement.setAttribute(
    "data-cover-ready",
    "true"
  );
}

/* ========================================================= */
/* EVENTOS                                                   */
/* ========================================================= */

languageButtons.forEach(
  (button) => {
    button.addEventListener(
      "click",
      async () => {
        await renderCoverLetter(
          button.dataset.languageButton
        );
      }
    );
  }
);

printButton.addEventListener(
  "click",
  () => {
    window.print();
  }
);

document.addEventListener(
  "DOMContentLoaded",
  async () => {
    const parameters =
      getParameters();

    await renderCoverLetter(
      parameters.language
    );
  }
);