import React, { ReactNode } from 'react';
import Header from '@/components/organisms/Headers/Header';
import styles from './AuthLayout.module.scss';
import Sidebar from '@/components/molecules/Navbar/Sidebar';
import { Language } from '@/lib/i18n/language';

/**
 * Representa un enlace de navegación para layouts autenticados.
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
 * Props del componente AuthLayout
 */
interface AuthLayoutProps {
  /** Contenido dinámico renderizado dentro del layout */
  children: ReactNode;

  /** Idioma activo */
  lang: Language;

  /** Enlaces de navegación opcionales */
  links?: Link[];
}

/**
 * =========================================================
 * AuthLayout
 * ---------------------------------------------------------
 * Layout estructural para páginas que requieren
 * autenticación.
 *
 * Responsabilidades:
 * - Renderizar Sidebar persistente.
 * - Mostrar Header con navegación y logout.
 * - Proveer contenedor principal con scroll interno.
 *
 * Arquitectura:
 * - Sidebar → navegación lateral autenticada.
 * - Header → navegación superior + control admin.
 * - layout__page → zona principal de contenido.
 *
 * Este layout está orientado a dashboards o
 * secciones privadas del sistema.
 * =========================================================
 */
const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  lang,
  links = [],
}) => {
  return (
    <div className={styles['layout']}>

      {/* Navegación lateral autenticada */}
      <Sidebar lang={lang} />

      <main className={styles['layout__main']}>

        {/* Cabecera superior */}
        <Header
          language={lang}
          isAdmin
          links={links}
        />

        {/* Contenedor principal con scroll */}
        <section className={styles['layout__page']}>
          {children}
        </section>

      </main>
    </div>
  );
};

export default AuthLayout;