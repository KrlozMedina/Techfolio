import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

import styles from './Navbar.module.scss';
import { useVerifyProfileQuery } from '@/infrastructure/auth/auth.api';
import { navItems } from '@/lib/config';
import { useLanguage } from '@/hooks';
import { MenuProps, NavItem } from '@/lib/types/navigation';
import { IconLink } from '../IconLink/IconLink';

/**
 * Estilo aplicado al ítem activo del menú.
 * Se utiliza para resaltar visualmente la ruta actual.
 */
const ACTIVE_STYLE = { color: 'var(--color-button-hover)' };

/**
 * =========================================================
 * MenuAside
 * ---------------------------------------------------------
 * Menú lateral de navegación principal.
 *
 * Características:
 * - Detecta ruta activa automáticamente.
 * - Filtra ítems según estado de autenticación.
 * - Soporte de internacionalización (i18n).
 * - Accesibilidad básica mediante aria-label.
 *
 * Dependencias clave:
 * - usePathname: obtiene la ruta actual.
 * - useVerifyProfileQuery: valida autenticación.
 * - useLanguage: obtiene idioma activo.
 * - navItems: configuración central de navegación.
 * - IconLink: componente visual para cada enlace.
 * =========================================================
 */
export const MenuAside: React.FC<MenuProps> = () => {

  /**
   * Estado para controlar qué item está en hover.
   * (Actualmente no se utiliza en el render, pero
   *  permite futuras mejoras visuales o animaciones.)
   */
  const [hovered, setHovered] = useState<string | null>(null);

  /**
   * Ruta actual obtenida desde el router de Next.js.
   */
  const pathname = usePathname();

  /**
   * Extrae el primer segmento del path.
   * Ejemplo:
   * /projects/123 → /projects
   */
  const basePath = `/${pathname.split('/')[1]}`;

  /**
   * Idioma activo del sistema.
   * Se utiliza para mostrar labels traducidos.
   */
  const { language } = useLanguage();

  /**
   * Hook interno para obtener los ítems del menú
   * dependiendo del estado de autenticación.
   *
   * - Si el usuario está autenticado → menú completo.
   * - Si no está autenticado → menú reducido.
   */
  const useNavItems = (): NavItem[] => {
    const { data } = useVerifyProfileQuery(null);
    return navItems(data?.isAuth ?? false) as NavItem[];
  };

  /**
   * Lista final de elementos de navegación.
   */
  const NAV_ITEMS = useNavItems();

  return (
    <nav
      className={styles['menu-aside__container']}
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map(item => (
        <IconLink
          key={item.path}
          href={item.path}
          label={item.label[language]}
          icon={item.icon}
          isActive={item.path === basePath}
          activeStyle={ACTIVE_STYLE}
        />
      ))}
    </nav>
  );
};

export default MenuAside;