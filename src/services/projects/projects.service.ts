import * as repo from "./projects.repository";
import { validateObjectId } from "@/lib/validators/validateObjectId";
import { SlugAlreadyExistsError } from "@/errors/domain/slug-already-exists.error";
import connectDB from "@/lib/db/connectDB";
import { CreateProjectDTO } from "@/infrastructure/project/project.create.dto";
import { UpdateProjectDTO } from "@/infrastructure/project/project.update.dto";

/**
 * =========================================================
 * Project Service
 * ---------------------------------------------------------
 * Capa de servicio responsable de coordinar la lógica de
 * aplicación relacionada con proyectos.
 *
 * Arquitectura:
 * Controller → Service → Repository → Database
 *
 * Responsabilidades:
 * - Establecer conexión con la base de datos
 * - Validar identificadores (ObjectId)
 * - Manejar errores de dominio (ej. slug duplicado)
 * - Delegar operaciones CRUD al repositorio
 *
 * =========================================================
 */


/**
 * =========================================================
 * getProjects
 * ---------------------------------------------------------
 * Obtiene una lista paginada de proyectos según filtros
 * dinámicos proporcionados por el cliente.
 *
 * Usado principalmente en:
 * - Listados de proyectos
 * - Búsquedas
 * - filtros del portafolio
 *
 * @param filter Filtros dinámicos de consulta
 * @param safePage Número de página (>=1)
 * @param safeLimit Cantidad de registros por página
 * @returns Lista de proyectos
 * =========================================================
 */
export async function getProjects(
  filter: Record<string, unknown>,
  safePage: number,
  safeLimit: number
) {
  await connectDB();
  return repo.findProjects(filter, safePage, safeLimit);
}


/**
 * =========================================================
 * getTotalProjects
 * ---------------------------------------------------------
 * Devuelve el número total de proyectos que cumplen
 * con los filtros aplicados.
 *
 * Este valor se usa principalmente para construir
 * metadatos de paginación.
 *
 * @param filter Filtros aplicados
 * @returns Total de proyectos encontrados
 * =========================================================
 */
export async function getTotalProjects(
  filter: Record<string, unknown>
) {
  await connectDB();
  return repo.countProjects(filter);
}


/**
 * =========================================================
 * getProjectById
 * ---------------------------------------------------------
 * Obtiene un proyecto específico utilizando su ObjectId.
 *
 * Proceso:
 * 1. Conectar a la base de datos
 * 2. Validar que el ID sea un ObjectId válido
 * 3. Consultar el repositorio
 *
 * @param id Identificador del proyecto
 * @returns Proyecto encontrado o null
 * =========================================================
 */
export async function getProjectById(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.findProjectById(id);
}


/**
 * =========================================================
 * getProjectBySlug
 * ---------------------------------------------------------
 * Obtiene un proyecto utilizando su slug público.
 *
 * Los slugs se utilizan normalmente en rutas dinámicas:
 * `/projects/[slug]`
 *
 * @param slug Slug único del proyecto
 * @returns Proyecto encontrado o null
 * =========================================================
 */
export async function getProjectBySlug(slug: string) {
  await connectDB();
  return repo.findProjectBySlug(slug);
}


/**
 * =========================================================
 * createProject
 * ---------------------------------------------------------
 * Crea un nuevo proyecto en la base de datos.
 *
 * Maneja errores de dominio relacionados con:
 * - slug duplicado (índice único en MongoDB)
 *
 * @param data Datos validados del proyecto
 * @throws SlugAlreadyExistsError Si el slug ya existe
 * @returns Proyecto creado
 * =========================================================
 */
export async function createProject(data: CreateProjectDTO) {
  await connectDB();

  try {
    return await repo.createProjectRepo(data);
  } catch (error: any) {
    if (error?.code === 11000 && error?.keyPattern?.slug) {
      throw new SlugAlreadyExistsError();
    }
    throw error;
  }
}


/**
 * =========================================================
 * updateProject
 * ---------------------------------------------------------
 * Actualiza un proyecto existente mediante su ID.
 *
 * Proceso:
 * 1. Conectar a la base de datos
 * 2. Validar el ObjectId
 * 3. Delegar actualización al repositorio
 * 4. Manejar errores de slug duplicado
 *
 * @param id Identificador del proyecto
 * @param data Datos parciales de actualización
 * @throws SlugAlreadyExistsError Si el slug ya existe
 * @returns Proyecto actualizado o null
 * =========================================================
 */
export async function updateProject(
  id: string,
  data: UpdateProjectDTO
) {
  await connectDB();
  validateObjectId(id);

  try {
    return await repo.updateProjectRepo(id, data);
  } catch (error: any) {
    if (error?.code === 11000 && error?.keyPattern?.slug) {
      throw new SlugAlreadyExistsError();
    }
    throw error;
  }
}


/**
 * =========================================================
 * deleteProject
 * ---------------------------------------------------------
 * Elimina un proyecto existente mediante su ID.
 *
 * Proceso:
 * 1. Conectar a la base de datos
 * 2. Validar el ObjectId
 * 3. Ejecutar eliminación en el repositorio
 *
 * @param id Identificador del proyecto
 * @returns Proyecto eliminado o null si no existe
 * =========================================================
 */
export async function deleteProject(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.deleteProjectRepo(id);
}