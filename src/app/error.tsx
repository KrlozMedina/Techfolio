'use client';

import React from 'react';
import Link from 'next/link';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem'
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#d32f2f' }}>
        Algo salió mal 😢
      </h1>

      <p style={{ color: '#fff', marginBottom: '1.5rem' }}>
        {error.message || 'Ha ocurrido un error inesperado. Por favor, intenta nuevamente.'}
      </p>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={reset}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: '0.25rem',
            cursor: 'pointer'
          }}
        >
          Reintentar
        </button>

        <Link href="/" passHref>
          <button
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#9e9e9e',
              color: '#fff',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
          >
            Ir al inicio
          </button>
        </Link>
      </div>
    </div>
  );
}
