/**
 * =========================================================
 * Project Validation Schemas & DTOs (V1 and V2)
 * ---------------------------------------------------------
 * Este archivo centraliza todos los esquemas de validación
 * y DTOs relacionados con proyectos dentro del sistema.
 *
 * Incluye:
 * - Sub-esquemas reutilizables
 * - DTOs para Project V1 (modelo legacy plano)
 * - DTOs para Project V2 (modelo orientado al dominio)
 * - Validación de parámetros de consulta para endpoints GET
 *
 * Arquitectura:
 * - Validación basada en Zod
 * - DTOs inferidos automáticamente con `z.infer`
 * - Compatibilidad entre versiones del modelo de proyecto
 *
 * Responsabilidades:
 * - Centralizar la validación de datos de proyectos
 * - Reutilizar sub-esquemas entre DTOs
 * - Mantener compatibilidad entre modelos legacy y nuevos
 *
 * Utilizado en:
 * - endpoints de creación y actualización de proyectos
 * - controladores de proyectos
 * - validación de parámetros de consulta
 * =========================================================
 */

import { z } from "zod";
import { urlValidator } from "@/lib/validators/common";
import { Platform, Status } from "@/shared/enums";
import { LANGUAGES } from "@/lib/i18n/language";
// import { ProjectStatus } from "@/shared/enums/status.enum";

/* =========================================================
 * 🔁 Reusable sub-schemas
 * ========================================================= */

/**
 * =========================================================
 * localizedContentSchema
 * ---------------------------------------------------------
 * Define el contenido localizado para un idioma específico.
 *
 * Incluye:
 * - título
 * - descripción
 *
 * Ambos campos son obligatorios.
 * =========================================================
 */
const localizedContentSchema = z.object({
  title: z.string().min(1, "Title is required."),
  description: z.string().min(1, "Description is required."),
});

/**
 * =========================================================
 * projectInfoSchema
 * ---------------------------------------------------------
 * Información multilenguaje del proyecto.
 *
 * Idiomas requeridos:
 * - Español (es)
 * - Inglés (en)
 * =========================================================
 */
const projectInfoSchema = z.object({
  es: localizedContentSchema,
  en: localizedContentSchema,
});

/**
 * =========================================================
 * teamInfoSchema
 * ---------------------------------------------------------
 * Información relacionada con el equipo del proyecto.
 *
 * Incluye:
 * - rol desempeñado
 * - tamaño del equipo
 * - duración del proyecto
 * =========================================================
 */
const teamInfoSchema = z.object({
  roleId: z.string().optional(),
  teamSize: z.number().optional(),
  duration: z.string().optional(),
});

/**
 * =========================================================
 * tagsSchema
 * ---------------------------------------------------------
 * Clasificación del proyecto y relaciones con otras
 * entidades del sistema.
 *
 * Incluye:
 * - plataforma
 * - features
 * - tecnologías
 * - categorías
 * =========================================================
 */
const tagsSchema = z.object({
  platformId: z.union([z.string(), z.array(z.string())]),
  featureIds: z.array(z.string()).optional(),
  technologyIds: z.array(z.string()).nonempty("Technologies cannot be empty."),
  categoryIds: z.array(z.string()).optional(),
});

/**
 * =========================================================
 * urlsSchema
 * ---------------------------------------------------------
 * URLs externas relacionadas con el proyecto.
 *
 * Incluye:
 * - repositorio del proyecto
 * - URL de despliegue
 * - indicador de descarga
 * =========================================================
 */
const urlsSchema = z.object({
  repository: urlValidator,
  live: urlValidator,
  isDownloadable: z.boolean().optional(),
});

/**
 * =========================================================
 * assetsSchema
 * ---------------------------------------------------------
 * Recursos visuales asociados al proyecto.
 *
 * Incluye:
 * - imagen principal
 * - imagen blur (placeholder)
 * =========================================================
 */
const assetsSchema = z.object({
  main: urlValidator,
  blur: urlValidator,
});

/* =========================================================
 * 🧱 Project V1 DTOs (legacy / flat model)
 * ========================================================= */

/**
 * =========================================================
 * baseProjectSchema
 * ---------------------------------------------------------
 * Esquema base utilizado por el modelo Project V1.
 *
 * Este modelo utiliza una estructura plana (flat structure)
 * para representar los proyectos.
 *
 * Compartido por:
 * - CreateProjectDto
 * - UpdateProjectDto
 * =========================================================
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
 * =========================================================
 * CreateProjectDto (V1)
 * ---------------------------------------------------------
 * DTO utilizado para crear proyectos en el modelo V1.
 * =========================================================
 */
export const CreateProjectDto = baseProjectSchema;
export type CreateProjectDtoType = z.infer<typeof CreateProjectDto>;

/**
 * =========================================================
 * UpdateProjectDto (V1)
 * ---------------------------------------------------------
 * DTO utilizado para actualizar proyectos en el modelo V1.
 *
 * Todos los campos son opcionales.
 * =========================================================
 */
export const UpdateProjectDto = baseProjectSchema.partial();
export type UpdateProjectDtoType = z.infer<typeof UpdateProjectDto>;

/**
 * =========================================================
 * DeleteProjectDto (V1)
 * ---------------------------------------------------------
 * DTO utilizado para eliminar un proyecto en el modelo V1.
 * =========================================================
 */
export const DeleteProjectDto = z.object({
  projectId: z.string().min(1, "Project ID is required."),
});
export type DeleteProjectDtoType = z.infer<typeof DeleteProjectDto>;

/* =========================================================
 * 🧩 Project V2 – Domain-oriented base schema
 * ========================================================= */

/**
 * =========================================================
 * ProjectV2BaseSchema
 * ---------------------------------------------------------
 * Esquema base utilizado por el modelo Project V2.
 *
 * Este modelo adopta una estructura orientada al dominio
 * que separa claramente:
 * - información del proyecto
 * - equipo
 * - relaciones
 * - recursos
 * =========================================================
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
 * =========================================================
 * CreateProjectV2Dto
 * ---------------------------------------------------------
 * DTO utilizado para crear proyectos en el modelo V2.
 *
 * El slug es opcional y puede ser generado automáticamente
 * por el sistema.
 * =========================================================
 */
export const CreateProjectV2Dto = ProjectV2BaseSchema.extend({
  slug: z.string().optional(),
});
export type CreateProjectV2DtoType = z.infer<typeof CreateProjectV2Dto>;

/* =========================================================
 * UPDATE V2
 * ========================================================= */

/**
 * =========================================================
 * UpdateProjectV2Dto
 * ---------------------------------------------------------
 * DTO utilizado para actualizar proyectos en el modelo V2.
 *
 * Reglas:
 * - El slug no puede modificarse
 * - Todos los campos son opcionales
 * - Campos adicionales son rechazados
 * =========================================================
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
 * =========================================================
 * GetProjectsV2Dto
 * ---------------------------------------------------------
 * Valida los parámetros de consulta utilizados para
 * obtener proyectos en el modelo V2.
 *
 * Permite filtrar por:
 * - estado
 * - búsqueda textual
 * - tecnología
 * - plataforma
 * - feature
 * - paginación
 * - idioma
 * =========================================================
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