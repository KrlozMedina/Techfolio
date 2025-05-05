/**
 * Devuelve un objeto de categoría bilingüe.
 * 
 * @param id - Identificador único de la categoría.
 * @param esName - Nombre en español.
 * @param esDescription - Descripción en español.
 * @param enName - Nombre en inglés.
 * @param enDescription - Descripción en inglés.
 * @returns Objeto de categoría con textos en español e inglés.
 */
const createCategory = (
  id: string,
  esName: string,
  esDescription: string,
  enName: string,
  enDescription: string
) => ({
  id,
  es: { name: esName, description: esDescription },
  en: { name: enName, description: enDescription },
});

/**
 * Lista de categorías disponibles para proyectos o habilidades tecnológicas.
 * Incluye nombre y descripción en español e inglés.
 */
export const CATEGORIES = [
  createCategory("cat1", "Frontend", "Desarrollo de interfaces de usuario y experiencias web.",
                "Frontend", "Development of user interfaces and web experiences."),
  createCategory("cat2", "Backend", "Lógica del servidor, bases de datos y APIs.",
                "Backend", "Server logic, databases, and APIs."),
  createCategory("cat3", "Full Stack", "Desarrollo tanto del frontend como del backend.",
                "Full Stack", "Development of both frontend and backend."),
  createCategory("cat4", "Base de Datos", "Gestión y diseño de bases de datos.",
                "Database", "Database management and design."),
  createCategory("cat5", "DevOps", "Automatización, integración continua y despliegue de software.",
                "DevOps", "Automation, continuous integration, and software deployment."),
  createCategory("cat6", "UI/UX", "Diseño de interfaces y experiencia de usuario.",
                "UI/UX", "User interface and user experience design."),
  createCategory("cat7", "Desarrollo Móvil", "Creación de aplicaciones móviles para iOS y Android.",
                "Mobile Development", "Development of mobile applications for iOS and Android."),
  createCategory("cat8", "Pruebas de Software", "Verificación de calidad de software mediante pruebas.",
                "Testing", "Software quality assurance through testing."),
  createCategory("cat9", "Nube e Infraestructura", "Despliegue de aplicaciones en la nube y gestión de infraestructura.",
                "Cloud & Infrastructure", "Deployment of applications on the cloud and infrastructure management."),
  createCategory("cat10", "Machine Learning e Inteligencia Artificial",
                "Desarrollo de modelos de machine learning e inteligencia artificial.",
                "Machine Learning & AI", "Development of machine learning and artificial intelligence models."),
  createCategory("cat11", "Análisis de Datos y Big Data",
                "Análisis, procesamiento y visualización de grandes volúmenes de datos.",
                "Data Analysis & Big Data", "Analysis, processing, and visualization of large volumes of data."),
  createCategory("cat12", "Ciberseguridad", "Protección de sistemas, redes y datos contra ataques.",
                "Cybersecurity", "Protection of systems, networks, and data against attacks."),
  createCategory("cat13", "Desarrollo de Videojuegos", "Creación de videojuegos para diversas plataformas.",
                "Game Development", "Creation of video games for various platforms."),
  createCategory("cat14", "Realidad Aumentada y Realidad Virtual",
                "Desarrollo de experiencias de realidad aumentada y virtual.",
                "AR/VR", "Development of augmented and virtual reality experiences."),
  createCategory("cat15", "Internet de las Cosas (IoT)",
                "Conexión e integración de dispositivos físicos a Internet.",
                "IoT (Internet of Things)", "Connecting and integrating physical devices to the Internet."),
  createCategory("cat16", "Blockchain", "Desarrollo de aplicaciones basadas en tecnologías blockchain.",
                "Blockchain", "Development of applications based on blockchain technologies."),
  createCategory("cat17", "Otro", "Categoría para proyectos que no encajan en las demás.",
                "Other", "Category for projects that do not fit into other categories."),
];
