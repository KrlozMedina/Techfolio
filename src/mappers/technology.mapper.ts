import { TechnologyDetailDTO } from "@/dto/technology/technology.detail.dto";
import { TechnologyListDTO } from "@/dto/technology/technology.list.dto";
import { TechnologyDocument } from "@/models/technology/technology.document";

/**
 * Convierte un documento de tecnología de MongoDB
 * a un DTO optimizado para listados.
 *
 * Este DTO contiene solo los campos necesarios
 * para mostrar en una lista o menú.
 */
export function toTechnologyListDTO(
  technology: TechnologyDocument
): TechnologyListDTO {
  return {
    id: technology._id.toString(),
    name: technology.name,
    iconUrl: technology.iconUrl,
    websiteUrl: technology.websiteUrl,
  };
}

/**
 * Convierte un documento de tecnología de MongoDB
 * a un DTO de detalle.
 *
 * Este DTO incluye campos completos, incluyendo:
 * - slug para URLs
 * - referencia a la categoría asociada
 * - nivel de experiencia
 * - icono y sitio web opcionales
 */
export function toTechnologyDetailDTO(
  technology: TechnologyDocument
): TechnologyDetailDTO {
  return {
    id: technology._id.toString(),
    slug: technology.slug,
    categoryId: technology.categoryId.slug,
    name: technology.name,
    iconUrl: technology.iconUrl,
    websiteUrl: technology.websiteUrl,
    experienceLevel: technology.experienceLevel,
  };
}
