'use client';

import { MenuLinks } from './MenuLinks';

interface FloatingMenuProps {
  /**
   * Código de idioma para renderizar las etiquetas ('es' | 'en')
   */
  language: 'es' | 'en';
}

/**
 * Componente FloatingMenu
 * 
 * - Componente simple que renderiza el menú de navegación flotante.
 * - Reutiliza el componente MenuLinks para mostrar los enlaces.
 * 
 * @param language Propiedad para definir el idioma del menú.
 */
export const FloatingMenu: React.FC<FloatingMenuProps> = ({ language }) => {
  return <MenuLinks language={language} />;
};
