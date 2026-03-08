/**
 * =========================================================
 * Category Creation Validation Schema
 * ---------------------------------------------------------
 * Define los esquemas de validación utilizados para la
 * creación de categorías dentro del sistema.
 *
 * Este archivo utiliza Zod para validar la estructura
 * y restricciones del contenido antes de ser procesado
 * por la aplicación o enviado al backend.
 *
 * Incluye:
 * - validación de contenido localizado
 * - estructura multilenguaje
 * - DTO tipado compatible con el schema
 *
 * Arquitectura:
 * - Zod como librería de validación
 * - Tipos TypeScript alineados con el schema
 * - Preparado para internacionalización (i18n)
 *
 * Responsabilidades:
 * - Validar datos antes de crear una categoría
 * - Garantizar consistencia en contenido multilenguaje
 * - Proveer tipos seguros para la capa de aplicación
 *
 * Utilizado en:
 * - formularios de creación de categorías
 * - validación en capa de aplicación
 * - endpoints de creación
 * =========================================================
 */

import z from "zod";

/**
 * =========================================================
 * localizedContentSchema
 * ---------------------------------------------------------
 * Schema para validar contenido localizado por idioma.
 *
 * Campos:
 * - title       -> requerido, máximo 25 caracteres
 * - description -> requerido, máximo 100 caracteres
 *
 * Este esquema se reutiliza para cada idioma soportado.
 * =========================================================
 */
const localizedContentSchema = z.object({
  title: z.string().min(1).max(25),
  description: z.string().min(1).max(100),
});

/**
 * =========================================================
 * contentSchema
 * ---------------------------------------------------------
 * Schema que agrupa el contenido localizado según los
 * idiomas soportados por el sistema.
 *
 * Actualmente soporta:
 * - es (español)
 * - en (inglés)
 *
 * Cada idioma debe cumplir el esquema de contenido
 * definido en `localizedContentSchema`.
 * =========================================================
 */
const contentSchema = z.object({
  es: localizedContentSchema,
  en: localizedContentSchema,
});

/**
 * =========================================================
 * createCategorySchema
 * ---------------------------------------------------------
 * Schema principal para la creación de una categoría.
 *
 * Requiere una estructura completa de contenido
 * localizado para todos los idiomas soportados.
 *
 * Estructura esperada:
 * {
 *   content: {
 *     es: { title, description },
 *     en: { title, description }
 *   }
 * }
 * =========================================================
 */
export const createCategorySchema = z.object({
  content: contentSchema,
});

/**
 * =========================================================
 * LocalizedCategoryContent
 * ---------------------------------------------------------
 * Tipo que representa el contenido localizado de una
 * categoría para un idioma específico.
 *
 * @property title       -> título de la categoría
 * @property description -> descripción de la categoría
 * =========================================================
 */
type LocalizedCategoryContent = {
  title: string;
  description: string;
};

/**
 * =========================================================
 * CreateCategoryDTO
 * ---------------------------------------------------------
 * Data Transfer Object utilizado para la creación de
 * categorías dentro de la aplicación.
 *
 * Debe coincidir exactamente con la estructura validada
 * por `createCategorySchema`.
 *
 * Utilizado en:
 * - servicios de aplicación
 * - requests hacia backend
 * - formularios de creación
 * =========================================================
 */
export type CreateCategoryDTO = {
  content: {
    es: LocalizedCategoryContent;
    en: LocalizedCategoryContent;
  };
};