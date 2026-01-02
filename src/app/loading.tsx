'use client';

import Spinner from '@/components/atom/feedback/Spinner';
import ErrorTemplate from '@/components/templates/ErrorTemplate/ErrorTemplate';
// import { useLanguage } from '@/hooks';
import { useTranslation } from '@/hooks/useTranslation';
// import React from 'react';

/**
 * Componente que representa una pantalla de carga.
 * Se muestra mientras el contenido principal está siendo procesado o cargado.
 */
export default function Loading() {
  // const { isSpanish } = useLanguage();
  const { language } = useTranslation();

  return (
    <ErrorTemplate status='loading' withBackground>
      {/* Spinner animado */}
      <Spinner language={language} />
    </ErrorTemplate>
  );
}
