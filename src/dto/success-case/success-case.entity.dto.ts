import { Status, Visibility } from "@/shared/enums";

/**
 * Contenido localizado del caso de éxito.
 */
type LocalizedContent = {
  title: string;
  summary: string;
  problem: string;
  solution: string;
};

/**
 * Impacto localizado generado por el proyecto.
 */
type LocalizedImpact = {
  operational: string[];
  business: string[];
  users: string;
};

/**
 * Métrica cuantificable con unidad y fuente.
 */
type ValueMetric = {
  value: number;
  unit: string;
  source: string;
};

/**
 * Representación de recurso multimedia optimizado.
 */
type Media = {
  src: string;
  blurDataURL: string;
};

/**
 * DTO que representa completamente un caso de éxito
 * a nivel de entidad de dominio.
 *
 * Contiene información localizada, métricas,
 * relaciones, estado y visibilidad.
 */
export type SuccessCaseEntityDTO = {
  /**
   * Contenido principal del caso (multi-idioma)
   */
  content: {
    es: LocalizedContent;
    en: LocalizedContent;
  };

  /**
   * Impacto generado (multi-idioma)
   */
  impact: {
    es: LocalizedImpact;
    en: LocalizedImpact;
  };

  /**
   * Métricas del proyecto
   */
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

  /**
   * Recursos multimedia asociados
   */
  media: {
    cover: Media;
    gallery: Media[];
  };

  /**
   * Proyectos relacionados (solo slug expuesto)
   */
  projectIds: {
    slug: string;
  }[];

  /**
   * Rol desempeñado en el proyecto
   */
  role: string;

  /**
   * Estado interno del caso
   */
  status: Status;

  /**
   * Información sobre escalabilidad (multi-idioma)
   */
  scalability: {
    es: string;
    en: string;
  };

  /**
   * Configuración de comentarios
   */
  commentsEnabled: boolean;
  commentsCount: number;

  /**
   * Nivel de visibilidad pública
   */
  visibility: Visibility;

  /**
   * Periodo de ejecución del proyecto
   */
  timeline: {
    start: Date;
    end: Date;
  };
};
