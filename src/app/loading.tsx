'use client';

import React from 'react';

export default function Loading() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          border: '8px solid #f3f3f3',
          borderTop: '8px solid #3498db',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          animation: 'spin 1s linear infinite',
        }}
      ></div>

      <p style={{ marginTop: '1rem', fontSize: '1.2rem', color: '#555' }}>
        Cargando, por favor espera...
      </p>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
