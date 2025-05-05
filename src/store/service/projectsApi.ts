// Importación de interfaces y constantes necesarias
import {
  IProjectV2,
  IProjectV2Paginated,
} from "@/models/project/Project.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Language } from "@/shared/constants/language";

/**
 * API de proyectos creada con Redux Toolkit Query.
 * Proporciona endpoints para obtener, crear, actualizar y eliminar proyectos.
 */
export const projectsApi = createApi({
  reducerPath: "projectsApi", // Nombre del slice en el store
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v2/projects", // URL base común para todos los endpoints
  }),
  endpoints: (builder) => ({
    /**
     * Obtener todos los proyectos (versión completa).
     */
    getProjects: builder.query<IProjectV2[], void>({
      query: () => "/", // GET /api/v2/projects
    }),

    /**
     * Obtener un proyecto por su ID.
     * @param id - ID del proyecto a consultar.
     */
    getProjectById: builder.query<IProjectV2, string>({
      query: (id) => `/${id}`, // GET /api/v2/projects/:id
    }),

    /**
     * Obtener un listado paginado y simplificado de proyectos,
     * según el idioma especificado.
     * @param language - Idioma en el que se requiere la información.
     */
    getProjectsSimpleData: builder.query<IProjectV2Paginated, Language>({
      query: (language) => `?data=simple&language=${language}`, // GET /api/v2/projects?data=simple&language=...
    }),

    /**
     * Crear un nuevo proyecto.
     * @param project - Objeto parcial con la información del proyecto a crear.
     */
    createProject: builder.mutation<IProjectV2, Partial<IProjectV2>>({
      query: (project) => ({
        url: "/",
        method: "POST",
        body: project,
      }),
    }),

    /**
     * Actualizar un proyecto existente por ID.
     * @param id - ID del proyecto a actualizar.
     * @param project - Objeto parcial con los cambios del proyecto.
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
     * Eliminar un proyecto por ID.
     * @param id - ID del proyecto a eliminar.
     */
    deleteProject: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Exportación de los hooks generados por Redux Toolkit Query para su uso en componentes
export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useGetProjectsSimpleDataQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
