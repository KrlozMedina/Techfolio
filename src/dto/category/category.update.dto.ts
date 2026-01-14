import { CreateCategoryDTO } from "./category.create.dto";

/**
 * DTO para actualización de categoría.
 *
 * - Permite actualizaciones parciales
 * - Cada idioma (es / en) es opcional
 * - Dentro de cada idioma, title y description también son opcionales
 */
export type UpdateCategoryDTO = {
  [K in keyof CreateCategoryDTO]?: Partial<CreateCategoryDTO[K]>;
};
