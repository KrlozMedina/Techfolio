/**
 * =========================================================
 * Feature List DTO
 * ---------------------------------------------------------
 * Define la estructura de datos utilizada para representar
 * una Feature en respuestas de tipo listado.
 *
 * A diferencia de `FeatureEntityDTO`, esta versión es una
 * representación simplificada optimizada para consultas
 * que retornan múltiples elementos (listas o tablas).
 *
 * Características:
 * - Contenido ya localizado (no incluye estructura i18n)
 * - Payload reducido para mejorar rendimiento
 * - Incluye solo la información necesaria para listados
 *
 * Arquitectura:
 * - DTO utilizado en endpoints de consulta (GET lists)
 * - Separado del DTO completo para evitar sobrecarga
 * - Integrado con el enum FeatureDomain
 *
 * Responsabilidades:
 * - Representar features en listados
 * - Reducir tamaño de respuesta de la API
 * - Mantener tipado consistente entre capas
 *
 * Utilizado en:
 * - endpoints GET /features
 * - tablas de administración
 * - listados y dashboards
 * =========================================================
 */

import { FeatureDomain } from "@/shared/enums/feature-domain.enum";

/**
 * =========================================================
 * FeatureListDTO
 * ---------------------------------------------------------
 * DTO (Data Transfer Object) que representa una feature
 * simplificada para visualización en listados.
 *
 * Incluye:
 * - identificador
 * - título
 * - descripción
 * - dominio funcional
 * =========================================================
 */
export interface FeatureListDTO {

  /**
   * Identificador único de la feature.
   */
  id: string;

  /**
   * Título de la feature en el idioma seleccionado.
   */
  title: string;

  /**
   * Descripción breve de la feature en el idioma seleccionado.
   */
  description: string;

  /**
   * Dominio o categoría de la feature.
   * Utiliza el enum `FeatureDomain` para asegurar
   * valores válidos dentro del sistema.
   */
  domain: FeatureDomain;
}