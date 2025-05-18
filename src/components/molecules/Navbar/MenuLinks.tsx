'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './Navbar.module.scss';
import { useVerifyProfileQuery } from '@/store/service/authApi';
import { navItems } from '@/lib/config';

interface NavLink {
  path: string;
  title: {
    es: string;
    en: string;
  };
}

interface MenuProps {
  language: 'es' | 'en';
  links?: NavLink[];
  isPhone?: boolean;
  onlyIcons?: boolean;
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
 * Hook para obtener las rutas de navegación según estado de autenticación
 */
const useNavItems = () => {
  const { data } = useVerifyProfileQuery(null);
  return navItems(data?.isAuth ?? false);
};

/**
 * Componente MenuLinks
 * - Renderiza enlaces de navegación principales y adicionales.
 * - Destaca el enlace activo según la ruta actual.
 * - Adapta estilos para dispositivos móviles si `isPhone` es true.
 * 
 * @param language Código de idioma para mostrar etiquetas ('es' o 'en')
 * @param links Enlaces adicionales opcionales con path y título
 * @param isPhone Booleano que indica si el menú se renderiza en dispositivo móvil
 */
export const MenuLinks: React.FC<MenuProps> = ({
  language,
  links = [],
  isPhone = false,
  onlyIcons = false,
}) => {
  const pathname = usePathname();
  const basePath = useActivePath();
  const NAV_ITEMS = useNavItems();

  const containerClass = isPhone
    ? styles['menu__container--phone']
    : styles['menu__container'];

  return (
    <nav className={containerClass} aria-label="Main navigation">
      {/* Enlaces principales */}
      {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
        <Link
          key={path}
          href={path}
          style={path === basePath ? ACTIVE_STYLE : {}}
          aria-current={path === basePath ? 'page' : undefined}
        >
          <Icon className="icon" aria-hidden="true" />
          {onlyIcons ? '' : label[language]}
        </Link>
      ))}

      {/* Enlaces adicionales opcionales */}
      {links.length > 0 && (
        <div className={styles['menu__container--links']}>
          {links.map(({ path, title }) => (
            <a
              key={path}
              href={path}
              style={path === pathname ? ACTIVE_STYLE : {}}
              aria-current={path === pathname ? 'page' : undefined}
            >
              {title[language]}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};
