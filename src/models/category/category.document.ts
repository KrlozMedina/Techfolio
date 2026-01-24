import { Document } from "mongoose";

/**
 * Representa el contenido localizado de una categoría.
 * Contiene únicamente información dependiente del idioma.
 */
interface LocalizedCategoryInfo {
  /** Título visible de la categoría */
  title: string;

  /** Descripción asociada a la categoría */
  description: string;
}

/**
 * Modelo de documento de Categoría en MongoDB.
 *
 * Extiende `Document` para incluir las propiedades internas de Mongoose
 * (_id, métodos de persistencia, etc.).
 */
export interface CategoryDocument extends Document {
  /**
   * Identificador legible y único usado en URLs.
   * Debe ser estable y no depender del idioma.
   */
  slug: string;

  /**
   * Contenido multilenguaje de la categoría.
   * Cada clave representa un idioma soportado.
   */
  content: {
    /** Contenido en español */
    es: LocalizedCategoryInfo;

    /** Contenido en inglés */
    en: LocalizedCategoryInfo;
  };

  /** Fecha de creación del documento */
  createdAt: Date;

  /** Fecha de última actualización del documento */
  updatedAt: Date;
}
