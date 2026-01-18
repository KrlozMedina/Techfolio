/**
 * Mappers para DTOs de Feature.
 * - Convierte documentos de Mongo a DTOs optimizados
 * - Resuelve contenido localizado según idioma solicitado
 */

import { FeatureDetailDTO } from "@/dto/features/feature.detail.dto";
import { FeatureListDTO } from "@/dto/features/feature.list.dto";
import { FeatureDocument } from "@/models/features/feature.document";
import { Language, LANGUAGES } from "@/shared/enums";

/**
 * Resuelve el contenido localizado de una feature.
 * - Usa el idioma solicitado si existe
 * - Aplica fallback a español si no está disponible
 */
function resolveLanguage(
  feature: FeatureDocument,
  lang: Language
) {
  if (feature.content[lang]) {
    return feature.content[lang];
  }

  const fallback = LANGUAGES.ES;
  return feature.content[fallback];
}

/**
 * Mapper para listado de features.
 * - Convierte un FeatureDocument a FeatureListDTO
 * - Incluye solo los campos necesarios para listados
 */
export function toFeatureListDTO(
  feature: FeatureDocument,
  lang: Language
): FeatureListDTO {
  const localized = resolveLanguage(feature, lang);

  return {
    id: feature._id.toString(),
    slug: feature.slug,
    title: localized.title,
  };
}

/**
 * Mapper para detalle de feature.
 * - Convierte un FeatureDocument a FeatureDetailDTO
 * - Incluye contenido completo y el dominio
 */
export function toFeatureDetailDTO(
  feature: FeatureDocument,
  lang: Language
): FeatureDetailDTO {
  const localized = resolveLanguage(feature, lang);

  return {
    id: feature._id.toString(),
    slug: feature.slug,
    title: localized.title,
    description: localized.description,
    domain: feature.domain,
  };
}
