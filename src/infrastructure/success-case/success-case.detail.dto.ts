/**
 * =========================================================
 * Success Case Detail DTO
 * ---------------------------------------------------------
 * Define la estructura de datos utilizada para exponer
 * el detalle de un Success Case hacia el cliente.
 *
 * Este DTO representa la versión consumible por la API
 * y puede diferir del modelo interno de persistencia
 * (MongoDB / Mongoose).
 *
 * El objetivo del DTO es:
 * - abstraer el modelo de base de datos
 * - controlar qué información se expone al cliente
 * - mantener contratos estables entre backend y frontend
 *
 * Arquitectura:
 * - DTO utilizado en la capa de presentación / API
 * - Adaptado desde el modelo SuccessCaseDocument
 * - Compatible con mappers de infraestructura
 *
 * Responsabilidades:
 * - representar un caso de éxito en endpoints de detalle
 * - estructurar la información consumida por el frontend
 * - desacoplar la estructura de persistencia
 *
 * Utilizado en:
 * - endpoints GET /success-cases/:id
 * - páginas de detalle de casos de éxito
 * - visualizaciones de impacto de proyectos
 * =========================================================
 */

import { Visibility } from "@/shared/enums";

/**
 * =========================================================
 * SuccessCaseDetailDTO
 * ---------------------------------------------------------
 * DTO que representa el detalle completo de un caso de éxito
 * expuesto al cliente.
 *
 * Incluye:
 * - contenido localizado
 * - impacto generado
 * - métricas cuantitativas
 * - recursos multimedia
 * - proyectos relacionados
 * - rol desempeñado
 * - escalabilidad del proyecto
 * - visibilidad
 * - timeline
 * =========================================================
 */
export type SuccessCaseDetailDTO = {

  /**
   * Identificador único del caso de éxito.
   */
  id: string;

  /**
   * Contenido localizado del caso.
   * Incluye campos como:
   * - title
   * - summary
   * - problem
   * - solution
   */
  content: object;

  /**
   * Información sobre el impacto generado
   * por el proyecto o solución.
   */
  impact: object;

  /**
   * Métricas cuantificables del caso.
   *
   * Ejemplos:
   * - uptime
   * - reducción de trabajo manual
   */
  metrics?: object;

  /**
   * Recursos multimedia asociados al caso.
   *
   * Puede incluir:
   * - imagen de portada
   * - galería
   * - videos
   */
  media: object;

  /**
   * Proyectos relacionados con este caso de éxito.
   */
  projectIds: object[];

  /**
   * Rol desempeñado dentro del proyecto.
   */
  role: string;

  /**
   * Información sobre la escalabilidad
   * o crecimiento del proyecto.
   */
  scalability: string;

  /**
   * Nivel de visibilidad del caso de éxito.
   */
  visibility: Visibility;

  /**
   * Información temporal del proyecto.
   *
   * Puede incluir:
   * - fecha de inicio
   * - fecha de finalización
   * - duración
   */
  timeline: object;
};