/**
 * =========================================================
 * Technologies API Service (RTK Query)
 * ---------------------------------------------------------
 * Servicio encargado de gestionar las operaciones HTTP
 * relacionadas con tecnologías dentro de la aplicación.
 *
 * Utiliza Redux Toolkit Query (RTK Query) para:
 * - realizar llamadas a la API
 * - manejar cache automática
 * - generar hooks para React
 *
 * Arquitectura:
 * - API Slice de RTK Query
 * - integrado al store de Redux mediante `reducerPath`
 * - centraliza acceso a `/api/v1/technologies`
 *
 * Responsabilidades:
 * - obtener listado de tecnologías
 * - crear nuevas tecnologías
 * - eliminar tecnologías existentes
 *
 * Utilizado en:
 * - formularios de administración
 * - paneles de gestión de tecnologías
 * - vistas de selección de stack tecnológico
 * =========================================================
 */

// import { ITechnology } from "@/shared/types/http-error.types";
import { ITechnology } from "@/models/technology/technology.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * =========================================================
 * technologiesApi
 * ---------------------------------------------------------
 * API slice que define los endpoints relacionados con
 * tecnologías dentro del sistema.
 *
 * Configuración:
 * - reducerPath: clave del slice en Redux
 * - baseQuery: configuración base de fetch
 * - endpoints: definición de queries y mutations
 * =========================================================
 */
export const technologiesApi = createApi({
  reducerPath: 'technologiesApi',

  /**
   * Configuración base para llamadas HTTP.
   * Todas las peticiones se realizan sobre
   * `/api/v1/technologies`.
   */
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/technologies'
  }),

  /**
   * Definición de endpoints disponibles.
   */
  endpoints: (builder) => ({

    /**
     * ======================================================
     * getTechnologies
     * ------------------------------------------------------
     * Obtiene el listado completo de tecnologías desde la API.
     *
     * @returns Array de tecnologías (`ITechnology[]`)
     * ======================================================
     */
    getTechnologies: builder.query<ITechnology[], null>({
      query: () => '/'
    }),

    /**
     * ======================================================
     * createTechnology
     * ------------------------------------------------------
     * Crea una nueva tecnología en el sistema.
     *
     * Realiza una petición POST enviando el objeto
     * de tecnología en el body.
     *
     * @param technology Datos de la tecnología a crear
     * ======================================================
     */
    createTechnology: builder.mutation({
      query: (technology) => ({
        url: '/',
        method: 'POST',
        body: technology
      })
    }),

    /**
     * ======================================================
     * deleteTechnology
     * ------------------------------------------------------
     * Elimina una tecnología existente.
     *
     * La API recibe el identificador mediante
     * query parameter `technologyId`.
     *
     * @param id Identificador de la tecnología
     * ======================================================
     */
    deleteTechnology: builder.mutation({
      query: (id) => ({
        url: `?technologyId=${id}`,
        method: 'DELETE'
      })
    })
  })
})

/**
 * =========================================================
 * Generated Hooks
 * ---------------------------------------------------------
 * Hooks generados automáticamente por RTK Query
 * para consumir los endpoints dentro de componentes React.
 *
 * Ejemplo:
 *
 * const { data, isLoading } = useGetTechnologiesQuery(null)
 * =========================================================
 */
export const {
  useGetTechnologiesQuery,
  useCreateTechnologyMutation,
  useDeleteTechnologyMutation,
} = technologiesApi