import { CreateProjectDTO } from "./project.create.dto";

/**
 * DTO para la actualización de un proyecto (Project V2).
 *
 * Permite actualizar parcialmente un proyecto existente.
 * Todos los campos definidos en CreateProjectDTO pasan a ser opcionales,
 * ya que en una operación de actualización no es obligatorio enviar
 * la estructura completa del proyecto.
 */
export type UpdateProjectDTO = Partial<CreateProjectDTO>;
