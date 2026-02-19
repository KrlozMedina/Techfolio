import connectDB from "@/lib/db/connectDB";
import * as repo from "./success-cases.repository";
import { validateObjectId } from "@/lib/validators/validateObjectId";
import { CreateSuccessCaseDTO } from "@/dto/success-case/success-case.create.dto";
import { UpdateSuccessCaseDTO } from "@/dto/success-case/success-case.update.dto";

/**
 * Obtiene casos de éxito paginados según filtro.
 *
 * @param {Record<string, unknown>} filter - Filtros dinámicos
 * @param {number} safePage - Número de página (>=1)
 * @param {number} safeLimit - Cantidad de registros por página
 * @returns {Promise<any[]>} Lista de casos de éxito
 */
export async function getSuccessCases(
  filter: Record<string, unknown>,
  safePage: number,
  safeLimit: number
) {
  await connectDB();
  return repo.findSuccessCases(filter, safePage, safeLimit);
}

/**
 * Devuelve el total de casos de éxito según filtro.
 * Útil para metadata de paginación.
 *
 * @param {Record<string, unknown>} filter - Filtros aplicados
 * @returns {Promise<number>} Total de documentos encontrados
 */
export async function getTotalSuccessCases(
  filter: Record<string, unknown>
) {
  await connectDB();
  return repo.countSuccessCases(filter);
}

/**
 * Obtiene un caso de éxito por su ID.
 * - Valida que el ID sea un ObjectId válido.
 *
 * @param {string} id - ID del caso
 * @returns {Promise<any | null>} Caso encontrado o null
 */
export async function getSuccessCaseById(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.findSuccessCaseById(id);
}

/**
 * Obtiene un caso de éxito por su slug único.
 *
 * @param {string} slug - Slug del caso
 * @returns {Promise<any | null>} Caso encontrado o null
 */
export async function getSuccessCaseBySlug(slug: string) {
  await connectDB();
  return repo.findSuccessCaseBySlug(slug);
}

/**
 * Crea un nuevo caso de éxito.
 *
 * @param {CreateSuccessCaseDTO} data - Datos validados para la creación
 * @returns {Promise<any>} Documento creado
 */
export async function createSuccessCase(data: CreateSuccessCaseDTO) {
  await connectDB();
  return repo.createSuccessCaseRepo(data);
}

/**
 * Actualiza un caso de éxito existente.
 * - Valida formato del ObjectId.
 *
 * @param {string} id - ID del caso
 * @param {UpdateSuccessCaseDTO} data - Datos de actualización
 * @returns {Promise<any | null>} Documento actualizado o null
 */
export async function updateSuccessCase(
  id: string,
  data: UpdateSuccessCaseDTO
) {
  await connectDB();
  validateObjectId(id);
  return repo.updateSuccessCaseRepo(id, data);
}

/**
 * Elimina un caso de éxito por su ID.
 * - Valida formato del ObjectId.
 *
 * @param {string} id - ID del caso
 * @returns {Promise<any | null>} Documento eliminado o null
 */
export async function deleteSuccessCase(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.deleteSuccessCaseRepo(id);
}
