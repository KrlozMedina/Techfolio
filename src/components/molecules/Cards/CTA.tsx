import React from 'react';
import style from './CardViews.module.scss';
import Link from 'next/link';
import { Language } from '@/shared/constants';

/**
 * Props del componente CTA
 */
interface CtaProps {
  /** Título principal del bloque CTA */
  title: string;
  /** Texto que se mostrará en el segundo botón */
  valueButton: string;
  /** Ruta de destino para el segundo botón */
  pathButton: string;
  /** Idioma actual para los textos */
  lang: Language;
}

// Textos en múltiples idiomas
const CTA_TEXT = {
  contactButton: {
    es: 'Contácteme',
    en: 'Contact me'
  }
};

/**
 * Componente Call To Action (CTA) que muestra un título y dos botones:
 * uno fijo a contacto y otro configurable.
 */
const CTA: React.FC<CtaProps> = ({ title, valueButton, pathButton, lang }) => (
  <section className={style["projects__cta"]}>
    <h2 className={style["projects__cta__title"]}>
      {title}
    </h2>
    <div className={style["projects__cta__actions"]}>
      <Link href="/contact" className={style["projects__cta__button--primary"]}>
        {CTA_TEXT.contactButton[lang]}
      </Link>

      <Link href={pathButton} className={style["projects__cta__button--secondary"]}>
        {valueButton}
      </Link>
    </div>
  </section>
);

export default CTA;
