/**
 * =========================================================
 * Feature Service
 * ---------------------------------------------------------
 * Implementa la capa de servicio para la entidad Feature.
 *
 * Este módulo coordina la lógica de aplicación antes de
 * interactuar con la capa de repositorio.
 *
 * Flujo arquitectónico:
 * Controller → Service → Repository → Database
 *
 * Responsabilidades:
 * - establecer conexión con la base de datos
 * - validar identificadores (ObjectId)
 * - delegar operaciones CRUD al repositorio
 *
 * Arquitectura:
 * - parte de la capa de aplicación
 * - desacopla controladores de la lógica de persistencia
 *
 * Utilizado en:
 * - controladores de API
 * - endpoints CRUD de features
 * =========================================================
 */

import connectDB from "@/lib/db/connectDB";
import * as repo from "./features.repository";
import { validateObjectId } from "@/lib/validators/validateObjectId";
import { CreateFeatureDTO } from "@/infrastructure/feature/feature.create.dto";
import { UpdateFeatureDTO } from "@/infrastructure/feature/feature.update.dto";

/**
 * =========================================================
 * createFeature
 * ---------------------------------------------------------
 * Crea una nueva feature en la base de datos.
 *
 * Proceso:
 * 1. Establece conexión con la base de datos.
 * 2. Delegar la creación al repositorio.
 *
 * @param data Datos validados para la creación
 * @returns Feature creada
 * =========================================================
 */
export async function createFeature(data: CreateFeatureDTO) {
  await connectDB();
  return repo.createFeatureRepo(data);
}

/**
 * =========================================================
 * updateFeature
 * ---------------------------------------------------------
 * Actualiza una feature existente utilizando su ID.
 *
 * Proceso:
 * 1. Conectar a la base de datos.
 * 2. Validar que el ID sea un ObjectId válido.
 * 3. Delegar la actualización al repositorio.
 *
 * @param id Identificador de la feature
 * @param data Datos parciales de actualización
 * @returns Feature actualizada o null si no existe
 * =========================================================
 */
export async function updateFeature(id: string, data: UpdateFeatureDTO) {
  await connectDB();
  validateObjectId(id);
  return repo.updateFeatureRepo(id, data);
}

/**
 * =========================================================
 * getFeatureById
 * ---------------------------------------------------------
 * Obtiene una feature específica mediante su ID.
 *
 * Proceso:
 * 1. Conectar a la base de datos.
 * 2. Validar formato del ObjectId.
 * 3. Consultar en el repositorio.
 *
 * @param id Identificador de la feature
 * @returns Feature encontrada o null si no existe
 * =========================================================
 */
export async function getFeatureById(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.findFeatureById(id);
}

/**
 * =========================================================
 * getFeatures
 * ---------------------------------------------------------
 * Obtiene un listado paginado de features aplicando
 * filtros dinámicos.
 *
 * Proceso:
 * 1. Conectar a la base de datos.
 * 2. Delegar la consulta al repositorio.
 *
 * @param filter Filtros dinámicos de búsqueda
 * @param safePage Número de página (>=1)
 * @param safeLimit Cantidad de registros por página
 * @returns Lista de features filtradas
 * =========================================================
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
 * =========================================================
 * getTotalFeatures
 * ---------------------------------------------------------
 * Devuelve el número total de features que cumplen
 * un filtro determinado.
 *
 * Este método se utiliza principalmente para calcular
 * metadatos de paginación.
 *
 * Proceso:
 * 1. Conectar a la base de datos.
 * 2. Delegar el conteo al repositorio.
 *
 * @param filter Filtros opcionales
 * @returns Total de documentos encontrados
 * =========================================================
 */
export async function getTotalFeatures(
  filter: Record<string, unknown> = {}
) {
  await connectDB();
  return repo.countFeatures(filter);
}

/**
 * =========================================================
 * deleteFeature
 * ---------------------------------------------------------
 * Elimina una feature existente mediante su ID.
 *
 * Proceso:
 * 1. Conectar a la base de datos.
 * 2. Validar el ObjectId.
 * 3. Delegar la eliminación al repositorio.
 *
 * @param id Identificador de la feature
 * @returns Feature eliminada o null si no existe
 * =========================================================
 */
export async function deleteFeature(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.deleteFeatureRepo(id);
}