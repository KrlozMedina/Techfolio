import { ITechnology } from "@/shared/types/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const technologiesApi = createApi({
  reducerPath: 'technologiesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/technologies'
  }),
  endpoints: (builder) => ({
    getTechnologies: builder.query<ITechnology[], null>({
      query: () => '/'
    }),
    createTechnology: builder.mutation({
      query: (technology) => ({
        url: '/',
        method: 'POST',
        body: technology
      })
    }),
    deleteTechnology: builder.mutation({
      query: (id) => ({
        url: `?technologyId=${id}`,
        method: 'DELETE'
      })
    })
  })
})

export const {
  useGetTechnologiesQuery,
  useCreateTechnologyMutation,
  useDeleteTechnologyMutation,
} = technologiesApi