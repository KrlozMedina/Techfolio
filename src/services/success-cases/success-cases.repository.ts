import { SuccessCase } from "@/models/success-case/success-case.model";

/**
 * Obtiene casos de éxito con filtro y paginación.
 * Incluye referencia a proyectos (solo slug).
 *
 * @param {Record<string, unknown>} filter - Filtros dinámicos
 * @param {number} page - Número de página (>=1)
 * @param {number} limit - Cantidad de registros por página
 * @returns {Promise<any[]>} Lista de casos de éxito
 */
export async function findSuccessCases(
  filter: Record<string, unknown>,
  page: number,
  limit: number
) {
  return SuccessCase
    .find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("projectIds", "slug");
}

/**
 * Cuenta la cantidad total de casos de éxito según filtro.
 *
 * @param {Record<string, unknown>} filter - Filtros aplicados
 * @returns {Promise<number>} Total de documentos encontrados
 */
export async function countSuccessCases(
  filter: Record<string, unknown>
) {
  return SuccessCase.countDocuments(filter);
}

/**
 * Busca un caso de éxito por ID.
 * Incluye los slugs de proyectos relacionados.
 *
 * @param {string} id - ID del caso de éxito
 * @returns {Promise<any | null>} Caso encontrado o null
 */
export async function findSuccessCaseById(id: string) {
  return SuccessCase
    .findById(id)
    .populate("projectIds", "slug");
}

/**
 * Busca un caso de éxito por su slug único.
 * Incluye los slugs de proyectos relacionados.
 *
 * @param {string} slug - Slug del caso de éxito
 * @returns {Promise<any | null>} Caso encontrado o null
 */
export async function findSuccessCaseBySlug(slug: string) {
  return SuccessCase
    .findOne({ slug })
    .populate("projectIds", "slug");
}

/**
 * Crea un nuevo caso de éxito.
 *
 * @param {any} data - Datos del caso de éxito
 * @returns {Promise<any>} Documento creado
 */
export async function createSuccessCaseRepo(data: any) {
  return SuccessCase.create(data);
}

/**
 * Actualiza un caso de éxito por ID.
 * Ejecuta validaciones del schema.
 *
 * @param {string} id - ID del caso
 * @param {any} data - Datos de actualización
 * @returns {Promise<any | null>} Documento actualizado o null
 */
export async function updateSuccessCaseRepo(id: string, data: any) {
  return SuccessCase.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

/**
 * Elimina un caso de éxito por ID.
 *
 * @param {string} id - ID del caso
 * @returns {Promise<any | null>} Documento eliminado o null
 */
export async function deleteSuccessCaseRepo(id: string) {
  return SuccessCase.findByIdAndDelete(id);
}
