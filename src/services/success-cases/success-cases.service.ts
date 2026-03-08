import connectDB from "@/lib/db/connectDB";
import * as repo from "./success-cases.repository";
import { validateObjectId } from "@/lib/validators/validateObjectId";
import { CreateSuccessCaseDTO } from "@/infrastructure/success-case/success-case.create.dto";
import { UpdateSuccessCaseDTO } from "@/infrastructure/success-case/success-case.update.dto";

/**
 * =========================================================
 * Success Case Service
 * ---------------------------------------------------------
 * Capa de servicio responsable de coordinar la lógica de
 * aplicación relacionada con los casos de éxito.
 *
 * Arquitectura:
 * Controller → Service → Repository → Database
 *
 * Responsabilidades:
 * - establecer conexión con la base de datos
 * - validar identificadores (ObjectId)
 * - delegar operaciones CRUD al repositorio
 *
 * Esta capa no interactúa directamente con MongoDB,
 * sino a través de la capa de repositorio.
 * =========================================================
 */


/**
 * =========================================================
 * getSuccessCases
 * ---------------------------------------------------------
 * Obtiene una lista paginada de casos de éxito aplicando
 * filtros dinámicos.
 *
 * Usado en:
 * - listados de casos de éxito
 * - dashboards
 * - filtros del portafolio
 *
 * @param filter Filtros dinámicos de búsqueda
 * @param safePage Número de página (>=1)
 * @param safeLimit Cantidad de registros por página
 *
 * @returns Lista de casos de éxito
 * =========================================================
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
 * =========================================================
 * getTotalSuccessCases
 * ---------------------------------------------------------
 * Devuelve la cantidad total de casos de éxito que cumplen
 * con los filtros especificados.
 *
 * Se utiliza principalmente para construir metadata
 * de paginación en listados.
 *
 * @param filter Filtros aplicados
 * @returns Total de documentos encontrados
 * =========================================================
 */
export async function getTotalSuccessCases(
  filter: Record<string, unknown>
) {
  await connectDB();
  return repo.countSuccessCases(filter);
}


/**
 * =========================================================
 * getSuccessCaseById
 * ---------------------------------------------------------
 * Obtiene un caso de éxito específico mediante su ObjectId.
 *
 * Proceso:
 * 1. Conectar a la base de datos
 * 2. Validar que el ID sea un ObjectId válido
 * 3. Consultar el repositorio
 *
 * @param id Identificador del caso de éxito
 * @returns Caso encontrado o null
 * =========================================================
 */
export async function getSuccessCaseById(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.findSuccessCaseById(id);
}


/**
 * =========================================================
 * getSuccessCaseBySlug
 * ---------------------------------------------------------
 * Obtiene un caso de éxito mediante su slug público.
 *
 * Este método se usa principalmente en rutas dinámicas:
 * `/case-studies/[slug]`
 *
 * @param slug Slug único del caso de éxito
 * @returns Caso encontrado o null
 * =========================================================
 */
export async function getSuccessCaseBySlug(slug: string) {
  await connectDB();
  return repo.findSuccessCaseBySlug(slug);
}


/**
 * =========================================================
 * createSuccessCase
 * ---------------------------------------------------------
 * Crea un nuevo caso de éxito en la base de datos.
 *
 * Los datos deben estar previamente validados mediante
 * schemas o DTOs en la capa de aplicación.
 *
 * @param data Datos validados para la creación
 * @returns Documento creado
 * =========================================================
 */
export async function createSuccessCase(data: CreateSuccessCaseDTO) {
  await connectDB();
  return repo.createSuccessCaseRepo(data);
}


/**
 * =========================================================
 * updateSuccessCase
 * ---------------------------------------------------------
 * Actualiza un caso de éxito existente mediante su ID.
 *
 * Proceso:
 * 1. Conectar a la base de datos
 * 2. Validar el ObjectId
 * 3. Delegar la actualización al repositorio
 *
 * @param id Identificador del caso
 * @param data Datos parciales de actualización
 *
 * @returns Documento actualizado o null si no existe
 * =========================================================
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
 * =========================================================
 * deleteSuccessCase
 * ---------------------------------------------------------
 * Elimina un caso de éxito existente mediante su ID.
 *
 * Proceso:
 * 1. Conectar a la base de datos
 * 2. Validar el ObjectId
 * 3. Ejecutar eliminación en el repositorio
 *
 * @param id Identificador del caso
 * @returns Documento eliminado o null si no existe
 * =========================================================
 */
export async function deleteSuccessCase(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.deleteSuccessCaseRepo(id);
}