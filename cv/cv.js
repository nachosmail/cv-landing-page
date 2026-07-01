"use strict";

import {
  getCvData
} from "../data/cv-data.js";

/* ========================================================= */
/* REFERENCIAS DEL DOM                                       */
/* ========================================================= */

const cvPage =
  document.getElementById("cv-page");

const languageButtons =
  document.querySelectorAll("[data-language-button]");

const printButton =
  document.getElementById("print-cv-button");

const nameElement =
  document.getElementById("cv-name");

const professionalTitleElement =
  document.getElementById("cv-professional-title");

const professionalSubtitleElement =
  document.getElementById("cv-professional-subtitle");

const headerContactElement =
  document.getElementById("cv-header-contact");

const featuredTechnologiesElement =
  document.getElementById("cv-featured-technologies");

const profileSectionTitleElement =
  document.getElementById("profile-section-title");

const profileElement =
  document.getElementById("cv-profile");

const skillsSectionTitleElement =
  document.getElementById("skills-section-title");

const skillGroupsElement =
  document.getElementById("cv-skill-groups");

const leadershipSectionTitleElement =
  document.getElementById("leadership-section-title");

const leadershipSkillsElement =
  document.getElementById("cv-leadership-skills");

const languagesSectionTitleElement =
  document.getElementById("languages-section-title");

const languagesElement =
  document.getElementById("cv-languages");

const educationSectionTitleElement =
  document.getElementById("education-section-title");

const educationElement =
  document.getElementById("cv-education");

const experienceSectionTitleElement =
  document.getElementById("experience-section-title");

const experienceListElement =
  document.getElementById("cv-experience-list");

const solutionsSectionTitleElement =
  document.getElementById("solutions-section-title");

const solutionsGridElement =
  document.getElementById("cv-solutions-grid");

const footerTextElement =
  document.getElementById("cv-footer-text");

const footerLanguageElement =
  document.getElementById("cv-footer-language");

/* ========================================================= */
/* ESTADO                                                    */
/* ========================================================= */

const supportedLanguages = [
  "en",
  "es"
];

let currentLanguage =
  getLanguageFromUrl();

/* ========================================================= */
/* TEXTOS DE INTERFAZ                                        */
/* ========================================================= */

const interfaceText = {
  en: {
    email:
      "Email",

    phone:
      "Phone",

    location:
      "Location",

    linkedin:
      "LinkedIn",

    portfolio:
      "Portfolio",

    github:
      "GitHub",

    footer:
      "Data · Automation · Business Intelligence · Digital Solutions · Project Leadership",

    footerLanguage:
      "English version",

    printButton:
      "Print / Save PDF",

    linkedinText:
      "LinkedIn profile",

    portfolioText:
      "Online portfolio",

    githubText:
      "GitHub profile"
  },

  es: {
    email:
      "Email",

    phone:
      "Teléfono",

    location:
      "Ubicación",

    linkedin:
      "LinkedIn",

    portfolio:
      "Portfolio",

    github:
      "GitHub",

    footer:
      "Datos · Automatización · Business Intelligence · Soluciones Digitales · Liderazgo de Proyectos",

    footerLanguage:
      "Versión en español",

    printButton:
      "Imprimir / Guardar PDF",

    linkedinText:
      "Perfil de LinkedIn",

    portfolioText:
      "Portfolio online",

    githubText:
      "Perfil de GitHub"
  }
};

/* ========================================================= */
/* UTILIDADES                                                */
/* ========================================================= */

function getLanguageFromUrl() {
  const searchParams =
    new URLSearchParams(
      window.location.search
    );

  const requestedLanguage =
    searchParams.get("lang");

  if (
    supportedLanguages.includes(
      requestedLanguage
    )
  ) {
    return requestedLanguage;
  }

  return "en";
}

