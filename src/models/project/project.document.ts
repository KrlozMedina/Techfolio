import { Document } from "mongoose";

/**
 * Representa el documento de Project tal como se almacena en MongoDB.
 * Extiende de Document para incluir metadatos de Mongoose.
 */
export interface ProjectDocument extends Document {
  /** Slug único del proyecto (usado en URLs) */
  slug: string;

  /**
   * Contenido localizado por idioma.
   * Incluye información descriptiva y funcional del proyecto.
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
   * Información del equipo y contexto del proyecto.
   */
  teamInfo: {
    role: string;        // Rol principal desempeñado
    teamSize: number;    // Tamaño del equipo
    duration: string;    // Duración del proyecto
    projectType: string; // Tipo de proyecto
  };

  /**
   * Definición de la arquitectura técnica del proyecto.
   */
  architecture: {
    type: string;            // Tipo de arquitectura
    style: string;           // Estilo arquitectónico
    communication: string[]; // Mecanismos de comunicación
    databaseModel: string;   // Modelo de base de datos
  };

  /** Plataforma objetivo del proyecto */
  platform: string;

  /** Tecnologías asociadas (id + slug) */
  technologyIds: { id: string; slug: string }[];

  /** Features asociadas (id + slug) */
  featureIds: { id: string; slug: string }[];

  /** Categorías asociadas (id + slug) */
  categoryIds: { id: string; slug: string }[];

  /** Retos técnicos enfrentados durante el proyecto */
  technicalChallenges: string[];

  /**
   * Impacto del proyecto.
   */
  impact: {
    metrics: string[]; // Métricas de impacto
    users: string;     // Usuarios o alcance
  };

  /** Aprendizajes obtenidos durante el desarrollo */
  learnings: string[];

  /**
   * URLs relevantes del proyecto.
   */
  urls: {
    repository: string;           // Repositorio de código
    live: string | null;          // URL en producción
    documentation: string | null; // Documentación técnica
  };

  /**
   * Recursos visuales del proyecto.
   */
  assets: {
    main: string; // Imagen principal
    blur: string; // Imagen blur / placeholder
  };

  /** Puntaje de importancia o relevancia */
  importanceScore: number;

  /** Estado actual del proyecto */
  status: string;

  /** Fecha de creación del documento */
  createdAt: Date;

  /** Fecha de última actualización del documento */
  updatedAt: Date;
}
