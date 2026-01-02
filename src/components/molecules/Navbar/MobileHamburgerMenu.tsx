import { useState } from 'react';
import { TfiMenuAlt } from 'react-icons/tfi';
import { AiOutlineClose } from 'react-icons/ai';

import styles from './Navbar.module.scss';
import { MenuLinks } from './MenuLinks';
import SettingsButton from '@/components/organisms/settings/SettingsButton';
import Logout from '@/components/atom/buttons/Logout';
import { useLanguage } from '@/hooks/useLanguage';
import { NavLink } from '@/lib/types/navigation';

interface Props {
  /** Enlaces secundarios (settings, legales, etc.) */
  links?: NavLink[];
  /** Indica si el usuario es admin (habilita logout) */
  isAdmin?: boolean;
}

/**
 * MobileHamburgerMenu
 * Menú de navegación para dispositivos móviles.
 */
export const MobileHamburgerMenu: React.FC<Props> = ({
  links = [],
  isAdmin = false,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language } = useLanguage();

  /** Alterna el estado del menú */
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      {!menuOpen ? (
        <TfiMenuAlt
          className={styles['menu__icon-toggle']}
          onClick={toggleMenu}
          aria-label="Open menu"
        />
      ) : (
        <section className={styles['menu-phone__container']}>
          <AiOutlineClose
            className={styles['menu__icon-toggle']}
            onClick={toggleMenu}
            aria-label="Close menu"
          />

          {/* Navegación principal */}
          <MenuLinks isPhone links={links} />

          {/* Acceso a configuración */}
          <SettingsButton className="visible" isFloating />

          {/* Cierre de sesión solo para admin */}
          {isAdmin && <Logout lang={language} />}
        </section>
      )}
    </>
  );
};

export default MobileHamburgerMenu;
