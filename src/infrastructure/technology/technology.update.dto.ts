/**
 * =========================================================
 * Technology Update Validation Schema & DTO
 * ---------------------------------------------------------
 * Define el esquema de validación y el DTO utilizados
 * para actualizar una tecnología existente dentro del sistema.
 *
 * Este módulo reutiliza el esquema de creación
 * (`createTechnologySchema`) y lo adapta para permitir
 * actualizaciones parciales mediante `.partial()`.
 *
 * Arquitectura:
 * - Validación centralizada con Zod
 * - DTO compartido entre controller, service y persistence
 * - Compatible con endpoints PATCH / PUT
 *
 * Responsabilidades:
 * - Validar payloads de actualización
 * - Permitir modificaciones parciales de una tecnología
 * - Mantener consistencia con el DTO de creación
 *
 * Utilizado en:
 * - endpoints PATCH /technologies/:id
 * - endpoints PUT /technologies/:id
 * - formularios de edición de tecnologías
 * =========================================================
 */

import { CreateTechnologyDTO, createTechnologySchema } from "./technology.create.dto";

/**
 * =========================================================
 * updateTechnologySchema
 * ---------------------------------------------------------
 * Schema de validación para actualizar una tecnología.
 *
 * Se basa en el schema de creación (`createTechnologySchema`)
 * pero convierte todas sus propiedades de primer nivel
 * en opcionales mediante `.partial()`.
 *
 * Esto permite realizar actualizaciones parciales,
 * enviando únicamente los campos que se desean modificar.
 *
 * Ejemplo válido:
 * {
 *   name: "TypeScript",
 *   websiteUrl: "https://www.typescriptlang.org/"
 * }
 * =========================================================
 */
export const updateTechnologySchema = createTechnologySchema.partial();

/**
 * =========================================================
 * UpdateTechnologyDTO
 * ---------------------------------------------------------
 * Data Transfer Object utilizado para actualizar una
 * tecnología existente.
 *
 * Características:
 * - Todas las propiedades del DTO de creación pasan
 *   a ser opcionales.
 * - Permite enviar únicamente los campos que se desean
 *   modificar.
 *
 * Nota técnica:
 * El uso de `Partial<CreateTechnologyDTO[K]>` en tipos
 * primitivos (string, enum, etc.) no aporta un cambio real,
 * ya que `Partial` está pensado para objetos.
 * =========================================================
 */
export type UpdateTechnologyDTO = {
  [K in keyof CreateTechnologyDTO]?: Partial<CreateTechnologyDTO[K]>;
};