'use client';

import { useState } from 'react';
import { TfiMenuAlt } from 'react-icons/tfi';
import { AiOutlineClose } from 'react-icons/ai';

import styles from './Navbar.module.scss';
import { MenuLinks } from './MenuLinks';
import SettingsButton from '@/components/organisms/SettingPanel/SettingsPanel';
import Logout from '@/components/atom/buttons/Logout';

interface NavLink {
  path: string;
  title: {
    es: string;
    en: string;
  };
}

interface Props {
  language: 'es' | 'en';
  links?: NavLink[];
  isAdmin?: boolean;
}

/**
 * Componente MobileHamburgerMenu
 *
 * Muestra un botón tipo "hamburguesa" en dispositivos móviles.
 * Al hacer clic, despliega un menú lateral con enlaces de navegación, configuración y botón de logout (si es admin).
 */
export const MobileHamburgerMenu: React.FC<Props> = ({
  language,
  links = [],
  isAdmin = false,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      {!menuOpen ? (
        // Icono de menú hamburguesa
        <TfiMenuAlt
          className={styles['menu__icon-toggle']}
          onClick={toggleMenu}
          aria-label="Open menu"
          title="Open menu"
        />
      ) : (
        // Contenedor del menú desplegado
        <section className={styles['menu-phone__container']}>
          {/* Icono de cerrar menú */}
          <AiOutlineClose
            className={styles['menu__icon-toggle']}
            onClick={toggleMenu}
            aria-label="Close menu"
            title="Close menu"
          />

          {/* Enlaces de navegación */}
          <MenuLinks isPhone links={links} language={language} />

          {/* Botón de configuración flotante */}
          <SettingsButton className="visible" isFloating />

          {/* Botón de logout si el usuario es administrador */}
          {isAdmin && <Logout lang={language} />}
        </section>
      )}
    </>
  );
};
