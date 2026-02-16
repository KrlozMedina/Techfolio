import { CreateCategoryDTO, createCategorySchema } from "./category.create.dto";

/**
 * Schema para actualización de categoría.
 * 
 * `.partial()` convierte todas las propiedades de primer nivel en opcionales.
 * En este caso:
 * - content pasa a ser opcional
 */
export const updateCategorySchema = createCategorySchema.partial();

/**
 * DTO para actualización.
 * 
 * - Hace opcionales las propiedades de CreateCategoryDTO.
 * - Además aplica Partial al nivel interno.
 */
export type UpdateCategoryDTO = {
  [K in keyof CreateCategoryDTO]?: Partial<CreateCategoryDTO[K]>;
};
