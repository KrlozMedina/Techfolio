import mongoose from "mongoose";
import { CategorySchema } from "./category.schema";

/**
 * Modelo Category.
 *
 * - Reutiliza el modelo si ya existe (evita errores en hot-reload de Next.js)
 * - Usa explícitamente la colección "categories"
 */
export const Category =
  mongoose.models.Category ||
  mongoose.model("Category", CategorySchema, "categories");
