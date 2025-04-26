'use client';

import React, { useContext } from 'react';
import Image from 'next/image';
import Social from "@/components/molecules/SocialLinks/SocialLinks";
import { LanguageToggleButton } from '@/components/molecules/LanguageSelector/LanguageSelector';
import { Menu, MenuPhone, MenuAside } from '@/components/organisms/Menu/Menu';
import LanguageContext, { LanguageContextType } from '@/context/LanguageContext';
import styles from './page.module.css';
import Head from 'next/head';
import ThemeToggle from '@/components/molecules/ThemeToggle/ThemeToggle';

const HomePage: React.FC = () => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;
  
  const text = {
    greeting : isSpanish ? "Hola! 👋🏼" : "Hi! 👋🏼",
    intro1 : isSpanish
      ? "Soy Carlos Alidio Medina López. Soy Desarrollador de Software e Ingeniero en Control y Automatización."
      : "I'm Carlos Alidio Medina López. I'm a Software Developer and Control & Automation Engineer.",
    intro2 : isSpanish
      ? "Explora mis trabajos, habilidades y trayectoria. ¡Bienvenido!"
      : "This portfolio showcases my projects. Explore my work, skills, and background. Welcome!"
  }
  
    return (
    <>
      <Head>
        <link rel="canonical" href={'https://krlozmedina.dev'} />
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
              src='https://imgur.com/LGfotuO.png' 
              alt="Logo de Krloz Medina"
              width={300}
              height={200}
              className={styles['home__main-img']}
              priority
            />
            <section>
              <p>{text.greeting}</p>
              <p>{text.intro1}</p>
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