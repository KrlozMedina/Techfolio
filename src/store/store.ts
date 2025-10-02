import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./slices/counterSlice";
import { projectsApi } from "./service/projectsApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { technologiesApi } from "./service/technologiesApi";
import { authApi } from "./service/authApi";
import filterReducer from './slices/filterSlice'

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [technologiesApi.reducerPath]: technologiesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([projectsApi.middleware, technologiesApi.middleware, authApi.middleware])
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;