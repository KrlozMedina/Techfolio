/**
 * =========================================================
 * Success Case Entity DTO
 * ---------------------------------------------------------
 * Define la estructura completa de un Success Case a nivel
 * de entidad de dominio dentro del sistema.
 *
 * Este DTO representa la forma estructurada que atraviesa
 * las capas internas de la aplicación (domain / application)
 * y puede ser posteriormente adaptado a otros DTOs para
 * exposición en la API.
 *
 * Incluye:
 * - contenido localizado
 * - impacto generado
 * - métricas cuantitativas y cualitativas
 * - recursos multimedia
 * - relaciones con proyectos
 * - estado interno
 * - visibilidad pública
 * - configuración de comentarios
 * - línea de tiempo
 *
 * Arquitectura:
 * - DTO de entidad de dominio
 * - utilizado internamente en la aplicación
 * - desacoplado del modelo de persistencia
 *
 * Responsabilidades:
 * - representar completamente un Success Case
 * - mantener estructura consistente en la capa de dominio
 * - servir como base para mappers hacia DTOs de API
 *
 * Utilizado en:
 * - servicios de aplicación
 * - mappers de infraestructura
 * - lógica de dominio de Success Cases
 * =========================================================
 */

import { Status, Visibility } from "@/shared/enums";

/**
 * =========================================================
 * LocalizedContent
 * ---------------------------------------------------------
 * Contenido localizado principal del caso de éxito.
 *
 * Incluye:
 * - título del caso
 * - resumen
 * - problema abordado
 * - solución implementada
 * =========================================================
 */
type LocalizedContent = {
  title: string;
  summary: string;
  problem: string;
  solution: string;
};

/**
 * =========================================================
 * LocalizedImpact
 * ---------------------------------------------------------
 * Impacto localizado generado por el proyecto.
 *
 * Incluye:
 * - impacto operacional
 * - impacto de negocio
 * - usuarios impactados
 * =========================================================
 */
type LocalizedImpact = {
  operational: string[];
  business: string[];
  users: string;
};

/**
 * =========================================================
 * ValueMetric
 * ---------------------------------------------------------
 * Métrica cuantificable con su unidad y fuente.
 *
 * Ejemplos:
 * - uptime del sistema
 * - reducción de registros manuales
 * =========================================================
 */
type ValueMetric = {
  value: number;
  unit: string;
  source: string;
};

/**
 * =========================================================
 * Media
 * ---------------------------------------------------------
 * Representación de recurso multimedia optimizado para UI.
 *
 * Incluye:
 * - src: URL del recurso
 * - blurDataURL: imagen placeholder optimizada
 * =========================================================
 */
type Media = {
  src: string;
  blurDataURL: string;
};

/**
 * =========================================================
 * SuccessCaseEntityDTO
 * ---------------------------------------------------------
 * DTO que representa completamente un caso de éxito
 * dentro del dominio de la aplicación.
 *
 * Incluye:
 * - contenido multilenguaje
 * - impacto generado
 * - métricas del proyecto
 * - recursos multimedia
 * - proyectos relacionados
 * - rol desempeñado
 * - estado interno
 * - escalabilidad
 * - configuración de comentarios
 * - visibilidad pública
 * - línea de tiempo
 * =========================================================
 */
export type SuccessCaseEntityDTO = {

  /**
   * Contenido principal del caso (multi-idioma).
   */
  content: {
    es: LocalizedContent;
    en: LocalizedContent;
  };

  /**
   * Impacto generado por el proyecto (multi-idioma).
   */
  impact: {
    es: LocalizedImpact;
    en: LocalizedImpact;
  };

  /**
   * Métricas del proyecto.
   */
  metrics: {

    /**
     * Métricas cuantitativas.
     */
    quantitative: {

      /** Disponibilidad del sistema (uptime). */
      uptime: ValueMetric;

      /** Reducción de registros manuales. */
      manualRecordsReduction: ValueMetric;
    };

    /**
     * Métricas cualitativas.
     */
    qualitative: {
      es: string[];
      en: string[];
    };
  };

  /**
   * Recursos multimedia asociados al caso.
   */
  media: {

    /** Imagen principal del caso. */
    cover: Media;

    /** Galería multimedia del caso. */
    gallery: Media[];
  };

  /**
   * Proyectos relacionados con este caso de éxito.
   * Solo se expone el slug del proyecto.
   */
  projectIds: {
    slug: string;
  }[];

  /**
   * Rol desempeñado en el proyecto.
   */
  role: string;

  /**
   * Estado interno del caso de éxito.
   */
  status: Status;

  /**
   * Información sobre escalabilidad o crecimiento
   * del proyecto (multi-idioma).
   */
  scalability: {
    es: string;
    en: string;
  };

  /**
   * Configuración de comentarios del caso.
   */
  commentsEnabled: boolean;

  /**
   * Número total de comentarios asociados.
   */
  commentsCount: number;

  /**
   * Nivel de visibilidad pública del caso.
   */
  visibility: Visibility;

  /**
   * Periodo de ejecución del proyecto.
   */
  timeline: {

    /** Fecha de inicio del proyecto. */
    start: Date;

    /** Fecha de finalización del proyecto. */
    end: Date;
  };
};