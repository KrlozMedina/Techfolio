/**
 * =========================================================
 * Success Case Creation Validation Schema & DTO
 * ---------------------------------------------------------
 * Define los esquemas de validación y DTOs utilizados
 * para la creación de Success Cases dentro del sistema.
 *
 * Un Success Case representa evidencia del impacto real
 * generado por un proyecto e incluye:
 * - contenido multilenguaje
 * - impacto operacional y de negocio
 * - métricas cuantitativas y cualitativas
 * - recursos visuales
 * - estado y visibilidad
 * - línea de tiempo
 *
 * Arquitectura:
 * - Validación centralizada mediante Zod
 * - Tipos DTO utilizados en la capa de aplicación
 * - Compatible con internacionalización (i18n)
 *
 * Responsabilidades:
 * - Validar datos antes de persistir un Success Case
 * - Garantizar consistencia estructural del dominio
 * - Servir como contrato entre capas del sistema
 *
 * Utilizado en:
 * - endpoints POST /success-cases
 * - servicios de aplicación
 * - formularios de creación de casos de éxito
 * =========================================================
 */

import { Status, Visibility } from "@/shared/enums";
import z from "zod";

/* ======================================================
  Sub-schemas reutilizables
====================================================== */

/**
 * =========================================================
 * localizedContentSchema
 * ---------------------------------------------------------
 * Contenido localizado principal del caso de éxito.
 *
 * Incluye:
 * - título del caso
 * - resumen del caso
 * - problema abordado
 * - solución implementada
 * =========================================================
 */
const localizedContentSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  problem: z.string().min(1),
  solution: z.string().min(1),
});

/**
 * =========================================================
 * localizedImpactSchema
 * ---------------------------------------------------------
 * Impacto localizado del caso de éxito.
 *
 * Incluye:
 * - impacto operacional
 * - impacto de negocio
 * - número o tipo de usuarios impactados
 * =========================================================
 */
const localizedImpactSchema = z.object({
  operational: z.array(z.string()),
  business: z.array(z.string()),
  users: z.string().min(1),
});

/**
 * =========================================================
 * valueMetricSchema
 * ---------------------------------------------------------
 * Métrica cuantitativa medible.
 *
 * El valor se limita entre 0 y 100 para representar
 * porcentajes u otros indicadores comparables.
 *
 * Ejemplos:
 * - uptime %
 * - reducción de procesos manuales
 * =========================================================
 */
const valueMetricSchema = z.object({
  value: z.number().min(0).max(100),
  unit: z.string(),
  source: z.string(),
});

/**
 * =========================================================
 * mediaSchema
 * ---------------------------------------------------------
 * Información básica de recursos multimedia.
 *
 * Incluye:
 * - src: URL del recurso
 * - blurDataURL: imagen placeholder optimizada
 * =========================================================
 */
const mediaSchema = z.object({
  src: z.string(),
  blurDataURL: z.string(),
});

/* ======================================================
  Schema principal
====================================================== */

/**
 * =========================================================
 * createSuccessCaseSchema
 * ---------------------------------------------------------
 * Schema principal para crear un Success Case.
 *
 * Incluye:
 * - contenido multilenguaje
 * - impacto operacional y de negocio
 * - métricas cuantitativas y cualitativas
 * - recursos multimedia (cover + galería)
 * - estado y visibilidad
 * - línea de tiempo
 * =========================================================
 */
export const createSuccessCaseSchema = z.object({

  /**
   * Contenido multilenguaje del caso de éxito.
   */
  content: z.object({
    es: localizedContentSchema,
    en: localizedContentSchema,
  }),

  /**
   * Impacto generado por el proyecto.
   */
  impact: z.object({
    es: localizedImpactSchema,
    en: localizedImpactSchema,
  }),

  /**
   * Métricas cuantitativas y cualitativas asociadas
   * al caso de éxito.
   */
  metrics: z.object({
    quantitative: z.object({

      /** Disponibilidad del sistema (uptime) */
      uptime: valueMetricSchema,

      /** Reducción de registros manuales */
      manualRecordsReduction: valueMetricSchema,
    }),

    qualitative: z.object({
      es: z.array(z.string()),
      en: z.array(z.string()),
    }),
  }),

  /**
   * Recursos multimedia asociados al caso.
   */
  media: z.object({

    /** Imagen principal del caso */
    cover: mediaSchema,

    /** Galería de imágenes */
    gallery: z.array(mediaSchema),
  }),

  /**
   * Proyectos relacionados con este caso de éxito.
   */
  projectIds: z.array(z.string()),

  /**
   * Rol desempeñado en el proyecto.
   */
  role: z.string().min(1),

  /**
   * Estado del caso de éxito.
   */
  status: z.nativeEnum(Status),

  /**
   * Información sobre la escalabilidad del proyecto.
   */
  scalability: z.object({
    es: z.string(),
    en: z.string(),
  }),

  /**
   * Configuración de comentarios.
   */
  commentsEnabled: z.boolean().default(false),
  commentsCount: z.number().min(0).default(0),

  /**
   * Nivel de visibilidad del caso.
   */
  visibility: z.nativeEnum(Visibility),

  /**
   * Línea de tiempo del caso de éxito.
   */
  timeline: z.object({
    start: z.coerce.date(),
    end: z.coerce.date(),
  }),
});

/* ======================================================
  Tipos auxiliares
====================================================== */

/**
 * Contenido localizado del Success Case.
 */
type LocalizedContent = {
  title: string;
  summary: string;
  problem: string;
  solution: string;
};

/**
 * Impacto localizado del Success Case.
 */
type LocalizedImpact = {
  operational: string[];
  business: string[];
  users: string;
};

/**
 * Métrica cuantitativa.
 */
type ValueMetric = {
  value: number;
  unit: string;
  source: string;
};

/**
 * Recurso multimedia.
 */
type Media = {
  src: string;
  blurDataURL: string;
};

/* ======================================================
  DTO de creación
====================================================== */

/**
 * =========================================================
 * CreateSuccessCaseDTO
 * ---------------------------------------------------------
 * DTO utilizado en la capa de aplicación para crear
 * un Success Case.
 *
 * Representa la estructura tipada que atraviesa
 * las capas del sistema:
 *
 * controller → application → persistence
 * =========================================================
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