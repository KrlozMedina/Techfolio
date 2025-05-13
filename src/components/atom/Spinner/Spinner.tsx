import React from 'react'

type SupportedLanguage = 'es' | 'en';

interface LoadingProps {
  language: SupportedLanguage;
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center' as const,
    padding: '2rem',
    fontFamily: 'Arial, sans-serif'
  },
  spinner: {
    width: '60px',
    height: '60px',
    border: '8px solid var(--color-text)',
    borderTop: '8px solid var(--color-background-container)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  text: {
    marginTop: '1rem',
    fontSize: '1.2rem',
    color: '#555'
  }
}

// Textos en múltiples idiomas
const texts = {
  loading: {
    es: 'Cargando, por favor espera...',
    en: 'Loading, please wait...'
  },
}

/**
 * Spinner (átomo): Muestra un indicador de carga circular con texto.
 *
 * @param language Idioma para el texto mostrado ('es' o 'en')
 * @returns JSX.Element
 */
const Spinner: React.FC<LoadingProps> = ({ language }) => {
  return (
    <div style={styles['container']}>
      <div style={styles.spinner} />

      <p style={styles['text']}>
        {texts.loading[language]}
      </p>

      {/* Animación de giro */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default Spinner
