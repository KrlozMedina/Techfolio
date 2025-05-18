import React from 'react';
import {
  FaTools,
  FaExclamationTriangle,
  FaWrench,
  FaHourglassHalf,
  FaFlask,
  FaDatabase,
} from 'react-icons/fa';
import style from './StatusNotice.module.css';
import { NoticeType } from '@/lib/config';

// Tipos posibles para el tipo de mensaje
// type NoticeType = 'dummy' | 'construction' | 'incomplete' | 'maintenance' | 'comingSoon' | 'beta';
type Language = 'es' | 'en';

interface StatusNoticeProps {
  type: NoticeType;
  language: Language;
}

// Mensajes por tipo y lenguaje
const messages: Record<NoticeType, {
  es: { title: string; description: string };
  en: { title: string; description: string };
  icon: JSX.Element;
  color: string;
}> = {
  dummy: {
    es: {
      title: 'Datos de prueba',
      description: 'Los datos mostrados son simulados y serán actualizados próximamente.',
    },
    en: {
      title: 'Dummy Data',
      description: 'The displayed data is simulated and will be updated soon.',
    },
    icon: <FaDatabase />,
    color: '#6c757d',
  },
  construction: {
    es: {
      title: 'En construcción',
      description: 'Esta sección está en desarrollo y estará disponible pronto.',
    },
    en: {
      title: 'Under Construction',
      description: 'This section is under development and will be available soon.',
    },
    icon: <FaTools />,
    color: '#17a2b8',
  },
  incomplete: {
    es: {
      title: 'Página incompleta',
      description: 'Esta página está en desarrollo y puede no contener toda la información.',
    },
    en: {
      title: 'Incomplete Page',
      description: 'This page is under development and may not contain all information.',
    },
    icon: <FaExclamationTriangle />,
    color: '#ffc107',
  },
  maintenance: {
    es: {
      title: 'Mantenimiento',
      description: 'Esta sección está en mantenimiento y estará disponible en breve.',
    },
    en: {
      title: 'Maintenance',
      description: 'This section is under maintenance and will be available shortly.',
    },
    icon: <FaWrench />,
    color: '#6c757d',
  },
  comingSoon: {
    es: {
      title: 'Próximamente',
      description: 'Esta funcionalidad estará disponible en una futura actualización.',
    },
    en: {
      title: 'Coming Soon',
      description: 'This feature will be available in a future update.',
    },
    icon: <FaHourglassHalf />,
    color: '#28a745',
  },
  beta: {
    es: {
      title: 'Beta',
      description: 'Esta funcionalidad está en fase beta y puede presentar inestabilidades.',
    },
    en: {
      title: 'Beta',
      description: 'This feature is in beta and may be unstable.',
    },
    icon: <FaFlask />,
    color: '#007bff',
  },
};

/**
 * Componente StatusNotice
 * Muestra una advertencia visual con ícono, color y mensaje personalizado
 * según el estado de una sección del sistema.
 *
 * @param type - Tipo de aviso (dummy, construction, etc.)
 * @param language - Idioma del mensaje ('es' o 'en')
 */
const StatusNotice: React.FC<StatusNoticeProps> = ({ type, language }) => {
  const message = messages[type];
  const content = message[language];

  return (
    <div
      role="status"
      aria-live="polite"
      style={{ borderLeft: `4px solid ${message.color}` }}
      className={style['notice__container']}
    >
      <div
        style={{ color: message.color }}
        className={style['notice__container--icon']}
      >
        {message.icon}
      </div>
      <div>
        <strong>{content.title}</strong>
        <p>{content.description}</p>
      </div>
    </div>
  );
};

export default StatusNotice;
