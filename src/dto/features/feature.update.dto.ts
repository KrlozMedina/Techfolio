import { CreateFeatureDTO } from "./feature.create.dto";

/**
 * DTO para actualización de una feature.
 *
 * - Permite actualizaciones parciales
 * - Cada propiedad del CreateFeatureDTO es opcional
 * - Para objetos anidados (ej. content), sus campos internos
 *   también pueden actualizarse parcialmente
 *
 * Ejemplo válido:
 * {
 *   content: {
 *     es: { title: "Nuevo título" }
 *   }
 * }
 */
export type UpdateFeatureDTO = {
  [K in keyof CreateFeatureDTO]?: Partial<CreateFeatureDTO[K]>;
};
