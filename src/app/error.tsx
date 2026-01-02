'use client';

import { JSX } from 'react';
import Link from 'next/link';
// import { useLanguage } from '@/hooks';
import ErrorTemplate from '@/components/templates/ErrorTemplate/ErrorTemplate';
import { useTranslation } from '@/hooks/useTranslation';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

/**
 * Página de error general que se muestra cuando ocurre una excepción en la aplicación.
 * Proporciona opciones accesibles para reintentar o regresar al inicio.
 *
 * @param {ErrorPageProps} props - Props que incluyen el objeto `error` y la función `reset`.
 * @returns {JSX.Element} El componente de la página de error.
 */
export default function ErrorPage({ error, reset }: ErrorPageProps): JSX.Element {
  // const { isSpanish } = useLanguage();
  const { t } = useTranslation();

  const messages = {
    title: t.error.title,
    fallback: t.error.fallback,
    retry: t.error.retry,
    home: t.error.home,
  };

  return (
    <ErrorTemplate status="generalError" withBackground>
      {/* Heading principal de la página */}
      <h1 className="error__title" role="heading" aria-level={1}>
        {messages.title}
      </h1>

      {/* Mensaje de error visible y accesible para lectores de pantalla */}
      <p className="error__message" role="alert">
        {error.message || messages.fallback}
      </p>

      {/* Contenedor de botones con navegación accesible */}
      <div className="error__button-container" role="group" aria-label={t.error.options}>
        <button
          onClick={reset}
          className="error__button error__button-retry"
          aria-label={t.error.retryLabel}
        >
          {messages.retry}
        </button>

        {/* Se usa aria-label para describir mejor el destino del enlace */}
        <Link href="/" passHref>
          <button
            className="error__button error__button-home"
            aria-label={t.error.homeLabel}
          >
            {messages.home}
          </button>
        </Link>
      </div>
    </ErrorTemplate>
  );
}
