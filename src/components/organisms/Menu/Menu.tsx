import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineClose } from 'react-icons/ai';
import { TfiMenuAlt } from 'react-icons/tfi';
import styles from './Menu.module.css';

import Logout from '@/components/atom/Logout/Logout';
import SettingsButton from '../SettingsPanel/SettingsPanel';
import { useVerifyProfileQuery } from '@/store/service/authApi';
import { navItems } from '@/lib/config';

// --- Types ---
interface NavLink {
  path: string;
  title: {
    es: string;
    en: string;
  };
}

interface MenuProps {
  language: 'es' | 'en';
}

interface MenuPhoneProps extends MenuProps {
  links?: NavLink[];
  isAdmin: boolean;
}

interface MenuLinksProps extends MenuProps {
  isPhone?: boolean;
  links?: NavLink[];
}

// --- Constants ---
const activeStyle = { color: 'var(--color-button-hover)' };

/**
 * Hook to get current base path for active link highlighting
 */
const useActivePath = (): string => {
  const pathname = usePathname();
  return `/${pathname.split('/')[1]}`;
};

/**
 * Custom hook to get current navigation items based on auth state
 */
const useNavItems = () => {
  const { data } = useVerifyProfileQuery(null);
  return navItems(data?.isAuth ?? false);
};

/**
 * Shared component to render menu links
 */
const MenuLinks = ({ isPhone = false, links = [], language }: MenuLinksProps) => {
  const pathname = usePathname();
  const basePath = useActivePath();
  const NAV_ITEMS = useNavItems();

  const containerClass = isPhone
    ? styles['menu__container--phone']
    : styles['menu__container'];

      {console.warn(links)}


  return (
    <div className={containerClass}>
      {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
        <Link
          key={path}
          href={path}
          style={path === basePath ? activeStyle : {}}
        >
          <Icon className="icon" />
          {label[language]}
        </Link>
      ))}

      {links.length > 0 && (
        <div className={styles['menu__container--links']}>
          {links.map(({ path, title }, index) => (
            <a
              key={index}
              href={path}
              style={path === pathname ? activeStyle : {}}
            >
              {title[language]}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * Menu for desktop or standard layout
 */
const Menu = ({ language }: MenuProps) => (
  <MenuLinks language={language} />
);

/**
 * Collapsible mobile menu with toggle button
 */
const MenuPhone = ({ links = [], isAdmin, language }: MenuPhoneProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {!menuOpen ? (
        <TfiMenuAlt
          className={styles['icon-menu']}
          onClick={() => setMenuOpen(true)}
        />
      ) : (
        <section className={styles['menu-phone__container']}>
          <AiOutlineClose
            className={styles['icon-menu']}
            onClick={() => setMenuOpen(false)}
          />

          <MenuLinks isPhone links={links} language={language} />
          <SettingsButton className="visible" isFloating />
          {isAdmin && <Logout language={language} />}
        </section>
      )}
    </>
  );
};

/**
 * Vertical sidebar menu for desktop with hover tooltips
 */
const MenuAside = ({ language }: MenuProps) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const basePath = useActivePath();
  const NAV_ITEMS = useNavItems();

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
          >
            {isHovered ? (
              <p className="text-icon" style={isActive ? activeStyle : {}}>
                {label[language]}
              </p>
            ) : (
              <Icon className="icon" style={isActive ? activeStyle : {}} />
            )}
          </Link>
        );
      })}
    </div>
  );
};

export { Menu, MenuPhone, MenuAside };
