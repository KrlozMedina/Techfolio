import { CategoryDocument } from "@/models/category/category.document";
import { CategoryReadDTO } from "@/dto/category/category.read.dto";
import { Language, LANGUAGES } from "@/shared/enums";

/**
 * Obtiene el contenido localizado de una categoría según el idioma solicitado.
 *
 * Comportamiento:
 * - Retorna el contenido en el idioma solicitado si existe.
 * - Si no existe, aplica fallback al idioma español (ES).
 *
 * @param category Documento de categoría obtenido desde MongoDB
 * @param lang Idioma solicitado (definido en LANGUAGES)
 * @returns Contenido localizado de la categoría
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
 * Mapper para listado de categorías.
 *
 * Convierte un documento de MongoDB en un DTO listo para ser consumido
 * por la capa de presentación, resolviendo el contenido según el idioma.
 *
 * @param category Documento de categoría
 * @param lang Idioma solicitado
 * @returns CategoryListDTO con contenido localizado
 */
export function toCategoryReadDTO(
  category: CategoryDocument,
  lang: Language
): CategoryReadDTO {
  const localized = resolveLanguage(category, lang);

  return {
    id: category._id.toString(),
    slug: category.slug,
    title: localized.title,
    description: localized.description,
  };
};