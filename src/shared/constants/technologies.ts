/**
 * Representa una tecnología utilizada en el sistema, organizada por categoría.
 * Cada tecnología incluye su nombre, ícono, categoría y descripciones en inglés y español.
 */

interface Technology {
  id: string;
  categoryId: string;
  logoUrl: string;
  name: string;
  es: { description: string };
  en: { description: string };
}

/**
 * Función auxiliar para crear un objeto de tecnología.
 */
const createTechnology = (
  id: string,
  categoryId: string,
  logoUrl: string,
  name: string,
  descriptionES: string,
  descriptionEN: string
): Technology => ({
  id,
  categoryId,
  logoUrl,
  name,
  es: { description: descriptionES },
  en: { description: descriptionEN }
});

export const TECHNOLOGIES: Technology[] = [
  createTechnology(
    "tech1",
    "cat1",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1200px-React.svg.png",
    "React.js",
    "Biblioteca de JavaScript para construir interfaces de usuario.",
    "JavaScript library for building user interfaces."
  ),
  createTechnology(
    "tech2",
    "cat1",
    "https://upload.wikimedia.org/wikipedia/commons/a/a7/Next.js_logo.svg",
    "Next.js",
    "Framework de React para aplicaciones web y estáticas.",
    "React framework for web and static applications."
  ),
  createTechnology(
    "tech3",
    "cat2",
    "https://nestjs.com/img/logo_small.svg",
    "NestJS",
    "Framework de Node.js para crear aplicaciones backend escalables.",
    "Node.js framework for building scalable backend applications."
  ),
  createTechnology(
    "tech4",
    "cat4",
    "https://cdn.worldvectorlogo.com/logos/mongodb-icon-2.svg",
    "MongoDB",
    "Base de datos NoSQL orientada a documentos.",
    "NoSQL document-oriented database."
  ),
  createTechnology(
    "tech5",
    "cat4",
    "https://www.svgrepo.com/show/303251/mysql-logo.svg",
    "PostgreSQL",
    "Sistema de gestión de bases de datos relacional.",
    "Relational database management system."
  ),
  createTechnology(
    "tech6",
    "cat9",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSObhWW7gEGNs1r3kbEXIeWuIDC74C6p5RVQ&s",
    "Docker",
    "Plataforma para crear, desplegar y ejecutar aplicaciones en contenedores.",
    "Platform for creating, deploying, and running applications in containers."
  ),
  createTechnology(
    "tech7",
    "cat1",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbLCBvPGD_ZFg4yZg27hRhJYpT0T1kWmxYHg&s",
    "React",
    "Biblioteca de JavaScript para construir interfaces de usuario.",
    "JavaScript library for building user interfaces."
  ),
  createTechnology(
    "tech8",
    "cat1",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBOy1dXFCRv_iVBu4hz4QRSQAUtxAiwKfx8Q&s",
    "Redux",
    "Biblioteca de gestión de estado predecible para aplicaciones JavaScript.",
    "Predictable state management library for JavaScript applications."
  ),
  createTechnology(
    "tech9",
    "cat1",
    "https://images.icon-icons.com/1488/PNG/512/5351-css3_102605.png",
    "CSS",
    "Lenguaje de hojas de estilo utilizado para diseñar la apariencia de las páginas web.",
    "Style sheet language used for designing the layout of web pages."
  ),
  createTechnology(
    "tech10",
    "cat2",
    "https://img.icons8.com/color/600/spring-logo.png",
    "Spring Boot",
    "Framework para aplicaciones backend en Java.",
    "Framework for backend applications in Java."
  ),
  createTechnology(
    "tech11",
    "cat1",
    "https://static-00.iconduck.com/assets.00/java-icon-1511x2048-6ikx8301.png",
    "Java",
    "Lenguaje de programación orientado a objetos utilizado en diversas plataformas.",
    "Object-oriented programming language used in various platforms."
  ),
  createTechnology(
    "tech12",
    "cat4",
    "https://www.svgrepo.com/show/303251/mysql-logo.svg",
    "MySQL",
    "Sistema de gestión de bases de datos relacional.",
    "Relational database management system."
  ),
  createTechnology(
    "tech13",
    "cat1",
    "https://img.icons8.com/color/512/sass.png",
    "SASS",
    "Preprocesador de CSS que facilita la escritura de estilos.",
    "CSS preprocessor that makes writing styles easier."
  ),
  createTechnology(
    "tech14",
    "cat9",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSObhWW7gEGNs1r3kbEXIeWuIDC74C6p5RVQ&s",
    "AWS",
    "Plataforma de servicios en la nube proporcionada por Amazon.",
    "Cloud services platform provided by Amazon."
  ),
  createTechnology(
    "tech15",
    "cat1",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbLCBvPGD_ZFg4yZg27hRhJYpT0T1kWmxYHg&s",
    "HTML",
    "Lenguaje de marcado utilizado para estructurar contenido web.",
    "Markup language used for structuring web content."
  )
];
