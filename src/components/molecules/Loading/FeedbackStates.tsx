import React, { useContext } from 'react';
import { FaDatabase, FaFilter } from 'react-icons/fa';
import styles from './FeedbackStates.module.css';
import LanguageContext, { LanguageContextType } from '@/redux/context/LanguageContext';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

interface NoDataProps {
  reason: 'empty-db' | 'no-match';
}

export const Loading: React.FC = () => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;

  return (
    <div className={styles['container']}>
      <div className={styles['spinner']}></div>
      <p className={styles['message']}>
        {isSpanish ? 'Cargando datos...' : 'Loading data...'}
      </p>
    </div>
  )
}

export const NoData: React.FC<NoDataProps> = ({ reason }) => {
  const isFilter = reason === 'no-match';
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;

  return (
    <div className={styles['container']}>
      {isFilter ? (
        <FaFilter className={styles['icon']} />
      ) : (
        <FaDatabase className={styles['icon']} />
      )}
      <h2 className={styles['title']}>
        {isFilter
          ? isSpanish 
            ? 'Sin resultados encontrados' 
            : 'No results found'
          : isSpanish 
            ? 'No hay datos disponibles' 
            : 'No data available'
        }
      </h2>
      <p className={styles['subtitle']}>
        {isFilter
          ? isSpanish
            ? 'Intenta ajustar los filtros o buscar con otros criterios.'
            : "Try adjusting the filters or searching with different criteria."
          : isSpanish
            ? 'Aún no hay información registrada en la base de datos.'
            : "There is no information recorded in the database yet."
        }
      </p>
    </div>
  );
};

interface DatabaseErrorProps {
  reason: FetchBaseQueryError | SerializedError;
}

export const DatabaseError: React.FC<DatabaseErrorProps> = ({ reason }) => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;

  console.warn(reason)
  
  return (
    <div className={styles["db-error-container"]}>
      <div className={styles["db-error-icon"]}>⚠️</div>
      <h2 className={styles["db-error-title"]}>{isSpanish ? 'Error de Conexión' : 'Connection Error'}</h2>
      <p className={styles["db-error-message"]}>
        {
          isSpanish
            ? 'No pudimos conectarnos con la base de datos en este momento. Por favor, verifica tu conexión o intenta de nuevo más tarde.'
            : 'We couldn’t connect to the database at this moment. Please check your connection or try again later.'
        }
      </p>
    </div>
  );
};