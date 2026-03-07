/**
 * =========================================================
 * Case Studies API Service (RTK Query)
 * ---------------------------------------------------------
 * Servicio de acceso a datos para la entidad Case Studies
 * utilizando Redux Toolkit Query.
 *
 * Este módulo define:
 * - Un endpoint para consultar estudios de caso
 * - Hooks generados automáticamente para uso en React
 *
 * Arquitectura:
 * - Basado en Redux Toolkit Query (RTK Query)
 * - Centraliza las llamadas HTTP relacionadas con
 *   estudios de caso
 * - Integrado con el store de Redux mediante `reducerPath`
 *
 * Responsabilidades:
 * - Gestionar comunicación con la API `/api/v2`
 * - Transformar la respuesta del backend
 * - Proveer hooks reutilizables para componentes React
 *
 * Utilizado en:
 * - páginas de case studies
 * - secciones de portafolio
 * - dashboards o vistas de análisis
 * =========================================================
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * =========================================================
 * caseStudiesApi
 * ---------------------------------------------------------
 * API slice de RTK Query encargado de gestionar
 * las operaciones relacionadas con Case Studies.
 *
 * Configuración:
 * - reducerPath: identificador del slice en el store
 * - baseQuery: configuración base para llamadas HTTP
 * - endpoints: definición de queries disponibles
 * =========================================================
 */
export const caseStudiesApi = createApi({
  reducerPath: "caseStudiesApi",

  /**
   * Configuración base para las llamadas HTTP
   */
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v2",
  }),

  /**
   * Definición de endpoints disponibles
   */
  endpoints: (builder) => ({

    /**
     * ======================================================
     * getCaseStudies
     * ------------------------------------------------------
     * Obtiene la lista de estudios de caso desde la API.
     *
     * La respuesta del backend tiene la forma:
     * {
     *   data: CaseStudy[]
     * }
     *
     * El `transformResponse` extrae únicamente el array
     * contenido dentro de `data`.
     *
     * @returns Array de estudios de caso
     * ======================================================
     */
    getCaseStudies: builder.query<any[], string>({
      query: () => "/case-studies",

      /**
       * Transforma la respuesta del backend para retornar
       * únicamente el arreglo de estudios de caso.
       */
      transformResponse: (response: { data: any[] }) => response.data,
    }),
  }),
});

/**
 * =========================================================
 * Generated Hooks
 * ---------------------------------------------------------
 * Hook generado automáticamente por RTK Query para
 * consumir el endpoint en componentes React.
 *
 * Uso típico:
 * const { data, isLoading } = useGetCaseStudiesQuery()
 * =========================================================
 */
export const { useGetCaseStudiesQuery } = caseStudiesApi;