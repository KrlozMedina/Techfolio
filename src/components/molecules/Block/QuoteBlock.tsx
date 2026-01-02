import React from 'react';
import Avatar from '@/components/atom/Avatar/Avatar';
import style from './QuoteBlock.module.scss';
import { Language, Page, QUOTES } from '@/shared/constants';

interface QuoteBlockProps {
  /**
   * Página actual para obtener la cita correspondiente.
   */
  page: Page;

  /**
   * Idioma de la frase: español ('es') o inglés ('en').
   */
  lang: Language;
}

/**
 * Componente QuoteBlock
 *
 * Muestra una cita inspiradora con su autor y un avatar temático relacionado con la página actual.
 *
 * @param {QuoteBlockProps} props - Propiedades del componente
 * @returns {JSX.Element} Componente renderizado con la cita y el avatar
 */
export const QuoteBlock: React.FC<QuoteBlockProps> = ({ page, lang }) => {
  const quote = QUOTES[page];

  if (!quote) return null; // Evita fallos si no existe la cita

  return (
    <section className={style['quote-block']}>
      <Avatar
        name={page}
        width={160}
        height={240}
        className={style['quote-block__avatar']}
      />

      <div className={style['quote-block__content']}>
        <p className={style['quote-block__text']}>
          {quote.phrase[lang]}
        </p>
        <p className={style['quote-block__author']}>{quote.author}</p>
      </div>
    </section>
  );
};
