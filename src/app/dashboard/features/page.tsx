'use client';

import { CrudLayout } from '@/components/templates/CrudLayout/CrudLayout';
import {
  useGetFeaturesQuery,
  useDeleteFeatureMutation,
} from '@/infrastructure/feature/feature.api';
import { IFeatureList } from '@/models/feature/feature.interface';
import { FeatureForm } from './FeatureForm/FeatureForm';
import styles from './page.module.scss';
import { FeatureDomain } from '@/shared/enums/feature-domain.enum';

/**
 * =========================================================
 * FeaturesPage
 * ---------------------------------------------------------
 * Página administrativa para gestionar Features del sistema.
 *
 * Utiliza el componente genérico `CrudLayout` para proporcionar
 * una interfaz completa de CRUD que incluye:
 *
 * - Listado de features
 * - Creación de nuevas features
 * - Edición de features existentes
 * - Eliminación de features
 * - Filtros por dominio funcional
 *
 * La página se apoya en RTK Query para la obtención
 * y modificación de datos desde la API.
 *
 * Tipado utilizado:
 * - IFeatureList → modelo simplificado para listados
 * =========================================================
 */
export default function FeaturesPage() {
  return (
    <CrudLayout<IFeatureList>

      /**
       * Título mostrado en la interfaz de la página.
       */
      title="Features"

      /**
       * Hook de consulta utilizado para obtener
       * la lista de features desde la API.
       */
      useQueryHook={useGetFeaturesQuery}

      /**
       * Hook de mutación utilizado para eliminar
       * una feature existente.
       */
      useDeleteHook={useDeleteFeatureMutation}

      /**
       * Componente de formulario utilizado para
       * crear o editar features.
       */
      FormComponent={FeatureForm}

      /**
       * Renderiza cada feature como una tarjeta visual.
       *
       * @param feature Feature actual
       * @param onEdit función para editar
       * @param onDelete función para eliminar
       */
      renderCard={(feature, onEdit, onDelete) => (
        <div className={styles.card}>

          {/* Dominio funcional de la feature */}
          <span className={styles.badge}>{feature.domain}</span>

          {/* Título de la feature */}
          <h3>{feature.title}</h3>

          {/* Descripción breve */}
          <p>{feature.description}</p>

          {/* Acciones disponibles sobre la feature */}
          <div className={styles.actions}>
            <button onClick={() => onEdit(feature)}>
              ✏️ Editar
            </button>

            <button
              className={styles.delete}
              onClick={() => onDelete(feature._id.toString())}
            >
              🗑 Eliminar
            </button>
          </div>
        </div>
      )}

      /**
       * Renderiza los filtros disponibles para la lista.
       *
       * Permite filtrar las features por dominio funcional.
       */
      renderFilters={(setExtraParams, extraParams) => (
        <>

          {/* Botón para mostrar todas las features */}
          <button
            className={!extraParams.domain ? 'active' : ''}
            onClick={() => setExtraParams({ domain: undefined })}
          >
            Todos
          </button>

          {/* Filtros dinámicos basados en FeatureDomain */}
          {Object.values(FeatureDomain).map((domain) => (
            <button
              key={domain}
              className={
                extraParams.domain === domain ? 'active' : ''
              }
              onClick={() => setExtraParams({ domain })}
            >
              {domain}
            </button>
          ))}
        </>
      )}
    />
  );
}