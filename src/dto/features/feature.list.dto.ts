import { FeatureDomain } from "@/shared/enums/feature-domain.enum";

/**
 * DTO (Data Transfer Object) que representa una feature simplificada para listados.
 * Se usa típicamente al mostrar múltiples features en una lista o tabla.
 */
export interface FeatureListDTO {
  /** Identificador único de la feature */
  id: string;

  /** Título de la feature */
  title: string;

  /** Descripción breve de la feature */
  description: string;

  /** Dominio o categoría de la feature, usando el enum FeatureDomain */
  domain: FeatureDomain;
}
