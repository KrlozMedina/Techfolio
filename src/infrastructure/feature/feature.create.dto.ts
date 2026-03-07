/**
 * =========================================================
 * Feature Creation Validation Schema
 * ---------------------------------------------------------
 * Define los esquemas de validación y tipos utilizados
 * para la creación de una Feature dentro del sistema.
 *
 * Este módulo utiliza Zod para validar:
 * - contenido multilenguaje
 * - dominio funcional de la feature
 *
 * Arquitectura:
 * - Validación en capa de aplicación
 * - Compatible con DTOs usados en servicios y API
 * - Preparado para internacionalización (i18n)
 *
 * Responsabilidades:
 * - Validar datos antes de crear una Feature
 * - Garantizar consistencia del contenido localizado
 * - Mantener tipado fuerte entre validación y DTO
 *
 * Utilizado en:
 * - formularios de creación de features
 * - endpoints POST /features
 * - servicios de aplicación
 * =========================================================
 */

import { FeatureDomain } from "@/shared/enums/feature-domain.enum";
import z from "zod";

/**
 * =========================================================
 * localizedContentSchema
 * ---------------------------------------------------------
 * Schema que valida el contenido localizado de una feature.
 *
 * Cada idioma incluye:
 * - title: título corto de la feature
 * - description: descripción de la feature
 *
 * Restricciones:
 * - title: mínimo 1 caracter, máximo 25
 * - description: mínimo 1 caracter, máximo 100
 * =========================================================
 */
const localizedContentSchema = z.object({
  /** Title of the feature (1-25 characters) */
  title: z.string().min(1).max(25),

  /** Description of the feature (1-100 characters) */
  description: z.string().min(1).max(100),
});

/**
 * =========================================================
 * contentSchema
 * ---------------------------------------------------------
 * Schema que agrupa el contenido localizado en los idiomas
 * soportados por el sistema.
 *
 * Idiomas actuales:
 * - es (Español)
 * - en (English)
 *
 * Cada idioma debe cumplir `localizedContentSchema`.
 * =========================================================
 */
const contentSchema = z.object({
  es: localizedContentSchema, // Spanish content
  en: localizedContentSchema, // English content
});

/**
 * =========================================================
 * createFeatureSchema
 * ---------------------------------------------------------
 * Schema principal utilizado para validar la creación de
 * una Feature.
 *
 * Estructura esperada:
 * {
 *   content: {
 *     es: { title, description },
 *     en: { title, description }
 *   },
 *   domain: FeatureDomain
 * }
 *
 * Donde:
 * - content contiene el contenido localizado
 * - domain clasifica la feature dentro de un dominio
 * =========================================================
 */
export const createFeatureSchema = z.object({
  content: contentSchema,         // Multilanguage content
  domain: z.enum(FeatureDomain),  // Domain of the feature
});

/**
 * =========================================================
 * LocalizedFeatureContent
 * ---------------------------------------------------------
 * Tipo que representa el contenido localizado de una
 * feature para un idioma específico.
 *
 * @property title - título de la feature
 * @property description - descripción de la feature
 * =========================================================
 */
type LocalizedFeatureContent = {
  title: string;
  description: string;
};

/**
 * =========================================================
 * CreateFeatureDTO
 * ---------------------------------------------------------
 * Data Transfer Object utilizado para crear una feature.
 *
 * Debe coincidir con la estructura validada por
 * `createFeatureSchema`.
 *
 * Utilizado en:
 * - capa de aplicación
 * - requests hacia la API
 * - servicios de dominio
 *
 * @property content - contenido localizado en español e inglés
 * @property domain - dominio al que pertenece la feature
 * =========================================================
 */
export type CreateFeatureDTO = {
  content: {
    es: LocalizedFeatureContent; // Spanish content
    en: LocalizedFeatureContent; // English content
  };
  domain: FeatureDomain;         // Domain category
};