'use client';

import { useState } from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons';
import clsx from 'clsx';
import styles from './IconLink.module.scss';

/**
 * Props del componente IconLink
 */
type IconLinkProps = {
  /** Ruta destino del enlace */
  href: string;

  /** Texto descriptivo del enlace */
  label: string;

  /** Icono asociado al enlace (react-icons) */
  icon: IconType;

  /** Indica si el enlace está activo */
  isActive?: boolean;

  /** Estilo inline aplicado cuando está activo */
  activeStyle?: React.CSSProperties;

  /** Clase adicional opcional */
  className?: string;
};

/**
 * =========================================================
 * IconLink
 * ---------------------------------------------------------
 * Enlace de navegación que alterna visualización entre:
 * - Icono (estado normal)
 * - Texto (estado hover)
 *
 * Características:
 * - Soporte para ruta activa.
 * - Accesibilidad mediante aria-label.
 * - Estilos condicionales para estado activo.
 * - Compatible con cualquier icono de react-icons.
 *
 * Comportamiento:
 * - Si no está en hover → muestra el icono.
 * - Si está en hover → muestra el texto.
 * - Si está activo → aplica estilo personalizado.
 * =========================================================
 */
export const IconLink = ({
  href,
  label,
  icon: Icon,
  isActive = false,
  activeStyle,
  className,
}: IconLinkProps) => {

  /**
   * Controla si el mouse está sobre el componente.
   */
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={clsx(styles.link, className)}
    >
      {hovered ? (
        /* ===================================================
          TEXTO (estado hover)
          =================================================== */
        <span
          className={styles['menu-aside__text']}
          style={isActive ? activeStyle : undefined}
        >
          {label}
        </span>
      ) : (
        /* ===================================================
          ICONO (estado normal)
          =================================================== */
        <Icon
          className={styles["menu-aside__icon"]}
          aria-hidden
          style={isActive ? activeStyle : undefined}
        />
      )}
    </Link>
  );
};