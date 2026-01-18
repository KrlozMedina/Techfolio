import { FeatureDomain } from "@/shared/enums/feature-domain.enum";
import { Types } from "mongoose";

/**
 * Interface base de Feature.
 *
 * Define la estructura tipada usada por:
 * - Schema de Mongoose
 * - Servicios y lógica de dominio
 */
export interface IFeature {
  /**
   * Identificador único del documento.
   * Puede ser ObjectId o string serializado.
   */
  _id: Types.ObjectId | string;

  /**
   * Slug único y legible para URLs.
   */
  slug: string;

  /**
   * Contenido localizado por idioma.
   * Cada idioma requiere título y descripción.
   */
  content: {
    es: {
      title: string;
      description: string;
    };
    en: {
      title: string;
      description: string;
    };
  };

  /**
   * Dominio funcional de la feature.
   * Define su propósito (técnico, UI, backend, etc.).
   */
  domain: FeatureDomain;

  /**
   * Fecha de creación del documento.
   * Gestionada automáticamente por Mongoose.
   */
  createdAt?: Date;

  /**
   * Fecha de última actualización.
   * Gestionada automáticamente por Mongoose.
   */
  updatedAt?: Date;
}
