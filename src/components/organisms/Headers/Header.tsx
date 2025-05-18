import React from 'react';
import Link from 'next/link';

import style from './Header.module.scss';
import Logout from '@/components/atom/buttons/Logout';
import Logo from '@/components/atom/media/Logo';

// --- Tipado ---
interface NavLink {
  path: string;
  title: {
    es: string;
    en: string;
  };
  isActive: boolean;
}

interface HeaderProps {
  links?: NavLink[];
  isAdmin?: boolean;
  language: 'es' | 'en';
}

/**
 * Header Component
 * Muestra el logo, los enlaces de navegación y, si es admin, el botón de logout.
 */
const Header: React.FC<HeaderProps> = ({
  links = [],
  isAdmin = false,
  language,
}) => {
  /**
   * Renderiza los enlaces de navegación en el idioma seleccionado.
   */
  const renderLinks = () =>
    links.map(({ path, title, isActive }, index) => (
      <Link
        key={index}
        href={path}
        className={style['template__link']}
        style={isActive ? { color: 'var(--color-button-hover)' } : {}}
      >
        {title[language]}
      </Link>
    ));

  return (
    <header className={style['template__header']}>
      {/* Logo del sistema */}
      <Logo inHeader />

      {/* Enlaces de navegación */}
      <nav className={style['template__nav']}>
        {renderLinks()}
      </nav>

      {/* Botón de logout si es administrador */}
      {isAdmin && <Logout lang={language} />}
    </header>
  );
};

export default Header;
