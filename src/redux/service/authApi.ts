import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/auth",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string },{ username: string; password: string }>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    verifyProfile: builder.query({
      query: () => "/login",
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
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