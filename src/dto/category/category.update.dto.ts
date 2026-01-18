import { CreateCategoryDTO } from "./category.create.dto";

/**
 * DTO para actualización de categoría.
 *
 * Características:
 * - Basado en CreateCategoryDTO
 * - Permite actualizaciones parciales (PATCH)
 * - El campo `content` es opcional
 * - Dentro de `content`, cada idioma (es / en) es opcional
 * - Dentro de cada idioma, `title` y `description` también son opcionales
 *
 * Ejemplos válidos:
 * - Actualizar solo el título en español
 * - Actualizar únicamente el contenido en inglés
 * - Actualizar título o descripción de forma independiente
 */
export type UpdateCategoryDTO = {
  [K in keyof CreateCategoryDTO]?: Partial<CreateCategoryDTO[K]>;
};
