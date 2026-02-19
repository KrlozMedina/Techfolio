import { CreateProjectDTO, createProjectSchema } from "./project.create.dto";

/* ============================================================
   Update Schema
   ============================================================ */

/**
 * Esquema de validación para la actualización de un proyecto.
 *
 * Se basa en el esquema de creación, pero convierte todos
 * los campos en opcionales para permitir actualizaciones parciales.
 *
 * Nota:
 * `.partial()` solo aplica al primer nivel del objeto.
 */
export const updateProjectSchema =
  createProjectSchema.partial();

/* ============================================================
  Update DTO
   ============================================================ */

/**
 * DTO para la actualización de un proyecto.
 *
 * Permite modificar parcialmente un proyecto existente.
 *
 * - Todas las propiedades de primer nivel son opcionales.
 * - Las propiedades internas también se vuelven parciales.
 *
 * Esto permite enviar únicamente los campos que se desean actualizar
 * sin requerir la estructura completa del proyecto.
 */
export type UpdateProjectDTO = {
  [K in keyof CreateProjectDTO]?: Partial<CreateProjectDTO[K]>;
};
