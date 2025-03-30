import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import { projectsApi } from "./service/projectsApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    counterReducer,
    [projectsApi.reducerPath]: projectsApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([projectsApi.middleware])
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;