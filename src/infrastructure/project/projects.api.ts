// =========================================================
// Projects API (RTK Query)
// ---------------------------------------------------------
// Capa de acceso a datos para proyectos.
// Define todos los endpoints relacionados con:
//
// - Listado paginado
// - Detalle por ID
// - Detalle por slug
// - Summary agregado
// - Crear / Actualizar / Eliminar
//
// Base URL: /api/v2/projects
// =========================================================

import {
  IProjectV2,
} from "@/models/project/project.interface";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Language, LANGUAGES } from "@/lib/i18n/language";
import { Status } from "@/shared/enums";
import { ProjectsPagination } from "@/infrastructure/project/projects.types";
import { ProjectDetailDTO } from "@/infrastructure/project/project.detail.dto";

/**
 * Parámetros soportados para el endpoint getProjects.
 */
interface GetProjectsParams {
  language?: Language;
  page?: number;
  limit?: number;
  status?: string;
  technology?: string;
  platform?: string;
  feature?: string;
  search?: string;
}

export const projectsApi = createApi({
  reducerPath: "projectsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v2/projects",
  }),

  endpoints: (builder) => ({

    /**
     * =====================================================
     * GET /api/v2/projects
     * -----------------------------------------------------
     * Obtiene listado paginado simplificado.
     * Soporta filtros y búsqueda.
     * =====================================================
     */
    getProjects: builder.query<ProjectsPagination, GetProjectsParams>({
      query: ({
        language = LANGUAGES.ES,
        page = 1,
        limit = 10,
        status,
        technology,
        platform,
        feature,
        search,
      }) => ({
        url: "/",
        params: {
          data: "simple",
          language,
          page,
          limit,
          status,
          technology,
          platform,
          feature,
          search,
        },
      }),
    }),

    /**
     * =====================================================
     * GET /api/v2/projects/:id
     * -----------------------------------------------------
     * Obtiene detalle completo por ID.
     * =====================================================
     */
    getProjectById: builder.query<ProjectDetailDTO, string>({
      query: (id) => `/${id}`,
    }),

    /**
     * =====================================================
     * GET /api/v2/projects/slug/:slug
     * -----------------------------------------------------
     * Obtiene detalle completo por slug.
     * Permite idioma opcional.
     * =====================================================
     */
    getProjectBySlug: builder.query<
      ProjectDetailDTO,
      { slug: string; language?: Language }
    >({
      query: ({ slug, language = LANGUAGES.ES }) =>
        `/slug/${slug}?language=${language}`,
    }),

    /**
     * =====================================================
     * GET /api/v2/projects/summary
     * -----------------------------------------------------
     * Obtiene datos agregados para filtros y métricas.
     * =====================================================
     */
    getProjectsSummary: builder.query<
      any,
      { language: Language; status: Status }
    >({
      query: ({ language, status }) =>
        `/summary?language=${language}&status=${status}`,
    }),

    /**
     * =====================================================
     * POST /api/v2/projects
     * -----------------------------------------------------
     * Crea nuevo proyecto.
     * =====================================================
     */
    createProject: builder.mutation<IProjectV2, Partial<IProjectV2>>({
      query: (project) => ({
        url: "/",
        method: "POST",
        body: project,
      }),
    }),

    /**
     * =====================================================
     * PUT /api/v2/projects/:id
     * -----------------------------------------------------
     * Actualiza proyecto existente.
     * =====================================================
     */
    updateProject: builder.mutation<
      IProjectV2,
      { id: string; project: Partial<IProjectV2> }
    >({
      query: ({ id, project }) => ({
        url: `/${id}`,
        method: "PUT",
        body: project,
      }),
    }),

    /**
     * =====================================================
     * DELETE /api/v2/projects/:id
     * -----------------------------------------------------
     * Elimina proyecto.
     * =====================================================
     */
    deleteProject: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

/**
 * Hooks generados automáticamente por RTK Query.
 */
export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetProjectBySlugQuery,
  useGetProjectsSummaryQuery,
} = projectsApi;