// ==============================
// 📁 schemas/project.schema.ts
// ==============================

import { z } from "zod";
import { urlValidator } from "@/lib/validators/common";
import { ProjectStatus } from "@/shared/constants/enums";
import { LANGUAGES } from "@/shared/constants";

// ==========================
// 🔁 Subesquemas reutilizables
// ==========================

/**
 * Contenido localizado para un idioma.
 */
const localizedContentSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
});

/**
 * Información multilingüe del proyecto.
 */
const projectInfoSchema = z.object({
  es: localizedContentSchema,
  en: localizedContentSchema,
});

/**
 * Detalles del equipo de trabajo.
 */
const teamInfoSchema = z.object({
  roleId: z.string().optional(),
  teamSize: z.number().optional(),
  duration: z.string().optional(),
});

/**
 * Etiquetas del proyecto (plataformas, tecnologías, categorías, etc.).
 */
const tagsSchema = z.object({
  platformId: z.union([z.string(), z.array(z.string())]),
  featureIds: z.array(z.string()).optional(),
  technologyIds: z.array(z.string()).nonempty("Technologies cannot be empty."),
  categoryIds: z.array(z.string()).optional(),
});

/**
 * URLs asociadas al proyecto.
 */
const urlsSchema = z.object({
  repository: urlValidator,
  live: urlValidator,
});

/**
 * Recursos multimedia del proyecto.
 */
const assetsSchema = z.object({
  main: urlValidator,
  blur: urlValidator,
});

// ==========================
// 🧱 DTOs para Project V1 (plano)
// ==========================

/**
 * DTO base para creación y edición de proyectos V1.
 */
const baseProjectSchema = z.object({
  title: z.string().min(1, "Title is required."),
  slug: z.string().optional(),
  description: z.string().min(1, "Description is required."),
  technologies: z.array(z.string()).nonempty("Technologies list cannot be empty."),
  repositoryUrl: urlValidator,
  liveUrl: urlValidator,
  imageUrl: urlValidator,
  category: z.array(z.string()).optional(),
  role: z.string().optional(),
  teamSize: z.number().optional(),
  duration: z.string().optional(),
  priority: z.number().min(1, "Priority must be between 1 and 10.").max(10),
  projectType: z.union([z.string(), z.array(z.string())]),
});

/**
 * Crear proyecto V1.
 */
export const CreateProjectDto = baseProjectSchema;
export type CreateProjectDtoType = z.infer<typeof CreateProjectDto>;

/**
 * Actualizar proyecto V1 (todos los campos opcionales).
 */
export const UpdateProjectDto = baseProjectSchema.partial();
export type UpdateProjectDtoType = z.infer<typeof UpdateProjectDto>;

/**
 * DTO para eliminar un proyecto V1.
 */
export const DeleteProjectDto = z.object({
  projectId: z.string().min(1, "Project ID is required."),
});
export type DeleteProjectDtoType = z.infer<typeof DeleteProjectDto>;

// ==========================
// 🧱 DTOs para Project V2 (modular)
// ==========================

/**
 * Crear proyecto V2 con estructura modularizada.
 */
export const CreateProjectV2Dto = z.object({
  projectInfo: projectInfoSchema,
  teamInfo: teamInfoSchema,
  tags: tagsSchema,
  slug: z.string().optional(),
  urls: urlsSchema,
  assets: assetsSchema,
  importanceScore: z.number().min(1).max(10),
  status: z.nativeEnum(ProjectStatus),
});
export type CreateProjectV2DtoType = z.infer<typeof CreateProjectV2Dto>;

/**
 * Actualizar proyecto V2 (todos los campos opcionales).
 */
export const UpdateProjectV2Dto = CreateProjectV2Dto.partial();
export type UpdateProjectV2DtoType = z.infer<typeof UpdateProjectV2Dto>;

/**
 * DTO para eliminar un proyecto V2.
 */
export const DeleteProjectV2Dto = z.object({
  projectId: z.string().min(1, "Project ID is required."),
});
export type DeleteProjectV2DtoType = z.infer<typeof DeleteProjectV2Dto>;

/**
 * Filtros para obtener una lista de proyectos V2 (con paginación y búsqueda).
 */
export const GetProjectsV2Dto = z.object({
  status: z.nativeEnum(ProjectStatus).optional(),
  search: z.string().optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
  page: z.coerce.number().min(0).optional(),
  id: z.string().optional(),
  data: z.string().optional(),
  language: z.nativeEnum(LANGUAGES).optional(),
});
export type GetProjectsV2DtoType = z.infer<typeof GetProjectsV2Dto>;
