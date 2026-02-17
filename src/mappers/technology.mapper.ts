import { TechnologyEntityDTO } from "@/dto/technology/technology.entity.dto";
import { TechnologyListDTO } from "@/dto/technology/technology.list.dto";
import { TechnologyDocument } from "@/models/technology/technology.document";

/**
 * Transforma un documento de MongoDB (TechnologyDocument)
 * en un DTO ligero para listados.
 *
 * Se usa típicamente en endpoints paginados donde
 * no se requiere información extendida.
 *
 * @param technology Documento proveniente del modelo.
 * @returns Objeto en formato TechnologyListDTO.
 */
export function toTechnologyListDTO(
  technology: TechnologyDocument,
): TechnologyListDTO {
  return {
    id: technology._id.toString(),
    name: technology.name,
    icon: technology.iconUrl,
    website: technology.websiteUrl,
  };
}

/**
 * Transforma un documento de MongoDB (TechnologyDocument)
 * en un DTO completo de entidad.
 *
 * Requiere que `categoryId` esté populado,
 * ya que accede a `categoryId.slug`.
 *
 * Se usa normalmente en:
 * - GET por ID
 * - Respuestas detalladas
 *
 * @param technology Documento proveniente del modelo.
 * @returns Objeto en formato TechnologyEntityDTO.
 */
export function toTechnologyEntityDTO(
  technology: TechnologyDocument
): TechnologyEntityDTO {
  return {
    id: technology._id.toString(),
    category: technology.categoryId.slug,
    name: technology.name,
    icon: technology.iconUrl,
    website: technology.websiteUrl,
    experienceLevel: technology.experienceLevel,
  };
}
