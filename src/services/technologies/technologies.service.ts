import connectDB from "@/lib/db/connectDB";
import * as repo from "./technologies.repository";
import { validateObjectId } from "@/lib/validators/validateObjectId";
import { CreateTechnologyDTO } from "@/dto/technology/technology.create.dto";
import { UpdateTechnologyDTO } from "@/dto/technology/technology.update.dto";

/**
 * Crea una nueva tecnología.
 *
 * @param {CreateTechnologyDTO} data - Datos validados para creación
 * @returns {Promise<any>} Documento creado
 */
export async function createTechnology(data: CreateTechnologyDTO) {
  await connectDB();
  return repo.createTechnologyRepo(data);
}

/**
 * Actualiza una tecnología existente.
 * - Valida que el ID sea un ObjectId válido.
 *
 * @param {string} id - ID de la tecnología
 * @param {UpdateTechnologyDTO} data - Datos de actualización
 * @returns {Promise<any | null>} Documento actualizado o null
 */
export async function updateTechnology(
  id: string,
  data: UpdateTechnologyDTO
) {
  await connectDB();
  validateObjectId(id);
  return repo.updateTechnologyRepo(id, data);
}

/**
 * Obtiene una tecnología por su ID.
 * - Valida formato del ObjectId.
 * - Incluye categoría asociada (slug).
 *
 * @param {string} id - ID de la tecnología
 * @returns {Promise<any | null>} Documento encontrado o null
 */
export async function getTechnologyById(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.findTechnologyById(id);
}

/**
 * Obtiene tecnologías paginadas según filtro.
 *
 * @param {Record<string, unknown>} filter - Filtros dinámicos
 * @param {number} safePage - Número de página (>=1)
 * @param {number} safeLimit - Cantidad de registros por página
 * @returns {Promise<any[]>} Lista de tecnologías
 */
export async function getTechnologies(
  filter: Record<string, unknown>,
  safePage: number,
  safeLimit: number
) {
  await connectDB();
  return repo.findTechnologies(filter, safePage, safeLimit);
}

/**
 * Devuelve el total de tecnologías según filtro.
 *
 * @param {Record<string, unknown>} [filter={}] - Filtros opcionales
 * @returns {Promise<number>} Total de documentos encontrados
 */
export async function getTotalTechnologies(
  filter: Record<string, unknown> = {}
) {
  await connectDB();
  return repo.countTechnologies(filter);
}

/**
 * Elimina una tecnología por su ID.
 * - Valida formato del ObjectId.
 *
 * @param {string} id - ID de la tecnología
 * @returns {Promise<any | null>} Documento eliminado o null
 */
export async function deleteTechnology(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.deleteTechnologyRepo(id);
}
