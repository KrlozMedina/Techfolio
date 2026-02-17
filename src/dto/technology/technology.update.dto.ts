import { CreateTechnologyDTO, createTechnologySchema } from "./technology.create.dto";

/**
 * Schema de validación para actualizar una tecnología.
 *
 * Se basa en el schema de creación (`createTechnologySchema`)
 * pero convierte todas sus propiedades en opcionales mediante `.partial()`.
 *
 * Esto permite realizar actualizaciones parciales (PATCH),
 * enviando únicamente los campos que se desean modificar.
 */
export const updateTechnologySchema = createTechnologySchema.partial();

/**
 * DTO para la actualización de una tecnología.
 *
 * - Todas las propiedades del DTO de creación pasan a ser opcionales.
 * - Cada campo puede enviarse o no en la actualización.
 *
 * Nota:
 * El uso de `Partial<CreateTechnologyDTO[K]>` en tipos primitivos
 * (string, enum, etc.) no aporta un cambio real, ya que `Partial`
 * está pensado para objetos.
 */
export type UpdateTechnologyDTO = {
  [K in keyof CreateTechnologyDTO]?: Partial<CreateTechnologyDTO[K]>;
};
