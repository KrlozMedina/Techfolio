/**
 * =========================================================
 * Success Case List DTO
 * ---------------------------------------------------------
 * Define la estructura de datos utilizada para representar
 * un Success Case en vistas de listado dentro del sistema.
 *
 * A diferencia de `SuccessCaseEntityDTO` o
 * `SuccessCaseDetailDTO`, esta versión es una representación
 * reducida optimizada para:
 *
 * - grids de portafolio
 * - cards de casos de éxito
 * - listados administrativos
 * - tablas de contenido
 *
 * Características:
 * - Contenido ya localizado (título y resumen)
 * - Información visual mínima
 * - Relaciones simplificadas
 * - Sin métricas ni impacto detallado
 *
 * Arquitectura:
 * - DTO de presentación
 * - utilizado en endpoints de listado
 * - optimizado para payload pequeño
 *
 * Responsabilidades:
 * - representar casos de éxito en vistas resumidas
 * - reducir tamaño de respuesta en listados
 * - desacoplar el modelo interno del formato expuesto
 *
 * Utilizado en:
 * - endpoints GET /success-cases
 * - grids del portafolio
 * - cards de casos de éxito
 * =========================================================
 */

import { Status, Visibility } from "@/shared/enums";

/**
 * =========================================================
 * SuccessCaseListDTO
 * ---------------------------------------------------------
 * DTO utilizado para listar casos de éxito en el sistema.
 *
 * Contiene únicamente la información necesaria para
 * vistas de listado o preview.
 * =========================================================
 */
export type SuccessCaseListDTO = {

  /**
   * Identificador único del caso de éxito.
   */
  id: string;

  /**
   * Slug público utilizado en rutas dinámicas
   * (ej: /case-studies/:slug).
   */
  slug: string;

  /**
   * Título principal del caso.
   * El contenido ya debe estar resuelto según idioma.
   */
  title: string;

  /**
   * Resumen corto utilizado en la vista previa
   * del caso de éxito.
   */
  summary: string;

  /**
   * Imagen principal optimizada para visualización
   * en cards o grids.
   */
  coverImage: string;

  /**
   * Imagen placeholder utilizada para carga progresiva
   * (blur placeholder).
   */
  blurCoverImage: string;

  /**
   * Proyectos relacionados con el caso de éxito.
   *
   * Solo se expone el slug público del proyecto.
   */
  projectIds: {
    slug: string;
  }[];

  /**
   * Estado interno del caso de éxito.
   */
  status: Status;

  /**
   * Indica si los comentarios están habilitados.
   */
  commentsEnabled: boolean;

  /**
   * Número total de comentarios asociados al caso.
   */
  commentsCount: number;

  /**
   * Nivel de visibilidad pública del caso.
   */
  visibility: Visibility;
};