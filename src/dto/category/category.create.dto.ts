/**
 * Contenido localizado de una categoría.
 * Representa los campos obligatorios por idioma.
 */
export type LocalizedCategoryContent = {
  title: string;
  description: string;
};

/**
 * DTO para creación de categoría.
 * - Requiere contenido completo en todos los idiomas soportados
 */
export type CreateCategoryDTO = {
  es: LocalizedCategoryContent;
  en: LocalizedCategoryContent;
};
