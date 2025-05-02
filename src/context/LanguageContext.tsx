'use client'

import React, { useState, useEffect, ReactNode } from 'react';

// Defines the type for the language context, including the current language state and its setter.
export interface LanguageContextType {
  isSpanish: boolean;
  setIsSpanish: (value: boolean) => void;
}

// Creates a context for managing language preference (Spanish or English).
export const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

interface LanguageContextProviderProps {
  children: ReactNode;
}

// Context provider that manages language switching between Spanish and English.
// It saves and retrieves the user's language preference from localStorage.
export function LanguageContextProvider({ children }: LanguageContextProviderProps) {
  const [isSpanish, setIsSpanish] = useState<boolean>(false);

  useEffect(() => {
    // On component mount, retrieve the stored language preference from localStorage.
    if (typeof window !== 'undefined') {
      const valueIsSpanish = localStorage.getItem('isSpanish');
      if (valueIsSpanish) {
        setIsSpanish(valueIsSpanish === 'true');
      }
    }
  }, []);

  useEffect(() => {
    // Whenever the language changes, save the new preference to localStorage.
    if (typeof window !== 'undefined') {
      localStorage.setItem('isSpanish', isSpanish.toString());
    }
  }, [isSpanish]);

  return (
    <LanguageContext.Provider value={{ isSpanish, setIsSpanish }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageContext;
