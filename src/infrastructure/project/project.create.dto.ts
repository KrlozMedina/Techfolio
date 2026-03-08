/**
 * =========================================================
 * Project Creation Validation Schema & DTO
 * ---------------------------------------------------------
 * Define la validación y estructura de datos utilizada
 * para crear un proyecto dentro del sistema.
 *
 * Este módulo establece:
 * - Esquemas de validación utilizando Zod
 * - Tipos DTO utilizados entre capas de la aplicación
 *
 * El esquema describe completamente la estructura de un
 * proyecto incluyendo:
 * - contenido multilenguaje
 * - arquitectura del sistema
 * - relaciones con otras entidades
 * - métricas y capacidades
 * - insights estratégicos
 * - URLs y recursos visuales
 * - estado y visibilidad
 * - timeline del proyecto
 *
 * Arquitectura:
 * - Validación centralizada mediante Zod
 * - Tipos DTO utilizados en la capa de aplicación
 * - Preparado para persistencia con MongoDB/Mongoose
 *
 * Responsabilidades:
 * - Validar datos antes de persistir proyectos
 * - Garantizar consistencia estructural del dominio
 * - Servir como contrato entre capas del sistema
 *
 * Utilizado en:
 * - endpoints POST /projects
 * - servicios de aplicación
 * - formularios de creación de proyectos
 * =========================================================
 */

import {
  ArchitectureCommunication,
  ArchitectureStyle,
  ArchitectureType,
  DatabaseModel,
  Platform,
  ProjectType,
  Role,
  Status,
  Visibility,
} from "@/shared/enums";
import { isValidObjectId, Types } from "mongoose";
import z from "zod";

/* ============================================================
   Base Schemas
   ============================================================ */

/**
 * =========================================================
 * localizedContentSchema
 * ---------------------------------------------------------
 * Define el contenido descriptivo del proyecto para un
 * idioma específico.
 *
 * Incluye:
 * - título del proyecto
 * - descripción general
 * - problema identificado
 * - solución implementada
 * =========================================================
 */
const localizedContentSchema = z.object({

  /** Título corto del proyecto (1–24 caracteres) */
  title: z.string().min(1).max(24),

  /** Descripción general del proyecto */
  description: z.string().min(1),

  /** Problema que el proyecto resuelve */
  problem: z.string().min(1),

  /** Solución implementada */
  solution: z.string().min(1),
});

/**
 * =========================================================
 * localizeInsightSchema
 * ---------------------------------------------------------
 * Define los insights técnicos y estratégicos obtenidos
 * durante el desarrollo del proyecto.
 *
 * Incluye:
 * - desafíos técnicos enfrentados
 * - impacto generado
 * - aprendizajes obtenidos
 * =========================================================
 */
const localizeInsightSchema = z.object({

  /** Desafíos técnicos relevantes encontrados durante el desarrollo */
  technicalChallenges: z.array(z.string()),

  /** Impacto generado por el proyecto */
  impact: z.object({

    /** Tipo o volumen de usuarios impactados */
    users: z.string(),
  }),

  /** Aprendizajes clave obtenidos durante el proyecto */
  learnings: z.array(z.string()),
});

/* ============================================================
   Main Validation Schema
   ============================================================ */

/**
 * =========================================================
 * createProjectSchema
 * ---------------------------------------------------------
 * Esquema principal para validar la creación de un proyecto.
 *
 * Define la estructura completa requerida para persistir
 * un proyecto dentro del sistema.
 *
 * Incluye:
 * - contenido multilenguaje
 * - información del equipo
 * - arquitectura
 * - capacidades y métricas
 * - relaciones con otras entidades
 * - insights
 * - recursos y URLs
 * - estado y visibilidad
 * - timeline
 * =========================================================
 */
