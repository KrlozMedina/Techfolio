import { z } from "zod";
import { LANGUAGES } from "../enums";

/**
 * Schema para validar query params en endpoints GET.
 *
 * Soporta:
 * - limit → cantidad de registros por página (mínimo 1)
 * - page → número de página (mínimo 1)
 * - language → idioma válido definido en LANGUAGES
 * - search → string opcional normalizado (trim + empty → undefined)
 */
export const querySchema = z.object({
  limit: z.coerce.number().min(1).optional(),

  page: z.coerce.number().min(1).optional(),

  language: z.enum(LANGUAGES).optional(),

  search: z
    .string()
    .optional()
    .transform((val) => {
      const trimmed = val?.trim();
      return trimmed && trimmed.length > 0 ? trimmed : undefined;
    }),
});
