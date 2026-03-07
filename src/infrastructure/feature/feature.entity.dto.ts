/**
 * =========================================================
 * Feature Entity DTO
 * ---------------------------------------------------------
 * Define la estructura de datos expuesta al cliente para
 * representar una Feature dentro del sistema.
 *
 * Este DTO es utilizado como contrato de datos entre
 * backend y frontend, garantizando una estructura
 * consistente y tipada.
 *
 * La entidad Feature contiene:
 * - contenido localizado (i18n)
 * - dominio o categoría funcional
 *
 * Arquitectura:
 * - DTO utilizado en capa de aplicación / presentación
 * - Soporte para internacionalización (i18n)
 * - Integrado con el enum FeatureDomain
 *
 * Responsabilidades:
 * - Representar una feature en respuestas de API
 * - Mantener estructura consistente de contenido multilenguaje
 * - Garantizar tipado fuerte entre capas del sistema
 *
 * Utilizado en:
 * - endpoints de features
 * - formularios de edición
 * - vistas de detalle
 * =========================================================
 */

import { FeatureDomain } from "@/shared/enums/feature-domain.enum";

/**
 * =========================================================
 * FeatureEntityDTO
 * ---------------------------------------------------------
 * DTO (Data Transfer Object) que representa una
 * característica (feature) dentro de la aplicación.
 *
 * Incluye:
 * - contenido localizado en múltiples idiomas
 * - dominio funcional al que pertenece la feature
 * =========================================================
 */
export interface FeatureEntityDTO {

  /**
   * Contenido localizado de la feature.
   * Permite mostrar información según el idioma del usuario.
   */
  content: {

    /**
     * Contenido en español.
     */
    es: {

      /**
       * Título de la feature en español.
       */
      title: string;

      /**
       * Descripción de la feature en español.
       */
      description: string;
    };

    /**
     * Contenido en inglés.
     */
    en: {

      /**
       * Title of the feature in English.
       */
      title: string;

      /**
       * Description of the feature in English.
       */
      description: string;
    };
  };

  /**
   * Dominio o categoría funcional de la feature.
   *
   * Se basa en el enum `FeatureDomain` para asegurar
   * que solo se utilicen valores válidos definidos
   * en el sistema.
   */
  domain: FeatureDomain;
}