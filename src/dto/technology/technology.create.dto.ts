import { ExperienceLevel } from "@/shared/enums/experience-level.enum";

/**
 * DTO para creación de una tecnología.
 *
 * Campos:
 * - `name`: Nombre de la tecnología (obligatorio)
 * - `categoryId`: ID de la categoría a la que pertenece (obligatorio)
 * - `iconUrl`: URL opcional del ícono representativo
 * - `websiteUrl`: URL opcional del sitio oficial o referencia
 * - `experienceLevel`: Nivel de experiencia requerido o del usuario (obligatorio)
 */
export type CreateTechnologyDTO = {
  name: string;
  categoryId: string;
  iconUrl?: string;
  websiteUrl?: string;
  experienceLevel: ExperienceLevel;
};
