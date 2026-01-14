import { Schema } from "mongoose";
import { ICategory } from "./category.interface";
import { slugify } from "@/lib/utils/slugify";

/**
 * Estructura reutilizable para contenido localizado.
 * Se usa para cada idioma soportado.
 */
const localizedInfo = {
  title: { type: String, required: true },
  description: { type: String, required: true },
};

/**
 * Schema de categoría.
 * - Contenido multilenguaje (es / en)
 * - Slug único usado para URLs y búsquedas
 * - Timestamps automáticos (createdAt, updatedAt)
 */
export const CategorySchema = new Schema<ICategory>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    es: {
      type: localizedInfo,
      required: true,
    },
    en: {
      type: localizedInfo,
      required: true,
    },
  },
  { timestamps: true }
);

/* =========================
  Hooks
========================= */

/**
 * Pre-validate hook
 * - Genera el slug automáticamente si no fue enviado
 * - Prioriza título en inglés, luego español
 */
CategorySchema.pre("validate", function (next) {
  if (!this.slug) {
    const source =
      this.en?.title || this.es?.title;

    if (source) {
      this.slug = slugify(source);
    }
  }
  next();
});

/**
 * Pre-findOneAndUpdate hook
 * - Regenera el slug cuando cambia el título
 * - Soporta updates con y sin $set
 */
CategorySchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as any;

  const langSource =
    update?.$set?.en?.title ||
    update?.$set?.es?.title ||
    update?.en?.title ||
    update?.es?.title;

  if (langSource) {
    update.$set = {
      ...(update.$set || {}),
      slug: slugify(langSource),
    };
  }

  next();
});
