import * as repo from "./projects.repository";
import { validateObjectId } from "@/lib/validators/validateObjectId";
import { SlugAlreadyExistsError } from "@/errors/domain/slug-already-exists.error";
import connectDB from "@/lib/db/connectDB";
import { CreateProjectDTO } from "@/dto/project/project.create.dto";
import { UpdateProjectDTO } from "@/dto/project/project.update.dto";

/**
 * Obtiene proyectos paginados según filtro.
 *
 * @param {Record<string, unknown>} filter - Filtros dinámicos
 * @param {number} safePage - Número de página (>=1)
 * @param {number} safeLimit - Registros por página
 * @returns {Promise<any[]>} Lista de proyectos
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
 * Devuelve el total de proyectos según filtro.
 * Útil para metadata de paginación.
 *
 * @param {Record<string, unknown>} filter - Filtros aplicados
 * @returns {Promise<number>} Total de proyectos encontrados
 */
export async function getTotalProjects(
  filter: Record<string, unknown>
) {
  await connectDB();
  return repo.countProjects(filter);
}

/**
 * Obtiene un proyecto por su ID.
 * - Valida que el ID sea un ObjectId válido.
 *
 * @param {string} id - ID del proyecto
 * @returns {Promise<any | null>} Proyecto encontrado o null
 */
export async function getProjectById(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.findProjectById(id);
}

/**
 * Obtiene un proyecto por su slug único.
 *
 * @param {string} slug - Slug del proyecto
 * @returns {Promise<any | null>} Proyecto encontrado o null
 */
export async function getProjectBySlug(slug: string) {
  await connectDB();
  return repo.findProjectBySlug(slug);
}

/**
 * Crea un nuevo proyecto.
 * - Maneja error de slug duplicado.
 *
 * @param {CreateProjectDTO} data - Datos validados del proyecto
 * @throws {SlugAlreadyExistsError} Si el slug ya existe
 * @returns {Promise<any>} Proyecto creado
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
 * Actualiza un proyecto existente.
 * - Valida ObjectId.
 * - Maneja error de slug duplicado.
 *
 * @param {string} id - ID del proyecto
 * @param {UpdateProjectDTO} data - Datos de actualización
 * @throws {SlugAlreadyExistsError} Si el slug ya existe
 * @returns {Promise<any | null>} Proyecto actualizado o null
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
 * Elimina un proyecto por su ID.
 * - Valida formato del ObjectId.
 *
 * @param {string} id - ID del proyecto
 * @returns {Promise<any | null>} Proyecto eliminado o null
 */
export async function deleteProject(id: string) {
  await connectDB();
  validateObjectId(id);
  return repo.deleteProjectRepo(id);
}
