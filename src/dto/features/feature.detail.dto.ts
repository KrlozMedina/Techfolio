/**
 * DTO de detalle de Feature.
 * - Extiende FeatureListDTO
 * - Incluye descripción completa y dominio de la feature
 */
import { FeatureDomain } from "@/shared/enums/feature-domain.enum";
import { FeatureListDTO } from "./feature.list.dto";

export interface FeatureDetailDTO extends FeatureListDTO {
  /** Descripción completa de la feature en el idioma solicitado */
  description: string;

  /** Dominio al que pertenece la feature (ej. Frontend, Backend, IoT) */
  domain: FeatureDomain;
}
