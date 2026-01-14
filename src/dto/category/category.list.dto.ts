/**
 * DTO para listar categorías.
 * Representa la versión reducida del modelo,
 * ya localizada a un solo idioma.
 */
export interface CategoryListDTO {
  id: string;          // ID de la categoría (ObjectId serializado)
  title: string;       // Título en el idioma solicitado
  description: string; // Descripción en el idioma solicitado
}
