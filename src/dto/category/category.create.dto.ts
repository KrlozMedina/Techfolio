import z from "zod";

/**
 * Schema para contenido localizado (por idioma).
 * - title: requerido, máximo 25 caracteres
 * - description: requerido, máximo 100 caracteres
 */
const localizedContentSchema = z.object({
  title: z.string().min(1).max(25),
  description: z.string().min(1).max(100),
});

/**
 * Schema que agrupa los idiomas soportados.
 * Actualmente soporta:
 * - es (español)
 * - en (inglés)
 */
const contentSchema = z.object({
  es: localizedContentSchema,
  en: localizedContentSchema,
});

/**
 * Schema principal para crear una categoría.
 * Requiere estructura completa de contenido por idioma.
 */
export const createCategorySchema = z.object({
  content: contentSchema,
});

/**
 * Tipo para contenido localizado.
 */
type LocalizedCategoryContent = {
  title: string;
  description: string;
};

/**
 * DTO para creación de categoría.
 * Debe coincidir con el schema de validación.
 */
export type CreateCategoryDTO = {
  content: {
    es: LocalizedCategoryContent;
    en: LocalizedCategoryContent;
  };
};
