'use client';

import { useState } from 'react';
import Modal from '@/components/organisms/Modal/Modal';
import styles from './CrudLayout.module.scss';
import { Types } from 'mongoose';

/**
 * Props genéricas para el layout CRUD reutilizable.
 */
type CrudLayoutProps<T> = {
  /** Título visible del módulo */
  title: string;

  /** Hook de consulta (ej: useGetItemsQuery) */
  useQueryHook: any;

  /** Hook de eliminación (ej: useDeleteItemMutation) */
  useDeleteHook: any;

  /** Componente de formulario (crear / editar) */
  FormComponent: React.ComponentType<{
    id?: string;
    onClose: () => void;
    onSuccess: () => void;
  }>;

  /**
   * Función encargada de renderizar cada tarjeta.
   * Recibe:
   * - item
   * - onEdit
   * - onDelete
   */
  renderCard: (
    item: T,
    onEdit: (item: T) => void,
    onDelete: (id: string) => void
  ) => React.ReactNode;

  /** Parámetros adicionales opcionales para la query */
  extraQueryParams?: Record<string, any>;

  /** Renderizado opcional de filtros personalizados */
  renderFilters?: (
    setExtraParams: React.Dispatch<React.SetStateAction<Record<string, any>>>,
    extraParams: Record<string, any>
  ) => React.ReactNode;
};

/**
 * =========================================================
 * CrudLayout
 * ---------------------------------------------------------
 * Layout genérico reutilizable para módulos CRUD.
 *
 * Responsabilidades:
 * - Manejar paginación.
 * - Manejar búsqueda.
 * - Manejar filtros adicionales.
 * - Gestionar creación y edición mediante Modal.
 * - Gestionar eliminación.
 * - Renderizar tarjetas dinámicamente.
 *
 * Arquitectura:
 * - Hooks inyectados (query/delete).
 * - FormComponent inyectado.
 * - RenderCard inyectado.
 *
 * Esto desacopla:
 * - Lógica de datos
 * - Presentación
 * - Formularios
 *
 * Permite reutilizar el layout en múltiples entidades.
 * =========================================================
 */
export function CrudLayout<T extends { _id: Types.ObjectId | string }>({
  title,
  useQueryHook,
  useDeleteHook,
  FormComponent,
  renderCard,
  extraQueryParams = {},
  renderFilters,
}: CrudLayoutProps<T>) {

  /* ================= STATE ================= */

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [extraParams, setExtraParams] =
    useState<Record<string, any>>(extraQueryParams);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | undefined>();

  /* ================= DATA FETCH ================= */

  const { data, isLoading, error, refetch } = useQueryHook({
    page: currentPage,
    search: searchQuery,
    limit: 8,
    ...extraParams,
  });

  const [deleteItem] = useDeleteHook();

  const items = data?.data ?? [];
  const pagination = data?.pagination;

  /* ================= HANDLERS ================= */

  const handleCreate = () => {
    setSelectedId(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (item: T) => {
    setSelectedId(item._id.toString());
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar elemento?')) return;
    await deleteItem(id);
    refetch();
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedId(undefined);
  };

  /* ================= STATES ================= */

  if (isLoading)
    return <p className={styles['dashboard__loading']}>Cargando...</p>;

  if (error)
    return <p className={styles['dashboard__error']}>Error al cargar datos</p>;

  /* ================= RENDER ================= */

  return (
    <div className={styles.dashboard}>

      {/* HEADER */}
      <div className={styles['dashboard__header']}>
        <h1 className={styles['dashboard__title']}>{title}</h1>

        <button
          className={styles['dashboard__create-btn']}
          onClick={handleCreate}
        >
          + Crear
        </button>
      </div>

      {/* FILTERS */}
      <div className={styles['dashboard__filters']}>
        <input
          className={styles['dashboard__input']}
          placeholder="Buscar..."
          value={searchQuery}
          onChange={(e) => {
            setCurrentPage(1);
            setSearchQuery(e.target.value);
          }}
        />

        {renderFilters && (
          <div className={styles['dashboard__extra-filters']}>
            {renderFilters(setExtraParams, extraParams)}
          </div>
        )}
      </div>

      {/* GRID */}
      <div className={styles['dashboard__grid']}>
        {items.map((item: T) =>
          renderCard(item, handleEdit, handleDelete)
        )}
      </div>

      {/* PAGINATION */}
      <div className={styles['dashboard__pagination']}>
        <button
          className={styles['dashboard__pagination-btn']}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          ← Anterior
        </button>

        <span>
          Página {currentPage} de {pagination?.totalPages ?? 1}
        </span>

        <button
          className={styles['dashboard__pagination-btn']}
          disabled={currentPage === pagination?.totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Siguiente →
        </button>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <Modal
          title={selectedId ? 'Editar' : 'Crear'}
          onClose={handleClose}
        >
          <FormComponent
            id={selectedId}
            onClose={handleClose}
            onSuccess={refetch}
          />
        </Modal>
      )}
    </div>
  );
}