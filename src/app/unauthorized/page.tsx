'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import ErrorTemplate from '@/components/templates/ErrorTemplate/ErrorTemplate';
import { useLanguage } from '@/hooks';

import style from './page.module.scss';

// 🔤 Textos multilenguaje organizados por contexto
const texts = {
  Unauthorized: {
    title: {
      es: 'Sesión expirada',
      en: 'Session Expired',
    },
    message: {
      es: 'Tu sesión ha caducado o no tienes autorización para acceder a esta página.',
      en: 'Your session has expired or you are not authorized to access this page.',
    },
    redirect: {
      es: 'Redirigiendo al inicio de sesión...',
      en: 'Redirecting to login...',
    },
    goToLogin: {
      es: 'Ir al login ahora',
      en: 'Go to login now',
    },
  },
};

export default function UnauthorizedPage() {
  const router = useRouter();
  // const { isSpanish } = useLanguage();
  // const lang = isSpanish ? 'es' : 'en';
  const { language } = useLanguage();

  // ⏳ Redirección automática tras 5 segundos
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.push('/login');
    }, 5000);

    return () => clearTimeout(timeoutId); // ✅ Limpieza al desmontar
  }, [router]);

  return (
    <ErrorTemplate status="unauthorized" withBackground>
      <div className={style.unauthorized}>
        {/* 🔐 Título */}
        <h1 className={style.unauthorized__title}>
          🔐 {texts.Unauthorized.title[language]}
        </h1>

        {/* 💬 Mensaje principal */}
        <p className={style.unauthorized__text}>
          {texts.Unauthorized.message[language]}
        </p>

        {/* ⏱️ Aviso de redirección */}
        <p
          className={clsx(
            style.unauthorized__text,
            style['unauthorized__text--muted']
          )}
        >
          {texts.Unauthorized.redirect[language]}
        </p>

        {/* 🔁 Botón para ir al login manualmente */}
        <button onClick={() => router.push('/login')}>
          {texts.Unauthorized.goToLogin[language]}
        </button>
      </div>
    </ErrorTemplate>
  );
}
