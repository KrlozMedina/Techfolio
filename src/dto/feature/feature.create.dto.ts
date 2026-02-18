import { FeatureDomain } from "@/shared/enums/feature-domain.enum";
import z from "zod";

/**
 * Schema for validating localized content of a feature.
 * Each language version has a title and description with length restrictions.
 */
const localizedContentSchema = z.object({
  /** Title of the feature (1-25 characters) */
  title: z.string().min(1).max(25),
  
  /** Description of the feature (1-100 characters) */
  description: z.string().min(1).max(100),
});

/**
 * Schema for validating the content of a feature in multiple languages.
 * Currently supports Spanish (es) and English (en).
 */
const contentSchema = z.object({
  es: localizedContentSchema, // Spanish content
  en: localizedContentSchema, // English content
});

/**
 * Schema for creating a feature.
 * Combines localized content with a feature domain enum.
 */
export const createFeatureSchema = z.object({
  content: contentSchema,      // Multilanguage content
  domain: z.enum(FeatureDomain), // Domain of the feature
});

/**
 * Type representing the structure of localized feature content.
 */
type LocalizedFeatureContent = {
  title: string;
  description: string;
};

/**
 * DTO (Data Transfer Object) for creating a feature.
 * Matches the validated shape of `createFeatureSchema`.
 */
export type CreateFeatureDTO = {
  content: {
    es: LocalizedFeatureContent; // Spanish content
    en: LocalizedFeatureContent; // English content
  };
  domain: FeatureDomain;         // Domain category
};
