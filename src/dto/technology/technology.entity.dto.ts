import { ExperienceLevel } from "@/shared/enums/experience-level.enum";
import { TechnologyListDTO } from "./technology.list.dto";

/**
 * DTO que representa la entidad completa de Tecnología
 * en capa de aplicación / salida.
 *
 * Extiende `TechnologyListDTO` agregando:
 *
 * - category: nombre o identificador legible de la categoría
 *   (ya transformado desde el ObjectId).
 *
 * - experienceLevel: nivel de experiencia asociado a la tecnología,
 *   basado en el enum ExperienceLevel.
 *
 * Este DTO normalmente se usa para:
 * - Respuestas detalladas (GET by id)
 * - Transformación desde el modelo de base de datos
 * - Separar la entidad persistida del contrato público
 */
export interface TechnologyEntityDTO extends TechnologyListDTO {
  /** Nombre o slug de la categoría asociada */
  category: string;

  /** Nivel de experiencia asociado a la tecnología */
  experienceLevel: ExperienceLevel;
}
