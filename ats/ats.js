"use strict";

import { getAtsCvData } from "../data/cv-ats-data.js";

const byId = (id) => document.getElementById(id);

function getLanguage() {
  return new URLSearchParams(window.location.search).get("lang") === "es"
    ? "es"
    : "en";
}

function addParagraphs(container, paragraphs) {
  container.replaceChildren(...paragraphs.map((text) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    return paragraph;
  }));
}

function renderExperience(experience) {
  byId("experience").replaceChildren(...experience.map((job) => {
    const article = document.createElement("article");
    article.className = "job";

    const heading = document.createElement("h3");
    heading.textContent = job.role;

    const meta = document.createElement("p");
    meta.className = "job-meta";
    meta.textContent = `${job.company} | ${job.location} | ${job.period}`;

    const summary = document.createElement("p");
    summary.className = "job-summary";
    summary.textContent = job.summary;

    const list = document.createElement("ul");
    job.achievements.forEach((achievement) => {
      const item = document.createElement("li");
      item.textContent = achievement;
      list.append(item);
    });

    article.append(heading, meta, summary, list);
    return article;
  }));
}

function renderEducation(education) {
  byId("education").replaceChildren(...education.map((item) => {
    const block = document.createElement("div");
    const degree = document.createElement("p");
    degree.className = "strong";
    degree.textContent = item.degree;
    const institution = document.createElement("p");
    institution.textContent = `${item.institution} | ${item.status}`;
    block.append(degree, institution);
    return block;
  }));
}

function renderLanguages(languages) {
  byId("languages").replaceChildren(...languages.map((item) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = `${item.language}: ${item.level}`;
    return paragraph;
  }));
}

function render() {
  const data = getAtsCvData(getLanguage());
  document.documentElement.lang = data.language;
  document.title = `${data.personal.name} - ATS CV`;

  byId("name").textContent = data.personal.name;
  byId("professional-title").textContent = data.professionalTitle;
  byId("professional-subtitle").textContent = data.professionalSubtitle;
  byId("contact-line").textContent = [
    data.personal.location,
    data.personal.phone,
    data.personal.email
  ].filter(Boolean).join(" | ");
  byId("link-line").textContent = [
    data.personal.linkedin,
    data.personal.portfolio,
    data.personal.github
  ].filter(Boolean).join(" | ");

  Object.entries(data.sectionTitles).forEach(([key, title]) => {
    byId(`${key}-title`).textContent = title;
  });

  addParagraphs(byId("profile"), data.profile);
  byId("competencies").textContent = data.coreCompetencies.join(" | ");
  byId("tools").textContent = data.tools.join(" | ");
  renderExperience(data.experience);
  renderEducation(data.education);
  renderLanguages(data.languages);

  document.documentElement.setAttribute("data-cv-ready", "true");
}

render();
