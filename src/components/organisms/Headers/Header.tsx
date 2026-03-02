import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

import styles from './Header.module.scss';
import Logout from '@/components/atom/Button/Logout';
import Logo from '@/components/atom/Logo/Logo';

/**
 * Representa un enlace de navegación del header.
 */
interface NavLink {
  /** Ruta destino */
  path: string;

  /** Títulos internacionalizados */
  title: {
    es: string;
    en: string;
  };

  /** Indica si el enlace está activo */
  isActive: boolean;
}

/**
 * Props del componente Header
 */
interface HeaderProps {
  /** Lista de enlaces de navegación */
  links?: NavLink[];

  /** Indica si el usuario es administrador */
  isAdmin?: boolean;

  /** Idioma activo */
  language: 'es' | 'en';
}

/**
 * =========================================================
 * Header
 * ---------------------------------------------------------
 * Componente de cabecera principal del layout.
 *
 * Responsabilidades:
 * - Mostrar logo institucional.
 * - Renderizar enlaces de navegación.
 * - Resaltar enlace activo.
 * - Mostrar botón de logout si el usuario es admin.
 *
 * Características:
 * - Soporte i18n mediante prop `language`.
 * - Estilos condicionales con clsx.
 * - Basado en estructura BEM definida en SCSS.
 * =========================================================
 */
const Header: React.FC<HeaderProps> = ({
  links = [],
  isAdmin = false,
  language,
}) => {

  /**
   * Genera los enlaces de navegación dinámicamente.
   * Aplica clase modificadora si el link está activo.
   */
  const renderLinks = () =>
    links.map(({ path, title, isActive }) => (
      <Link
        key={path}
        href={path}
        className={clsx(
          styles['template__link'],
          isActive && styles['template__link--active']
        )}
      >
        {title[language]}
      </Link>
    ));

  return (
    <header className={styles['template__header']}>

      {/* Logo de marca (modo header) */}
      <Logo inHeader />

      {/* Navegación principal */}
      <nav className={styles['template__nav']}>
        {renderLinks()}
      </nav>

      {/* Logout visible solo para administradores */}
      {isAdmin && <Logout />}
    </header>
  );
};

export default Header;