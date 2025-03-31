import { IProject } from "@/model/Project";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/'
  }),
  endpoints: (builder) => ({
    getProjects: builder.query<IProject[], null>({
      query: () => 'projects'
    }),
    getProjectById: builder.query<IProject, null>({
      query: () => 'projects'
    }),
    login: builder.mutation<{ token: string }, { username: string; password: string }>({
      query: (credentials) => ({
      url: 'auth/login',
      method: 'POST',
      body: credentials
      })
    }),
    verifyProfile: builder.query({
      query: () => 'auth/login'
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout',
        method: 'POST',
        body: ''
      })
    })
  })
})

export const { useGetProjectsQuery, useLoginMutation, useVerifyProfileQuery, useLogoutMutation } = projectsApi