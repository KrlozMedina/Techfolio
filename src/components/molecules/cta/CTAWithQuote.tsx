import React from "react";
import { Page } from "@/shared/enums";
import { useTranslation } from "@/hooks/useTranslation";
import style from "./CTAWithQuote.module.scss";
import { Language } from "@/lib/i18n";
import { ButtonLink } from "@/components/atom/ButtonLink/ButtonLink";

/**
 * Props del componente CTAWithQuote
 */
interface Props {
  /** Título principal del CTA */
  title: string;

  /** Texto del botón secundario */
  valueButton: string;

  /** Ruta destino del botón secundario */
  pathButton: string;

  /** Idioma actual */
  lang: Language;

  /** Página actual (usada para resolver la cita) */
  page: Page;
}

/**
 * Texto estático del botón de contacto.
 * Nota: actualmente no usa el sistema i18n central.
 */
const CTA_TEXT = {
  contactButton: {
    es: "Contácteme",
    en: "Contact me",
  },
};

/**
 * =========================================================
 * CTAWithQuote
 * ---------------------------------------------------------
 * Sección Call-To-Action que incluye:
 * - Título dinámico.
 * - Cita contextual (según página).
 * - Dos botones de acción.
 *
 * Responsabilidades:
 * - Obtener cita desde i18n (t[page].hero.quote).
 * - Renderizar botones reutilizando ButtonLink.
 * - Mostrar sección solo si existe cita.
 *
 * Dependencias:
 * - useTranslation → contenido dinámico.
 * - ButtonLink → consistencia visual con sistema de botones.
 * =========================================================
 */
const CTAWithQuote: React.FC<Props> = ({
  title,
  valueButton,
  pathButton,
  lang,
  page,
}) => {
  /**
   * Hook de traducción.
   */
  const { t } = useTranslation();

  /**
   * Cita contextual según la página actual.
   */
  const quote = t[page]?.hero?.quote;

  /**
   * Si no existe cita para la página, no renderiza la sección.
   */
  if (!quote) return null;

  return (
    <section className={style.cta}>
      <h3 className={style.cta__title}>{title}</h3>

      <div className={style.cta__card}>
        <div className={style.cta__quote}>
          <p className={style["cta__quote-text"]}>
            {quote.text}
          </p>
          <p className={style["cta__quote-author"]}>
            — {quote.author}
          </p>
        </div>

        <div className={style.cta__actions}>
          <ButtonLink
            href="/contact"
            variant="primary"
          >
            {CTA_TEXT.contactButton[lang]}
          </ButtonLink>

          <ButtonLink
            href={pathButton}
            variant="secondary"
          >
            {valueButton}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
};

export default CTAWithQuote;