import React from 'react';
import Avatar from '@/components/atom/Avatar/Avatar';
import style from './Hero.module.scss';
import { useTranslation } from '@/hooks/useTranslation';
import { Page } from '@/shared/enums';

interface Props {
  /** Página actual (usada para resolver contenido dinámico e id de ancla) */
  page: Page;
}

/**
 * =========================================================
 * Hero
 * ---------------------------------------------------------
 * Sección principal destacada (above the fold) de cada página.
 *
 * Responsabilidades:
 * - Renderizar título y subtítulo traducidos dinámicamente.
 * - Mostrar avatar contextual según la página.
 * - Proveer CTA de scroll hacia la siguiente sección.
 *
 * Arquitectura:
 * - `page` determina:
 *    • Contenido textual → t[page].hero
 *    • Avatar renderizado
 *    • Anchor target (#page)
 *
 * Dependencias:
 * - useTranslation → contenido i18n
 * - Avatar → representación visual contextual
 * - Page (enum) → fuente tipada de páginas válidas
 * =========================================================
 */
export const Hero: React.FC<Props> = ({ page }) => {
  /**
   * Hook de traducción.
   * Resuelve contenido según idioma activo.
   */
  const { t } = useTranslation();

  return (
    <section className={style.hero}>

      {/* ================= TEXT CONTENT ================= */}
      <div className={style['hero__content']}>
        <h1 className={style['hero__title']}>
          {t[page].hero.title}
        </h1>

        <p className={style['hero__description']}>
          {t[page].hero.subtitle}
        </p>
      </div>

      {/* ================= VISUAL ================= */}
      <Avatar
        name={page}
        className={style['hero__visual']}
      />

      {/* ================= SCROLL CTA ================= */}
      <a
        href={`#${page}`}
        className={style['hero__scroll-cta']}
        aria-label={t[page].hero.cta}
      >
        <span className={style['hero__arrow']} />
      </a>

    </section>
  );
};