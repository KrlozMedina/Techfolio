import { CreateTechnologyDTO } from "./technology.create.dto";

/**
 * DTO para actualización de tecnología.
 *
 * - Permite modificaciones parciales de los campos.
 * - Cada propiedad del DTO de creación es opcional.
 * - Ideal para operaciones PATCH donde no se requiere
 *   enviar todos los campos.
 */
export type UpdateTechnologyDTO = {
  [K in keyof CreateTechnologyDTO]?: Partial<CreateTechnologyDTO[K]>;
};
