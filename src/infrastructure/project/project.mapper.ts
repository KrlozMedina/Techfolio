/**
 * =========================================================
 * Project DTO Mappers
 * ---------------------------------------------------------
 * Contiene funciones encargadas de transformar documentos
 * provenientes de la base de datos (`ProjectDocument`)
 * en DTOs utilizados por la capa de aplicación o expuestos
 * a través de la API.
 *
 * Estos mappers actúan como una capa de adaptación entre:
 * - el modelo de persistencia (MongoDB / Mongoose)
 * - el contrato público de la API (DTOs)
 *
 * También se encargan de:
 * - resolver contenido localizado según el idioma
 * - transformar relaciones pobladas (features, technologies)
 * - estructurar la información para vistas de listado
 *   o detalle.
 *
 * Arquitectura:
 * - Mapper de infraestructura
 * - Adaptador entre modelos de dominio y DTOs
 * - Manejo de internacionalización (i18n)
 *
 * Responsabilidades:
 * - Convertir ProjectDocument a DTOs
 * - Resolver contenido localizado
 * - Mapear relaciones del proyecto
 *
 * Utilizado en:
 * - endpoints GET /projects
 * - endpoints GET /projects/:slug
 * - servicios de aplicación
 * =========================================================
 */

import { ProjectListDTO } from "@/infrastructure/project/project.list.dto";
import { ProjectDocument } from "@/models/project/project.document";
import { ProjectDetailDTO } from "@/infrastructure/project/project.detail.dto";
import { ExperienceLevel } from "@/shared/enums/experience-level.enum";
import { Language } from "@/lib/i18n";

/**
 * =========================================================
 * toProjectListDTO
 * ---------------------------------------------------------
 * Convierte un `ProjectDocument` en un `ProjectListDTO`.
 *
 * Este DTO está optimizado para:
 * - listados de proyectos
 * - cards de portafolio
 * - previews de proyectos
 *
 * Incluye:
 * - información básica del proyecto
 * - features relacionadas
 * - tecnologías utilizadas
 * - recursos visuales principales
 *
 * @param project Documento de proyecto proveniente de MongoDB
 * @param lang Idioma en el que se debe resolver el contenido
 *
 * @returns ProjectListDTO
 * =========================================================
 */
export function toProjectListDTO(
  project: ProjectDocument,
  lang: Language
): ProjectListDTO {
  return {
    id: project._id.toString(),

    /** Slug único utilizado en rutas del proyecto */
    slug: project.slug,

    /** Contenido localizado */
    title: project.content[lang].title,
    description: project.content[lang].description,

    /** Plataforma principal del proyecto */
    platform: project.platform,

    /** Tipo de proyecto (personal, laboral, etc.) */
    type: project.teamInfo.projectType,

    /**
     * Features asociadas al proyecto
     */
    features: project.relations.featureIds.map(f => ({
      title: f.content[lang].title,
      description: f.content[lang].description,
      domain: f.domain,
    })),

    /**
     * Tecnologías utilizadas en el proyecto
     */
    technologies: project.relations.technologyIds.map(t => ({
      name: t.name,
      category: t.categoryId.content[lang].title,
      icon: t.iconUrl,
      experience: t.experienceLevel as ExperienceLevel
    })),

    /**
     * Caso de éxito asociado (deshabilitado actualmente)
     */
    // outcome: {
    //   slug: project.outcome?.slug,
    //   title: project.outcome?.content[lang].title,
    //   solution: project.outcome?.content[lang].solution,
    //   media: project.outcome?.media.cover,
    // },

    /** URLs relevantes */
    repositoryUrl: project.urls.repository,
    liveUrl: project.urls.live,

    /** Recursos visuales del proyecto */
    imageMain: project.cover.main,
    imageBlur: project.cover.blur,
  };
}

/**
 * =========================================================
 * toProjectDetailDTO
 * ---------------------------------------------------------
 * Convierte un `ProjectDocument` en un `ProjectDetailDTO`.
 *
 * Este DTO contiene la información completa del proyecto,
 * incluyendo arquitectura, impacto, aprendizajes y
 * resultados asociados.
 *
 * Utilizado en:
 * - páginas de detalle de proyectos
 * - vistas extendidas del portafolio
 *
 * @param project Documento de proyecto proveniente de la base de datos
 * @param lang Idioma en el que se debe retornar el contenido localizado
 *
 * @returns DTO con el detalle completo del proyecto
 * =========================================================
 */
export function toProjectDetailDTO(
  project: ProjectDocument,
  lang: Language
): ProjectDetailDTO {
  return {
    id: project._id.toString(),

    /** Slug del proyecto para rutas dinámicas */
    slug: project.slug,

    /** Contenido localizado del proyecto */
    title: project.content[lang].title,
    description: project.content[lang].description,
    problem: project.content[lang].problem,
    solution: project.content[lang].solution,

    /**
     * Información contextual del equipo
     */
    teamInfo: {
      role: project.teamInfo.role,
      teamSize: project.teamInfo.teamSize,
      duration: project.teamInfo.duration,
      projectType: project.teamInfo.projectType,
      company: project.teamInfo.company
    },

    /**
     * Configuración arquitectónica del sistema
     */
    architecture:{
      communication: {
        internal: project.architecture.communication.internal,
        external: project.architecture.communication.external
      },
      type: project.architecture.type,
      style: project.architecture.style,
      databaseModel: project.architecture.databaseModel
    },

    /** Plataforma principal del proyecto */
    platform: project.platform,

    /** Tipo de proyecto */
    type: project.teamInfo.projectType,

    /**
     * Features asociadas al proyecto
     */
    features: project.relations.featureIds.map(f => ({
      title: f.content[lang].title,
      description: f.content[lang].description,
      domain: f.domain,
    })),

    /**
     * Tecnologías utilizadas
     */
    // technologies: project.relations.technologyIds,
    technologies: project.relations.technologyIds.map(t => ({
      name: t.name,
      category: t.categoryId.content[lang].title,
      icon: t.iconUrl,
      experience: t.experienceLevel as ExperienceLevel
    })),

    /**
     * Impacto generado por el proyecto
     */
    impact: project.insights[lang].impact,

    /**
     * Aprendizajes obtenidos durante el desarrollo
     */
    learnings: project.insights[lang].learnings,

    /**
     * Información del caso de éxito asociado
     */
    // outcome: {
    //   status: project.outcome.status,
    //   successCaseIds: project.outcome.successCaseId,
    // },

    outcome: {
      slug: project.outcome?.slug,
      title: project.outcome?.content[lang].title,
      solution: project.outcome?.content[lang].solution,
      media: {
        src: project.outcome?.media.cover.src,
        blurDataURL: project.outcome?.media.cover.blurDataUrl
      }
    },

    /** URLs del proyecto */
    repositoryUrl: project.urls.repository,
    liveUrl: project.urls.live,
    documentationUrl: project.urls.documentation,

    /** Recursos visuales */
    imageMain: project.cover.main,
    imageBlur: project.cover.blur,

    /** Nivel de importancia del proyecto */
    importanceScore: project.importanceScore,

    /** Estado actual del proyecto */
    status: project.status,
  };
}