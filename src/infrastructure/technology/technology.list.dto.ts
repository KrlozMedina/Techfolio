/**
 * =========================================================
 * Technology List DTO
 * ---------------------------------------------------------
 * Define la estructura de datos utilizada para representar
 * tecnologías en vistas de listado dentro del sistema.
 *
 * Este DTO es una versión ligera de la entidad de tecnología
 * y está optimizado para respuestas de API que retornan
 * múltiples elementos (listas o tablas).
 *
 * A diferencia de `TechnologyEntityDTO`, este DTO:
 * - No incluye información extendida de categoría
 * - No incluye nivel de experiencia
 * - Reduce el tamaño del payload
 *
 * Arquitectura:
 * - DTO de salida utilizado en endpoints de listado
 * - desacoplado del modelo de persistencia
 * - utilizado por mappers de infraestructura
 *
 * Responsabilidades:
 * - representar tecnologías en listados o grids
 * - optimizar respuestas de API
 * - servir como contrato ligero para el frontend
 *
 * Utilizado en:
 * - endpoints GET /technologies
 * - listados paginados
 * - tablas o cards de tecnologías
 * =========================================================
 */

/**
 * =========================================================
 * TechnologyListDTO
 * ---------------------------------------------------------
 * DTO base para listar tecnologías.
 *
 * Representa la versión simplificada de la entidad,
 * utilizada normalmente en endpoints de listado.
 * =========================================================
 */
export interface TechnologyListDTO {

  /**
   * Identificador único de la tecnología.
   */
  id: string;

  /**
   * Nombre de la tecnología.
   */
  name: string;

  /**
   * URL del ícono representativo de la tecnología.
   */
  icon?: string;

  /**
   * URL del sitio web oficial de la tecnología.
   */
  website?: string;
}