import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v2/auth",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string },{ username: string; password: string }>({
      query: (credentials) => ({
        url: "/",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyProfile: builder.query({
      query: () => "/",
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/",
        method: "DELETE",
        body: "",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useVerifyProfileQuery,
  useLogoutMutation
} = authApi;