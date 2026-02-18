import { SuccessCaseDetailDTO } from "@/dto/success-case/success-case.detail.dto";
import { SuccessCaseEntityDTO } from "@/dto/success-case/success-case.entity.dto";
import { SuccessCaseListDTO } from "@/dto/success-case/success-case.list.dto";
import { SuccessCaseDocument } from "@/models/success-case/success-case.document";
import { Language } from "@/shared/enums";

/**
 * Transforma un documento de MongoDB en un DTO optimizado para listados.
 *
 * - Resuelve contenido según idioma.
 * - Reduce estructura para vistas tipo cards/tablas.
 * - Convierte _id a string.
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
 * Transforma un documento en un DTO detallado.
 *
 * - Resuelve contenido, impacto y escalabilidad por idioma.
 * - Mantiene métricas y media completas.
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
 * Transforma el documento en un DTO de entidad completo.
 *
 * No resuelve idioma.
 * Mantiene la estructura multi-idioma intacta.
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
