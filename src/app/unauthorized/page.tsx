'use client';

import ErrorTemplate from '@/components/templates/ErrorTemplate/ErrorTemplate';
import { useLanguage } from '@/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import style from './page.module.scss'

const texts = {
  "Unauthorized": {
    "title": {
      "es": "Sesión expirada",
      "en": "Session Expired"
    },
    "message": {
      "es": "Tu sesión ha caducado o no tienes autorización para acceder a esta página.",
      "en": "Your session has expired or you are not authorized to access this page."
    },
    "redirect": {
      "es": "Redirigiendo al inicio de sesión...",
      "en": "Redirecting to login..."
    },
    "goToLogin": {
      "es": "Ir al login ahora",
      "en": "Go to login now"
    }
  }
}

export default function UnauthorizedPage() {
  const router = useRouter();
  const { isSpanish } = useLanguage();
  const language = isSpanish ? 'es' : 'en';

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/login');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <ErrorTemplate status='unauthorized' withBackground>
      <div className={style["unauthorized"]}>
        <h1 className={style["unauthorized__title"]}>🔐 {texts.Unauthorized.title[language]}</h1>
        <p className={style["unauthorized__text"]}>{texts.Unauthorized.message[language]}</p>
        <p className={style["unauthorized__text unauthorized__text--muted"]}>
          {texts.Unauthorized.redirect[language]}
        </p>
        <button
          className={style["unauthorized__button"]}
          onClick={() => router.push('/login')}
        >
          {texts.Unauthorized.goToLogin[language]}
        </button>
      </div>
    </ErrorTemplate>
  );
}
