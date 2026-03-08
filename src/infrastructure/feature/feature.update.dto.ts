/**
 * =========================================================
 * Feature Update Validation Schema & DTO
 * ---------------------------------------------------------
 * Define la validación y tipos utilizados para la
 * actualización parcial de una Feature dentro del sistema.
 *
 * A diferencia de la creación (`createFeatureSchema`),
 * la actualización permite enviar únicamente los campos
 * que se desean modificar.
 *
 * Este módulo incluye:
 * - Un schema Zod para validar actualizaciones parciales
 * - Un DTO tipado para operaciones de update
 *
 * Arquitectura:
 * - Reutiliza el schema de creación como base
 * - Usa `.partial()` para permitir modificaciones parciales
 * - Mantiene consistencia entre validación y DTO
 *
 * Responsabilidades:
 * - Validar payloads de actualización
 * - Permitir modificaciones parciales de features
 * - Mantener tipado fuerte en la capa de aplicación
 *
 * Utilizado en:
 * - endpoints PUT/PATCH /features
 * - servicios de actualización
 * - formularios de edición
 * =========================================================
 */

import { CreateFeatureDTO, createFeatureSchema } from "./feature.create.dto";

/**
 * =========================================================
 * updateFeatureSchema
 * ---------------------------------------------------------
 * Schema de validación para actualización de features.
 *
 * `.partial()` convierte todas las propiedades de primer
 * nivel del schema en opcionales.
 *
 * En este caso:
 * - `content` pasa a ser opcional
 * - `domain` pasa a ser opcional
 *
 * Esto permite enviar solo los campos que se desean
 * modificar durante una operación de actualización.
 *
 * Ejemplo válido:
 * {
 *   content: {
 *     es: { title: "Nuevo título" }
 *   }
 * }
 * =========================================================
 */
export const updateFeatureSchema = createFeatureSchema.partial();

/**
 * =========================================================
 * UpdateFeatureDTO
 * ---------------------------------------------------------
 * Data Transfer Object utilizado para actualizar una
 * Feature de forma parcial.
 *
 * Características:
 * - Hace opcionales todas las propiedades de
 *   `CreateFeatureDTO`
 * - Aplica `Partial` al nivel interno para permitir
 *   actualizaciones parciales dentro de cada propiedad
 *
 * Ejemplo:
 * {
 *   content: {
 *     es: { title: "Nuevo título" }
 *   }
 * }
 *
 * Esto permite modificar solo partes específicas de
 * la entidad sin necesidad de enviar la estructura
 * completa.
 * =========================================================
 */
export type UpdateFeatureDTO = {
  [K in keyof CreateFeatureDTO]?: Partial<CreateFeatureDTO[K]>;
};