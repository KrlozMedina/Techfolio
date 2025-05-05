/**
 * Definición de las plataformas disponibles en el sistema.
 * Cada plataforma incluye una identificación única (`id`) y descripciones en español e inglés.
 * Este archivo está diseñado para ser usado como fuente de verdad para clasificaciones de tipo de proyecto o aplicación.
 */

type MultilingualText = {
  name: string;
  description: string;
};

type Platform = {
  id: string;
  es: MultilingualText;
  en: MultilingualText;
};

/**
 * Función de ayuda para crear una plataforma con estructura multilingüe.
 * @param id - Identificador único de la plataforma.
 * @param es - Objeto con nombre y descripción en español.
 * @param en - Objeto con nombre y descripción en inglés.
 * @returns Objeto de tipo Platform.
 */
const createPlatform = (id: string, es: MultilingualText, en: MultilingualText): Platform => ({
  id, es, en
});

export const PLATFORMS: Platform[] = [
  createPlatform("plat1", {
    name: "Aplicación Web",
    description: "Desarrollo de aplicaciones que se ejecutan en un navegador web."
  }, {
    name: "Web Application",
    description: "Development of applications that run in a web browser."
  }),

  createPlatform("plat2", {
    name: "Aplicación de Escritorio",
    description: "Desarrollo de aplicaciones que se ejecutan en sistemas operativos de escritorio como Windows, macOS, o Linux."
  }, {
    name: "Desktop Application",
    description: "Development of applications that run on desktop operating systems like Windows, macOS, or Linux."
  }),

  createPlatform("plat3", {
    name: "Aplicación Móvil",
    description: "Desarrollo de aplicaciones móviles para plataformas como Android o iOS."
  }, {
    name: "Mobile Application",
    description: "Development of mobile applications for platforms like Android or iOS."
  }),

  createPlatform("plat4", {
    name: "API / Backend Service",
    description: "Desarrollo de servicios backend y APIs que permiten la comunicación entre sistemas."
  }, {
    name: "API / Backend Service",
    description: "Development of backend services and APIs that enable communication between systems."
  }),

  createPlatform("plat5", {
    name: "Landing Page",
    description: "Creación de páginas de aterrizaje, generalmente orientadas a marketing o promociones."
  }, {
    name: "Landing Page",
    description: "Creation of landing pages, typically focused on marketing or promotions."
  }),

  createPlatform("plat6", {
    name: "Aplicaciones Web",
    description: "Aplicaciones que se acceden y usan a través de un navegador web."
  }, {
    name: "Web Applications",
    description: "Applications that are accessed and used through a web browser."
  }),

  createPlatform("plat7", {
    name: "Aplicaciones de Escritorio",
    description: "Aplicaciones de software que se instalan y ejecutan directamente en un sistema operativo de escritorio."
  }, {
    name: "Desktop Applications",
    description: "Software applications that are installed and run directly on a desktop operating system."
  }),

  createPlatform("plat8", {
    name: "Aplicaciones Móviles",
    description: "Aplicaciones diseñadas específicamente para dispositivos móviles como teléfonos y tabletas."
  }, {
    name: "Mobile Applications",
    description: "Applications specifically designed for mobile devices like phones and tablets."
  }),

  createPlatform("plat9", {
    name: "Desarrollo de APIs",
    description: "Creación y gestión de APIs que permiten la comunicación entre servicios o aplicaciones."
  }, {
    name: "API Development",
    description: "Creation and management of APIs that allow communication between services or applications."
  }),

  createPlatform("plat10", {
    name: "Proyectos de Ciencia de Datos y Machine Learning",
    description: "Proyectos que implican el análisis y la modelización de datos mediante machine learning."
  }, {
    name: "Data Science and Machine Learning Projects",
    description: "Projects involving the analysis and modeling of data using machine learning."
  }),

  createPlatform("plat11", {
    name: "DevOps y Automatización",
    description: "Implementación de prácticas de integración continua, automatización de tareas y despliegue de software."
  }, {
    name: "DevOps and Automation",
    description: "Implementation of continuous integration practices, task automation, and software deployment."
  }),

  createPlatform("plat12", {
    name: "Desarrollo de Videojuegos",
    description: "Creación de videojuegos para diversas plataformas como consolas, PC y dispositivos móviles."
  }, {
    name: "Game Development",
    description: "Creation of video games for various platforms like consoles, PCs, and mobile devices."
  }),

  createPlatform("plat13", {
    name: "Proyectos IoT",
    description: "Proyectos que integran dispositivos físicos a la red para compartir datos y mejorar la interacción."
  }, {
    name: "IoT Projects",
    description: "Projects that integrate physical devices into the network to share data and enhance interaction."
  }),

  createPlatform("plat14", {
    name: "Proyectos Educativos",
    description: "Desarrollo de proyectos con fines educativos o de aprendizaje."
  }, {
    name: "Educational Projects",
    description: "Development of projects for educational or learning purposes."
  }),

  createPlatform("plat15", {
    name: "Proyectos Creativos o de Arte Digital",
    description: "Proyectos que combinan tecnología con arte, diseño o creatividad digital."
  }, {
    name: "Creative or Digital Art Projects",
    description: "Projects that combine technology with art, design, or digital creativity."
  }),

  createPlatform("plat16", {
    name: "Proyectos de Código Abierto",
    description: "Desarrollo de software cuyo código es accesible para la comunidad para su modificación y mejora."
  }, {
    name: "Open Source Projects",
    description: "Development of software whose code is accessible to the community for modification and improvement."
  }),

  createPlatform("plat17", {
    name: "Aplicaciones Empresariales",
    description: "Aplicaciones orientadas a mejorar la productividad y gestión en entornos empresariales."
  }, {
    name: "Business Applications",
    description: "Applications aimed at improving productivity and management in business environments."
  }),

  createPlatform("plat18", {
    name: "Proyectos de Ciberseguridad",
    description: "Proyectos enfocados en la protección de sistemas, redes y datos contra amenazas externas."
  }, {
    name: "Cybersecurity Projects",
    description: "Projects focused on the protection of systems, networks, and data from external threats."
  }),

  createPlatform("plat19", {
    name: "Otros Proyectos",
    description: "Categoría para proyectos que no encajan en las demás categorías."
  }, {
    name: "Other Projects",
    description: "Category for projects that do not fit into other categories."
  })
];
