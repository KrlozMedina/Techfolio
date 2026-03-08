/**
 * =========================================================
 * Category Entity DTO
 * ---------------------------------------------------------
 * Define la estructura de datos expuesta al cliente para
 * representar una categoría dentro del sistema.
 *
 * Este DTO es utilizado en la capa de presentación o en
 * respuestas de API para transferir información de forma
 * estructurada y tipada.
 *
 * Incluye contenido localizado para múltiples idiomas,
 * permitiendo que la interfaz muestre la información
 * adecuada según el idioma seleccionado por el usuario.
 *
 * Arquitectura:
 * - DTO utilizado en capa de aplicación / presentación
 * - Soporte para internacionalización (i18n)
 * - Compatible con esquemas de validación y modelos de dominio
 *
 * Responsabilidades:
 * - Representar datos de categoría expuestos al cliente
 * - Mantener estructura consistente de contenido localizado
 * - Servir como contrato entre backend y frontend
 *
 * Utilizado en:
 * - respuestas de API
 * - componentes de UI
 * - capas de servicio o repositorio
 * =========================================================
 */

/**
 * DTO que representa la estructura expuesta al cliente
 * para una categoría.
 * 
 * Contiene información localizada en:
 * - Español (es)
 * - Inglés (en)
 */
export interface CategoryEntityDTO {

  /**
   * Contenido localizado de la categoría.
   * Incluye los textos disponibles para cada idioma soportado.
   */
  content: {

    /**
     * Contenido en idioma español.
     */
    es: {

      /**
       * Título de la categoría.
       */
      title: string;

      /**
       * Descripción de la categoría.
       */
      description: string;
    };

    /**
     * Contenido en idioma inglés.
     */
    en: {

      /**
       * Title of the category.
       */
      title: string;

      /**
       * Description of the category.
       */
      description: string;
    };
  };
}