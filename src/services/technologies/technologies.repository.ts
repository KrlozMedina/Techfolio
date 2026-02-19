import { Technology } from "@/models/technology/technology.model";

/**
 * Crea una nueva tecnología.
 *
 * @param {any} data - Datos de la tecnología
 * @returns {Promise<any>} Documento creado
 */
export async function createTechnologyRepo(data: any) {
  return Technology.create(data);
}

/**
 * Actualiza una tecnología por ID.
 * Ejecuta validaciones del schema.
 *
 * @param {string} id - ID de la tecnología
 * @param {any} data - Datos de actualización
 * @returns {Promise<any | null>} Documento actualizado o null
 */
export async function updateTechnologyRepo(id: string, data: any) {
  return Technology.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
}

/**
 * Busca una tecnología por ID.
 * Incluye la categoría asociada (solo slug).
 *
 * @param {string} id - ID de la tecnología
 * @returns {Promise<any | null>} Documento encontrado o null
 */
export async function findTechnologyById(id: string) {
  return Technology
    .findById(id)
    .populate("categoryId", "slug");
}

/**
 * Obtiene tecnologías con filtro y paginación.
 *
 * @param {Record<string, unknown>} filter - Filtros dinámicos
 * @param {number} page - Número de página (>=1)
 * @param {number} limit - Cantidad de registros por página
 * @returns {Promise<any[]>} Lista de tecnologías
 */
export async function findTechnologies(
  filter: Record<string, unknown>,
  page: number,
  limit: number
) {
  return Technology
    .find(filter)
    .skip((page - 1) * limit)
    .limit(limit);
}

/**
 * Cuenta la cantidad total de tecnologías según filtro.
 *
 * @param {Record<string, unknown>} [filter={}] - Filtros opcionales
 * @returns {Promise<number>} Total de documentos encontrados
 */
export async function countTechnologies(
  filter: Record<string, unknown> = {}
) {
  return Technology.countDocuments(filter);
}

/**
 * Elimina una tecnología por ID.
 *
 * @param {string} id - ID de la tecnología
 * @returns {Promise<any | null>} Documento eliminado o null
 */
export async function deleteTechnologyRepo(id: string) {
  return Technology.findByIdAndDelete(id);
}
