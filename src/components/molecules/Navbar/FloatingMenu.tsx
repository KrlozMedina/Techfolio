import { MenuLinks } from './MenuLinks';

/**
 * FloatingMenu
 * Componente contenedor del menú flotante.
 * Delega completamente la estructura y lógica a MenuLinks.
 */
export const FloatingMenu: React.FC = () => {
  return <MenuLinks />;
};

export default FloatingMenu;
