import React, { useState } from 'react';
import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';
import { SiPolymerproject } from 'react-icons/si';
import { BiMessageDots } from 'react-icons/bi';
import { TfiMenuAlt } from 'react-icons/tfi';
import { ImBlog, ImProfile } from 'react-icons/im';
import { LanguageToggleButtonMobile } from '@/components/molecules/LanguageSelector/LanguageSelector';
import styles from './Menu.module.css';
import Logout from '@/components/atom/Logout/Logout';
import ThemeToggle from '@/components/molecules/ThemeToggle/ThemeToggle';

// --- Interfaces ---
interface Link {
  href: string;
  title: {
    es: string;
    en: string;
  };
}

interface MenuProps {
  language: 'es' | 'en';
}

interface MenuPhoneProps {
  links?: Link[]; // Custom links (e.g., admin panel)
  isAdmin: boolean; // Shows logout button if user is an admin
  language: 'es' | 'en';
}

interface MenuLinksProps {
  isPhone?: boolean; // Defines if the menu is in mobile version
  links?: Link[]; // Additional links to render alongside main ones
  language: 'es' | 'en';
}

interface MenuAsideProps {
  language: 'es' | 'en';
}

// --- Constants ---
const navItems = [
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
    key: 'about',
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

// --- COMPONENT: MenuLinks ---
/**
 * Renders the navigation links with icons and multilingual labels.
 * Supports both standard and mobile views.
 */
const MenuLinks: React.FC<MenuLinksProps> = ({ isPhone = false, links, language }) => {
  const containerClass = isPhone ? styles['menu__container--phone'] : styles['menu__container'];

  return (
    <div className={containerClass}>
      {/* Main navigation links */}
      {navItems.map(({ href, label, icon: Icon, key }) => (
        <Link href={href} key={key}>
          <Icon className="icon" />
          {label[language]}
        </Link>
      ))}

      {/* Custom/Extra links (e.g., admin) */}
      {links?.length && (
        <div className={styles['menu__container--links']}>
          {links.map((link, index) => (
            <a key={index} href={link.href}>
              {link.title[language]}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

// --- COMPONENT: Menu ---
/**
 * Basic version of the menu used in standard layouts.
 */
const Menu: React.FC<MenuProps> = ({ language }) => <MenuLinks language={language} />;

// --- COMPONENT: MenuPhone ---
/**
 * Mobile-friendly collapsible menu.
 * Includes toggle button, multilingual support, and logout (if admin).
 */
const MenuPhone: React.FC<MenuPhoneProps> = ({ links, isAdmin, language }) => {
  const [menuOpen, setMenuOpen] = useState(false); // Menu open/close state

  return (
    <>
      {/* Open menu button */}
      {!menuOpen && (
        <TfiMenuAlt className={styles['icon-menu']} onClick={() => setMenuOpen(true)} />
      )}

      {/* Mobile menu container */}
      {menuOpen && (
        <section className={styles['menu-phone__container']}>
          {/* Close menu button */}
          <AiOutlineClose className={styles['icon-menu']} onClick={() => setMenuOpen(false)} />

          {/* Navigation links */}
          <MenuLinks isPhone links={links} language={language} />

          {/* Language selector (mobile version) */}
          <LanguageToggleButtonMobile />

          {/* Admin logout button */}
          {isAdmin && <Logout language={language} />}

          {/* Theme toggle switch */}
          <ThemeToggle language={language} />
        </section>
      )}
    </>
  );
};

// --- COMPONENT: MenuAside ---
/**
 * Sidebar navigation menu for desktop views.
 * Shows text label on hover instead of icon.
 */
const MenuAside: React.FC<MenuAsideProps> = ({ language }) => {
  const [hover, setHover] = useState<string | null>(null); // Hover tracking

  return (
    <div className={styles['menu-aside__container']}>
      {navItems.map(({ href, label, icon: Icon, key }) => (
        <Link
          href={href}
          key={key}
          onMouseOver={() => setHover(key)}
          onMouseLeave={() => setHover(null)}
        >
          {/* Display label on hover, icon otherwise */}
          {hover === key ? (
            <p className="text-icon">{label[language]}</p>
          ) : (
            <Icon className="icon" />
          )}
        </Link>
      ))}
    </div>
  );
};

// --- Export Menu Components ---
export { Menu, MenuPhone, MenuAside };
