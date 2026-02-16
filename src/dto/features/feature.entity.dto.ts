import { FeatureDomain } from "@/shared/enums/feature-domain.enum";

/**
 * DTO (Data Transfer Object) que representa una característica (feature) en la aplicación.
 * Contiene contenido en múltiples idiomas y la categoría (dominio) de la feature.
 */
export interface FeatureEntityDTO {
  /**
   * Contenido localizado de la feature
   */
  content: {
    /** Contenido en español */
    es: {
      /** Título de la feature en español */
      title: string;
      /** Descripción de la feature en español */
      description: string;
    };
    /** Contenido en inglés */
    en: {
      /** Título de la feature en inglés */
      title: string;
      /** Descripción de la feature en inglés */
      description: string;
    };
  };

  /**
   * Dominio o categoría de la feature.
   * Utiliza el enum FeatureDomain para asegurar valores válidos.
   */
  domain: FeatureDomain;
}
