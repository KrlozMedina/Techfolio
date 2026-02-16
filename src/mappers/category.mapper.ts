import { CategoryEntityDTO } from "@/dto/category/category.entity.dto";
import { CategoryListDTO } from "@/dto/category/category.list.dto";
import { CategoryDocument } from "@/models/category/category.document";
import { Language, LANGUAGES } from "@/shared/enums";

/**
 * Resuelve el contenido localizado según el idioma solicitado.
 * 
 * - Si existe el idioma solicitado → lo retorna.
 * - Si no existe → aplica fallback a español.
 */
function resolveLanguage(
  category: CategoryDocument,
  lang: Language
) {
  if (category.content[lang]) {
    return category.content[lang];
  }

  const fallback = LANGUAGES.ES;
  return category.content[fallback];
}

/**
 * Convierte un CategoryDocument en CategoryListDTO.
 * 
 * - Aplana la estructura i18n.
 * - Devuelve solo el idioma solicitado.
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
 * Convierte un CategoryDocument en CategoryEntityDTO.
 * 
 * - Devuelve la estructura completa multi-idioma.
 */
export function toCategoryEntityDTO(
  category: CategoryDocument,
): CategoryEntityDTO {
  return {
    content: category.content,
  };
}
