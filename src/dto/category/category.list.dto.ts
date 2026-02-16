/**
 * DTO para listado de categorías.
 * 
 * Versión simplificada usada en endpoints de lista,
 * donde no se necesita la estructura completa de idiomas.
 */
export interface CategoryListDTO {
  /**
   * Identificador único de la categoría
   */
  id: string;

  /**
   * Título en el idioma seleccionado
   */
  title: string;

  /**
   * Descripción en el idioma seleccionado
   */
  description: string;
}
