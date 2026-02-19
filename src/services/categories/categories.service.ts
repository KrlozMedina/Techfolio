import { CreateCategoryDTO } from "@/dto/category/category.create.dto";
import connectDB from "@/lib/db/connectDB";
import * as repo from "./categories.repository";
import { validateObjectId } from "@/lib/validators/validateObjectId";
import { UpdateCategoryDTO } from "@/dto/category/category.update.dto";

/**
 * Crea una nueva categoría.
 * Conecta a la DB y delega la creación al repositorio.
 *
 * @param {CreateCategoryDTO} data - Datos validados para la categoría
 * @returns {Promise<any>} Categoría creada
 */
export async function createCategory(data: CreateCategoryDTO) {
  await connectDB();
  return repo.createCategoryRepo(data);
}

/**
 * Actualiza una categoría existente por ID.
 * Valida que el ID sea correcto antes de actualizar.
 *
 * @param {string} id - ID de la categoría a actualizar
 * @param {UpdateCategoryDTO} data - Datos para actualizar
 * @returns {Promise<any>} Categoría actualizada o null si no existe
 */
export async function updateCategory(id: string, data: UpdateCategoryDTO) {
  await connectDB();
  validateObjectId(id);
  return repo.updateCategoryRepo(id, data);
}

/**
 * Obtiene una categoría por su ID.
 * Valida que el ID sea correcto antes de consultar.
 *
 * @param {string} id - ID de la categoría
 * @returns {Promise<any>} Categoría encontrada o null si no existe
 */
export async function getCategoryById(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.findCategoryById(id);
}

/**
 * Obtiene un listado de categorías según filtro y paginación.
 *
 * @param {Record<string, unknown>} filter - Filtro de búsqueda
 * @param {number} safePage - Número de página (>=1)
 * @param {number} safeLimit - Cantidad máxima de registros por página
 * @returns {Promise<any[]>} Lista de categorías
 */
export async function getCategories(
  filter: Record<string, unknown>,
  safePage: number,
  safeLimit: number
) {
  await connectDB();
  return repo.findCategories(filter, safePage, safeLimit);
}

/**
 * Obtiene el total de categorías según un filtro.
 * Útil para paginación.
 *
 * @param {Record<string, unknown>} [filter={}] - Filtro opcional
 * @returns {Promise<number>} Total de categorías que cumplen el filtro
 */
export async function getTotalCategories(filter: Record<string, unknown> = {}) {
  await connectDB();
  return repo.countCategories(filter);
}

/**
 * Elimina una categoría por su ID.
 * Valida que el ID sea correcto antes de eliminar.
 *
 * @param {string} id - ID de la categoría a eliminar
 * @returns {Promise<any>} Categoría eliminada o null si no existe
 */
export async function deleteCategory(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.deleteCategoryRepo(id);
}
