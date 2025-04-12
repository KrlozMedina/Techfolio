'use client';

import React, { useContext } from 'react';
import Image from 'next/image';
import Social from "@/components/organisms/Social";
import { Language } from '@/components/molecules/Language';
import { Menu, MenuPhone, MenuAside } from '@/components/organisms/Menu';
import LanguageContext, { LanguageContextType } from '@/context/LanguageContext';
import logo from '@/assets/Logo.png';
import styles from './page.module.css';

const HomePage: React.FC = () => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;
  
  const greeting = isSpanish ? "Hola! 👋🏼" : "Hi! 👋🏼";
  const intro1 = isSpanish
    ? "Soy Carlos Alidio Medina López. Soy Desarrollador de Software e Ingeniero en Control y Automatización."
    : "I'm Carlos Alidio Medina López. I'm a Software Developer and Control & Automation Engineer.";
  const intro2 = isSpanish
    ? "Explora mis trabajos, habilidades y trayectoria. ¡Bienvenido!"
    : "This portfolio showcases my projects. Explore my work, skills, and background. Welcome!";
  
    return (
    <section className={styles['home__container']}>
      <header>
        <MenuPhone />
        <Language />
      </header>

      <main className={styles['home__main']}>
        <section className={styles['home__main--info']}>
          <Image
            src={logo}
            alt="Logo de Krloz Medina"
            className={styles['home__main--img']}
            priority
          />
          <p>{greeting}</p>
          <p>{intro1}</p>
          <p>{intro2}</p>
          <Social />
        </section>

        <Menu />
      </main>

      <aside className={styles['home__aside']}>
        <MenuAside />
      </aside>
    </section>
  );
};

export default HomePage;