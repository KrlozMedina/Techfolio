import { ExperienceLevel } from "@/shared/enums/experience-level.enum";
import { TechnologyListDTO } from "./technology.list.dto";

/**
 * DTO de detalle de tecnología.
 *
 * Extiende `TechnologyListDTO` para incluir:
 * - `categoryId`: ID de la categoría asociada
 * - `slug`: identificador único legible para URLs
 * - `experienceLevel`: nivel de experiencia relacionado con la tecnología
 */
export interface TechnologyDetailDTO extends TechnologyListDTO {
  categoryId: string;
  slug: string;
  experienceLevel: ExperienceLevel;
}
