'use client';

/**
 * =========================================================
 * PageTitle Component
 * ---------------------------------------------------------
 * Componente encargado de renderizar el encabezado principal
 * de una página dentro de la aplicación.
 *
 * Este componente muestra:
 * - El título de la página
 * - Un subtítulo opcional
 * - Una sección opcional de acciones (botones, links, etc.)
 *
 * El contenido textual se obtiene desde el sistema de
 * traducciones mediante el hook `useTranslation`.
 *
 * Arquitectura:
 * - React + TypeScript
 * - SCSS Modules para estilos encapsulados
 * - Sistema de traducciones basado en enum `Page`
 *
 * Responsabilidades:
 * - Mostrar el título principal de la página
 * - Mostrar un subtítulo opcional proveniente de traducciones
 * - Permitir renderizar acciones asociadas a la página
 * - Mantener consistencia visual en encabezados
 *
 * Utilizado en:
 * - páginas principales del portafolio
 * - vistas del dashboard
 * - secciones de navegación principales
 * =========================================================
 */

import styles from './PageTitle.module.scss';
import { useTranslation } from '@/hooks/useTranslation';
import { Page } from '@/shared/enums';

/**
 * =========================================================
 * Props Interface
 * ---------------------------------------------------------
 * Define las propiedades aceptadas por el componente
 * PageTitle.
 *
 * @property page - Identificador de la página utilizado
 *                  para obtener el contenido traducido.
 *
 * @property action - Nodo React opcional que representa
 *                    acciones relacionadas con la página
 *                    (por ejemplo: botones o enlaces).
 * =========================================================
 */
interface Props {
  page: Page;
  action?: React.ReactNode;
}

/**
 * =========================================================
 * PageTitle Component
 * ---------------------------------------------------------
 * Renderiza el encabezado de una página utilizando
 * información proveniente del sistema de traducciones.
 *
 * @param page - Clave de página usada para acceder
 *               a las traducciones correspondientes.
 *
 * @param action - Elemento opcional que se mostrará
 *                 en la zona de acciones del encabezado.
 *
 * @returns JSX.Element
 * =========================================================
 */
export const PageTitle: React.FC<Props> = ({ page, action }) => {

  /**
   * Hook personalizado encargado de proporcionar
   * las traducciones disponibles en la aplicación.
   */
  const { t } = useTranslation();

  return (

    /**
     * Contenedor principal del componente.
     */
    <div className={styles['page-title']}>

      {/* ====================================================
          CONTENT CONTAINER
          ----------------------------------------------------
          Agrupa el título y la descripción de la página.
          ==================================================== */}
      <div className={styles['page-title__content']}>

        {/* Título principal de la página */}
        <h1 className={styles['page-title__heading']}>
          {t[page].hero.title}
        </h1>

        {/* Subtítulo opcional */}
        {t[page].hero.subtitle && (
          <p className={styles['page-title__description']}>
            {t[page].hero.subtitle}
          </p>
        )}

      </div>

      {/* ====================================================
          ACTION AREA
          ----------------------------------------------------
          Contenedor opcional para acciones relacionadas
          con la página (ej: botones, filtros, links).
          ==================================================== */}
      {action && (
        <div className={styles['page-title__action']}>
          {action}
        </div>
      )}

    </div>
  );
};

/**
 * Exportación por defecto del componente.
 */
export default PageTitle;