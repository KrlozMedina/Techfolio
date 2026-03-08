/**
 * =========================================================
 * Project Update Validation Schema & DTO
 * ---------------------------------------------------------
 * Define la validación y estructura de datos utilizada
 * para actualizar un proyecto existente dentro del sistema.
 *
 * Este módulo reutiliza el esquema de creación de proyectos
 * (`createProjectSchema`) y lo transforma para permitir
 * actualizaciones parciales.
 *
 * Características:
 * - Permite modificar solo los campos necesarios
 * - Mantiene consistencia con la estructura del DTO de creación
 * - Reduce la necesidad de enviar el objeto completo
 *
 * Arquitectura:
 * - Validación basada en Zod
 * - DTO compartido entre controller, service y persistence
 * - Compatible con operaciones PUT/PATCH
 *
 * Responsabilidades:
 * - Validar payloads de actualización
 * - Permitir modificaciones parciales del proyecto
 * - Mantener tipado seguro entre capas del sistema
 *
 * Utilizado en:
 * - endpoints PUT /projects/:id
 * - endpoints PATCH /projects/:id
 * - formularios de edición de proyectos
 * =========================================================
 */

import { CreateProjectDTO, createProjectSchema } from "./project.create.dto";

/* ============================================================
  Update Schema
  ============================================================ */

/**
 * =========================================================
 * updateProjectSchema
 * ---------------------------------------------------------
 * Esquema de validación para la actualización de un proyecto.
 *
 * Se basa en el esquema de creación (`createProjectSchema`)
 * pero convierte todas las propiedades de primer nivel en
 * opcionales utilizando `.partial()`.
 *
 * Esto permite enviar únicamente los campos que se desean
 * modificar durante la actualización.
 *
 * Nota importante:
 * `.partial()` solo afecta el primer nivel del objeto.
 * Las estructuras internas siguen manteniendo su forma
 * original salvo que se apliquen `partial` adicionales.
 *
 * Ejemplo válido:
 * {
 *   content: {
 *     es: { title: "Nuevo título" }
 *   }
 * }
 * =========================================================
 */
export const updateProjectSchema =
  createProjectSchema.partial();

/* ============================================================
  Update DTO
  ============================================================ */

/**
 * =========================================================
 * UpdateProjectDTO
 * ---------------------------------------------------------
 * Data Transfer Object utilizado para actualizar un
 * proyecto existente.
 *
 * Características:
 * - Todas las propiedades de `CreateProjectDTO`
 *   se vuelven opcionales.
 * - Las propiedades internas también se convierten en
 *   parciales mediante `Partial<>`.
 *
 * Esto permite enviar únicamente los campos que se desean
 * modificar sin requerir la estructura completa del proyecto.
 *
 * Ejemplo:
 * {
 *   content: {
 *     es: { title: "Nuevo título del proyecto" }
 *   },
 *   importanceScore: 5
 * }
 *
 * Utilizado en:
 * - controladores de actualización
 * - servicios de aplicación
 * - repositorios de persistencia
 * =========================================================
 */
export type UpdateProjectDTO = {
  [K in keyof CreateProjectDTO]?: Partial<CreateProjectDTO[K]>;
};