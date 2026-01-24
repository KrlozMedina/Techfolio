import { Language } from "@/shared/enums";
import { ProjectListDTO } from "@/dto/project/project.list.dto";
import { ProjectDocument } from "@/models/project/project.document";
import { ProjectDetailDTO } from "@/dto/project/project.detail.dto";

/**
 * Mapper para listado de proyectos.
 *
 * Convierte un documento de Project (MongoDB) en un ProjectListDTO,
 * resolviendo el contenido según el idioma solicitado.
 *
 * @param project Documento de proyecto proveniente de la base de datos
 * @param lang Idioma en el que se debe retornar el contenido localizado
 * @returns DTO con la información mínima necesaria para listados
 */
export function toProjectListDTO(
  project: ProjectDocument,
  lang: Language
): ProjectListDTO {
  return {
    id: project._id.toString(),
    slug: project.slug,
    title: project.content[lang].title,
    description: project.content[lang].description,
    platform: project.platform,
    features: project.featureIds.map(f => f.slug),
    categories: project.categoryIds.map(c => c.slug),
    technologies: project.technologyIds.map(t => t.slug),
    repositoryUrl: project.urls.repository,
    liveUrl: project.urls.live,
    imageMain: project.assets.main,
    imageBlur: project.assets.blur,
  };
}

/**
 * Mapper para detalle de proyecto.
 *
 * Convierte un documento de Project (MongoDB) en un ProjectDetailDTO,
 * incluyendo información extendida como arquitectura, impacto,
 * aprendizajes y estado del proyecto.
 *
 * @param project Documento de proyecto proveniente de la base de datos
 * @param lang Idioma en el que se debe retornar el contenido localizado
 * @returns DTO con el detalle completo del proyecto
 */
export function toProjectDetailDTO(
  project: ProjectDocument,
  lang: Language
): ProjectDetailDTO {
  return {
    id: project._id.toString(),
    slug: project.slug,
    title: project.content[lang].title,
    description: project.content[lang].description,
    problem: project.content[lang].problem,
    solution: project.content[lang].solution,
    teamInfo: project.teamInfo,
    architecture: project.architecture,
    platform: project.platform,
    features: project.featureIds.map(f => f.slug),
    categories: project.categoryIds.map(c => c.slug),
    technologies: project.technologyIds.map(t => t.slug),
    impact: project.impact,
    learnings: project.learnings,
    repositoryUrl: project.urls.repository,
    liveUrl: project.urls.live,
    documentationUrl: project.urls.documentation,
    imageMain: project.assets.main,
    imageBlur: project.assets.blur,
    importanceScore: project.importanceScore,
    status: project.status,
  };
}
