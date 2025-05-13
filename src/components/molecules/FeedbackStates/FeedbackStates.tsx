import React from 'react';
import { FaDatabase, FaFilter } from 'react-icons/fa';
import styles from './FeedbackStates.module.scss';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import Spinner from '@/components/atom/Spinner/Spinner';
import ErrorTemplate from '@/components/templates/ErrorTemplate/ErrorTemplate';

interface LoadingProps {
  language: 'es' | 'en';
}

interface NoDataProps {
  reason: 'empty-db' | 'no-match';
  language: 'es' | 'en';
}

interface DatabaseErrorProps {
  reason: FetchBaseQueryError | SerializedError;
  language: 'es' | 'en'
}

const texts = {
  noData: {
    filterTrue: {
      es: {
        title: 'Sin resultados encontrados',
        subtitle: 'Intenta ajustar los filtros o buscar con otros criterios.'
      },
      en: {
        title: 'No results found',
        subtitle: 'Try adjusting the filters or searching with different criteria.'
      }
    },
    filterFalse: {
      es: {
        title: 'No hay datos disponibles',
        subtitle: 'Aún no hay información registrada en la base de datos.'
      },
      en: {
        title: 'No data available',
        subtitle: 'There is no information recorded in the database yet.'
      }
    }
  },
  error: {
    es: {
      title: 'Error de Conexión',
      message: 'No pudimos conectarnos con la base de datos en este momento. Por favor, verifica tu conexión o intenta de nuevo más tarde.'
    },
    en: {
      title: 'Connection Error',
      message: 'We couldn’t connect to the database at this moment. Please check your connection or try again later.'
    }
  }
}

export const Loading: React.FC<LoadingProps> = ({ language }) => {
  return (
    <ErrorTemplate status='loading' inContainer>
    {/* <div className={styles['container']}> */}
      <Spinner language={language} />
    </ErrorTemplate>
  )
}

export const NoData: React.FC<NoDataProps> = ({ reason, language='es' }) => {
  const isFilter = reason === 'no-match';

  return (
    <ErrorTemplate status='noResults' inContainer>
      <div className={styles['container']}>
        {isFilter ? (
          <FaFilter className={styles['icon']} />
        ) : (
          <FaDatabase className={styles['icon']} />
        )}
        <h2 className={styles['title']}>
          {isFilter
            ? texts.noData.filterTrue[language].title
            : texts.noData.filterFalse[language].title
          }
        </h2>
        <p className={styles['subtitle']}>
          {isFilter
            ? texts.noData.filterTrue[language].subtitle
            : texts.noData.filterFalse[language].subtitle
          }
        </p>
      </div>
    </ErrorTemplate>
  );
};

export const DatabaseError: React.FC<DatabaseErrorProps> = ({ reason, language='es' }) => {
  console.warn(reason)
  
  return (
    <ErrorTemplate status='serverError' inContainer>
      <div className={styles["db-error-container"]}>
        <div className={styles["db-error-icon"]}>⚠️</div>
        <h2 className={styles["db-error-title"]}>
          {texts.error[language].title}
        </h2>
        <p className={styles["db-error-message"]}>
          {texts.error[language].message}
        </p>
      </div>
    </ErrorTemplate>
  );
};