/**
 * Contenido localizado de una categoría.
 *
 * Define los campos mínimos obligatorios que debe tener
 * una categoría para un idioma específico.
 */
export type LocalizedCategoryContent = {
  /** Título visible de la categoría */
  title: string;

  /** Descripción de la categoría */
  description: string;
};

/**
 * DTO para la creación de una categoría.
 *
 * Reglas:
 * - Obliga a enviar el contenido completo para todos los idiomas soportados
 * - Se utiliza como contrato de entrada en la capa de servicio / API
 * - Garantiza consistencia multilenguaje desde la creación
 */
export type CreateCategoryDTO = {
  content: {
    /** Contenido en español */
    es: LocalizedCategoryContent;

    /** Contenido en inglés */
    en: LocalizedCategoryContent;
  };
};
