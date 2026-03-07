/**
 * =========================================================
 * Category DTO Mapper
 * ---------------------------------------------------------
 * Contiene funciones encargadas de transformar documentos
 * del modelo de datos (`CategoryDocument`) en DTOs
 * utilizados por la capa de aplicación o la API.
 *
 * Este mapper cumple dos funciones principales:
 *
 * 1. Resolver contenido localizado según el idioma solicitado.
 * 2. Convertir documentos de base de datos a DTOs seguros
 *    para exposición al cliente.
 *
 * Arquitectura:
 * - Capa de infraestructura (adapter / mapper)
 * - Aísla el modelo de persistencia del contrato API
 * - Maneja lógica de internacionalización (i18n)
 *
 * Responsabilidades:
 * - Resolver idioma solicitado con fallback
 * - Convertir documentos Mongo/Mongoose a DTOs
 * - Evitar exponer directamente el modelo de base de datos
 *
 * Utilizado en:
 * - servicios de aplicación
 * - controladores
 * - endpoints de categorías
 * =========================================================
 */

import { CategoryEntityDTO } from "@/infrastructure/category/category.entity.dto";
import { CategoryListDTO } from "@/infrastructure/category/category.list.dto";
import { Language } from "@/lib/i18n";
import { LANGUAGES } from "@/lib/i18n/language";
import { CategoryDocument } from "@/models/category/category.document";

/**
 * =========================================================
 * resolveLanguage
 * ---------------------------------------------------------
 * Resuelve el contenido localizado de una categoría según
 * el idioma solicitado.
 *
 * Comportamiento:
 * - Si existe contenido en el idioma solicitado → lo retorna.
 * - Si no existe → aplica fallback a español.
 *
 * Esto evita errores cuando el contenido aún no está
 * traducido a todos los idiomas soportados.
 *
 * @param category - Documento de categoría desde la base de datos.
 * @param lang - Idioma solicitado por el cliente.
 *
 * @returns Contenido localizado (title y description).
 * =========================================================
 */
function resolveLanguage(
  category: CategoryDocument,
  lang: Language
) {
  if (category.content[lang]) {
    return category.content[lang];
  }

  /**
   * Idioma fallback por defecto del sistema.
   */
  const fallback = LANGUAGES.ES;

  return category.content[fallback];
}

/**
 * =========================================================
 * toCategoryListDTO
 * ---------------------------------------------------------
 * Convierte un `CategoryDocument` en `CategoryListDTO`.
 *
 * Transformaciones realizadas:
 * - Aplana la estructura i18n
 * - Devuelve únicamente el contenido en el idioma solicitado
 * - Convierte `_id` de MongoDB a string
 *
 * Este DTO está optimizado para:
 * - listados
 * - tablas
 * - endpoints GET de colecciones
 *
 * @param category - Documento de categoría.
 * @param lang - Idioma solicitado.
 *
 * @returns CategoryListDTO
 * =========================================================
 */
export function toCategoryListDTO(
  category: CategoryDocument,
  lang: Language
): CategoryListDTO {

  /**
   * Obtiene contenido localizado aplicando fallback.
   */
  const localized = resolveLanguage(category, lang);

  return {
    id: category._id.toString(),
    title: localized.title,
    description: localized.description,
  };
}

/**
 * =========================================================
 * toCategoryEntityDTO
 * ---------------------------------------------------------
 * Convierte un `CategoryDocument` en `CategoryEntityDTO`.
 *
 * A diferencia del DTO de listado:
 * - Mantiene la estructura completa multilenguaje
 * - No realiza flatten del contenido
 *
 * Este DTO es útil para:
 * - endpoints de detalle
 * - paneles de administración
 * - edición de contenido multilenguaje
 *
 * @param category - Documento de categoría.
 *
 * @returns CategoryEntityDTO
 * =========================================================
 */
export function toCategoryEntityDTO(
  category: CategoryDocument,
): CategoryEntityDTO {
  return {
    content: category.content,
  };
}