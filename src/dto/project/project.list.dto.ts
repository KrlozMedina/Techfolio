/**
 * DTO que representa la información básica de un proyecto
 * utilizada en vistas de listado o resúmenes.
 */
export interface ProjectListDTO {
  /** Identificador único del proyecto */
  id: string;

  /** Slug único usado en URLs */
  slug: string;

  /** Título del proyecto según el idioma solicitado */
  title: string;

  /** Descripción corta del proyecto */
  description: string;

  /** Plataforma objetivo del proyecto (web, mobile, desktop, etc.) */
  platform: string;

  /** Lista de slugs de las features asociadas al proyecto */
  features: string[];

  /** Lista de slugs de las categorías asociadas al proyecto */
  categories: string[];

  /** Lista de slugs de las tecnologías usadas en el proyecto */
  technologies: string[];

  /** URL del repositorio de código fuente */
  repositoryUrl: string;

  /** URL pública del proyecto desplegado (puede ser nula) */
  liveUrl: string | null;

  /** URL de la imagen principal del proyecto */
  imageMain: string;

  /** URL de la imagen blur usada como placeholder */
  imageBlur: string;
}
