import { ExperienceLevel } from "@/shared/enums/experience-level.enum";
import { Document } from "mongoose";

/**
 * Documento de tecnología en MongoDB.
 * Representa la estructura completa almacenada en la colección.
 */
export interface TechnologyDocument extends Document {
  /** Nombre de la tecnología */
  name: string;

  /** Identificador único legible para URLs (slug) */
  slug: string;

  /**
   * Referencia a la categoría asociada.
   * Puede ser solo el slug o un documento poblado de categoría.
   */
  categoryId: {
    slug: string;
  };

  /** URL del icono de la tecnología (opcional) */
  iconUrl?: string;

  /** URL del sitio web de la tecnología (opcional) */
  websiteUrl?: string;

  /** Nivel de experiencia requerido o alcanzado */
  experienceLevel: ExperienceLevel;

  /** Fecha de creación del documento */
  createdAt: Date;

  /** Fecha de última actualización del documento */
  updatedAt: Date;
}
