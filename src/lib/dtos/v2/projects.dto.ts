import { urlValidator } from "@/lib/validators/common";
import { z } from "zod";

// Common URL validation schema
// const urlSchema = z.string().url("Must be a valid URL");

// Reusable schema for localized content
const localizedContentSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
});

// Project information in multiple languages
const projectInfoSchema = z.object({
  es: localizedContentSchema,
  en: localizedContentSchema,
});

// Team-related information
const teamInfoSchema = z.object({
  roleId: z.string().optional(),
  teamSize: z.number().optional(),
  duration: z.string().optional(), // expressed in days
});

// Tags and categorization
const tagsSchema = z.object({
  platformId: z.union([z.string(), z.array(z.string())]),
  featureIds: z.array(z.string()).optional(),
  technologyIds: z.array(z.string()).nonempty("Technologies cannot be empty"),
  categoryIds: z.array(z.string()).optional(),
});

// Project links (e.g., GitHub repo, live site)
const linksSchema = z.object({
  repository: urlValidator,
  live: urlValidator,
});

// Images associated with the project
const imagesSchema = z.object({
  main: urlValidator,
  blur: urlValidator,
});

// DTO: Create Project
export const CreateProjectV2Dto = z.object({
  projectInfo: projectInfoSchema,
  teamInfo: teamInfoSchema,
  tags: tagsSchema,
  slug: z.string().optional(),
  links: linksSchema,
  images: imagesSchema,
  importanceScore: z.number().min(1).max(10),
  status: z.enum([
    "finished",
    "in-progress",
    "archived",
    "planned",
    "cancelled",
    "on-hold"
  ]),
});

export type CreateProjectV2DtoType = z.infer<typeof CreateProjectV2Dto>;

// DTO: Update Project (partial fields)
export const UpdateProjectV2Dto = CreateProjectV2Dto.partial();
export type UpdateProjectV2DtoType = z.infer<typeof UpdateProjectV2Dto>;

// DTO: Delete Project
export const DeleteProjectV2Dto = z.object({
  projectId: z.string().min(1, "Project ID is required"),
});
export type DeleteProjectV2DtoType = z.infer<typeof DeleteProjectV2Dto>;
