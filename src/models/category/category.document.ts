import { Document } from "mongoose";

/**
 * Contenido localizado de una categoría.
 * Representa la información dependiente del idioma.
 */
export interface LocalizedCategoryInfo {
  title: string;
  description: string;
}

/**
 * Documento de categoría en MongoDB.
 * Extiende Document para incluir metadata de Mongoose.
 */
export interface CategoryDocument extends Document {
  /** Identificador legible para URLs */
  slug: string;

  /** Contenido en español */
  es: LocalizedCategoryInfo;

  /** Contenido en inglés */
  en: LocalizedCategoryInfo;

  /** Fecha de creación del documento */
  createdAt: Date;

  /** Fecha de última actualización */
  updatedAt: Date;
}
