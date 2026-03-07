/**
 * =========================================================
 * Feature DTO Mapper
 * ---------------------------------------------------------
 * Contiene funciones responsables de transformar documentos
 * provenientes de la base de datos (`FeatureDocument`) en
 * DTOs utilizados por la capa de aplicación o expuestos
 * al cliente mediante la API.
 *
 * Este mapper separa:
 * - el modelo de persistencia (Mongoose)
 * - el contrato público de la API (DTO)
 *
 * Además gestiona la resolución de contenido localizado
 * según el idioma solicitado.
 *
 * Arquitectura:
 * - Mapper de infraestructura
 * - Adaptador entre modelo de datos y DTO
 * - Manejo centralizado de internacionalización (i18n)
 *
 * Responsabilidades:
 * - Resolver idioma solicitado con fallback
 * - Convertir documentos de base de datos a DTOs
 * - Evitar exponer directamente modelos de Mongoose
 *
 * Utilizado en:
 * - servicios de features
 * - controladores API
 * - endpoints de listado y detalle
 * =========================================================
 */

import { FeatureEntityDTO } from "@/infrastructure/feature/feature.entity.dto";
import { FeatureListDTO } from "@/infrastructure/feature/feature.list.dto";
import { Language } from "@/lib/i18n";
import { LANGUAGES } from "@/lib/i18n/language";
import { FeatureDocument } from "@/models/features/feature.document";

/**
 * =========================================================
 * resolveLanguage
 * ---------------------------------------------------------
 * Obtiene el contenido localizado de una feature según
 * el idioma solicitado.
 *
 * Comportamiento:
 * - Si el idioma existe en el documento → se retorna.
 * - Si no existe → se aplica fallback al español.
 *
 * Esto evita errores cuando el contenido aún no está
 * disponible en todos los idiomas soportados.
 *
 * @param feature Documento de feature de Mongoose
 * @param lang Idioma solicitado
 *
 * @returns Objeto con título y descripción localizados
 * =========================================================
 */
function resolveLanguage(
  feature: FeatureDocument,
  lang: Language
) {
  if (feature.content[lang]) {
    return feature.content[lang];
  }

  /**
   * Idioma fallback por defecto del sistema.
   */
  const fallback = LANGUAGES.ES;

  return feature.content[fallback];
}

/**
 * =========================================================
 * toFeatureListDTO
 * ---------------------------------------------------------
 * Convierte un `FeatureDocument` en `FeatureListDTO`.
 *
 * Transformaciones realizadas:
 * - Aplana la estructura multilenguaje
 * - Retorna únicamente el contenido del idioma solicitado
 * - Convierte `_id` de MongoDB a string
 *
 * Este DTO está optimizado para:
 * - listados
 * - tablas
 * - previews
 *
 * @param feature Documento de feature
 * @param lang Idioma solicitado
 *
 * @returns FeatureListDTO
 * =========================================================
 */
export function toFeatureListDTO(
  feature: FeatureDocument,
  lang: Language
): FeatureListDTO {

  /**
   * Obtiene contenido localizado con fallback.
   */
  const localized = resolveLanguage(feature, lang);

  return {
    id: feature._id.toString(),
    title: localized.title,
    description: localized.description,
    domain: feature.domain,
  };
}

/**
 * =========================================================
 * toFeatureEntityDTO
 * ---------------------------------------------------------
 * Convierte un `FeatureDocument` en `FeatureEntityDTO`
 * completo.
 *
 * A diferencia del DTO de listado:
 * - Mantiene toda la estructura multilenguaje
 * - No realiza flatten del contenido
 *
 * Este DTO es utilizado en:
 * - endpoints de detalle
 * - formularios de edición
 * - paneles administrativos
 *
 * @param feature Documento de feature
 *
 * @returns FeatureEntityDTO
 * =========================================================
 */
export function toFeatureEntityDTO(
  feature: FeatureDocument,
): FeatureEntityDTO {
  return {
    content: feature.content,
    domain: feature.domain,
  };
}