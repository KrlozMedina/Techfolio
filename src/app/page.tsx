'use client'

import React, { useContext } from 'react';
import Image from 'next/image';
import Social from "@/components/organisms/Social";
import { Language } from '@/components/molecules/Language';
import { Menu, MenuPhone, MenuAside } from '@/components/organisms/Menu';
import LanguageContext, { LanguageContextType } from '@/context/LanguageContext';
import logo from '@/assets/Logo.png';
import '@/styles/pages/Home.css';

// Define the types for the component props if needed
const Home: React.FC = () => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;

  return (
    <div className='home--container'>
      <MenuPhone />
      <Language />

      <main className='home__main'>
        <section className='home__main--info'>
        <Image 
          src={logo} 
          alt="Logo" 
          className="logo-imagen"
        />

          <p>
            {isSpanish ? "Hola! 👋🏼" : "Hi! 👋🏼"}
          </p>

          <p>
            {isSpanish
              ? "Soy Carlos Alidio Medina López, Desarrollador de Software e Ingeniero en Control y Automatización"
              : "I'm Carlos Alidio Medina López, Software Developer and Engineer in Control and Automation"
            }
          </p>
          
          <Social />
        </section>

        <Menu />
      </main>

      <aside className='home__aside'>
        <MenuAside />
      </aside>
    </div>
  )
}

export default Home