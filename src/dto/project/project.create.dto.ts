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
 * Contenido descriptivo del proyecto en un idioma específico.
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
 * Insights técnicos y estratégicos obtenidos durante el proyecto.
 */
const localizeInsightSchema = z.object({
  /** Desafíos técnicos relevantes */
  technicalChallenges: z.array(z.string()),

  /** Impacto generado por el proyecto */
  impact: z.object({
    /** Tipo o volumen de usuarios impactados */
    users: z.string(),
  }),

  /** Aprendizajes clave obtenidos */
  learnings: z.array(z.string()),
});

/* ============================================================
   Main Validation Schema
   ============================================================ */

/**
 * Esquema de validación para la creación de un proyecto.
 *
 * Define la estructura completa requerida para persistir
 * un proyecto dentro del sistema.
 */
export const createProjectSchema = z.object({
  /** Contenido multilenguaje obligatorio (español e inglés) */
  content: z.object({
    es: localizedContentSchema,
    en: localizedContentSchema,
  }),

  /** Información contextual del equipo y entorno */
  teamInfo: z.object({
    role: z.enum(Role),
    teamSize: z.number().int().positive(),
    duration: z.string(),
    projectType: z.enum(ProjectType),
    company: z.string().nullable(),
  }),

  /** Plataforma principal del sistema */
  platform: z.enum(Platform),

  /** Configuración arquitectónica del proyecto */
  architecture: z.object({
    type: z.enum(ArchitectureType),
    style: z.enum(ArchitectureStyle),
    communication: z.object({
      internal: z.array(z.enum(ArchitectureCommunication)),
      external: z.array(z.enum(ArchitectureCommunication)),
    }),
    databaseModel: z.enum(DatabaseModel).nullable(),
  }),

  /** Capacidades y métricas asociadas */
  capabilities: z.object({
    metrics: z.object({
      current: z.array(z.string()),
      planned: z.array(z.string()),
    }),
  }),

  /** Relaciones con otras entidades del dominio */
  relations: z.object({
    technologyIds: z.array(
      z.string().refine(isValidObjectId, "Invalid ObjectId")
    ),
    featureIds: z.array(
      z.string().refine(isValidObjectId, "Invalid ObjectId")
    ),
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
    repository: z.string().url(),
    live: z.string().url().nullable(),
    documentation: z.string().url().nullable(),
  }),

  /** Recursos visuales principales */
  cover: z.object({
    main: z.string().min(1).url(),
    blur: z.string().min(1).url(),
  }),

  /** Nivel de importancia (1–5) */
  importanceScore: z.number().min(1).max(5),

  /** Estado operativo del proyecto */
  status: z.enum(Status),

  /** Nivel de visibilidad */
  visibility: z.enum(Visibility),

  /** Información temporal */
  timeline: z.object({
    initialRelease: z.coerce.date(),
    futureExpansion: z.boolean(),
  }),
});

/* ============================================================
   DTO Types
   ============================================================ */

/**
 * DTO para la creación de un proyecto.
 *
 * Representa la estructura tipada que atraviesa capas
 * (controller → application → persistence).
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
