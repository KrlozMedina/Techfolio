/**
 * Zod schemas and DTOs for Project validation (V1 and V2).
 *
 * This file centralizes:
 * - Reusable validation sub-schemas
 * - DTOs for legacy Project V1 (flat structure)
 * - DTOs for Project V2 (domain-oriented structure)
 * - Query validation for GET endpoints
 */

import { z } from "zod";
import { urlValidator } from "@/lib/validators/common";
import { LANGUAGES, Platform, Status } from "@/shared/enums";
// import { ProjectStatus } from "@/shared/enums/status.enum";

/* =========================================================
 * 🔁 Reusable sub-schemas
 * ========================================================= */

/**
 * Localized content for a single language.
 */
const localizedContentSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
});

/**
 * Multilingual project information.
 * Required languages: ES and EN.
 */
const projectInfoSchema = z.object({
  es: localizedContentSchema,
  en: localizedContentSchema,
});

/**
 * Team-related project metadata.
 */
const teamInfoSchema = z.object({
  roleId: z.string().optional(),
  teamSize: z.number().optional(),
  duration: z.string().optional(),
});

/**
 * Project classification and relationships.
 */
const tagsSchema = z.object({
  platformId: z.union([z.string(), z.array(z.string())]),
  featureIds: z.array(z.string()).optional(),
  technologyIds: z.array(z.string()).nonempty("Technologies cannot be empty."),
  categoryIds: z.array(z.string()).optional(),
});

/**
 * External and internal project URLs.
 */
const urlsSchema = z.object({
  repository: urlValidator,
  live: urlValidator,
  isDownloadable: z.boolean().optional(),
});

/**
 * Project visual assets.
 */
const assetsSchema = z.object({
  main: urlValidator,
  blur: urlValidator,
});

/* =========================================================
 * 🧱 Project V1 DTOs (legacy / flat model)
 * ========================================================= */

/**
 * Base schema shared by create and update (V1).
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
  priority: z.number().min(1).max(10),
  projectType: z.union([z.string(), z.array(z.string())]),
});

/**
 * Create Project V1 DTO.
 */
export const CreateProjectDto = baseProjectSchema;
export type CreateProjectDtoType = z.infer<typeof CreateProjectDto>;

/**
 * Update Project V1 DTO (all fields optional).
 */
export const UpdateProjectDto = baseProjectSchema.partial();
export type UpdateProjectDtoType = z.infer<typeof UpdateProjectDto>;

/**
 * Delete Project V1 DTO.
 */
export const DeleteProjectDto = z.object({
  projectId: z.string().min(1, "Project ID is required."),
});
export type DeleteProjectDtoType = z.infer<typeof DeleteProjectDto>;

/* =========================================================
 * 🧩 Project V2 – Domain-oriented base schema
 * ========================================================= */

/**
 * Base domain schema shared by Create and Update (V2).
 */
const ProjectV2BaseSchema = z.object({
  projectInfo: projectInfoSchema,
  teamInfo: teamInfoSchema,
  tags: tagsSchema,
  urls: urlsSchema,
  assets: assetsSchema,
  importanceScore: z.number().min(1).max(10),
  status: z.enum(Status),
});

/* =========================================================
 * CREATE V2
 * ========================================================= */

/**
 * Create Project V2 DTO.
 * Slug is optional and can be auto-generated.
 */
export const CreateProjectV2Dto = ProjectV2BaseSchema.extend({
  slug: z.string().optional(),
});
export type CreateProjectV2DtoType = z.infer<typeof CreateProjectV2Dto>;

/* =========================================================
 * UPDATE V2
 * ========================================================= */

/**
 * Update Project V2 DTO.
 * - Slug modification is explicitly forbidden
 * - All fields are optional
 * - Extra fields are rejected
 */
export const UpdateProjectV2Dto = ProjectV2BaseSchema
  .extend({
    slug: z.never(),
  })
  .partial()
  .strict();

export type UpdateProjectV2DtoType = z.infer<typeof UpdateProjectV2Dto>;

/* =========================================================
 * GET / Query DTO
 * ========================================================= */

/**
 * Query parameters for fetching projects (V2).
 */
export const GetProjectsV2Dto = z.object({
  status: z.enum(Status).optional(),
  search: z.string().max(100).optional(),
  technology: z.string().optional(),
  platform: z.enum(Platform).optional(),
  feature: z.string().optional(),
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).max(100).optional(),
  id: z.string().optional(),
  data: z.string().optional(),
  language: z.enum(LANGUAGES).optional(),
});

export type GetProjectsV2DtoType = z.infer<typeof GetProjectsV2Dto>;
