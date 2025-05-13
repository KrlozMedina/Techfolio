import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineClose } from 'react-icons/ai';
import { SiPolymerproject } from 'react-icons/si';
import { BiMessageDots } from 'react-icons/bi';
import { TfiMenuAlt } from 'react-icons/tfi';
import { ImBlog, ImProfile } from 'react-icons/im';
import styles from './Menu.module.css';
import Logout from '@/components/atom/Logout/Logout';
import SettingsButton from '../SettingsPanel/SettingsPanel';

// --- Interfaces ---
interface NavLink {
  href: string;
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
const NAV_ITEMS = [
  {
    href: '/projects',
    label: { es: 'Proyectos', en: 'Projects' },
    icon: SiPolymerproject,
    key: 'projects',
  },
  {
    href: '/profile',
    label: { es: 'Perfil', en: 'Profile' },
    icon: ImProfile,
    key: 'profile',
  },
  {
    href: '/blog',
    label: { es: 'Blog', en: 'Blog' },
    icon: ImBlog,
    key: 'blog',
  },
  {
    href: '/contact',
    label: { es: 'Contactarme', en: 'Contact me' },
    icon: BiMessageDots,
    key: 'contact',
  },
];

const activeStyle = { color: 'var(--color-button-hover)' };

/**
 * Returns the base path from the current pathname.
 */
const useActivePath = () => {
  const pathname = usePathname();
  return `/${pathname.split('/')[1]}`;
};

/**
 * Shared component to render menu links (used in all menu variants).
 */
const MenuLinks = ({ isPhone = false, links = [], language }: MenuLinksProps) => {
  const pathname = usePathname();
  const basePath = useActivePath();
  const containerClass = isPhone
    ? styles['menu__container--phone']
    : styles['menu__container'];

  return (
    <div className={containerClass}>
      {NAV_ITEMS.map(({ href, label, icon: Icon, key }) => (
        <Link href={href} key={key} style={href === basePath ? activeStyle : {}}>
          <Icon className="icon" />
          {label[language]}
        </Link>
      ))}

      {links.length > 0 && (
        <div className={styles['menu__container--links']}>
          {links.map(({ href, title }, index) => (
            <a
              key={index}
              href={href}
              style={href === pathname ? activeStyle : {}}
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
 * Basic horizontal menu for standard layouts (desktop/tablet).
 */
const Menu = ({ language }: MenuProps) => <MenuLinks language={language} />;

/**
 * Collapsible mobile menu with toggle icon.
 */
const MenuPhone = ({ links = [], isAdmin, language }: MenuPhoneProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {!menuOpen && (
        <TfiMenuAlt
          className={styles['icon-menu']}
          onClick={() => setMenuOpen(true)}
        />
      )}

      {menuOpen && (
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
 * Sidebar menu for desktop with hover tooltip on icons.
 */
const MenuAside = ({ language }: MenuProps) => {
  const [hover, setHover] = useState<string | null>(null);
  const basePath = useActivePath();

  return (
    <div className={styles['menu-aside__container']}>
      {NAV_ITEMS.map(({ href, label, icon: Icon, key }) => (
        <Link
          href={href}
          key={key}
          onMouseOver={() => setHover(key)}
          onMouseLeave={() => setHover(null)}
        >
          {hover === key ? (
            <p
              className="text-icon"
              style={href === basePath ? activeStyle : {}}
            >
              {label[language]}
            </p>
          ) : (
            <Icon
              className="icon"
              style={href === basePath ? activeStyle : {}}
            />
          )}
        </Link>
      ))}
    </div>
  );
};

export { Menu, MenuPhone, MenuAside };
