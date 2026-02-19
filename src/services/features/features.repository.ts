import { CreateFeatureDTO } from "@/dto/feature/feature.create.dto";
import { UpdateFeatureDTO } from "@/dto/feature/feature.update.dto";
import { Feature } from "@/models/features/feature.model";

/**
 * Crea una nueva característica (feature) en la base de datos.
 * @param {CreateFeatureDTO} data - Datos de la feature a crear
 * @returns {Promise<Feature>} La feature creada
 */
export async function createFeatureRepo(data: CreateFeatureDTO) {
  return Feature.create(data);
}

/**
 * Actualiza una feature existente por su ID.
 * @param {string} id - ID de la feature a actualizar
 * @param {UpdateFeatureDTO} data - Datos para actualizar la feature
 * @returns {Promise<Feature | null>} La feature actualizada o null si no existe
 */
export async function updateFeatureRepo(id: string, data: UpdateFeatureDTO) {
  return Feature.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

/**
 * Busca una feature por su ID.
 * @param {string} id - ID de la feature
 * @returns {Promise<Feature | null>} La feature encontrada o null si no existe
 */
export async function findFeatureById(id: string) {
  return Feature.findById(id);
}

/**
 * Obtiene un listado de features según filtro y paginación.
 * @param {Record<string, unknown>} filter - Filtro de búsqueda
 * @param {number} page - Número de página (>=1)
 * @param {number} limit - Número máximo de registros por página
 * @returns {Promise<Feature[]>} Lista de features filtradas
 */
export async function findFeatures(filter: Record<string, unknown>, page: number, limit: number) {
  return Feature.find(filter).skip((page - 1) * limit).limit(limit);
}

/**
 * Cuenta la cantidad de features que cumplen un filtro.
 * @param {Record<string, unknown>} [filter={}] - Filtro opcional
 * @returns {Promise<number>} Número de features que cumplen el filtro
 */
export async function countFeatures(filter: Record<string, unknown> = {}) {
  return Feature.countDocuments(filter);
}

/**
 * Elimina una feature por su ID.
 * @param {string} id - ID de la feature a eliminar
 * @returns {Promise<Feature | null>} La feature eliminada o null si no existe
 */
export async function deleteFeatureRepo(id: string) {
  return Feature.findByIdAndDelete(id);
}
