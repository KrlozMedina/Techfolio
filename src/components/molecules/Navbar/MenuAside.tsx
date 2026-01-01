import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { IconType } from 'react-icons';

import styles from './Navbar.module.scss';
import { useVerifyProfileQuery } from '@/store/service/authApi';
import { navItems } from '@/lib/config';
import { useLanguage } from '@/hooks';
import { MenuProps, NavItem } from '@/lib/types/navigation';

const ACTIVE_STYLE = { color: 'var(--color-button-hover)' };

/**
 * MenuAside
 * Menú lateral de navegación con soporte de:
 * - rutas activas
 * - autenticación
 * - i18n
 * - accesibilidad básica
 */
export const MenuAside: React.FC<MenuProps> = () => {
  // Item actualmente en hover
  const [hovered, setHovered] = useState<string | null>(null);

  // Ruta actual
  const pathname = usePathname();
  const basePath = `/${pathname.split('/')[1]}`;

  // Idioma activo
  const { language } = useLanguage();

  /**
   * Obtiene los ítems del menú según estado de autenticación
   */
  const useNavItems = (): NavItem[] => {
    const { data } = useVerifyProfileQuery(null);
    return navItems(data?.isAuth ?? false) as NavItem[];
  };

  const NAV_ITEMS = useNavItems();

  return (
    <nav
      className={styles['menu-aside__container']}
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map(({ path, label, icon }) => {
        const Icon = icon as IconType;
        const key = path.split('/')[1];
        const isActive = path === basePath;
        const text = label[language];

        return (
          <Link
            key={path}
            href={path}
            onMouseEnter={() => setHovered(key)}
            onMouseLeave={() => setHovered(null)}
            aria-label={text}
          >
            {hovered === key ? (
              <span
                className="text-icon"
                style={isActive ? ACTIVE_STYLE : undefined}
              >
                {text}
              </span>
            ) : (
              <Icon
                className="icon"
                aria-hidden
                style={isActive ? ACTIVE_STYLE : undefined}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
};

export default MenuAside;
