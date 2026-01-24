import {
  ArchitectureCommunication,
  ArchitectureStyle,
  ArchitectureType,
  DatabaseModel,
  Platform,
  ProjectStatus,
  ProjectType,
  Role,
} from "@/shared/enums";
import { Types } from "mongoose";

/**
 * DTO para la creación de un proyecto (Project V2).
 *
 * Define la estructura completa requerida para persistir un proyecto,
 * incluyendo contenido localizado, metadatos técnicos, arquitectura,
 * relaciones y estado.
 */
export type CreateProjectDTO = {
  /**
   * Contenido localizado del proyecto.
   * Debe existir en español (es) e inglés (en).
   */
  content: {
    es: {
      title: string;        // Título del proyecto en español
      description: string;  // Descripción general
      problem: string;      // Problema que aborda el proyecto
      solution: string;     // Solución propuesta
    };
    en: {
      title: string;        // Título del proyecto en inglés
      description: string;  // Descripción general
      problem: string;      // Problema que aborda el proyecto
      solution: string;     // Solución propuesta
    };
  };

  /**
   * Información del equipo y contexto del proyecto.
   */
  teamInfo: {
    role: Role;             // Rol principal desempeñado
    teamSize: number;       // Tamaño del equipo
    duration: string;       // Duración del proyecto (ej: "3 months")
    projectType: ProjectType; // Tipo de proyecto (personal, work, freelance)
  };

  /**
   * Detalles de la arquitectura del sistema.
   */
  architecture: {
    type: ArchitectureType;                     // Tipo de arquitectura
    style: ArchitectureStyle;                   // Estilo arquitectónico
    communication: ArchitectureCommunication[]; // Formas de comunicación
    databaseModel: DatabaseModel;                // Modelo de base de datos
  };

  /**
   * Plataforma principal del proyecto.
   */
  platform: Platform;

  /**
   * Relaciones con otras entidades.
   * Se permiten ObjectId o string para flexibilidad en capas.
   */
  technologyIds: Types.ObjectId[] | string[];
  featureIds: Types.ObjectId[] | string[];
  categoryIds: Types.ObjectId[] | string[];

  /**
   * Retos técnicos enfrentados durante el desarrollo.
   */
  technicalChallenges: string[];

  /**
   * Impacto generado por el proyecto.
   */
  impact: {
    metrics: string[]; // Métricas alcanzadas (KPIs, mejoras, etc.)
    users: string;     // Usuarios o alcance del proyecto
  };

  /**
   * Aprendizajes obtenidos durante el proyecto.
   */
  learnings: string[];

  /**
   * URLs relevantes del proyecto.
   */
  urls: {
    repository: string;           // Repositorio de código
    live: string | null;          // URL en producción (si aplica)
    documentation: string | null; // Documentación externa (si aplica)
  };

  /**
   * Recursos visuales del proyecto.
   */
  assets: {
    main: string; // Imagen principal
    blur: string; // Imagen de fondo o placeholder
  };

  /**
   * Puntuación de importancia del proyecto (orden/prioridad).
   */
  importanceScore: number;

  /**
   * Estado actual del proyecto.
   */
  status: ProjectStatus;
};
