export const coverLetterData = {
  defaults: {
    company: {
      en: "Company Name",
      es: "Nombre de la empresa"
    },

    position: {
      en: "Position Title",
      es: "Nombre del puesto"
    },

    recipient: {
      en: "Hiring Manager",
      es: "Responsable de Selección"
    }
  },

opening: {
  en: "I am writing to introduce my professional profile and express my interest in opportunities related to data, automation, business intelligence, digital solutions and project leadership. As an Industrial Engineer with a systems-oriented profile, I have developed my career at the intersection of operations, software, analytics and project execution.",

  es: "Me dirijo a ustedes para presentar mi perfil profesional y expresar mi interés en oportunidades relacionadas con datos, automatización, business intelligence, soluciones digitales y liderazgo de proyectos. Como Ingeniero Industrial con perfil orientado a sistemas, desarrollé mi carrera en la intersección entre operaciones, software, analítica y ejecución de proyectos."
},

  experience: {
    en: "In my current role at Pirelli, I design and develop automated reports, data workflows, web applications and BI solutions using Python, SQL, Qlik Sense, Angular, Flask and cloud technologies. I also coordinate cross-functional initiatives, translating operational needs into technical requirements and supporting projects from definition to deployment and user adoption.",

    es: "En mi rol actual en Pirelli, diseño y desarrollo reportes automatizados, flujos de datos, aplicaciones web y soluciones de BI utilizando Python, SQL, Qlik Sense, Angular, Flask y tecnologías cloud. Además, coordino iniciativas transversales, traduciendo necesidades operativas en requerimientos técnicos y acompañando los proyectos desde su definición hasta el despliegue y la adopción por parte de los usuarios."
  },

  previousExperience: {
    en: "Previously, as a Senior Process Engineer, I worked on KPI management, productivity improvement, cost-saving initiatives, root-cause analysis and process standardization. This experience gave me a strong understanding of industrial operations and the ability to connect technical solutions with measurable business impact.",

    es: "Anteriormente, como Ingeniero de Procesos Sr., trabajé en gestión de KPIs, mejora de productividad, iniciativas de reducción de costos, análisis de causa raíz y estandarización de procesos. Esta experiencia me permitió desarrollar una fuerte comprensión de la operación industrial y la capacidad de conectar soluciones técnicas con impacto medible en el negocio."
  },

  motivation: {
    en: "I am particularly interested in opportunities where I can combine data, software, process knowledge and project coordination to build practical and scalable solutions. I believe my hybrid background allows me to communicate effectively with both technical teams and business stakeholders.",

    es: "Me interesan especialmente las oportunidades en las que pueda combinar datos, software, conocimiento de procesos y coordinación de proyectos para desarrollar soluciones prácticas y escalables. Considero que mi perfil híbrido me permite comunicarme de manera efectiva tanto con equipos técnicos como con stakeholders del negocio."
  },

closing: {
  en: "I would welcome the opportunity to discuss how my experience, technical background and cross-functional approach could contribute to future projects and business objectives. Thank you for your time and consideration.",

  es: "Me gustaría tener la oportunidad de conversar sobre cómo mi experiencia, formación técnica y enfoque transversal podrían contribuir a futuros proyectos y objetivos de negocio. Muchas gracias por su tiempo y consideración."
},

  signature: {
    en: "Sincerely,",
    es: "Saludos cordiales,"
  },

sections: {
  subject: {
    en: "Professional Introduction",
    es: "Presentación Profesional"
  },

    contact: {
      en: "Contact",
      es: "Contacto"
    }
  }
};

export function replaceCoverLetterVariables(
  text,
  variables
) {
  return text
    .replaceAll(
      "{company}",
      variables.company
    )
    .replaceAll(
      "{position}",
      variables.position
    );
}

export function getCoverLetterData(
  language = "en",
  overrides = {}
) {
  const safeLanguage =
    language === "es"
      ? "es"
      : "en";

  const company =
    overrides.company ||
    coverLetterData.defaults.company[
      safeLanguage
    ];

  const position =
    overrides.position ||
    coverLetterData.defaults.position[
      safeLanguage
    ];

  const recipient =
    overrides.recipient ||
    coverLetterData.defaults.recipient[
      safeLanguage
    ];

  const variables = {
    company,
    position
  };

  return {
    language:
      safeLanguage,

    company,
    position,
    recipient,

subject:
  coverLetterData.sections.subject[safeLanguage],

    contactTitle:
      coverLetterData.sections.contact[
        safeLanguage
      ],

    paragraphs: [
      replaceCoverLetterVariables(
        coverLetterData.opening[
          safeLanguage
        ],
        variables
      ),

      replaceCoverLetterVariables(
        coverLetterData.experience[
          safeLanguage
        ],
        variables
      ),

      replaceCoverLetterVariables(
        coverLetterData.previousExperience[
          safeLanguage
        ],
        variables
      ),

      replaceCoverLetterVariables(
        coverLetterData.motivation[
          safeLanguage
        ],
        variables
      ),

      replaceCoverLetterVariables(
        coverLetterData.closing[
          safeLanguage
        ],
        variables
      )
    ],

    signature:
      coverLetterData.signature[
        safeLanguage
      ]
  };
}