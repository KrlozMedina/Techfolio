/**
 * DTO utilizado para representar un proyecto en vistas de listado.
 *
 * Contiene únicamente la información necesaria para mostrar
 * tarjetas o resúmenes de proyectos.
 *
 * Este DTO NO expone el modelo completo de base de datos,
 * sino una versión transformada y segura para la API pública.
 */
export type ProjectListDTO = {
  /**
   * Identificador único del proyecto.
   */
  id: string;

  /**
   * Slug único utilizado para rutas públicas.
   */
  slug: string;

  /**
   * Título del proyecto según el idioma seleccionado.
   */
  title: string;

  /**
   * Descripción corta del proyecto.
   */
  description: string;

  /**
   * Plataforma principal del proyecto (ej: web, mobile).
   */
  platform: string;

  /**
   * Tipo o categoría del proyecto.
   */
  type: string;

  /**
   * Lista de features asociadas al proyecto.
   * Generalmente representadas como slugs o identificadores.
   */
  features: string[];

  /**
   * Tecnologías asociadas al proyecto.
   * Estructura definida en el mapper correspondiente.
   */
  technologies: object[];

  /**
   * Resultado o impacto principal del proyecto.
   * Puede ser null si no existe información de resultado.
   */
  outcome: object | null;

  /**
   * URL del repositorio (ej: GitHub).
   */
  repositoryUrl: string;

  /**
   * URL pública del proyecto en producción.
   * Puede ser null si no existe despliegue.
   */
  liveUrl: string | null;

  /**
   * Imagen principal del proyecto.
   */
  imageMain: string;

  /**
   * Versión blur o placeholder optimizado de la imagen principal.
   */
  imageBlur: string;
};
