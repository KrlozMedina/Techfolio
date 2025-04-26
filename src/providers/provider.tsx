'use client'

import { Provider } from 'react-redux' 
import { store } from '../redux/store' 
import { ThemeClientProvider } from '@/providers/ThemeClientProvider'

interface Props {
  children: React.ReactNode;  // The children components that will be wrapped by the providers.
}

// This component wraps the application in the necessary context providers:
// - It provides the Redux store to make the app's state available globally.
// - It provides the theme context to manage the theme (light/dark).
export const Providers = ({ children }: Props) => (
  <Provider store={store}>  {/* Provides access to the Redux store globally. */}
    <ThemeClientProvider>  {/* Provides access to the theme context for theme management. */}
      {children}  {/* Renders the passed children components, allowing them to access the contexts. */}
    </ThemeClientProvider>
  </Provider>
);
