'use client';

import Social from '@/components/molecules/social/SocialLinks';
import styles from './page.module.scss';
import SettingsButton from '@/components/organisms/settings/SettingsButton';
import Logo from '@/components/atom/Logo/Logo';
import { useTranslation } from '@/hooks/useTranslation';
import MobileHamburgerMenu from '@/components/molecules/Navbar/MobileHamburgerMenu';
import FloatingMenu from '@/components/molecules/Navbar/FloatingMenu';
import MenuAside from '@/components/molecules/Navbar/MenuAside';

/**
 * =========================================================
 * HomeClient
 * ---------------------------------------------------------
 * Componente cliente principal de la página Home.
 *
 * Responsabilidades:
 * - Renderizar la estructura base visible al usuario.
 * - Integrar navegación móvil y desktop.
 * - Mostrar branding e introducción traducida.
 * - Exponer accesos a configuración y redes sociales.
 *
 * Arquitectura:
 * - Header → navegación móvil + ajustes.
 * - Main → contenido central + menú flotante.
 * - Aside → navegación lateral persistente (desktop).
 *
 * Es un Client Component porque:
 * - Usa hooks (useTranslation).
 * - Renderiza componentes interactivos.
 * - Depende de estado del usuario (idioma, menú, etc.).
 * =========================================================
 */
export const HomeClient: React.FC = () => {

  /**
   * Hook de traducción.
   * Provee textos dinámicos según idioma activo.
   */
  const { t } = useTranslation();

  return (
    <section className={styles['home__container']}>

      {/* ===================================================
        HEADER SUPERIOR
        - Menú hamburguesa (mobile)
        - Botón de configuración
        =================================================== */}
      <header>
        {/* Menú móvil (usuario no admin en Home pública) */}
        <MobileHamburgerMenu isAdmin={false} />

        {/* Configuración global (tema / idioma) */}
        <SettingsButton />
      </header>

      {/* ===================================================
        CONTENIDO PRINCIPAL
        =================================================== */}
      <main className={styles['home__main']}>

        {/* Información principal / branding */}
        <article className={styles['home__main--info']}>

          {/* Logo de marca */}
          <Logo />

          {/* Texto introductorio dinámico */}
          <div>
            <h1>{t.home.title}</h1>
            <h2>{t.home.subtitle}</h2>
            <p>{t.home.intro.primary}</p>
            <p>{t.home.intro.cta}</p>
          </div>

          {/* Redes sociales */}
          <Social />
        </article>

        {/* Menú flotante contextual */}
        <FloatingMenu />
      </main>

      {/* ===================================================
        MENÚ LATERAL (Desktop)
        Persistente en resoluciones grandes
        =================================================== */}
      <aside className={styles['home__aside']}>
        <MenuAside />
      </aside>

    </section>
  );
};

export default HomeClient;