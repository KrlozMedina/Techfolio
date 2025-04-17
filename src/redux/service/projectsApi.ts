import { IProject } from "@/models/Project.model";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/projects'
  }),
  endpoints: (builder) => ({
    getProjects: builder.query<IProject[], null>({
      query: () => '/'
    }),
    createProject: builder.mutation({
      query: (project) => ({
        url: '/',
        method: 'POST',
        body: project
      })
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `?projectId=${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi