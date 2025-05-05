/**
 * Tipo que representa un texto en múltiples idiomas.
 */
type LocaleText = {
  es: string;
  en: string;
};

/**
 * Tipo que representa un enlace de navegación con soporte multilingüe.
 */
type NavLink = {
  title: LocaleText;
  href: string;
};

/**
 * Función utilitaria para crear un enlace de navegación multilingüe.
 *
 * @param es - Título en español
 * @param en - Título en inglés
 * @param href - Ruta del enlace
 * @returns Un objeto de tipo NavLink
 */
function createNavLink(es: string, en: string, href: string): NavLink {
  return {
    title: { es, en },
    href,
  };
}

/**
 * Lista de enlaces de navegación para la sección de proyectos.
 * Incluye traducciones y rutas asociadas.
 */
export const NAV_LINKS_PROJECT: NavLink[] = [
  createNavLink("Servicios", "Services", "/projects/services"),
  createNavLink("Testimonios", "Testimonials", "/projects/testimonials"),
  createNavLink("Casos de éxito", "Success Stories", "/projects/case-studies"),
];
