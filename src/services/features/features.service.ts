import connectDB from "@/lib/db/connectDB";
import * as repo from "./features.repository";
import { validateObjectId } from "@/lib/validators/validateObjectId";
import { CreateFeatureDTO } from "@/dto/feature/feature.create.dto";
import { UpdateFeatureDTO } from "@/dto/feature/feature.update.dto";

/**
 * Crea una nueva feature.
 * - Establece conexión con la base de datos.
 * - Delegación al repositorio.
 *
 * @param {CreateFeatureDTO} data - Datos validados para la creación
 * @returns {Promise<any>} Feature creada
 */
export async function createFeature(data: CreateFeatureDTO) {
  await connectDB();
  return repo.createFeatureRepo(data);
}

/**
 * Actualiza una feature existente por ID.
 * - Valida que el ID sea un ObjectId válido.
 * - Ejecuta validaciones del schema en el repositorio.
 *
 * @param {string} id - ID de la feature
 * @param {UpdateFeatureDTO} data - Datos parciales de actualización
 * @returns {Promise<any>} Feature actualizada o null si no existe
 */
export async function updateFeature(id: string, data: UpdateFeatureDTO) {
  await connectDB();
  validateObjectId(id);
  return repo.updateFeatureRepo(id, data);
}

/**
 * Obtiene una feature por su ID.
 * - Valida formato del ObjectId antes de consultar.
 *
 * @param {string} id - ID de la feature
 * @returns {Promise<any>} Feature encontrada o null si no existe
 */
export async function getFeatureById(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.findFeatureById(id);
}

/**
 * Obtiene un listado paginado de features.
 *
 * @param {Record<string, unknown>} filter - Filtros dinámicos de búsqueda
 * @param {number} safePage - Número de página (>=1)
 * @param {number} safeLimit - Cantidad de registros por página
 * @returns {Promise<any[]>} Lista de features filtradas
 */
export async function getFeatures(
  filter: Record<string, unknown>,
  safePage: number,
  safeLimit: number
) {
  await connectDB();
  return repo.findFeatures(filter, safePage, safeLimit);
}

/**
 * Devuelve el total de features según filtro.
 * Útil para metadata de paginación.
 *
 * @param {Record<string, unknown>} [filter={}] - Filtros opcionales
 * @returns {Promise<number>} Total de documentos encontrados
 */
export async function getTotalFeatures(
  filter: Record<string, unknown> = {}
) {
  await connectDB();
  return repo.countFeatures(filter);
}

/**
 * Elimina una feature por su ID.
 * - Valida que el ID sea correcto antes de eliminar.
 *
 * @param {string} id - ID de la feature
 * @returns {Promise<any>} Feature eliminada o null si no existe
 */
export async function deleteFeature(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.deleteFeatureRepo(id);
}
