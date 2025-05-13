'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import ErrorTemplate from '@/components/templates/ErrorTemplate/ErrorTemplate';

/**
 * Página personalizada para errores 404.
 * Muestra un mensaje de "Página no encontrada" junto con una imagen ilustrativa.
 */
const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = "Not Found";
  }, []);

  return (
    <ErrorTemplate status='notFound' withBackground>
      <h1 className="not-found__title">{"<404/>"}</h1>

      <div className="not-found__p">
        <span className="not-found__sign">&lt;</span>
        <span className="not-found__tag">p</span>
        <span className="not-found__sign">&gt;</span>
      </div>

      <p className="not-found__text">Page not found!!</p>

      <div className="not-found__p">
        <span className="not-found__sign">&lt;/</span>
        <span className="not-found__tag">p</span>
        <span className="not-found__sign">&gt;</span>
      </div>

      <div className="not-found__p">
        <span className="not-found__sign">&lt;</span>
        <span className="not-found__tag">Link</span>
        <span className="not-found__ref">href</span>=
        <span className="not-found__tag">{'{'}</span>
        <Link className="not-found__link" href="/">/</Link>
        <span className="not-found__tag">{'}'}</span>
        <span className="not-found__sign">&gt;</span>
      </div>

      <p className="not-found__text">
        <Link className="not-found__link" href="/">Return to home</Link>
      </p>

      <div className="not-found__p">
        <span className="not-found__sign">&lt;/</span>
        <span className="not-found__tag">Link</span>
        <span className="not-found__sign">&gt;</span>
      </div>
    </ErrorTemplate>
  );
};

export default NotFound;
