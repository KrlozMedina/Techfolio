// ==========================
// 📁 interfaces/project.interface.ts
// ==========================

import { ProjectStatus } from "@/shared/constants/enums";

// ----------------------------------
// 🧩 Campos de auditoría reutilizables
// ----------------------------------
/**
 * Define campos comunes de auditoría usados en varios modelos.
 */
export interface IAuditFields {
  createdAt?: Date;
  updatedAt?: Date;
}

// ----------------------------------
// 🌐 Localización de contenido
// ----------------------------------

/**
 * Contenido traducible por idioma.
 */
export interface ILocalizedContent {
  title: string;
  description: string;
}

/**
 * Información localizada para dos idiomas (es/en).
 */
export interface ILocalizedInfo {
  es: ILocalizedContent;
  en: ILocalizedContent;
}

// ----------------------------------
// 🛠️ Estructura de proyecto V1 (plana)
// ----------------------------------

/**
 * Versión inicial de proyecto con estructura plana.
 */
export interface IProject extends IAuditFields {
  _id: string;
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  repositoryUrl: string;
  liveUrl: string;
  imageUrl: string;
  category: string[];
  role: string;
  teamSize: number;
  duration: string;
  priority: number;
  projectType: string;
}

// ----------------------------------
// 🧩 Modularización de V2 Project
// ----------------------------------

/**
 * Información del equipo que desarrolló el proyecto.
 */
export interface ITeamInfo {
  roleId?: string;
  teamSize?: number;
  duration?: string;
}

/**
 * Etiquetas asociadas al proyecto como tecnologías, categorías o plataformas.
 */
export interface IProjectTags {
  platformId: string | string[];
  featureIds?: string[];
  technologyIds: string[];
  categoryIds?: string[];
}

/**
 * URLs relacionadas al proyecto: repositorio, sitio en vivo, etc.
 */
export interface IProjectUrls {
  repository: string;
  live: string;
  isDownloadable: boolean;
}

/**
 * Recursos visuales del proyecto (imágenes principales y miniaturas).
 */
export interface IProjectAssets {
  main: string;
  blur: string;
}

/**
 * Proyecto modularizado (V2) con estructura escalable.
 */
export interface IProjectV2 extends IAuditFields {
  _id: string;
  projectInfo: ILocalizedInfo;
  teamInfo: ITeamInfo;
  tags: IProjectTags;
  slug: string;
  urls: IProjectUrls;
  assets: IProjectAssets;
  importanceScore: number;
  status: ProjectStatus;
}

// ----------------------------------
// 📄 Paginación de respuestas (opcional)
// ----------------------------------

/**
 * Información de paginación para una lista de resultados.
 */
export interface IPaginationData {
  total: number;
  limit: number;
  currentPage: number;
  totalPages: number;
}

/**
 * Resultado de proyectos paginados (V2).
 */
export interface IProjectV2Paginated {
  data: IProjectV2[];
  pagination: IPaginationData;
}
