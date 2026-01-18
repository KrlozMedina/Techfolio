import { Schema } from "mongoose";
import { IFeature } from "./feature.interface";
import { FeatureDomain } from "@/shared/enums/feature-domain.enum";
import { slugify } from "@/lib/utils/slugify";

/**
 * Schema de Feature.
 *
 * - Soporta contenido multilenguaje (es / en)
 * - Usa slug único para URLs y búsquedas
 * - Clasifica la feature por dominio funcional
 * - Incluye timestamps automáticos
 */
export const FeatureSchema = new Schema<IFeature>(
  {
    /**
     * Slug único de la feature.
     * Se usa para URLs y referencias legibles.
     */
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    /**
     * Contenido localizado por idioma.
     * Cada idioma requiere título y descripción.
     */
    content: {
      es: {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
      en: {
        title: { type: String, required: true },
        description: { type: String, required: true },
      }
    },

    /**
     * Dominio funcional de la feature.
     * Restringido al enum FeatureDomain.
     */
    domain: {
      type: String,
      enum: Object.values(FeatureDomain),
      required: true,
    },
  },
  {
    /**
     * Agrega createdAt y updatedAt automáticamente.
     */
    timestamps: true,
  }
);

/* =========================
  Hooks
========================= */

/**
 * Pre-validate hook
 *
 * - Genera el slug automáticamente si no existe
 * - Prioriza el título en inglés, luego español
 */
FeatureSchema.pre("validate", function (next) {
  if (!this.slug) {
    const source =
      this.content.en?.title || this.content.es?.title;

    if (source) {
      this.slug = slugify(source);
    }
  }
  next();
});

/**
 * Pre-findOneAndUpdate hook
 *
 * - Regenera el slug cuando cambia el título
 * - Soporta updates directos y mediante $set
 */
FeatureSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as any;

  const langSource =
    update?.$set?.content?.en?.title ||
    update?.$set?.content?.es?.title ||
    update?.content?.en?.title ||
    update?.content?.es?.title;

  if (langSource) {
    update.$set = {
      ...(update.$set || {}),
      slug: slugify(langSource),
    };
  }

  next();
});
