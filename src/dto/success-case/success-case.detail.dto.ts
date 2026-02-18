import { Visibility } from "@/shared/enums";

/**
 * DTO utilizado para exponer el detalle de un caso de éxito.
 *
 * Representa la estructura que se envía al cliente.
 * No necesariamente coincide 1:1 con el modelo de base de datos.
 */
export type SuccessCaseDetailDTO = {
  /**
   * Identificador único del caso de éxito
   */
  id: string;

  /**
   * Contenido localizado (ej: título, descripción, etc.)
   */
  content: object;

  /**
   * Información sobre el impacto generado
   */
  impact: object;

  /**
   * Métricas cuantificables (opcional)
   */
  metrics?: object;

  /**
   * Recursos multimedia asociados (imágenes, videos, etc.)
   */
  media: object;

  /**
   * Proyectos relacionados
   */
  projectIds: object[];

  /**
   * Rol desempeñado en el proyecto
   */
  role: string;

  /**
   * Información sobre escalabilidad o crecimiento
   */
  scalability: string;

  /**
   * Nivel de visibilidad del caso
   */
  visibility: Visibility;

  /**
   * Información temporal del proyecto (fechas, duración, etc.)
   */
  timeline: object;
};
