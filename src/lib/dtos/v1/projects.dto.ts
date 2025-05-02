import { urlValidator } from "@/lib/validators/common";
import { z } from "zod";

// Validador común para URLs
// const urlValidator = z.string().url();

// DTO para crear proyectos
export const CreateProjectDto = z.object({
  title: z.string().min(1, "Title is required."),
  slug: z.string().optional(), // Se genera automáticamente
  description: z.string().min(1, "Description is required."),
  technologies: z.array(z.string()).nonempty("Technologies list cannot be empty."),
  repositoryUrl: urlValidator,
  liveUrl: urlValidator,
  imageUrl: urlValidator,
  category: z.array(z.string()).optional(),
  role: z.string().optional(),
  teamSize: z.number().optional(),
  duration: z.string().optional(),
  priority: z.number().min(1, "Priority must be between 1 and 10").max(10),
  projectType: z.union([z.string(), z.array(z.string())]), // string | string[]
});

export type CreateProjectDtoType = z.infer<typeof CreateProjectDto>;

// DTO para actualizar proyectos (todos los campos opcionales)
export const UpdateProjectDto = CreateProjectDto.partial(); // Refactorizando para reutilizar CreateProjectDto
export type UpdateProjectDtoType = z.infer<typeof UpdateProjectDto>;

// DTO para DELETE
export const DeleteProjectDto = z.object({
  projectId: z.string().min(1, "Project ID is required."),
});

export type DeleteProjectDtoType = z.infer<typeof DeleteProjectDto>;
