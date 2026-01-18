import { FeatureDomain } from "@/shared/enums/feature-domain.enum";

/**
 * Contenido localizado de una feature.
 * Representa el texto visible según el idioma.
 */
type LocalizedFeatureContent = {
  /** Título de la feature */
  title: string;

  /** Descripción detallada de la feature */
  description: string;
};

/**
 * DTO para la creación de una feature.
 * - Requiere contenido en español e inglés
 * - Define el dominio funcional al que pertenece la feature
 */
export type CreateFeatureDTO = {
  /** Contenido multilenguaje */
  content: {
    es: LocalizedFeatureContent;
    en: LocalizedFeatureContent;
  };

  /** Dominio o categoría funcional de la feature */
  domain: FeatureDomain;
};
