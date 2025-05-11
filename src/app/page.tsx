'use client';

import React, { useContext } from 'react';
import Head from 'next/head';
import Image from 'next/image';

// Componentes UI
import Social from '@/components/molecules/SocialLinks/SocialLinks';
import { LanguageToggleButton } from '@/components/molecules/LanguageSelector/LanguageSelector';
import ThemeToggle from '@/components/molecules/ThemeToggle/ThemeToggle';
import { Menu, MenuPhone, MenuAside } from '@/components/organisms/Menu/Menu';

// Contexto de idioma
import LanguageContext, { LanguageContextType } from '@/context/LanguageContext';

// Estilos
import styles from './page.module.css';

/**
 * 🏠 HomePage Component
 * Página principal del portafolio personal.
 * Muestra presentación, enlaces sociales y navegación.
 */
const HomePage: React.FC = () => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;

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
          <MenuPhone isAdmin={false} language={isSpanish ? 'es' : 'en'} />
          <LanguageToggleButton />
          <ThemeToggle language={isSpanish ? 'es' : 'en'} />
        </header>

        <main className={styles['home__main']}>
          <section className={styles['home__main-info']}>
            <Image
              src="/assets/logo.png"
              alt="Logo de Krloz Medina"
              width={300}
              height={200}
              className={styles['home__main-img']}
              loading="lazy"
              priority={false}
            />
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

          <Menu language={isSpanish ? 'es' : 'en'} />
        </main>

        <aside className={styles['home__aside']}>
          <MenuAside language={isSpanish ? 'es' : 'en'} />
        </aside>
      </section>
    </>
  );
};

export default HomePage;
