import { getCvData } from "./cv-data.js";

export function getAtsCvData(language = "en") {
  const safeLanguage = language === "es" ? "es" : "en";
  const baseData = getCvData(safeLanguage);

  return {
    ...baseData,
    coreCompetencies: baseData.leadershipSkills.items,
    tools: baseData.skillGroups.flatMap((group) => group.skills),
    sectionTitles: {
      profile: baseData.sections.profile,
      competencies: baseData.sections.leadership,
      experience: baseData.sections.experience,
      solutions: baseData.sections.solutions,
      tools: baseData.sections.skills,
      education: baseData.sections.education,
      languages: baseData.sections.languages
    }
  };
}
