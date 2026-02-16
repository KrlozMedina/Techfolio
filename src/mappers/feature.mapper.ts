import { FeatureEntityDTO } from "@/dto/features/feature.entity.dto";
import { FeatureListDTO } from "@/dto/features/feature.list.dto";
import { FeatureDocument } from "@/models/features/feature.document";
import { Language, LANGUAGES } from "@/shared/enums";

/**
 * Obtiene el contenido localizado de una feature según el idioma solicitado.
 * Si no existe contenido en el idioma solicitado, devuelve el contenido en español como fallback.
 *
 * @param feature - Documento de feature de Mongoose
 * @param lang - Idioma deseado
 * @returns Contenido localizado (título y descripción)
 */
function resolveLanguage(
  feature: FeatureDocument,
  lang: Language
) {
  if (feature.content[lang]) {
    return feature.content[lang];
  }

  // Fallback al español si el idioma solicitado no existe
  const fallback = LANGUAGES.ES;
  return feature.content[fallback];
}

/**
 * Convierte un FeatureDocument a FeatureListDTO para listados o previews.
 * Incluye solo el contenido en el idioma solicitado y el dominio.
 *
 * @param feature - Documento de feature
 * @param lang - Idioma deseado
 * @returns FeatureListDTO con id, título, descripción y dominio
 */
export function toFeatureListDTO(
  feature: FeatureDocument,
  lang: Language
): FeatureListDTO {
  const localized = resolveLanguage(feature, lang);

  return {
    id: feature._id.toString(),
    title: localized.title,
    description: localized.description,
    domain: feature.domain,
  };
}

/**
 * Convierte un FeatureDocument a FeatureEntityDTO completo.
 * Mantiene todo el contenido multilenguaje y el dominio.
 *
 * @param feature - Documento de feature
 * @returns FeatureEntityDTO
 */
export function toFeatureEntityDTO(
  feature: FeatureDocument,
): FeatureEntityDTO {
  return {
    content: feature.content,
    domain: feature.domain,
  };
}
