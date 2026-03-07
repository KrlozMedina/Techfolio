/**
 * =========================================================
 * Feature API Service (RTK Query)
 * ---------------------------------------------------------
 * Servicio de acceso a datos para la entidad Feature
 * utilizando Redux Toolkit Query.
 *
 * Este módulo define:
 * - Endpoints para consultar, crear, actualizar y eliminar
 *   features desde la API.
 * - Hooks generados automáticamente para uso en React.
 *
 * Arquitectura:
 * - Basado en Redux Toolkit Query (RTK Query)
 * - Centraliza llamadas HTTP relacionadas con Features
 * - Integrado con el store de Redux mediante `reducerPath`
 *
 * Responsabilidades:
 * - Gestionar comunicación con la API `/api/v2/features`
 * - Proveer tipado fuerte para requests y responses
 * - Generar hooks reutilizables para componentes React
 *
 * Utilizado en:
 * - páginas de listado de features
 * - formularios de creación/edición
 * - paneles administrativos
 * =========================================================
 */

import { Language } from "@/lib/i18n";
import { LANGUAGES } from "@/lib/i18n/language";
import { IFeature, IFeaturePaginated } from "@/models/features/feature.interface";
import { FeatureDomain } from "@/shared/enums/feature-domain.enum";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * =========================================================
 * GetFeaturesParams
 * ---------------------------------------------------------
 * Parámetros disponibles para consultar el listado de
 * features desde la API.
 *
 * @property language - Idioma en el que se desea recibir
 *                      el contenido localizado.
 * @property page - Número de página para paginación.
 * @property limit - Cantidad de elementos por página.
 * @property domain - Dominio funcional al que pertenece
 *                    la feature.
 * @property search - Texto de búsqueda para filtrado.
 * =========================================================
 */
interface GetFeaturesParams {
  language?: Language;
  page?: number;
  limit?: number;
  domain?: FeatureDomain;
  search?: string;
}

/**
 * =========================================================
 * featureApi
 * ---------------------------------------------------------
 * API slice de RTK Query encargado de gestionar todas las
 * operaciones relacionadas con Features.
 *
 * Configuración:
 * - reducerPath: identificador del slice en el store
 * - baseQuery: configuración base para llamadas HTTP
 * - endpoints: definición de queries y mutations
 * =========================================================
 */
export const featureApi = createApi({
  reducerPath: "featuresApi",

  /**
   * Configuración base para todas las llamadas HTTP
   * realizadas por este servicio.
   */
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v2/features",
  }),

  /**
   * Definición de endpoints disponibles.
   */
  endpoints: (builder) =>({

    /**
     * ======================================================
     * getFeatures
     * ------------------------------------------------------
     * Obtiene una lista paginada de features.
     *
     * Permite aplicar filtros como:
     * - idioma
     * - paginación
     * - dominio funcional
     * - búsqueda por texto
     *
     * @returns IFeaturePaginated
     * ======================================================
     */
    getFeatures: builder.query<
      IFeaturePaginated,
      GetFeaturesParams
    >({
      query: ({
        language = LANGUAGES.ES,
        page = 1,
        limit = 10,
        domain,
        search
      }) => ({
        url: "/",
        params: {
          language,
          page,
          limit,
          domain,
          search
        }
      })
    }),

    /**
     * ======================================================
     * getFeatureForEdit
     * ------------------------------------------------------
     * Obtiene una feature específica por su identificador.
     *
     * Usado principalmente en:
     * - formularios de edición
     * - páginas de detalle
     *
     * @param id - Identificador único de la feature.
     *
     * @returns IFeature
     * ======================================================
     */
    getFeatureForEdit: builder.query<
      IFeature,
      string
    >({
      query: (id) => `/${id}`
    }),

    /**
     * ======================================================
     * createFeature
     * ------------------------------------------------------
     * Crea una nueva feature en el sistema.
     *
     * @param data - Datos de la nueva feature.
     *
     * @returns IFeature
     * ======================================================
     */
    createFeature: builder.mutation<
      IFeature,
      Partial<IFeature>
    >({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data
      })
    }),

    /**
     * ======================================================
     * updateFeature
     * ------------------------------------------------------
     * Actualiza una feature existente.
     *
     * @param id - Identificador de la feature.
     * @param data - Datos a actualizar.
     *
     * @returns IFeature
     * ======================================================
     */
    updateFeature: builder.mutation<
      IFeature,
      { id: string; data: Partial<IFeature> }
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      })
    }),

    /**
     * ======================================================
     * deleteFeature
     * ------------------------------------------------------
     * Elimina una feature del sistema.
     *
     * @param id - Identificador de la feature.
     *
     * @returns boolean indicando éxito de la operación.
     * ======================================================
     */
    deleteFeature: builder.mutation<
      boolean,
      string
    >({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE"
      })
    })
  })
});

/**
 * =========================================================
 * Generated Hooks
 * ---------------------------------------------------------
 * Hooks generados automáticamente por RTK Query para
 * utilizar los endpoints definidos en componentes React.
 *
 * Uso típico:
 * - useGetFeaturesQuery()
 * - useCreateFeatureMutation()
 * =========================================================
 */
export const {
  useGetFeaturesQuery,
  useGetFeatureForEditQuery,
  useCreateFeatureMutation,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,
} = featureApi;