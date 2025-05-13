'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/hooks';
import ErrorTemplate from '@/components/templates/ErrorTemplate/ErrorTemplate';

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
  const { isSpanish } = useLanguage();

  const messages = {
    title: isSpanish ? 'Algo malio sal 🤖💥' : "Somethin' went wrung 🤖💥",
    fallback: isSpanish
      ? 'Ha ocurrido un error inesperado. Por favor, intenta nuevamente.'
      : 'An unexpected error occurred. Please try again.',
    retry: isSpanish ? 'Reintentar' : 'Retry',
    home: isSpanish ? 'Ir al inicio' : 'Go to home',
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
      <div className="error__button-container" role="group" aria-label={isSpanish ? 'Opciones de navegación' : 'Navigation options'}>
        <button
          onClick={reset}
          className="error__button error__button-retry"
          aria-label={isSpanish ? 'Reintentar operación' : 'Retry operation'}
        >
          {messages.retry}
        </button>

        {/* Se usa aria-label para describir mejor el destino del enlace */}
        <Link href="/" passHref>
          <button
            className="error__button error__button-home"
            aria-label={isSpanish ? 'Ir a la página de inicio' : 'Go to homepage'}
          >
            {messages.home}
          </button>
        </Link>
      </div>
    </ErrorTemplate>
  );
}
