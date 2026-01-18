import { FeatureDomain } from "@/shared/enums/feature-domain.enum";
import { Document } from "mongoose";

/**
 * Contenido localizado de una feature.
 * Define los campos obligatorios por idioma.
 */
interface LocalizedFeatureInfo {
  /** Título de la feature */
  title: string;

  /** Descripción detallada de la feature */
  description: string;
}

/**
 * Documento Feature en MongoDB.
 * Representa una funcionalidad del sistema con soporte multilenguaje.
 */
export interface FeatureDocument extends Document {
  /** Identificador legible para URLs */
  slug: string;

  /**
   * Contenido localizado por idioma.
   * Debe existir al menos en español e inglés.
   */
  content: {
    es: LocalizedFeatureInfo;
    en: LocalizedFeatureInfo;
  };

  /** Dominio funcional de la feature */
  domain: FeatureDomain;

  /** Fecha de creación */
  createdAt: Date;

  /** Fecha de última actualización */
  updatedAt: Date;
}
