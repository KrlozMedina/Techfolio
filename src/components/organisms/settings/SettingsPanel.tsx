import { ChangeEvent } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useThemeContext } from '@/context/ThemeContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useI18n } from '@/hooks/useI18n';
import styles from './SettingsPanel.module.scss';

/**
 * Props del componente SettingsPanel
 * @property className - Clase CSS externa para posicionamiento/layout
 */
interface Props {
  className: string;
}

/**
 * Panel de configuración de la aplicación.
 *
 * Permite:
 * - Cambiar el idioma (ES / EN)
 * - Alternar el tema (light / dark)
 *
 * Depende de:
 * - ThemeContext para el estado del tema
 * - useLanguage para el idioma global
 * - useI18n para textos traducidos
 */
export const SettingsPanel: React.FC<Props> = ({ className }) => {
  // Estado y setter del idioma global
  const { language, setLanguage } = useLanguage();

  // Estado del tema y función para alternarlo
  const { theme, toggleTheme } = useThemeContext();

  // Función de traducción según el idioma actual
  const t = useI18n(language);

  /**
   * Maneja el cambio de idioma desde el select
   * Fuerza el tipo a idiomas soportados
   */
  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'es' | 'en');
  };

  return (
    <div className={className}>
      {/* Formulario de selección de idioma */}
      <form className={styles['panel__form']}>
        <label htmlFor="language-select">
          {t.settings.selectLanguage}
        </label>
        <select
          id="language-select"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="es">🇪🇸 Español</option>
          <option value="en">🇺🇸 English</option>
        </select>
      </form>

      {/* Formulario de cambio de tema */}
      <form className={styles['panel__form']}>
        <label htmlFor="theme-toggle">
          {t.settings.theme}
        </label>
        <div className={styles['panel__switchWrapper']}>
          <FaSun className={styles['panel__icon']} />

          {/* Switch accesible para alternar tema */}
          <label className={styles['switch']}>
            <input
              id="theme-toggle"
              type="checkbox"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
            <span className={styles['slider']} />
          </label>

          <FaMoon className={styles['panel__icon']} />
        </div>
      </form>
    </div>
  );
};

export default SettingsPanel;
