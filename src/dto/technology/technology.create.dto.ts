import { ExperienceLevel } from "@/shared/enums/experience-level.enum";
import { isValidObjectId } from "mongoose";
import z from "zod";

/**
 * Schema de validación para crear una nueva tecnología.
 *
 * Valida:
 * - name: Nombre obligatorio de la tecnología.
 * - categoryId: Debe ser un ObjectId válido de MongoDB.
 * - iconUrl: URL opcional del ícono.
 * - websiteUrl: URL opcional del sitio oficial.
 * - experienceLevel: Nivel de experiencia basado en el enum ExperienceLevel.
 */
export const createTechnologySchema = z.object({
  /** Nombre de la tecnología */
  name: z.string(),

  /** ID de la categoría (ObjectId válido de MongoDB) */
  categoryId: z
    .string()
    .refine(isValidObjectId, { message: "Invalid categoryId" }),

  /** URL del ícono representativo */
  iconUrl: z.string().url().optional(),

  /** URL del sitio web oficial */
  websiteUrl: z.string().url().optional(),

  /** Nivel de experiencia asociado a la tecnología */
  experienceLevel: z.nativeEnum(ExperienceLevel),
});

/**
 * DTO para la creación de una tecnología.
 * Representa la estructura tipada esperada en la capa de aplicación.
 */
export type CreateTechnologyDTO = {
  name: string;
  categoryId: string;
  iconUrl?: string;
  websiteUrl?: string;
  experienceLevel: ExperienceLevel;
};
