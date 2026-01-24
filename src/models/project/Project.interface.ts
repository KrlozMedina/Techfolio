// ==========================
// 📁 interfaces/project.interface.ts
// ==========================

import { ArchitectureCommunication } from "@/shared/enums/architecture-communication.enum";
import { ArchitectureStyle } from "@/shared/enums/architecture-style.enum";
import { ArchitectureType } from "@/shared/enums/architecture-type.enum";
import { DatabaseModel } from "@/shared/enums/database-model.enum";
import { Platform } from "@/shared/enums/platform.enum";
import { ProjectStatus } from "@/shared/enums/project-status.enum";
import { ProjectType } from "@/shared/enums/project-type.enum";
import { Role } from "@/shared/enums/role.enum";
import { Types } from "mongoose";

// ----------------------------------
// 🧩 Campos de auditoría reutilizables
// ----------------------------------

/**
 * Campos estándar de auditoría para control temporal de entidades.
 */
export interface IAuditFields {
  createdAt?: Date;
  updatedAt?: Date;
}

// ----------------------------------
// 🌐 Localización de contenido
// ----------------------------------

/**
 * Estructura básica de contenido traducible.
 */
export interface ILocalizedContent {
  title: string;
  description: string;
}

/**
 * Contenido localizado soportando español e inglés.
 */
export interface ILocalizedInfo {
  es: ILocalizedContent;
  en: ILocalizedContent;
}

// ----------------------------------
// 🛠️ Estructura de proyecto V1 (plana)
// ----------------------------------

/**
 * Modelo inicial del proyecto (versión legacy).
 * Mantiene una estructura simple y no modular.
 */
export interface IProjectV1 extends IAuditFields {
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
 * Información del equipo involucrado en el proyecto.
 */
export interface ITeamInfo {
  roleId?: string;
  teamSize?: number;
  duration?: string;
}

/**
 * Identificadores de entidades relacionadas al proyecto.
 */
export interface IProjectTags {
  technologyIds: string[]; // ObjectId en tiempo de ejecución
  platformId: string;
  featureIds?: string[];
  categoryIds?: string[];
}

/**
 * URLs asociadas al proyecto.
 */
export interface IProjectUrls {
  repository: string;
  live: string;
  isDownloadable: boolean;
}

/**
 * Recursos visuales del proyecto.
 */
export interface IProjectAssets {
  main: string;
  blur: string;
}

/**
 * Modelo principal del proyecto versión 2.
 * Diseñado para ser escalable, tipado y multilenguaje.
 */
export interface IProjectV2 {
  _id: Types.ObjectId | string;
  slug: string;

  /**
   * Contenido localizado con información funcional del proyecto.
   */
  content: {
    es: {
      title: string;
      description: string;
      problem: string;
      solution: string;
    };
    en: {
      title: string;
      description: string;
      problem: string;
      solution: string;
    };
  };

  /**
   * Información del equipo y tipo de proyecto.
   */
  teamInfo: {
    role: Role;
    teamSize: number;
    duration: string;
    projectType: ProjectType;
  };

  /**
   * Definición de la arquitectura del sistema.
   */
  architecture: {
    type: ArchitectureType;
    style: ArchitectureStyle;
    communication: ArchitectureCommunication[];
    databaseModel: DatabaseModel;
  };

  /**
   * Plataforma principal del proyecto.
   */
  platform: Platform;

  /**
   * Relaciones con otras entidades del dominio.
   */
  technologyIds: Array<Types.ObjectId | string>;
  featureIds: Array<Types.ObjectId | string>;
  categoryIds: Array<Types.ObjectId | string>;

  /**
   * Retos técnicos enfrentados durante el desarrollo.
   */
  technicalChallenges: string[];

  /**
   * Impacto generado por el proyecto.
   */
  impact: {
    metrics: string[];
    users: string;
  };

  /**
   * Aprendizajes clave obtenidos.
   */
  learnings: string[];

  /**
   * URLs relevantes del proyecto.
   */
  urls: {
    repository: string;
    live: string | null;
    documentation: string | null;
  };

  /**
   * Recursos visuales del proyecto.
   */
  assets: {
    main: string;
    blur: string;
  };

  /**
   * Prioridad relativa del proyecto.
   */
  importanceScore: number;

  /**
   * Estado actual del proyecto.
   */
  status: ProjectStatus;

  /**
   * Campos de auditoría.
   */
  createdAt?: Date;
  updatedAt?: Date;
}

// ----------------------------------
// 📄 Paginación de respuestas
// ----------------------------------

/**
 * Metadatos de paginación para listados.
 */
export interface IPaginationData {
  total: number;
  limit: number;
  currentPage: number;
  totalPages: number;
}

/**
 * Resultado paginado de proyectos V2.
 */
export interface IProjectV2Paginated {
  data: IProjectV2[];
  pagination: IPaginationData;
}
