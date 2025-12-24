'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './Navbar.module.scss';
import { useVerifyProfileQuery } from '@/store/service/authApi';
import { navItems } from '@/lib/config';

interface Props {
  language: 'es' | 'en';
}

const ACTIVE_STYLE = { color: 'var(--color-button-hover)' };

/**
 * Hook para obtener la ruta base del pathname actual
 * (por ejemplo, "/dashboard" de "/dashboard/stats")
 */
const useActivePath = (): string => {
  const pathname = usePathname();
  return `/${pathname.split('/')[1]}`;
};

/**
 * Componente MenuAside
 * - Renderiza un menú lateral con íconos o texto según hover.
 * - Muestra rutas personalizadas según el estado de autenticación.
 * 
 * @param language Idioma actual de la aplicación ('es' o 'en')
 */
export const MenuAside: React.FC<Props> = ({ language }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const basePath = useActivePath();

  const { data } = useVerifyProfileQuery(null);
  const NAV_ITEMS = navItems(data?.isAuth ?? false);

  return (
    <div className={styles['menu-aside__container']}>
      {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
        const routeKey = path.split('/')[1];
        const isActive = path === basePath;
        const isHovered = hovered === routeKey;

        return (
          <Link
            key={path}
            href={path}
            onMouseOver={() => setHovered(routeKey)}
            onMouseLeave={() => setHovered(null)}
            aria-label={label[language]}
          >
            {isHovered ? (
              <p className="text-icon" style={isActive ? ACTIVE_STYLE : {}}>
                {label[language]}
              </p>
            ) : (
              <Icon className="icon" style={isActive ? ACTIVE_STYLE : {}} />
            )}
          </Link>
        );
      })}
    </div>
  );
};
