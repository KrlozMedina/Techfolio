'use client';

/**
 * Archivo que centraliza todos los providers globales de la aplicación.
 * Envuelve la app con Redux y manejo de tema (ThemeProvider) para toda la UI.
 */

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { ThemeClientProvider } from '@/providers/ThemeClientProvider';

interface Props {
  children: React.ReactNode; // Contenido que será envuelto por los providers
}

/**
 * Componente que envuelve la aplicación con todos los providers necesarios
 * - Redux Provider: Para estado global de la app
 * - ThemeClientProvider: Para manejo de tema y preferencias visuales
 */
export const Providers = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <ThemeClientProvider>{children}</ThemeClientProvider>
    </Provider>
  );
};
