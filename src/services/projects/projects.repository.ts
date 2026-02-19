import { CreateProjectDTO } from "@/dto/project/project.create.dto";
import { UpdateProjectDTO } from "@/dto/project/project.update.dto";
import { ProjectV2 } from "@/models/project/project.model";

/**
 * Obtiene proyectos con filtro, paginación y relaciones pobladas.
 * 
 * Incluye:
 * - relations.featureIds (slug, content)
 * - outcome (slug, content, media)
 * - relations.technologyIds con su categoryId (content)
 *
 * Ordena por importanceScore descendente.
 *
 * @param {Record<string, unknown>} filter - Filtros dinámicos de búsqueda
 * @param {number} page - Número de página (>=1)
 * @param {number} limit - Cantidad de registros por página
 * @returns {Promise<any[]>} Lista de proyectos con relaciones pobladas
 */
export async function findProjects(
  filter: Record<string, unknown>,
  page: number,
  limit: number
) {
  return ProjectV2
    .find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("relations.featureIds", `slug content`)
    .populate("outcome", "slug content media")
    .populate({
      path: "relations.technologyIds",
      select: "name categoryId iconUrl experienceLevel -_id",
      populate: {
        path: "categoryId",
        select: "content -_id"
      }
    })
    .sort({ importanceScore: -1 });
}

/**
 * Cuenta la cantidad total de proyectos según filtro.
 *
 * @param {Record<string, unknown>} filter - Filtros aplicados
 * @returns {Promise<number>} Total de proyectos encontrados
 */
export async function countProjects(
  filter: Record<string, unknown>
) {
  return ProjectV2.countDocuments(filter);
}

/**
 * Busca un proyecto por su ID incluyendo relaciones pobladas.
 *
 * Relaciones incluidas:
 * - features
 * - outcome
 * - technologies con categoría
 *
 * @param {string} id - ID del proyecto
 * @returns {Promise<any | null>} Proyecto encontrado o null
 */
export async function findProjectById(id: string) {
  return ProjectV2
    .findById(id)
    .populate("relations.featureIds", `slug content`)
    .populate("outcome", "slug content media")
    .populate({
      path: "relations.technologyIds",
      select: "name categoryId iconUrl experienceLevel -_id",
      populate: { path: "categoryId", select: "content -_id" }
    });
}

/**
 * Busca un proyecto por su slug incluyendo relaciones pobladas.
 *
 * @param {string} slug - Slug único del proyecto
 * @returns {Promise<any | null>} Proyecto encontrado o null
 */
export async function findProjectBySlug(slug: string) {
  return ProjectV2
    .findOne({ slug })
    .populate("relations.featureIds", `slug content`)
    .populate("outcome", "slug content media")
    .populate({
      path: "relations.technologyIds",
      select: "name categoryId iconUrl experienceLevel -_id",
      populate: { path: "categoryId", select: "content -_id" }
    });
}

/**
 * Crea un nuevo proyecto.
 *
 * @param {CreateProjectDTO} data - Datos del proyecto
 * @returns {Promise<any>} Proyecto creado
 */
export async function createProjectRepo(data: CreateProjectDTO) {
  return ProjectV2.create(data);
}

/**
 * Actualiza un proyecto por ID.
 * Ejecuta validaciones del schema.
 *
 * @param {string} id - ID del proyecto
 * @param {UpdateProjectDTO} data - Datos parciales de actualización
 * @returns {Promise<any | null>} Proyecto actualizado o null
 */
export async function updateProjectRepo(id: string, data: UpdateProjectDTO) {
  return ProjectV2.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

/**
 * Elimina un proyecto por ID.
 *
 * @param {string} id - ID del proyecto
 * @returns {Promise<any | null>} Proyecto eliminado o null
 */
export async function deleteProjectRepo(id: string) {
  return ProjectV2.findByIdAndDelete(id);
}
