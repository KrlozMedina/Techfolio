/**
 * =========================================================
 * Category List DTO
 * ---------------------------------------------------------
 * Define la estructura de datos utilizada para representar
 * categorías en respuestas de tipo listado.
 *
 * A diferencia de `CategoryEntityDTO`, esta versión es una
 * representación simplificada optimizada para endpoints
 * que retornan colecciones (listas o tablas).
 *
 * Características:
 * - No incluye estructura multilenguaje completa
 * - Devuelve únicamente el contenido en el idioma ya
 *   seleccionado por el backend o por la capa de servicio
 * - Reduce el tamaño de la respuesta para mejorar
 *   rendimiento en listados
 *
 * Arquitectura:
 * - DTO utilizado en endpoints de consulta (read/list)
 * - Pensado para vistas de tabla, dropdowns o listados
 * - Separado del DTO completo para evitar sobrecarga
 *
 * Responsabilidades:
 * - Representar categorías en endpoints de listado
 * - Entregar datos ya localizados al cliente
 * - Reducir payload en respuestas masivas
 *
 * Utilizado en:
 * - endpoints GET /categories
 * - tablas de administración
 * - selectores o filtros de categorías
 * =========================================================
 */

/**
 * DTO para listado de categorías.
 * 
 * Versión simplificada usada en endpoints de lista,
 * donde no se necesita la estructura completa de idiomas.
 */
export interface CategoryListDTO {

  /**
   * Identificador único de la categoría.
   */
  id: string;

  /**
   * Título de la categoría en el idioma seleccionado.
   */
  title: string;

  /**
   * Descripción de la categoría en el idioma seleccionado.
   */
  description: string;
}