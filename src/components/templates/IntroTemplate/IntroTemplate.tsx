import React, { ReactNode } from 'react';
import style from './IntroTemplate.module.scss';

interface IntroTemplateProps {
  /**
   * 🧭 Título de la sección.
   * Se muestra en la parte superior del bloque introductorio.
   */
  title: string;

  /**
   * 📄 Texto introductorio o contextual.
   * Sirve como descripción del propósito o contenido de la sección.
   */
  intro: string;

  /**
   * 🧩 Contenido hijo que se renderea después de la introducción.
   * Generalmente otro componente o bloque visual.
   */
  children: ReactNode;
}

/**
 * 📘 IntroTemplate
 *
 * Componente de plantilla para secciones introductorias. Renderiza un título, un texto descriptivo y contenido adicional.
 *
 * Ideal para páginas que requieren una introducción contextual antes de mostrar más contenido.
 *
 * @param {string} title - Título principal de la sección.
 * @param {string} intro - Descripción introductoria.
 * @param {ReactNode} children - Elementos hijos que se renderizan después del texto.
 */
export const IntroTemplate: React.FC<IntroTemplateProps> = ({ title, intro, children }) => {
  return (
    <section className={style['intro-section']}>
      <h1 className={style['intro-section__title']}>{title}</h1>
      <p className={style['intro-section__paragraph']}>{intro}</p>
      {children}
    </section>
  );
};
