import { Status, Visibility } from "@/shared/enums";
import z from "zod";

/* ======================================================
  Sub-schemas reutilizables
====================================================== */

/**
 * Contenido localizado principal del caso de éxito.
 */
const localizedContentSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  problem: z.string().min(1),
  solution: z.string().min(1),
});

/**
 * Impacto localizado del caso de éxito.
 */
const localizedImpactSchema = z.object({
  operational: z.array(z.string()),
  business: z.array(z.string()),
  users: z.string().min(1),
});

/**
 * Métrica cuantitativa medible.
 * value limitado entre 0–100 (ej. porcentaje).
 */
const valueMetricSchema = z.object({
  value: z.number().min(0).max(100),
  unit: z.string(),
  source: z.string(),
});

/**
 * Información básica de media.
 */
const mediaSchema = z.object({
  src: z.string(),
  blurDataURL: z.string(),
});

/* ======================================================
   Schema principal
====================================================== */

/**
 * Schema para crear un Success Case.
 *
 * Incluye:
 * - Contenido multilenguaje
 * - Impacto operacional y de negocio
 * - Métricas cuantitativas y cualitativas
 * - Media (cover + galería)
 * - Estado y visibilidad
 * - Línea de tiempo
 */
export const createSuccessCaseSchema = z.object({
  content: z.object({
    es: localizedContentSchema,
    en: localizedContentSchema,
  }),

  impact: z.object({
    es: localizedImpactSchema,
    en: localizedImpactSchema,
  }),

  metrics: z.object({
    quantitative: z.object({
      uptime: valueMetricSchema,
      manualRecordsReduction: valueMetricSchema,
    }),
    qualitative: z.object({
      es: z.array(z.string()),
      en: z.array(z.string()),
    }),
  }),

  media: z.object({
    cover: mediaSchema,
    gallery: z.array(mediaSchema),
  }),

  projectIds: z.array(z.string()),

  role: z.string().min(1),

  status: z.nativeEnum(Status),

  scalability: z.object({
    es: z.string(),
    en: z.string(),
  }),

  commentsEnabled: z.boolean().default(false),
  commentsCount: z.number().min(0).default(0),

  visibility: z.nativeEnum(Visibility),

  timeline: z.object({
    start: z.coerce.date(),
    end: z.coerce.date(),
  }),
});

/* ======================================================
   Tipos auxiliares
====================================================== */

type LocalizedContent = {
  title: string;
  summary: string;
  problem: string;
  solution: string;
};

type LocalizedImpact = {
  operational: string[];
  business: string[];
  users: string;
};

type ValueMetric = {
  value: number;
  unit: string;
  source: string;
};

type Media = {
  src: string;
  blurDataURL: string;
};

/* ======================================================
   DTO de creación
====================================================== */

/**
 * DTO utilizado en la capa de aplicación
 * para crear un Success Case.
 */
export type CreateSuccessCaseDTO = {
  content: {
    es: LocalizedContent;
    en: LocalizedContent;
  };

  impact: {
    es: LocalizedImpact;
    en: LocalizedImpact;
  };

  metrics: {
    quantitative: {
      uptime: ValueMetric;
      manualRecordsReduction: ValueMetric;
    };
    qualitative: {
      es: string[];
      en: string[];
    };
  };

  media: {
    cover: Media;
    gallery: Media[];
  };

  projectIds: string[];

  role: string;

  status: Status;

  scalability: {
    es: string;
    en: string;
  };

  visibility: Visibility;

  commentsEnabled: boolean;
  commentsCount: number;

  timeline: {
    start: Date;
    end: Date;
  };
};
