/**
 * =========================================================
 * Category Service
 * ---------------------------------------------------------
 * Este módulo implementa la capa de servicio para la
 * entidad Category.
 *
 * Su responsabilidad es coordinar la lógica de aplicación
 * antes de interactuar con la capa de repositorio.
 *
 * Flujo típico:
 * Controller → Service → Repository → Database
 *
 * Responsabilidades:
 * - establecer conexión con la base de datos
 * - validar datos críticos (ej. ObjectId)
 * - delegar operaciones CRUD al repositorio
 *
 * Arquitectura:
 * - parte de la capa de aplicación
 * - desacopla controladores de la lógica de persistencia
 *
 * Utilizado en:
 * - controladores de API
 * - endpoints CRUD de categorías
 * =========================================================
 */

import { CreateCategoryDTO } from "@/infrastructure/category/category.create.dto";
import connectDB from "@/lib/db/connectDB";
import * as repo from "./categories.repository";
import { validateObjectId } from "@/lib/validators/validateObjectId";
import { UpdateCategoryDTO } from "@/infrastructure/category/category.update.dto";

/**
 * =========================================================
 * createCategory
 * ---------------------------------------------------------
 * Crea una nueva categoría.
 *
 * Proceso:
 * 1. Establece conexión con la base de datos.
 * 2. Delegar la creación al repositorio.
 *
 * @param data Datos validados de la categoría
 * @returns Categoría creada
 * =========================================================
 */
export async function createCategory(data: CreateCategoryDTO) {
  await connectDB();
  return repo.createCategoryRepo(data);
}

/**
 * =========================================================
 * updateCategory
 * ---------------------------------------------------------
 * Actualiza una categoría existente por su ID.
 *
 * Proceso:
 * 1. Conectar a la base de datos.
 * 2. Validar el ObjectId recibido.
 * 3. Delegar la actualización al repositorio.
 *
 * @param id Identificador de la categoría
 * @param data Datos de actualización
 * @returns Categoría actualizada o null si no existe
 * =========================================================
 */
export async function updateCategory(id: string, data: UpdateCategoryDTO) {
  await connectDB();
  validateObjectId(id);
  return repo.updateCategoryRepo(id, data);
}

/**
 * =========================================================
 * getCategoryById
 * ---------------------------------------------------------
 * Obtiene una categoría específica utilizando su ID.
 *
 * Proceso:
 * 1. Conectar a la base de datos.
 * 2. Validar el ObjectId.
 * 3. Consultar en el repositorio.
 *
 * @param id Identificador de la categoría
 * @returns Categoría encontrada o null
 * =========================================================
 */
export async function getCategoryById(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.findCategoryById(id);
}

/**
 * =========================================================
 * getCategories
 * ---------------------------------------------------------
 * Obtiene un listado de categorías aplicando
 * filtros y paginación.
 *
 * Proceso:
 * 1. Conectar a la base de datos.
 * 2. Delegar la consulta al repositorio.
 *
 * @param filter Filtro de búsqueda
 * @param safePage Número de página (>=1)
 * @param safeLimit Cantidad máxima de registros por página
 * @returns Lista de categorías
 * =========================================================
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
 * =========================================================
 * getTotalCategories
 * ---------------------------------------------------------
 * Obtiene el número total de categorías que cumplen
 * un filtro determinado.
 *
 * Este valor se utiliza principalmente para calcular
 * metadatos de paginación.
 *
 * Proceso:
 * 1. Conectar a la base de datos.
 * 2. Delegar el conteo al repositorio.
 *
 * @param filter Filtro opcional
 * @returns Número total de categorías
 * =========================================================
 */
export async function getTotalCategories(filter: Record<string, unknown> = {}) {
  await connectDB();
  return repo.countCategories(filter);
}

/**
 * =========================================================
 * deleteCategory
 * ---------------------------------------------------------
 * Elimina una categoría existente mediante su ID.
 *
 * Proceso:
 * 1. Conectar a la base de datos.
 * 2. Validar el ObjectId.
 * 3. Delegar la eliminación al repositorio.
 *
 * @param id Identificador de la categoría
 * @returns Categoría eliminada o null si no existe
 * =========================================================
 */
export async function deleteCategory(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.deleteCategoryRepo(id);
}