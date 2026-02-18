import {
  CreateSuccessCaseDTO,
  createSuccessCaseSchema,
} from "./success-case.create.dto";

/**
 * Schema de validación para actualizar un Success Case.
 *
 * Se basa en el schema de creación, pero convierte todas
 * las propiedades en opcionales mediante `.partial()`,
 * permitiendo actualizaciones parciales (PATCH / PUT).
 */
export const updateSuccessCaseSchema =
  createSuccessCaseSchema.partial();

/**
 * DTO para actualización de un Success Case.
 *
 * Todas las propiedades pasan a ser opcionales.
 *
 * Nota técnica:
 * `Partial<CreateSuccessCaseDTO[K]>` no aporta valor real
 * cuando la propiedad es primitiva. En la mayoría de los casos,
 * sería suficiente con `Partial<CreateSuccessCaseDTO>`.
 */
export type UpdateSuccessCaseDTO = {
  [K in keyof CreateSuccessCaseDTO]?: Partial<CreateSuccessCaseDTO[K]>;
};

/**
 * Alternativa más limpia y alineada con el schema:
 *
 * export type UpdateSuccessCaseDTO =
 *   z.infer<typeof updateSuccessCaseSchema>;
 */
