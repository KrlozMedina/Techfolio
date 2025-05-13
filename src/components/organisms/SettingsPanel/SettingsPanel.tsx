'use client';

import React, { useState, ChangeEvent } from 'react';
import { FaCog, FaSun, FaMoon, FaTimes } from 'react-icons/fa';
import { BiCaretDown, BiCaretUp } from 'react-icons/bi';
import clsx from 'clsx';
import { useThemeContext } from '@/context/ThemeContext';
import styles from './SettingsPanel.module.scss';
import { useLanguage } from '@/hooks';

interface SettingsPanelProps {
  className: string;
}

/**
 * Componente que muestra el panel de configuración.
 * Permite cambiar el idioma (es/en) y el tema (claro/oscuro).
 */
const SettingsPanel: React.FC<SettingsPanelProps> = ({ className }) => {
  const { isSpanish, setIsSpanish } = useLanguage();
  const { theme, toggleTheme } = useThemeContext();

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setIsSpanish(e.target.value === 'es');
  };

  return (
    <div className={className}>
      {/* Selector de idioma */}
      <form className={styles['panel__form']}>
        <label htmlFor="language-select">
          {isSpanish ? 'Selecciona idioma:' : 'Select language:'}
        </label>
        <select
          id="language-select"
          value={isSpanish ? 'es' : 'en'}
          onChange={handleLanguageChange}
        >
          <option value="es">🇪🇸 Español</option>
          <option value="en">🇺🇸 English</option>
        </select>
      </form>

      {/* Cambio de tema */}
      <form className={styles['panel__form']}>
        <label htmlFor="theme-toggle">
          {isSpanish ? 'Tema:' : 'Toggle theme:'}
        </label>
        <div className={styles['panel__switchWrapper']}>
          <FaSun className={styles['panel__icon']} />
          <label className={styles['switch']}>
            <input
              id="theme-toggle"
              type="checkbox"
              checked={theme === 'dark'}
              onChange={toggleTheme}
              aria-label={isSpanish ? 'Cambiar tema' : 'Toggle theme'}
            />
            <span className={styles['slider']}></span>
          </label>
          <FaMoon className={styles['panel__icon']} />
        </div>
      </form>
    </div>
  );
};

interface SettingsButtonProps {
  isFloating?: boolean;
  className?: string
}

/**
 * Botón que muestra u oculta el panel de configuración.
 * Cambia su presentación si es flotante o de menú desplegable.
 */
const SettingsButton: React.FC<SettingsButtonProps> = ({ isFloating=false, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSpanish } = useLanguage();

  const togglePanel = () => setIsOpen((prev) => !prev);

  const labelText = isOpen
    ? isSpanish ? 'Cerrar configuración' : 'Close settings'
    : isSpanish ? 'Abrir configuración' : 'Open settings';

  return isFloating ? (
    <div className={clsx(styles['settings-button'], styles['settings'], className)}>
      <button
        onClick={togglePanel}
        className={styles['settings__button']}
        aria-label={labelText}
        title={labelText}
      >
        {isOpen ? <FaTimes size={24} /> : <FaCog size={24} />}
      </button>
      {isOpen && (
        <SettingsPanel className={clsx(styles['panel__container'], styles['panel__container-button'])} />
      )}
    </div>
  ) : (
    <div className={clsx(styles['settings-menu'], styles['settings'], className)}>
      <button
        onClick={togglePanel}
        className={styles['settings__button']}
        aria-label={labelText}
        title={labelText}
      >
        {isSpanish ? 'Configuración' : 'Settings'}
        {isOpen ? <BiCaretUp size={24} /> : <BiCaretDown size={24} />}
      </button>
      {isOpen && (
        <SettingsPanel className={clsx(styles['panel__container'], styles['panel__container-menu'])} />
      )}
    </div>
  );
};

export default SettingsButton;
