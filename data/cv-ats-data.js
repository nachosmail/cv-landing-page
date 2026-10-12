import { getCvData } from "./cv-data.js";

const atsOverrides = {
  en: {
    professionalTitle: "Data analytics & BI  Continuous Improvement | Industrial Engineer",
    professionalSubtitle: "Process Optimization | Operational Excellence | Data Analytics",
    profile: [
      "Industrial Engineer with experience in continuous improvement, process optimization and data-driven operational management in manufacturing environments. Skilled in KPI monitoring, root-cause analysis, productivity improvement, cost reduction, process standardization and automation. Combines business understanding with Python, SQL and business intelligence tools to turn operational needs into sustainable improvements and support cross-functional decision-making."
    ],
    coreCompetencies: [
      "Continuous improvement",
      "Process optimization",
      "Operational excellence",
      "KPI management",
      "Productivity improvement",
      "Cost reduction",
      "Root-cause analysis",
      "Process standardization",
      "Data analysis",
      "Business intelligence",
      "Report automation",
      "Project leadership",
      "Stakeholder management",
      "Agile methodologies"
    ],
    sectionTitles: {
      profile: "Professional Summary",
      competencies: "Core Competencies",
      experience: "Professional Experience",
      tools: "Tools and Technologies",
      education: "Education",
      languages: "Languages"
    }
  },
  es: {
    professionalTitle: "Data analytics & BI - Mejora continua | Ingeniero Industrial",
    professionalSubtitle: "Optimización de Procesos | Excelencia Operacional | Analítica de Datos",
    profile: [
      "Ingeniero Industrial con experiencia en mejora continua, optimización de procesos y gestión operativa basada en datos en entornos industriales. Especializado en seguimiento de KPIs, análisis de causa raíz, mejora de productividad, reducción de costos, estandarización y automatización. Combino conocimiento del negocio con Python, SQL y herramientas de business intelligence para transformar necesidades operativas en mejoras sostenibles y acompañar la toma de decisiones transversal."
    ],
    coreCompetencies: [
      "Mejora continua",
      "Optimización de procesos",
      "Excelencia operacional",
      "Gestión de KPIs",
      "Mejora de productividad",
      "Reducción de costos",
      "Análisis de causa raíz",
      "Estandarización de procesos",
      "Análisis de datos",
      "Business intelligence",
      "Automatización de reportes",
      "Liderazgo de proyectos",
      "Gestión de stakeholders",
      "Metodologías ágiles"
    ],
    sectionTitles: {
      profile: "Perfil Profesional",
      competencies: "Competencias Clave",
      experience: "Experiencia Profesional",
      tools: "Herramientas y Tecnologías",
      education: "Formación",
      languages: "Idiomas"
    }
  }
};

const experienceOverrides = {
  smartManufacturing: {
    en: {
      role: "Senior Data Analyst | Smart Manufacturing Digital Leader",
      summary: "Continuous improvement through data, automation and cross-functional digital initiatives.",
      achievements: [
        "Lead cross-functional improvement initiatives, coordinating requirements, priorities, validation, deployment and user adoption.",
        "Develop automated reports and data workflows using Python, Pandas and SQL, reducing repetitive work and improving information reliability.",
        "Build real-time monitoring solutions for operational KPIs, alerts and process status using Angular, Flask and APIs.",
        "Create Qlik Sense dashboards for trend analysis, deviation detection, statistics and post-mortem evaluation.",
        "Integrate multiple data sources into reliable datasets that support operational analysis and management decisions."
      ]
    },
    es: {
      role: "Data Analyst Sr. | Digital Leader de Smart Manufacturing",
      summary: "Mejora continua mediante datos, automatización e iniciativas digitales transversales.",
      achievements: [
        "Lidero iniciativas transversales de mejora, coordinando requerimientos, prioridades, validaciones, despliegue y adopción de usuarios.",
        "Desarrollo reportes automatizados y flujos de datos con Python, Pandas y SQL, reduciendo tareas repetitivas y mejorando la confiabilidad de la información.",
        "Construyo soluciones de monitoreo en tiempo real para KPIs operativos, alertas y estados de proceso mediante Angular, Flask y APIs.",
        "Creo dashboards en Qlik Sense para analizar tendencias, detectar desvíos y realizar evaluaciones estadísticas y post-mortem.",
        "Integro múltiples fuentes en datasets confiables que facilitan el análisis operativo y la toma de decisiones de gestión."
      ]
    }
  },
  processEngineer: {
    en: {
      role: "Senior Process Engineer",
      summary: "Process performance, productivity, cost reduction and continuous improvement.",
      achievements: [
        "Monitored industrial KPIs and analyzed performance deviations to support operational decision-making.",
        "Coordinated productivity improvement actions based on data analysis and root-cause identification.",
        "Developed cost-reduction initiatives focused on production gains, efficiency and resource optimization.",
        "Defined, documented and audited manufacturing processes and operational standards.",
        "Automated recurring reports to reduce manual work and improve performance visibility."
      ]
    },
    es: {
      role: "Ingeniero de Procesos Sr.",
      summary: "Desempeño de procesos, productividad, reducción de costos y mejora continua.",
      achievements: [
        "Realicé el seguimiento de KPIs industriales y analicé desvíos de desempeño para acompañar la toma de decisiones operativas.",
        "Coordiné acciones de mejora de productividad basadas en análisis de datos e identificación de causas raíz.",
        "Desarrollé iniciativas de reducción de costos orientadas a ganancias de producción, eficiencia y optimización de recursos.",
        "Definí, documenté y audité procesos productivos y estándares operativos.",
        "Automaticé reportes recurrentes para reducir tareas manuales y mejorar la visibilidad del desempeño."
      ]
    }
  }
};

export function getAtsCvData(language = "en") {
  const safeLanguage = language === "es" ? "es" : "en";
  const baseData = getCvData(safeLanguage);
  const overrides = atsOverrides[safeLanguage];

  return {
    ...baseData,
    ...overrides,
    experience: baseData.experience.map((job) => ({
      ...job,
      ...(experienceOverrides[job.id]?.[safeLanguage] || {})
    })),
    tools: [
      "Python",
      "Pandas",
      "SQL",
      "Qlik Sense",
      "Tableau",
      "ETL",
      "APIs",
      "Angular",
      "Flask",
      "Git",
      "AWS"
    ]
  };
}
