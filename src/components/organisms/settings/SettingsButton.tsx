import { useState } from 'react';
import { FaCog, FaTimes } from 'react-icons/fa';
import { BiCaretDown, BiCaretUp } from 'react-icons/bi';
import clsx from 'clsx';

import SettingsPanel from './SettingsPanel';
import styles from './SettingsPanel.module.scss';
import { useTranslation } from '@/hooks/useTranslation';

interface Props {
  /** Indica si el botón se renderiza flotante */
  isFloating?: boolean;
  /** Clase adicional para estilización */
  className?: string;
}

/**
 * SettingsButton
 * Componente de botón para abrir/cerrar el panel de configuración.
 * - Modo flotante: solo ícono
 * - Modo menú: texto + caret
 * - Accesible con labels dinámicos según i18n
 */
const SettingsButton: React.FC<Props> = ({ isFloating = false, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const label = isOpen ? t.settingsButton.close : t.settingsButton.open;

  return isFloating ? (
    <div className={clsx(styles['settings-button'], styles['settings'], className)}>
      <button onClick={() => setIsOpen(v => !v)} aria-label={label}>
        {isOpen ? <FaTimes /> : <FaCog />}
      </button>
      {isOpen && (
        <SettingsPanel className={clsx(styles['panel__container'], styles['panel__container-button'])} />
      )}
    </div>
  ) : (
    <div className={clsx(styles['settings-menu'], styles['settings'], className)}>
      <button onClick={() => setIsOpen(v => !v)} aria-label={label}>
        {t.settingsButton.title}
        {isOpen ? <BiCaretUp /> : <BiCaretDown />}
      </button>
      {isOpen && (
        <SettingsPanel className={clsx(styles['panel__container'], styles['panel__container-menu'])} />
      )}
    </div>
  );
};

export default SettingsButton;
