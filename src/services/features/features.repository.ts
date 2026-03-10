/**
 * =========================================================
 * Feature Repository
 * ---------------------------------------------------------
 * Implementa el patrón Repository para la entidad Feature
 * utilizando Mongoose como capa de persistencia.
 *
 * Este módulo encapsula todas las operaciones de acceso
 * a datos relacionadas con Features, permitiendo que
 * las capas superiores (services, controllers) no tengan
 * dependencia directa del modelo de base de datos.
 *
 * Arquitectura:
 * - Forma parte de la capa de infraestructura
 * - Encapsula la lógica de persistencia
 * - Utiliza el modelo `Feature` de Mongoose
 *
 * Responsabilidades:
 * - Crear nuevas features
 * - Actualizar features existentes
 * - Consultar features por ID o filtros
 * - Contar registros para paginación
 * - Eliminar features
 *
 * Utilizado en:
 * - servicios de aplicación
 * - controladores de la API
 * - lógica de administración de features
 * =========================================================
 */

import { CreateFeatureDTO } from "@/infrastructure/feature/feature.create.dto";
import { UpdateFeatureDTO } from "@/infrastructure/feature/feature.update.dto";
import { Feature } from "@/models/feature/feature.model";

/**
 * =========================================================
 * createFeatureRepo
 * ---------------------------------------------------------
 * Crea una nueva característica (feature) en la base de datos.
 *
 * @param data Datos de la feature a crear
 * @returns Feature creada
 * =========================================================
 */
export async function createFeatureRepo(data: CreateFeatureDTO) {
  return Feature.create(data);
}

/**
 * =========================================================
 * updateFeatureRepo
 * ---------------------------------------------------------
 * Actualiza una feature existente utilizando su ID.
 *
 * Opciones utilizadas:
 * - new: true → retorna el documento actualizado
 * - runValidators: true → ejecuta validaciones del schema
 *
 * @param id Identificador de la feature
 * @param data Datos de actualización
 * @returns Feature actualizada o null si no existe
 * =========================================================
 */
export async function updateFeatureRepo(id: string, data: UpdateFeatureDTO) {
  return Feature.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
}

/**
 * =========================================================
 * findFeatureById
 * ---------------------------------------------------------
 * Busca una feature en la base de datos utilizando su ID.
 *
 * @param id Identificador de la feature
 * @returns Feature encontrada o null si no existe
 * =========================================================
 */
export async function findFeatureById(id: string) {
  return Feature.findById(id);
}

/**
 * =========================================================
 * findFeatures
 * ---------------------------------------------------------
 * Obtiene un listado de features aplicando filtros
 * y paginación.
 *
 * Utiliza:
 * - skip → para desplazamiento de páginas
 * - limit → para limitar la cantidad de resultados
 *
 * @param filter Filtro de búsqueda
 * @param page Número de página (>=1)
 * @param limit Cantidad máxima de resultados por página
 * @returns Lista de features filtradas
 * =========================================================
 */
export async function findFeatures(
  filter: Record<string, unknown>,
  page: number,
  limit: number
) {
  return Feature.find(filter)
    .skip((page - 1) * limit)
    .limit(limit);
}

/**
 * =========================================================
 * countFeatures
 * ---------------------------------------------------------
 * Cuenta la cantidad total de features que cumplen
 * un filtro determinado.
 *
 * Este método se utiliza principalmente para calcular
 * información de paginación.
 *
 * @param filter Filtro opcional de búsqueda
 * @returns Número total de features
 * =========================================================
 */
export async function countFeatures(filter: Record<string, unknown> = {}) {
  return Feature.countDocuments(filter);
}

/**
 * =========================================================
 * deleteFeatureRepo
 * ---------------------------------------------------------
 * Elimina una feature de la base de datos mediante su ID.
 *
 * @param id Identificador de la feature
 * @returns Feature eliminada o null si no existe
 * =========================================================
 */
export async function deleteFeatureRepo(id: string) {
  return Feature.findByIdAndDelete(id);
}