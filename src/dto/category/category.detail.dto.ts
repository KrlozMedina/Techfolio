import { CategoryListDTO } from "./category.list.dto";

/**
 * DTO de detalle de categoría.
 * Extiende el DTO de lista y agrega campos
 * necesarios para vistas detalladas o URLs.
 */
export interface CategoryDetailDTO extends CategoryListDTO {
  slug: string; // Identificador legible usado en rutas y SEO
}
