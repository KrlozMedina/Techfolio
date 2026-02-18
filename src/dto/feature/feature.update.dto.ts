import { CreateFeatureDTO, createFeatureSchema } from "./feature.create.dto";

/**
 * Esquema Zod para la validación de actualización de features.
 * Todos los campos son opcionales, ya que en una actualización
 * no es necesario enviar todos los datos.
 */
export const updateFeatureSchema = createFeatureSchema.partial();

/**
 * DTO (Data Transfer Object) para actualizar una feature.
 * - Cada propiedad de CreateFeatureDTO se vuelve opcional.
 * - Permite enviar solo los campos que se quieren actualizar.
 */
export type UpdateFeatureDTO = {
  [K in keyof CreateFeatureDTO]?: Partial<CreateFeatureDTO[K]>;
};