function setLanguageInUrl(language) {
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

function isValidUrl(value) {
  if (
    !value ||
    value.startsWith("REPLACE_WITH_")
  ) {
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

  if (textContent !== "") {
    element.textContent =
      textContent;
  }

  return element;
}

function clearElement(element) {
  element.replaceChildren();
}

function createLink(
  href,
  text,
  options = {}
) {
  const link =
    createElement(
      "a",
      options.className || "",
      text
    );

  link.href = href;

  if (options.external) {
    link.target =
      "_blank";

    link.rel =
      "noopener noreferrer";
  }

  return link;
}

/* ========================================================= */
/* CABECERA                                                  */
/* ========================================================= */

function renderHeader(data) {
  nameElement.textContent =
    data.personal.name;

  professionalTitleElement.textContent =
    data.professionalTitle;

  professionalSubtitleElement.textContent =
    data.professionalSubtitle;

  renderHeaderContact(data);
  renderFeaturedTechnologies(data);
}

function renderHeaderContact(data) {
  clearElement(
    headerContactElement
  );

  const labels =
    interfaceText[
      data.language
    ];

  const contactItems = [
    {
      label:
        labels.email,

      value:
        data.personal.email,

      href:
        data.personal.email
          ? `mailto:${data.personal.email}`
          : ""
    },

    {
      label:
        labels.phone,

      value:
        data.personal.phone,

      href:
        data.personal.phone
          ? `tel:${data.personal.phone.replace(/\s+/g, "")}`
          : ""
    },

    {
      label:
        labels.location,

      value:
        data.personal.location,

      href:
        ""
    }
  ];

  if (
    isValidUrl(
      data.personal.linkedin
    )
  ) {
    contactItems.push({
      label:
        labels.linkedin,

      value:
        labels.linkedinText,

      href:
        data.personal.linkedin,

      external:
        true
    });
  }

  if (
    isValidUrl(
      data.personal.portfolio
    )
  ) {
    contactItems.push({
      label:
        labels.portfolio,

      value:
        labels.portfolioText,

      href:
        data.personal.portfolio,

      external:
        true
    });
  }

  if (
    isValidUrl(
      data.personal.github
    )
  ) {
    contactItems.push({
      label:
        labels.github,

      value:
        labels.githubText,

      href:
        data.personal.github,

      external:
        true
    });
  }

  contactItems.forEach(
    (contactItem) => {
      if (!contactItem.value) {
        return;
      }

      const item =
        createElement(
          "div",
          "cv-contact-item"
        );

      const label =
        createElement(
          "span",
          "cv-contact-label",
          contactItem.label
        );

      const value =
        createElement(
          "span",
          "cv-contact-value"
        );

      if (contactItem.href) {
        value.appendChild(
          createLink(
            contactItem.href,
            contactItem.value,
            {
              external:
                contactItem.external
            }
          )
        );
      } else {
        value.textContent =
          contactItem.value;
      }

      item.append(
        label,
        value
      );

      headerContactElement.appendChild(
        item
      );
    }
  );
}

function renderFeaturedTechnologies(
  data
) {
  clearElement(
    featuredTechnologiesElement
  );

  data.featuredTechnologies.forEach(
    (technology) => {
      featuredTechnologiesElement.appendChild(
        createElement(
          "span",
          "cv-featured-technology",
          technology
        )
      );
    }
  );
}

/* ========================================================= */
/* PERFIL                                                    */
/* ========================================================= */

function renderProfile(data) {
  profileSectionTitleElement.textContent =
    data.sections.profile;

  clearElement(
    profileElement
  );

  data.profile.forEach(
    (paragraph) => {
      profileElement.appendChild(
        createElement(
          "p",
          "",
          paragraph
        )
      );
    }
  );
}

/* ========================================================= */
/* SKILLS                                                    */
/* ========================================================= */

function renderSkills(data) {
  skillsSectionTitleElement.textContent =
    data.sections.skills;

  clearElement(
    skillGroupsElement
  );

  data.skillGroups.forEach(
    (skillGroup) => {
      const group =
        createElement(
          "div",
          "cv-skill-group"
        );

      const title =
        createElement(
          "h3",
          "",
          skillGroup.title
        );

      const list =
        createElement(
          "div",
          "cv-skill-list"
        );

      skillGroup.skills.forEach(
        (skill) => {
          list.appendChild(
            createElement(
              "span",
              "cv-skill-tag",
              skill
            )
          );
        }
      );

      group.append(
        title,
        list
      );

      skillGroupsElement.appendChild(
        group
      );
    }
  );
}

/* ========================================================= */
/* GESTIÓN Y NEGOCIO                                        */
/* ========================================================= */

function renderLeadershipSkills(
  data
) {
  leadershipSectionTitleElement.textContent =
    data.sections.leadership;

  clearElement(
    leadershipSkillsElement
  );

  data.leadershipSkills.items.forEach(
    (skill) => {
      leadershipSkillsElement.appendChild(
        createElement(
          "li",
          "",
          skill
        )
      );
    }
  );
}

/* ========================================================= */
/* IDIOMAS                                                   */
/* ========================================================= */

function renderLanguages(data) {
  languagesSectionTitleElement.textContent =
    data.sections.languages;

  clearElement(
    languagesElement
  );

  data.languages.forEach(
    (languageItem) => {
      const item =
        createElement(
          "div",
          "cv-language-item"
        );

      const languageName =
        createElement(
          "span",
          "cv-language-name",
          languageItem.language
        );

      const languageLevel =
        createElement(
          "span",
          "cv-language-level",
          languageItem.level
        );

      item.append(
        languageName,
        languageLevel
      );

      languagesElement.appendChild(
        item
      );
    }
  );
}

/* ========================================================= */
/* EDUCACIÓN                                                 */
/* ========================================================= */

function renderEducation(data) {
  educationSectionTitleElement.textContent =
    data.sections.education;

  clearElement(
    educationElement
  );

  data.education.forEach(
    (educationItem) => {
      const item =
        createElement(
          "article",
          "cv-education-item"
        );

      const degree =
        createElement(
          "div",
          "cv-education-degree",
          educationItem.degree
        );

      const institution =
        createElement(
          "div",
          "cv-education-institution",
          educationItem.institution
        );

      item.append(
        degree,
        institution
      );

      if (
        educationItem.status
      ) {
        item.appendChild(
          createElement(
            "div",
            "cv-education-status",
            educationItem.status
          )
        );
      }

      educationElement.appendChild(
        item
      );
    }
  );
}

/* ========================================================= */
/* EXPERIENCIA                                               */
/* ========================================================= */

function renderExperience(data) {
  experienceSectionTitleElement.textContent =
    data.sections.experience;

  clearElement(
    experienceListElement
  );

  data.experience.forEach(
    (experienceItem) => {
      const article =
        createElement(
          "article",
          "cv-experience-item"
        );

      const header =
        createElement(
          "div",
          "cv-experience-header"
        );

      const headingContainer =
        createElement("div");

      const role =
        createElement(
          "h3",
          "cv-experience-role",
          experienceItem.role
        );

      const company =
        createElement(
          "p",
          "cv-experience-company",
          `${experienceItem.company} · ${experienceItem.location}`
        );

      headingContainer.append(
        role,
        company
      );

      const period =
        createElement(
          "span",
          "cv-experience-period",
          experienceItem.period
        );

      header.append(
        headingContainer,
        period
      );

      const summary =
        createElement(
          "p",
          "cv-experience-summary",
          experienceItem.summary
        );

      const achievementList =
        createElement(
          "ul",
          "cv-achievement-list"
        );

      experienceItem.achievements.forEach(
        (achievement) => {
          achievementList.appendChild(
            createElement(
              "li",
              "",
              achievement
            )
          );
        }
      );

      const technologies =
        createElement(
          "div",
          "cv-experience-technologies"
        );

      experienceItem.technologies.forEach(
        (technology) => {
          technologies.appendChild(
            createElement(
              "span",
              "cv-experience-tag",
              technology
            )
          );
        }
      );

      article.append(
        header,
        summary,
        achievementList,
        technologies
      );

      experienceListElement.appendChild(
        article
      );
    }
  );
}

/* ========================================================= */
/* SOLUCIONES DIGITALES                                      */
/* ========================================================= */

function renderSelectedSolutions(
  data
) {
  solutionsSectionTitleElement.textContent =
    data.sections.solutions;

  clearElement(
    solutionsGridElement
  );

  data.selectedSolutions.forEach(
    (solution) => {
      const card =
        createElement(
          "article",
          "cv-solution-card"
        );

      const heading =
        createElement(
          "div",
          "cv-solution-heading"
        );

      const marker =
        createElement(
          "span",
          "cv-solution-marker"
        );

      marker.setAttribute(
        "aria-hidden",
        "true"
      );

      const title =
        createElement(
          "h3",
          "cv-solution-title",
          solution.title
        );

      heading.append(
        marker,
        title
      );

      const description =
        createElement(
          "p",
          "cv-solution-description",
          solution.description
        );

      const technologies =
        createElement(
          "div",
          "cv-solution-technologies"
        );

      solution.technologies.forEach(
        (technology) => {
          technologies.appendChild(
            createElement(
              "span",
              "cv-solution-tag",
              technology
            )
          );
        }
      );

      card.append(
        heading,
        description,
        technologies
      );

      solutionsGridElement.appendChild(
        card
      );
    }
  );
}

/* ========================================================= */
/* FOOTER                                                    */
/* ========================================================= */

function renderFooter(data) {
  const labels =
    interfaceText[
      data.language
    ];

  footerTextElement.textContent =
    labels.footer;

  footerLanguageElement.textContent =
    labels.footerLanguage;

  printButton.textContent =
    labels.printButton;
}

function updateLanguageButtons(
  language
) {
  languageButtons.forEach(
    (button) => {
      const isActive =
        button.dataset.languageButton ===
        language;

      button.classList.toggle(
        "active",
        isActive
      );

      button.setAttribute(
        "aria-pressed",
        String(isActive)
      );
    }
  );
}

/* ========================================================= */
/* METADATA                                                  */
/* ========================================================= */

function updateDocumentMetadata(
  data
) {
  document.documentElement.lang =
    data.language;

  document.title =
    data.language === "es"
      ? "CV Ignacio Smail - Español"
      : "Ignacio Smail CV - English";
}

/* ========================================================= */
/* CONTROL DE DESBORDE                                       */
/* ========================================================= */

function resetCompactMode() {
  cvPage.classList.remove(
    "compact",
    "extra-compact"
  );
}

function hasVerticalOverflow() {
  return (
    cvPage.scrollHeight >
    cvPage.clientHeight + 1
  );
}

function waitForLayout() {
  return new Promise(
    (resolve) => {
      requestAnimationFrame(
        () => {
          requestAnimationFrame(
            resolve
          );
        }
      );
    }
  );
}

async function fitCvToOnePage() {
  resetCompactMode();

  await waitForLayout();

  if (!hasVerticalOverflow()) {
    return;
  }

  cvPage.classList.add(
    "compact"
  );

  await waitForLayout();

  if (!hasVerticalOverflow()) {
    return;
  }

  cvPage.classList.add(
    "extra-compact"
  );

  await waitForLayout();

  if (hasVerticalOverflow()) {
    console.warn(
      "The CV still exceeds one A4 page. Reduce content or adjust the CSS."
    );
  }
}

/* ========================================================= */
/* RENDER GENERAL                                            */
/* ========================================================= */

async function renderCv(language) {
  const safeLanguage =
    supportedLanguages.includes(
      language
    )
      ? language
      : "en";

  currentLanguage =
    safeLanguage;

  const data =
    getCvData(
      safeLanguage
    );

  updateDocumentMetadata(data);

  renderHeader(data);
  renderProfile(data);
  renderSkills(data);
  renderLeadershipSkills(data);
  renderLanguages(data);
  renderEducation(data);
  renderExperience(data);
  renderSelectedSolutions(data);
  renderFooter(data);

  updateLanguageButtons(
    safeLanguage
  );

  setLanguageInUrl(
    safeLanguage
  );

  await fitCvToOnePage();

  document.documentElement.setAttribute(
    "data-cv-ready",
    "true"
  );

  window.dispatchEvent(
    new CustomEvent(
      "cv-ready",
      {
        detail: {
          language:
            safeLanguage
        }
      }
    )
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
        const language =
          button.dataset.languageButton;

        await renderCv(
          language
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

window.addEventListener(
  "resize",
  () => {
    fitCvToOnePage();
  }
);

/* ========================================================= */
/* INICIALIZACIÓN                                            */
/* ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  async () => {
    await renderCv(
      currentLanguage
    );
  }
);