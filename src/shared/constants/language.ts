/**
 * Idiomas soportados por el sistema.
 * Se usa como fuente única de verdad para validaciones y DTOs.
 */
export const LANGUAGES = {
  ES: 'es',
  EN: 'en',
} as const;

/**
 * Tipo unión de idiomas válidos.
 * Resultado: "es" | "en"
 */
export type Language = (typeof LANGUAGES)[keyof typeof LANGUAGES];
