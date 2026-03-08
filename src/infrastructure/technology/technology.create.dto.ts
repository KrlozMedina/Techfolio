/**
 * =========================================================
 * Technology Creation Validation Schema & DTO
 * ---------------------------------------------------------
 * Define el esquema de validación y el DTO utilizados
 * para la creación de tecnologías dentro del sistema.
 *
 * Este módulo garantiza que los datos enviados para crear
 * una tecnología cumplan con las restricciones necesarias
 * antes de persistirse en la base de datos.
 *
 * Incluye:
 * - Validación de estructura mediante Zod
 * - Validación de ObjectId para relaciones con categorías
 * - Validación de URLs opcionales
 * - Control de nivel de experiencia mediante enum
 *
 * Arquitectura:
 * - Validación centralizada con Zod
 * - DTO utilizado en la capa de aplicación
 * - Compatible con endpoints POST /technologies
 *
 * Responsabilidades:
 * - Validar datos de entrada antes de persistencia
 * - Garantizar integridad estructural del dominio
 * - Servir como contrato entre controller y service
 *
 * Utilizado en:
 * - endpoints POST /technologies
 * - servicios de creación de tecnologías
 * - formularios de administración de stack tecnológico
 * =========================================================
 */

import { ExperienceLevel } from "@/shared/enums/experience-level.enum";
import { isValidObjectId } from "mongoose";
import z from "zod";

/**
 * =========================================================
 * createTechnologySchema
 * ---------------------------------------------------------
 * Schema de validación para crear una nueva tecnología.
 *
 * Valida:
 * - name: Nombre obligatorio de la tecnología.
 * - categoryId: Debe ser un ObjectId válido de MongoDB.
 * - iconUrl: URL opcional del ícono.
 * - websiteUrl: URL opcional del sitio oficial.
 * - experienceLevel: Nivel de experiencia basado en el enum.
 * =========================================================
 */
export const createTechnologySchema = z.object({

  /**
   * Nombre de la tecnología.
   */
  name: z.string(),

  /**
   * ID de la categoría asociada.
   * Debe ser un ObjectId válido de MongoDB.
   */
  categoryId: z
    .string()
    .refine(isValidObjectId, { message: "Invalid categoryId" }),

  /**
   * URL del ícono representativo de la tecnología.
   */
  iconUrl: z.string().url().optional(),

  /**
   * URL del sitio web oficial de la tecnología.
   */
  websiteUrl: z.string().url().optional(),

  /**
   * Nivel de experiencia asociado a la tecnología.
   */
  experienceLevel: z.nativeEnum(ExperienceLevel),
});

/**
 * =========================================================
 * CreateTechnologyDTO
 * ---------------------------------------------------------
 * Data Transfer Object utilizado en la capa de aplicación
 * para representar la estructura necesaria para crear
 * una tecnología.
 *
 * Este DTO atraviesa típicamente las capas:
 * controller → application → persistence
 * =========================================================
 */
export type CreateTechnologyDTO = {

  /**
   * Nombre de la tecnología.
   */
  name: string;

  /**
   * Identificador de la categoría asociada.
   */
  categoryId: string;

  /**
   * URL opcional del ícono de la tecnología.
   */
  iconUrl?: string;

  /**
   * URL opcional del sitio web oficial.
   */
  websiteUrl?: string;

  /**
   * Nivel de experiencia asociado.
   */
  experienceLevel: ExperienceLevel;
};