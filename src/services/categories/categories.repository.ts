/**
 * =========================================================
 * Category Repository
 * ---------------------------------------------------------
 * Este módulo implementa las operaciones de acceso a datos
 * (Repository Pattern) para la entidad Category utilizando
 * Mongoose.
 *
 * Proporciona funciones CRUD para interactuar con la
 * colección de categorías en la base de datos.
 *
 * Arquitectura:
 * - Forma parte de la capa de infraestructura
 * - Encapsula las operaciones de persistencia
 * - Desacopla la lógica de base de datos de la capa de aplicación
 *
 * Responsabilidades:
 * - Crear categorías
 * - Actualizar categorías existentes
 * - Consultar categorías por ID o filtros
 * - Contar registros para paginación
 * - Eliminar categorías
 *
 * Utilizado en:
 * - servicios de aplicación
 * - controladores de API
 * - lógica de administración de categorías
 * =========================================================
 */

import { CreateCategoryDTO } from "@/infrastructure/category/category.create.dto";
import { UpdateCategoryDTO } from "@/infrastructure/category/category.update.dto";
import { Category } from "@/models/category/category.model";

/**
 * =========================================================
 * createCategoryRepo
 * ---------------------------------------------------------
 * Crea una nueva categoría en la base de datos.
 *
 * @param data Datos de la categoría a crear
 * @returns Promesa que resuelve con la categoría creada
 * =========================================================
 */
export async function createCategoryRepo(data: CreateCategoryDTO) {
  return Category.create(data);
}

/**
 * =========================================================
 * updateCategoryRepo
 * ---------------------------------------------------------
 * Actualiza una categoría existente utilizando su ID.
 *
 * Opciones utilizadas:
 * - new: true → retorna el documento actualizado
 * - runValidators: true → ejecuta validaciones del schema
 *
 * @param id Identificador de la categoría
 * @param data Datos a actualizar
 * @returns Categoría actualizada o null si no existe
 * =========================================================
 */
export async function updateCategoryRepo(id: string, data: UpdateCategoryDTO) {
  return Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

/**
 * =========================================================
 * findCategoryById
 * ---------------------------------------------------------
 * Busca una categoría en la base de datos mediante su ID.
 *
 * @param id Identificador de la categoría
 * @returns Categoría encontrada o null si no existe
 * =========================================================
 */
export async function findCategoryById(id: string) {
  return Category.findById(id);
}

/**
 * =========================================================
 * findCategories
 * ---------------------------------------------------------
 * Obtiene un listado de categorías aplicando filtros
 * y paginación.
 *
 * Utiliza:
 * - skip → para saltar registros según página
 * - limit → para limitar resultados por página
 *
 * @param filter Filtro de búsqueda
 * @param page Número de página actual
 * @param limit Cantidad máxima de resultados
 * @returns Lista de categorías filtradas
 * =========================================================
 */
export async function findCategories(
  filter: Record<string, unknown>,
  page: number,
  limit: number
) {
  return Category.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);
}

/**
 * =========================================================
 * countCategories
 * ---------------------------------------------------------
 * Cuenta el número total de categorías que cumplen
 * un filtro determinado.
 *
 * Este método se utiliza normalmente para calcular
 * información de paginación.
 *
 * @param filter Filtro opcional de búsqueda
 * @returns Número total de categorías
 * =========================================================
 */
export async function countCategories(filter: Record<string, unknown> = {}) {
  return Category.countDocuments(filter);
}

/**
 * =========================================================
 * deleteCategoryRepo
 * ---------------------------------------------------------
 * Elimina una categoría de la base de datos utilizando su ID.
 *
 * @param id Identificador de la categoría a eliminar
 * @returns Categoría eliminada o null si no existe
 * =========================================================
 */
export async function deleteCategoryRepo(id: string) {
  return Category.findByIdAndDelete(id);
}