import { CreateProjectDTO } from "@/infrastructure/project/project.create.dto";
import { UpdateProjectDTO } from "@/infrastructure/project/project.update.dto";
import { ProjectV2 } from "@/models/project/project.model";

/**
 * =========================================================
 * Project Repository
 * ---------------------------------------------------------
 * Capa de acceso a datos responsable de interactuar
 * directamente con el modelo de MongoDB (Mongoose).
 *
 * Arquitectura:
 * Controller → Service → Repository → Database
 *
 * Responsabilidades:
 * - ejecutar consultas contra MongoDB
 * - resolver relaciones mediante populate
 * - aplicar paginación y ordenamiento
 *
 * Esta capa no contiene lógica de negocio.
 * =========================================================
 */


/**
 * =========================================================
 * findProjects
 * ---------------------------------------------------------
 * Obtiene proyectos aplicando:
 * - filtros dinámicos
 * - paginación
 * - relaciones pobladas
 *
 * Relaciones incluidas:
 * - relations.featureIds → slug, content
 * - outcome → slug, content, media
 * - relations.technologyIds → name, icon, experience
 * - categoryId dentro de technology
 *
 * Ordena los resultados por `importanceScore`
 * de forma descendente (proyectos más relevantes primero).
 *
 * @param filter Filtros dinámicos de búsqueda
 * @param page Número de página (>=1)
 * @param limit Cantidad de registros por página
 *
 * @returns Lista de proyectos con relaciones pobladas
 * =========================================================
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
 * =========================================================
 * countProjects
 * ---------------------------------------------------------
 * Devuelve la cantidad total de proyectos que cumplen
 * con los filtros especificados.
 *
 * Se utiliza principalmente para calcular metadata
 * de paginación en listados.
 *
 * @param filter Filtros aplicados
 * @returns Total de proyectos encontrados
 * =========================================================
 */
export async function countProjects(
  filter: Record<string, unknown>
) {
  return ProjectV2.countDocuments(filter);
}


/**
 * =========================================================
 * findProjectById
 * ---------------------------------------------------------
 * Obtiene un proyecto específico utilizando su ObjectId.
 *
 * Incluye relaciones pobladas:
 * - features
 * - outcome
 * - technologies
 * - category de cada tecnología
 *
 * @param id Identificador del proyecto
 * @returns Proyecto encontrado o null
 * =========================================================
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
 * =========================================================
 * findProjectBySlug
 * ---------------------------------------------------------
 * Obtiene un proyecto mediante su slug único.
 *
 * Este método se usa principalmente para
 * rutas dinámicas del portafolio:
 *
 * `/projects/[slug]`
 *
 * Incluye relaciones pobladas:
 * - features
 * - outcome
 * - technologies
 * - category de cada tecnología
 *
 * @param slug Slug único del proyecto
 * @returns Proyecto encontrado o null
 * =========================================================
 */
export async function findProjectBySlug(slug: string) {
  return ProjectV2
    .findOne({ slug })
    .populate("relations.featureIds", `slug content domain`)
    .populate("outcome", "slug content media")
    .populate({
      path: "relations.technologyIds",
      select: "name categoryId iconUrl experienceLevel -_id",
      populate: { path: "categoryId", select: "content -_id" }
    });
}


/**
 * =========================================================
 * createProjectRepo
 * ---------------------------------------------------------
 * Crea un nuevo proyecto en la base de datos.
 *
 * La validación de datos debe ocurrir previamente
 * en la capa de aplicación o mediante schemas.
 *
 * @param data Datos del proyecto
 * @returns Proyecto creado
 * =========================================================
 */
export async function createProjectRepo(data: CreateProjectDTO) {
  return ProjectV2.create(data);
}


/**
 * =========================================================
 * updateProjectRepo
 * ---------------------------------------------------------
 * Actualiza un proyecto existente mediante su ID.
 *
 * Opciones utilizadas:
 * - new → devuelve el documento actualizado
 * - runValidators → ejecuta validaciones del schema
 *
 * @param id Identificador del proyecto
 * @param data Datos parciales de actualización
 *
 * @returns Proyecto actualizado o null si no existe
 * =========================================================
 */
export async function updateProjectRepo(id: string, data: UpdateProjectDTO) {
  return ProjectV2.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}


/**
 * =========================================================
 * deleteProjectRepo
 * ---------------------------------------------------------
 * Elimina un proyecto de la base de datos mediante su ID.
 *
 * @param id Identificador del proyecto
 * @returns Proyecto eliminado o null si no existe
 * =========================================================
 */
export async function deleteProjectRepo(id: string) {
  return ProjectV2.findByIdAndDelete(id);
}