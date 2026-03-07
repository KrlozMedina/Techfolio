/**
 * =========================================================
 * Category Update Validation Schema & DTO
 * ---------------------------------------------------------
 * Define la validación y el tipo de datos utilizados para
 * la actualización parcial de una categoría.
 *
 * A diferencia de la creación (`createCategorySchema`),
 * la actualización permite enviar únicamente los campos
 * que se desean modificar.
 *
 * Este archivo incluye:
 * - Un schema de validación basado en Zod
 * - Un DTO tipado para actualizaciones parciales
 *
 * Arquitectura:
 * - Reutiliza el schema de creación como base
 * - Usa `.partial()` para permitir actualizaciones
 *   parciales de entidades
 * - Mantiene consistencia entre DTO y validación
 *
 * Responsabilidades:
 * - Validar payloads de actualización
 * - Permitir modificaciones parciales de categorías
 * - Garantizar tipado seguro en la capa de aplicación
 *
 * Utilizado en:
 * - endpoints PATCH /categories
 * - servicios de actualización de categorías
 * - validación en controladores
 * =========================================================
 */

import { CreateCategoryDTO, createCategorySchema } from "./category.create.dto";

/**
 * =========================================================
 * updateCategorySchema
 * ---------------------------------------------------------
 * Schema de validación para actualización de categorías.
 *
 * `.partial()` convierte todas las propiedades de primer
 * nivel en opcionales.
 *
 * En este caso:
 * - `content` pasa a ser opcional
 * - Permite enviar solo los campos que se desean modificar
 *
 * Ejemplo válido:
 * {
 *   content: {
 *     es: { title: "Nuevo título" }
 *   }
 * }
 * =========================================================
 */
export const updateCategorySchema = createCategorySchema.partial();

/**
 * =========================================================
 * UpdateCategoryDTO
 * ---------------------------------------------------------
 * Data Transfer Object utilizado para actualizar una
 * categoría de forma parcial.
 *
 * Características:
 * - Hace opcionales todas las propiedades de
 *   `CreateCategoryDTO`
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
 * Esto permite actualizar solo partes específicas del
 * contenido sin necesidad de enviar la estructura completa.
 * =========================================================
 */
export type UpdateCategoryDTO = {
  [K in keyof CreateCategoryDTO]?: Partial<CreateCategoryDTO[K]>;
};