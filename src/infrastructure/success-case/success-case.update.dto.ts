/**
 * =========================================================
 * Success Case Update Validation Schema & DTO
 * ---------------------------------------------------------
 * Define el esquema de validación y el DTO utilizados para
 * actualizar un Success Case existente dentro del sistema.
 *
 * Este módulo reutiliza el esquema de creación
 * (`createSuccessCaseSchema`) y lo transforma para permitir
 * actualizaciones parciales mediante `.partial()`.
 *
 * Arquitectura:
 * - Validación centralizada con Zod
 * - DTO utilizado entre controller, application y persistence
 * - Compatible con endpoints PUT/PATCH
 *
 * Responsabilidades:
 * - Validar payloads de actualización
 * - Permitir modificaciones parciales de un Success Case
 * - Mantener consistencia estructural entre creación y actualización
 *
 * Utilizado en:
 * - endpoints PUT /success-cases/:id
 * - endpoints PATCH /success-cases/:id
 * - formularios de edición de casos de éxito
 * =========================================================
 */

import {
  CreateSuccessCaseDTO,
  createSuccessCaseSchema,
} from "./success-case.create.dto";

/**
 * =========================================================
 * updateSuccessCaseSchema
 * ---------------------------------------------------------
 * Schema de validación para actualizar un Success Case.
 *
 * Se basa en `createSuccessCaseSchema`, pero convierte todas
 * las propiedades de primer nivel en opcionales usando
 * `.partial()`.
 *
 * Esto permite enviar únicamente los campos que se desean
 * modificar durante una operación de actualización.
 *
 * Nota:
 * `.partial()` solo aplica al primer nivel del objeto.
 * Las estructuras internas mantienen su forma original.
 * =========================================================
 */
export const updateSuccessCaseSchema =
  createSuccessCaseSchema.partial();

/**
 * =========================================================
 * UpdateSuccessCaseDTO
 * ---------------------------------------------------------
 * Data Transfer Object utilizado para actualizar un
 * Success Case de forma parcial.
 *
 * Características:
 * - Todas las propiedades de `CreateSuccessCaseDTO`
 *   se vuelven opcionales
 * - Las propiedades internas se convierten en parciales
 *   mediante `Partial<>`
 *
 * Esto permite actualizar únicamente partes específicas
 * del recurso sin necesidad de enviar la estructura completa.
 *
 * Ejemplo:
 * {
 *   content: {
 *     es: { title: "Nuevo título" }
 *   },
 *   status: "PUBLISHED"
 * }
 * =========================================================
 */
export type UpdateSuccessCaseDTO = {
  [K in keyof CreateSuccessCaseDTO]?: Partial<CreateSuccessCaseDTO[K]>;
};

/**
 * =========================================================
 * Alternativa recomendada
 * ---------------------------------------------------------
 * Una opción más limpia y alineada con el schema sería
 * inferir el tipo directamente desde Zod.
 *
 * Esto evita duplicación entre schema y DTO.
 *
 * Ejemplo:
 *
 * export type UpdateSuccessCaseDTO =
 *   z.infer<typeof updateSuccessCaseSchema>;
 * =========================================================
 */