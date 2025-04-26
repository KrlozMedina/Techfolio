// src/components/organisms/StatusNotice/StatusNotice.tsx
import React from 'react';
import {
  FaTools,
  FaExclamationTriangle,
  FaWrench,
  FaHourglassHalf,
  FaFlask,
  FaDatabase,
} from 'react-icons/fa';

interface StatusNoticeProps {
  type: 'dummy' | 'construction' | 'incomplete' | 'maintenance' | 'comingSoon' | 'beta';
  language: 'es' | 'en';
  className?: string;
}

const messages = {
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

const StatusNotice: React.FC<StatusNoticeProps> = ({
  type,
  language,
  className = '',
}) => {
  const message = messages[type];
  const content = message[language];

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderLeft: `4px solid ${message.color}`,
        padding: '1rem',
        borderRadius: '4px',
        marginBottom: '1rem',
      }}
      className={className}
    >
      <div style={{ color: message.color, marginRight: '1rem', fontSize: '1.5rem' }}>
        {message.icon}
      </div>
      <div>
        <strong>{content.title}</strong>
        <p style={{ margin: 0 }}>{content.description}</p>
      </div>
    </div>
  );
};

export default StatusNotice;
