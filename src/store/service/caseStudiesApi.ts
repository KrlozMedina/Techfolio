import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const caseStudiesApi = createApi({
  reducerPath: "caseStudiesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v2",
  }),
  endpoints: (builder) => ({
    getCaseStudies: builder.query<any[], string>({
      query: () => "/case-studies",
      transformResponse: (response: { data: any[] }) => response.data,
    }),
  }),
});

export const { useGetCaseStudiesQuery } = caseStudiesApi;
