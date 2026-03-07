/**
 * =========================================================
 * Success Case Mappers
 * ---------------------------------------------------------
 * Este módulo contiene funciones de transformación
 * (mappers) que convierten documentos de MongoDB
 * (`SuccessCaseDocument`) en diferentes DTOs utilizados
 * por la aplicación.
 *
 * Cada mapper tiene un propósito específico dependiendo
 * del contexto de uso:
 *
 * - SuccessCaseListDTO   → vistas de listado (cards, grids)
 * - SuccessCaseDetailDTO → vista detallada de un caso
 * - SuccessCaseEntityDTO → representación completa del dominio
 *
 * Arquitectura:
 * - Ubicado en la capa de infraestructura
 * - Encargado de adaptar documentos de persistencia
 *   a contratos de API o dominio
 *
 * Responsabilidades:
 * - Resolver contenido localizado según idioma
 * - Reducir o expandir estructuras según el DTO destino
 * - Convertir identificadores de MongoDB a strings
 *
 * Utilizado en:
 * - servicios de aplicación
 * - endpoints de la API
 * - controladores que retornan Success Cases
 * =========================================================
 */

import { SuccessCaseDetailDTO } from "@/infrastructure/success-case/success-case.detail.dto";
import { SuccessCaseEntityDTO } from "@/infrastructure/success-case/success-case.entity.dto";
import { SuccessCaseListDTO } from "@/infrastructure/success-case/success-case.list.dto";
import { Language } from "@/lib/i18n";
import { SuccessCaseDocument } from "@/models/success-case/success-case.document";

/**
 * =========================================================
 * toSuccessCaseListDTO
 * ---------------------------------------------------------
 * Transforma un documento de MongoDB en un DTO optimizado
 * para vistas de listado.
 *
 * Características:
 * - Resuelve contenido según idioma
 * - Reduce la estructura del documento
 * - Convierte `_id` de MongoDB a string
 * - Expone solo la información necesaria para cards o grids
 *
 * @param successCase Documento de Success Case proveniente de MongoDB
 * @param lang Idioma solicitado para resolver contenido localizado
 * @returns DTO optimizado para listados
 * =========================================================
 */
export function toSuccessCaseListDTO(
  successCase: SuccessCaseDocument,
  lang: Language
): SuccessCaseListDTO {
  return {
    id: successCase._id.toString(),
    slug: successCase.slug,
    title: successCase.content[lang].title,
    summary: successCase.content[lang].summary,
    coverImage: successCase.media.cover.src,
    blurCoverImage: successCase.media.cover.blurDataURL,
    projectIds: successCase.projectIds.map(p => ({ slug: p.slug })),
    status: successCase.status,
    commentsEnabled: successCase.commentsEnabled,
    commentsCount: successCase.commentsCount,
    visibility: successCase.visibility,
  };
}

/**
 * =========================================================
 * toSuccessCaseDetailDTO
 * ---------------------------------------------------------
 * Convierte un documento de Success Case en un DTO
 * detallado utilizado en páginas de detalle.
 *
 * Características:
 * - Resuelve contenido localizado según idioma
 * - Incluye impacto, métricas y media completa
 * - Mantiene relaciones con proyectos
 *
 * @param successCase Documento de Success Case proveniente de MongoDB
 * @param lang Idioma solicitado
 * @returns DTO detallado del caso de éxito
 * =========================================================
 */
export function toSuccessCaseDetailDTO(
  successCase: SuccessCaseDocument,
  lang: Language
): SuccessCaseDetailDTO {
  return {
    id: successCase._id.toString(),
    content: successCase.content[lang],
    impact: successCase.impact[lang],
    metrics: successCase.metrics,
    media: successCase.media,
    projectIds: successCase.projectIds,
    role: successCase.role,
    scalability: successCase.scalability[lang],
    visibility: successCase.visibility,
    timeline: successCase.timeline,
  };
}

/**
 * =========================================================
 * toSuccessCaseEntityDTO
 * ---------------------------------------------------------
 * Convierte el documento de MongoDB en un DTO de entidad
 * completo utilizado en la capa de dominio.
 *
 * Características:
 * - Mantiene la estructura multilenguaje completa
 * - No resuelve idioma
 * - Conserva todas las propiedades del dominio
 *
 * @param successCase Documento de Success Case proveniente de MongoDB
 * @returns DTO completo de entidad
 * =========================================================
 */
export function toSuccessCaseEntityDTO(
  successCase: SuccessCaseDocument
): SuccessCaseEntityDTO {
  return {
    content: successCase.content,
    impact: successCase.impact,
    metrics: successCase.metrics,
    media: successCase.media,
    projectIds: successCase.projectIds,
    role: successCase.role,
    status: successCase.status,
    scalability: successCase.scalability,
    commentsEnabled: successCase.commentsEnabled,
    commentsCount: successCase.commentsCount,
    visibility: successCase.visibility,
    timeline: successCase.timeline,
  };
}