export const createProjectSchema = z.object({

  /** Contenido multilenguaje obligatorio (español e inglés) */
  content: z.object({
    es: localizedContentSchema,
    en: localizedContentSchema,
  }),

  /** Información contextual del equipo y entorno */
  teamInfo: z.object({

    /** Rol principal desempeñado en el proyecto */
    role: z.enum(Role),

    /** Número total de integrantes del equipo */
    teamSize: z.number().int().positive(),

    /** Duración del proyecto (ej: "3 months") */
    duration: z.string(),

    /** Tipo de proyecto (personal, laboral, etc.) */
    projectType: z.enum(ProjectType),

    /** Empresa asociada al proyecto (si aplica) */
    company: z.string().nullable(),
  }),

  /** Plataforma principal donde se ejecuta el sistema */
  platform: z.enum(Platform),

  /** Configuración arquitectónica del proyecto */
  architecture: z.object({

    /** Tipo de arquitectura (monolith, microservices, etc.) */
    type: z.enum(ArchitectureType),

    /** Estilo arquitectónico (clean, layered, etc.) */
    style: z.enum(ArchitectureStyle),

    /** Protocolos de comunicación interna y externa */
    communication: z.object({

      /** Protocolos utilizados entre componentes internos */
      internal: z.array(z.enum(ArchitectureCommunication)),

      /** Protocolos utilizados para integración externa */
      external: z.array(z.enum(ArchitectureCommunication)),
    }),

    /** Modelo de base de datos utilizado */
    databaseModel: z.enum(DatabaseModel).nullable(),
  }),

  /** Capacidades y métricas asociadas al sistema */
  capabilities: z.object({
    metrics: z.object({

      /** Métricas actualmente implementadas */
      current: z.array(z.string()),

      /** Métricas planeadas para futuras versiones */
      planned: z.array(z.string()),
    }),
  }),

  /** Relaciones con otras entidades del dominio */
  relations: z.object({

    /** Tecnologías asociadas al proyecto */
    technologyIds: z.array(
      z.string().refine(isValidObjectId, "Invalid ObjectId")
    ),

    /** Features relacionadas */
    featureIds: z.array(
      z.string().refine(isValidObjectId, "Invalid ObjectId")
    ),

    /** Categorías asociadas */
    categoryIds: z.array(
      z.string().refine(isValidObjectId, "Invalid ObjectId")
    ),
  }),

  /** Insights estratégicos por idioma */
  insights: z.object({
    es: localizeInsightSchema,
    en: localizeInsightSchema,
  }),

  /** Caso de éxito asociado (opcional) */
  outcome: z
    .string()
    .refine(isValidObjectId, "Invalid ObjectId")
    .nullable()
    .default(null),

  /** URLs relevantes del proyecto */
  urls: z.object({

    /** URL del repositorio (GitHub, GitLab, etc.) */
    repository: z.string().url(),

    /** URL de despliegue o demo en vivo */
    live: z.string().url().nullable(),

    /** URL de documentación técnica */
    documentation: z.string().url().nullable(),
  }),

  /** Recursos visuales principales del proyecto */
  cover: z.object({

    /** Imagen principal del proyecto */
    main: z.string().min(1).url(),

    /** Imagen blur utilizada como placeholder */
    blur: z.string().min(1).url(),
  }),

  /** Nivel de importancia del proyecto (1–5) */
  importanceScore: z.number().min(1).max(5),

  /** Estado operativo del proyecto */
  status: z.enum(Status),

  /** Nivel de visibilidad del proyecto */
  visibility: z.enum(Visibility),

  /** Información temporal del proyecto */
  timeline: z.object({

    /** Fecha de lanzamiento inicial */
    initialRelease: z.coerce.date(),

    /** Indica si el proyecto tiene expansión futura planificada */
    futureExpansion: z.boolean(),
  }),
});

/* ============================================================
   DTO Types
   ============================================================ */

/**
 * =========================================================
 * CreateProjectDTO
 * ---------------------------------------------------------
 * Data Transfer Object utilizado para crear un proyecto.
 *
 * Representa la estructura tipada que atraviesa las capas
 * del sistema:
 *
 * controller → application → persistence
 *
 * Este tipo debe ser consistente con el schema de
 * validación `createProjectSchema`.
 * =========================================================
 */
export type CreateProjectDTO = {
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

  teamInfo: {
    role: Role;
    teamSize: number;
    duration: string;
    projectType: ProjectType;
    company: string | null;
  };

  platform: Platform;

  architecture: {
    type: ArchitectureType;
    style: ArchitectureStyle;
    communication: {
      internal: ArchitectureCommunication[];
      external: ArchitectureCommunication[];
    };
    databaseModel: DatabaseModel | null;
  };

  capabilities: {
    metrics: {
      current: string[];
      planned: string[];
    };
  };

  relations: {
    technologyIds: Types.ObjectId[] | string[];
    featureIds: Types.ObjectId[] | string[];
    categoryIds: Types.ObjectId[] | string[];
  };

  insights: {
    es: {
      technicalChallenges: string[];
      impact: {
        users: string;
      };
      learnings: string[];
    };
    en: {
      technicalChallenges: string[];
      impact: {
        users: string;
      };
      learnings: string[];
    };
  };

  outcome: Types.ObjectId | string | null;

  urls: {
    repository: string;
    live: string | null;
    documentation: string | null;
  };

  cover: {
    main: string;
    blur: string;
  };

  importanceScore: number;
  status: Status;
  visibility: Visibility;

  timeline: {
    initialRelease: Date;
    futureExpansion: boolean;
  };
};