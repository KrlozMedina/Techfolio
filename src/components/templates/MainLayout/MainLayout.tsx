import React, { ReactNode } from 'react';
import style from './MainLayout.module.scss';
import Link from 'next/link';
import SettingsButton from '@/components/organisms/settings/SettingsButton';
import Headers from '@/components/organisms/Headers/Header';
import Footer from '@/components/molecules/Footer/Footer';
import MobileHamburgerMenu from '@/components/molecules/Navbar/MobileHamburgerMenu';
import MenuAside from '@/components/molecules/Navbar/MenuAside';
import { Language } from '@/lib/i18n';

/**
 * Representa un enlace de navegación del layout principal.
 */
interface Link {
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
 * Props del componente MainLayout
 */
interface Props {
  /** Contenido dinámico renderizado dentro del layout */
  children: ReactNode;

  /** Enlaces opcionales para navegación */
  links?: Link[];

  /** Indica si el usuario tiene permisos de administrador */
  isAdmin?: boolean;

  /** Idioma activo del sistema */
  language: Language;
}

/**
 * =========================================================
 * MainLayout
 * ---------------------------------------------------------
 * Layout estructural principal de la aplicación.
 *
 * Responsabilidades:
 * - Proveer estructura base común a todas las páginas.
 * - Integrar navegación mobile y desktop.
 * - Renderizar header, footer y aside persistentes.
 * - Controlar enlaces activos y rol de usuario.
 *
 * Arquitectura:
 * - MobileHamburgerMenu → navegación móvil.
 * - Header → navegación superior.
 * - Main → contenido dinámico (children).
 * - Footer → información global.
 * - Aside → menú lateral + ajustes flotantes.
 *
 * Diseño:
 * - Basado en estructura BEM definida en SCSS.
 * - Layout centralizado con ancho máximo configurable.
 * =========================================================
 */
const MainLayout: React.FC<Props> = ({
  children,
  links = [],
  isAdmin = false,
  language,
}) => {
  return (
    <div className={style.template}>

      {/* Navegación móvil */}
      <MobileHamburgerMenu links={links} isAdmin={isAdmin} />

      <div className={style['template__layout']}>

        {/* Header principal */}
        <Headers language={language} links={links} isAdmin={isAdmin} />

        {/* Contenedor principal con scroll */}
        <section className={style['template__container']}>

          {/* Contenido dinámico */}
          <main className={style['template__main']}>
            {children}
          </main>

          {/* Footer global */}
          <Footer />
        </section>

        {/* Aside lateral persistente */}
        <aside className={style['template__aside']}>
          <MenuAside />
          <SettingsButton isFloating />
        </aside>
      </div>
    </div>
  );
};

export default MainLayout;