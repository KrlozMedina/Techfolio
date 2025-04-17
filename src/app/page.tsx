'use client';

import React, { useContext } from 'react';
import Image from 'next/image';
import Social from "@/components/organisms/Social/Social";
import { Language } from '@/components/molecules/Language';
import { Menu, MenuPhone, MenuAside } from '@/components/organisms/Menu/Menu';
import LanguageContext, { LanguageContextType } from '@/redux/context/LanguageContext';
import styles from './page.module.css';

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
    <section className={styles['home__container']}>
      <header>
        <MenuPhone isAdmin={false} />
        <Language />
      </header>

      <main className={styles['home__main']}>
        <section className={styles['home__main-info']}>
          <Image
            src='https://imgur.com/LGfotuO.png' 
            alt="Logo de Krloz Medina"
            width={300}
            height={200}
            className={styles['home__main-img']}
          />
          <section>
            <p>{text.greeting}</p>
            <p>{text.intro1}</p>
            <p>{text.intro2}</p>
          </section>
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