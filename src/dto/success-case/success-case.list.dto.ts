import { Status, Visibility } from "@/shared/enums";

/**
 * DTO utilizado para listar casos de éxito.
 *
 * Es una versión reducida optimizada para vistas
 * de listado (cards, tablas, grids, etc.).
 * No incluye información detallada como métricas o impacto.
 */
export type SuccessCaseListDTO = {
  /**
   * Identificador único del caso
   */
  id: string;

  /**
   * Slug público para rutas dinámicas
   */
  slug: string;

  /**
   * Título principal (ya resuelto según idioma)
   */
  title: string;

  /**
   * Resumen corto para vista previa
   */
  summary: string;

  /**
   * Imagen principal optimizada
   */
  coverImage: string;

  /**
   * Placeholder blur para carga progresiva
   */
  blurCoverImage: string;

  /**
   * Proyectos relacionados (solo slug expuesto)
   */
  projectIds: {
    slug: string;
  }[];

  /**
   * Estado interno del caso
   */
  status: Status;

  /**
   * Configuración de comentarios
   */
  commentsEnabled: boolean;

  /**
   * Total de comentarios asociados
   */
  commentsCount: number;

  /**
   * Nivel de visibilidad pública
   */
  visibility: Visibility;
};
