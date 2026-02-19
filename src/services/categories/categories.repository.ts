import { CreateCategoryDTO } from "@/dto/category/category.create.dto";
import { UpdateCategoryDTO } from "@/dto/category/category.update.dto";
import { Category } from "@/models/category/category.model";

/**
 * Crea una nueva categoría en la base de datos.
 * @param {CreateCategoryDTO} data - Datos de la categoría a crear.
 * @returns {Promise<Category>} La categoría creada.
 */
export async function createCategoryRepo(data: CreateCategoryDTO) {
  return Category.create(data);
}

/**
 * Actualiza una categoría existente por su ID.
 * @param {string} id - ID de la categoría a actualizar.
 * @param {UpdateCategoryDTO} data - Datos para actualizar la categoría.
 * @returns {Promise<Category | null>} La categoría actualizada o null si no existe.
 */
export async function updateCategoryRepo(id: string, data: UpdateCategoryDTO) {
  return Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

/**
 * Busca una categoría por su ID.
 * @param {string} id - ID de la categoría.
 * @returns {Promise<Category | null>} La categoría encontrada o null si no existe.
 */
export async function findCategoryById(id: string) {
  return Category.findById(id);
}

/**
 * Obtiene un listado de categorías según un filtro y paginación.
 * @param {Record<string, unknown>} filter - Filtro de búsqueda.
 * @param {number} page - Página actual (para paginación).
 * @param {number} limit - Número máximo de registros por página.
 * @returns {Promise<Category[]>} Lista de categorías filtradas.
 */
export async function findCategories(filter: Record<string, unknown>, page: number, limit: number) {
  return Category.find(filter).skip((page - 1) * limit).limit(limit);
}

/**
 * Cuenta el número de categorías que cumplen un filtro.
 * @param {Record<string, unknown>} [filter={}] - Filtro opcional para contar categorías.
 * @returns {Promise<number>} Cantidad de categorías que cumplen el filtro.
 */
export async function countCategories(filter: Record<string, unknown> = {}) {
  return Category.countDocuments(filter);
}

/**
 * Elimina una categoría por su ID.
 * @param {string} id - ID de la categoría a eliminar.
 * @returns {Promise<Category | null>} La categoría eliminada o null si no existe.
 */
export async function deleteCategoryRepo(id: string) {
  return Category.findByIdAndDelete(id);
}
