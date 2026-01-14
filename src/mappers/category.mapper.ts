import { CategoryDocument } from "@/models/category/category.document";
import { CategoryDetailDTO } from "@/dto/category/category.detail.dto";
import { CategoryListDTO } from "@/dto/category/category.list.dto";
import { Language, LANGUAGES } from "@/shared/constants";

/**
 * Resuelve el contenido localizado de una categoría.
 * - Usa el idioma solicitado si existe
 * - Aplica fallback a español si no está disponible
 */
function resolveLanguage(
  category: CategoryDocument,
  lang: Language
) {
  if (category[lang]) return category[lang];

  const fallback = LANGUAGES.ES;
  return category[fallback];
}

/**
 * Mapper para listado de categorías.
 * Convierte el documento de Mongo a DTO localizado.
 */
export function toCategoryListDTO(
  category: CategoryDocument,
  lang: Language
): CategoryListDTO {
  const localized = resolveLanguage(category, lang);

  return {
    id: category._id.toString(),
    title: localized.title,
    description: localized.description,
  };
}

/**
 * Mapper para detalle de categoría.
 * Incluye el slug además del contenido localizado.
 */
export function toCategoryDetailDto(
  category: CategoryDocument,
  lang: Language
): CategoryDetailDTO {
  const localized = resolveLanguage(category, lang);

  return {
    id: category._id.toString(),
    slug: category.slug,
    title: localized.title,
    description: localized.description,
  };
}
