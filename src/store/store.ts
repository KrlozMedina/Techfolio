/**
 * Configuración del store de Redux Toolkit para la aplicación.
 * Incluye slices locales y servicios RTK Query.
 */

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import filterReducer from './slices/filterSlice'; // Slice local de filtros

// Servicios RTK Query
import { authApi } from './service/authApi';
import { projectsApi } from './service/projectsApi';
import { technologiesApi } from './service/technologiesApi';
import { caseStudiesApi } from './service/caseStudiesApi';

/**
 * Configuración principal del store
 * - `reducer`: Combina reducers locales y de RTK Query
 * - `middleware`: Agrega middleware de cada servicio RTK Query
 */
export const store = configureStore({
  reducer: {
    filters: filterReducer, // Slice local

    [authApi.reducerPath]: authApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [technologiesApi.reducerPath]: technologiesApi.reducer,
    [caseStudiesApi.reducerPath]: caseStudiesApi.reducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      projectsApi.middleware,
      technologiesApi.middleware,
      caseStudiesApi.middleware
    ),
});

// Configuración adicional de listeners para RTK Query (ej. refetchOnFocus, refetchOnReconnect)
setupListeners(store.dispatch);

/* ===== Tipos globales para Redux ===== */
export type RootState = ReturnType<typeof store.getState>; // Tipo para el estado global
export type AppDispatch = typeof store.dispatch; // Tipo para el dispatch de Redux
