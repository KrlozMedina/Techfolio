/**
 * DTO para listados de categorías.
 *
 * Define la estructura mínima expuesta al cliente
 * para vistas de listado, ya resuelta a un único idioma.
 */
export interface CategoryReadDTO {
  /**
   * Identificador único de la categoría.
   * Corresponde al ObjectId de MongoDB serializado como string.
   */
  id: string;

  /**
   * Identificador legible usado en URLs.
   * No depende del idioma.
   */
  slug: string;

  /**
   * Título localizado según el idioma solicitado.
   */
  title: string;

  /**
   * Descripción localizada según el idioma solicitado.
   */
  description: string;
}
