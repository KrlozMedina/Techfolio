import connectDB from "@/lib/db/connectDB";
import * as repo from "./technologies.repository";
import { validateObjectId } from "@/lib/validators/validateObjectId";
import { CreateTechnologyDTO } from "@/infrastructure/technology/technology.create.dto";
import { UpdateTechnologyDTO } from "@/infrastructure/technology/technology.update.dto";

/**
 * =========================================================
 * Technology Service
 * ---------------------------------------------------------
 * Capa de servicio responsable de coordinar la lógica de
 * aplicación relacionada con tecnologías.
 *
 * Arquitectura:
 * Controller → Service → Repository → Database
 *
 * Responsabilidades:
 * - establecer conexión con la base de datos
 * - validar identificadores (ObjectId)
 * - delegar operaciones CRUD al repositorio
 *
 * Esta capa no accede directamente a MongoDB,
 * sino a través de la capa de repositorio.
 * =========================================================
 */


/**
 * =========================================================
 * createTechnology
 * ---------------------------------------------------------
 * Crea una nueva tecnología en la base de datos.
 *
 * Los datos deben estar previamente validados mediante
 * DTOs o schemas de validación.
 *
 * @param data Datos validados para la creación
 * @returns Documento creado
 * =========================================================
 */
export async function createTechnology(data: CreateTechnologyDTO) {
  await connectDB();
  return repo.createTechnologyRepo(data);
}


/**
 * =========================================================
 * updateTechnology
 * ---------------------------------------------------------
 * Actualiza una tecnología existente mediante su ID.
 *
 * Proceso:
 * 1. Conectar a la base de datos
 * 2. Validar que el ID sea un ObjectId válido
 * 3. Delegar actualización al repositorio
 *
 * @param id Identificador de la tecnología
 * @param data Datos parciales de actualización
 *
 * @returns Documento actualizado o null si no existe
 * =========================================================
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
 * =========================================================
 * getTechnologyById
 * ---------------------------------------------------------
 * Obtiene una tecnología específica mediante su ObjectId.
 *
 * Incluye información relacionada con:
 * - la categoría asociada
 *
 * Proceso:
 * 1. Conectar a la base de datos
 * 2. Validar el ObjectId
 * 3. Consultar el repositorio
 *
 * @param id Identificador de la tecnología
 * @returns Documento encontrado o null
 * =========================================================
 */
export async function getTechnologyById(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.findTechnologyById(id);
}


/**
 * =========================================================
 * getTechnologies
 * ---------------------------------------------------------
 * Obtiene una lista paginada de tecnologías aplicando
 * filtros dinámicos.
 *
 * Usado en:
 * - listados de tecnologías
 * - filtros del portafolio
 * - paneles administrativos
 *
 * @param filter Filtros dinámicos de búsqueda
 * @param safePage Número de página (>=1)
 * @param safeLimit Cantidad de registros por página
 *
 * @returns Lista de tecnologías
 * =========================================================
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
 * =========================================================
 * getTotalTechnologies
 * ---------------------------------------------------------
 * Devuelve el número total de tecnologías que cumplen
 * con los filtros especificados.
 *
 * Este valor se utiliza principalmente para construir
 * metadata de paginación.
 *
 * @param filter Filtros opcionales
 * @returns Total de documentos encontrados
 * =========================================================
 */
export async function getTotalTechnologies(
  filter: Record<string, unknown> = {}
) {
  await connectDB();
  return repo.countTechnologies(filter);
}


/**
 * =========================================================
 * deleteTechnology
 * ---------------------------------------------------------
 * Elimina una tecnología existente mediante su ID.
 *
 * Proceso:
 * 1. Conectar a la base de datos
 * 2. Validar el ObjectId
 * 3. Ejecutar eliminación en el repositorio
 *
 * @param id Identificador de la tecnología
 * @returns Documento eliminado o null si no existe
 * =========================================================
 */
export async function deleteTechnology(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.deleteTechnologyRepo(id);
}