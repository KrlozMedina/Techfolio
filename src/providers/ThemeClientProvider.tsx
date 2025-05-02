'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from '@/context/ThemeContext'

interface Props {
  children: ReactNode;  // The child components to be wrapped by the ThemeProvider.
}

// A wrapper component that provides the theme context to its children.
// It allows child components to access and modify the application's theme (light/dark).
export const ThemeClientProvider = ({ children }: Props) => (
  <ThemeProvider>  {/* Provides the theme context to all child components. */}
    {children}  {/* Renders the child components within the theme context. */}
  </ThemeProvider>
)
