/**
 * Lista de identificadores válidos para las páginas del sitio.
 */
export type Page =
  'about'       |
  'blog'        |
  'caseStudies' |
  'clients'     |
  'contact'     |
  'dashboard'   |
  'education'   |
  'experience'  |
  'gallery'     |
  'profile'     |
  'projects'    |
  'resources'   |
  'resume'      |
  'service'     |
  'skills'      |
  'testimonials'
  ;

/**
 * Estructura de una cita inspiradora.
 */
// interface Quote {
//   /**
//    * Frase en diferentes idiomas.
//    */
//   phrase: {
//     es: string;
//     en: string;
//   };

//   /**
//    * Autor de la cita.
//    */
//   author: string;
// }

/**
 * Citas inspiradoras asociadas a diferentes páginas del sitio.
 */
// export const QUOTES: Partial<Record<Page, Quote>> = {
//   projects: {
//     phrase: {
//       es: "La mejor manera de empezar algo es dejar de hablar de ello y empezar a hacerlo.",
//       en: "The way to get started is to stop talking and begin doing.",
//     },
//     author: "Walt Disney",
//   },
//   blog: {
//     phrase: {
//       es: 'Escribir es la manera más profunda de leer la vida.',
//       en: 'Writing is the deepest form of reading life.'
//     },
//     author: 'Francisco Umbral'
//   }
// };
