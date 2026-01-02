'use client';

import Social from '@/components/molecules/social/SocialLinks';
import styles from './page.module.scss';
import SettingsButton from '@/components/organisms/settings/SettingsButton';
import Logo from '@/components/atom/Logo/Logo';
// import { FloatingMenu, MenuAside, MobileHamburgerMenu } from '@/components/molecules/navbar/index';
import { useTranslation } from '@/hooks/useTranslation';
import MobileHamburgerMenu from '@/components/molecules/navbar/MobileHamburgerMenu';
import FloatingMenu from '@/components/molecules/navbar/FloatingMenu';
import MenuAside from '@/components/molecules/navbar/MenuAside';

/**
 * HomeClient
 *
 * Componente cliente de la página Home.
 * Renderiza la estructura principal visible al usuario:
 * - Header con menú móvil y botón de ajustes
 * - Contenido principal con branding, texto introductorio y redes sociales
 * - Menús flotantes y laterales
 *
 * Es client component porque:
 * - Usa hooks (useTranslation)
 * - Renderiza componentes interactivos (menus, settings)
 */
export const HomeClient: React.FC = () => {
  // Hook de traducción según idioma activo
  const { t } = useTranslation();

  return (
    <section className={styles['home__container']}>
      {/* Header superior */}
      <header>
        {/* Menú hamburguesa para mobile (no admin) */}
        <MobileHamburgerMenu isAdmin={false} />
        {/* Botón de configuración (tema / idioma) */}
        <SettingsButton />
      </header>

      {/* Contenido principal */}
      <main className={styles['home__main']}>
        <article className={styles['home__main--info']}>
          {/* Logo de la aplicación / marca */}
          <Logo />

          {/* Texto principal de presentación */}
          <div>
            <h1>{t.home.title}</h1>
            <h2>{t.home.subtitle}</h2>
            <p>{t.home.intro1}</p>
            <p>{t.home.intro2}</p>
          </div>

          {/* Enlaces a redes sociales */}
          <Social />
        </article>

        {/* Menú flotante contextual */}
        <FloatingMenu />
      </main>

      {/* Menú lateral (desktop / persistente) */}
      <aside className={styles['home__aside']}>
        <MenuAside />
      </aside>
    </section>
  );
};

export default HomeClient;
