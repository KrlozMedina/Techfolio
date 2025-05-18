'use client';

import React from 'react';
import Head from 'next/head';
import Social from '@/components/molecules/SocialLinks/SocialLinks';
import { useLanguage } from '@/hooks';
import styles from './page.module.css';
import SettingsButton from '@/components/organisms/SettingPanel/SettingsPanel';
import Logo from '@/components/atom/media/Logo';
import { FloatingMenu, MenuAside, MobileHamburgerMenu } from '@/components/molecules/Navbar';

/**
 * 🏠 HomePage Component
 * Página principal del portafolio personal.
 * Muestra presentación, enlaces sociales y navegación.
 */
const HomePage: React.FC = () => {
  const { isSpanish } = useLanguage();

  // 🌍 Texto dinámico según idioma
  const text = {
    greeting: isSpanish ? "Hola! 👋🏼" : "Hi! 👋🏼",
    intro1: isSpanish
      ? "Soy Carlos Alidio Medina López. Desarrollador de Software e Ingeniero en Control y Automatización."
      : "I'm Carlos Alidio Medina López. A Software Developer and Control & Automation Engineer.",
    intro2: isSpanish
      ? "Explora mis trabajos, habilidades y trayectoria. ¡Bienvenido!"
      : "This portfolio showcases my projects. Explore my work, skills, and background. Welcome!",
    language: isSpanish ? 'es' : 'en',
  };

  return (
    <>
      {/* 🔗 Meta canonical para SEO */}
      <Head>
        <link rel="canonical" href="https://krlozmedina.dev" />
      </Head>

      <section className={styles['home__container']}>
        <header>
          <MobileHamburgerMenu isAdmin={false} language={isSpanish ? 'es' : 'en'} />
          <SettingsButton />
        </header>

        <main className={styles['home__main']}>
          <section className={styles['home__main-info']}>
            <Logo />
            
            <section>
              {/* 🗣️ Texto de presentación */}
              <h1>{text.greeting} Soy Carlos Medina</h1>
              <h2>
                {isSpanish
                  ? 'Desarrollador Full Stack & Ingeniero en Control y Automatización'
                  : 'Full Stack Developer & Control and Automation Engineer'}
              </h2>
              <p>
                {isSpanish
                  ? 'Conecto el mundo digital con el físico: diseño, programo e implemento sistemas web e IoT.'
                  : 'Bridging the physical and digital world: I design, code, and implement web and IoT systems.'}
              </p>
              <p>{text.intro2}</p>
            </section>

            <Social />
          </section>

          <FloatingMenu language={isSpanish ? 'es' : 'en'} />
        </main>

        <aside className={styles['home__aside']}>
          <MenuAside language={isSpanish ? 'es' : 'en'} />
        </aside>
      </section>
    </>
  );
};

export default HomePage;
