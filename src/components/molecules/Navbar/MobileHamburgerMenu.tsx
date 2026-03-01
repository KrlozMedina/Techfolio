import { useState } from 'react';
import { TfiMenuAlt } from 'react-icons/tfi';
import { AiOutlineClose } from 'react-icons/ai';

import styles from './Navbar.module.scss';
import { MenuLinks } from './MenuLinks';
import SettingsButton from '@/components/organisms/settings/SettingsButton';
import Logout from '@/components/atom/Button/Logout';
import { useLanguage } from '@/hooks/useLanguage';
import { NavLink } from '@/lib/types/navigation';

/**
 * Props del componente MobileHamburgerMenu
 */
interface Props {
  /**
   * Enlaces secundarios de navegación.
   * Ejemplo: configuración, legales, adicionales.
   */
  links?: NavLink[];

  /**
   * Indica si el usuario tiene rol administrador.
   * Si es true, se habilita el botón de cierre de sesión.
   */
  isAdmin?: boolean;
}

/**
 * =========================================================
 * MobileHamburgerMenu
 * ---------------------------------------------------------
 * Componente de navegación responsive diseñado
 * exclusivamente para dispositivos móviles.
 *
 * Responsabilidades:
 * - Mostrar icono hamburguesa cuando el menú está cerrado.
 * - Mostrar menú lateral cuando está abierto.
 * - Renderizar enlaces principales.
 * - Permitir acceso a configuración.
 * - Mostrar botón de logout si el usuario es admin.
 *
 * Estado interno:
 * - menuOpen: controla visibilidad del menú.
 *
 * Dependencias:
 * - useLanguage: para obtener el idioma actual.
 * - MenuLinks: renderiza enlaces de navegación.
 * - SettingsButton: acceso rápido a configuración.
 * - Logout: cierre de sesión condicional.
 * =========================================================
 */
export const MobileHamburgerMenu: React.FC<Props> = ({
  links = [],
  isAdmin = false,
}) => {

  /**
   * Estado que controla si el menú móvil está abierto o cerrado.
   */
  const [menuOpen, setMenuOpen] = useState(false);

  /**
   * Obtiene el idioma actual desde el contexto global.
   */
  const { language } = useLanguage();

  /**
   * Alterna el estado de visibilidad del menú.
   * Utiliza actualización funcional para evitar estados obsoletos.
   */
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      {/* ======================================================
          ÍCONO HAMBURGUESA (menú cerrado)
        ====================================================== */}
      {!menuOpen ? (
        <TfiMenuAlt
          className={styles['menu__icon-toggle']}
          onClick={toggleMenu}
          aria-label="Open menu"
        />
      ) : (
        /* ======================================================
          CONTENEDOR MENÚ MÓVIL (menú abierto)
        ====================================================== */
        <section className={styles['menu--phone__container']}>

          {/* Botón para cerrar el menú */}
          <AiOutlineClose
            className={styles['menu__icon-toggle']}
            onClick={toggleMenu}
            aria-label="Close menu"
          />

          {/* Navegación principal (modo móvil) */}
          <MenuLinks isPhone links={links} />

          {/* Acceso a configuración (modo flotante) */}
          <SettingsButton className="visible" isFloating />

          {/* Cierre de sesión visible únicamente para administradores */}
          {isAdmin && <Logout lang={language} />}
        </section>
      )}
    </>
  );
};

export default MobileHamburgerMenu;