'use client'

import React, { useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  isSpanish: boolean;
  setIsSpanish: (value: boolean) => void;
}

export const LanguageContext = React.createContext<LanguageContextType | null>(null);

interface LanguageContextProviderProps {
  children: ReactNode;
}

export function LanguageContextProvider({ children }: LanguageContextProviderProps) {
  const [isSpanish, setIsSpanish] = useState<boolean>(false);

  useEffect(() => {
    // Ejecutar solo en el cliente
    if (typeof window !== 'undefined') {
      const valueIsSpanish = localStorage.getItem('isSpanish');
      if (valueIsSpanish) {
        setIsSpanish(valueIsSpanish === 'true');
      }
    }
  }, []);

  useEffect(() => {
    // Guardar en localStorage cada vez que el idioma cambie
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