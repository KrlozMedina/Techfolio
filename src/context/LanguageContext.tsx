'use client';

import React, { useState, useEffect, ReactNode, createContext } from 'react';

/**
 * Tipo del contexto de idioma.
 * `isSpanish` indica si el idioma actual es español.
 * `setIsSpanish` permite cambiar el idioma.
 */
export interface LanguageContextType {
  isSpanish: boolean;
  setIsSpanish: (value: boolean) => void;
}

// Contexto para gestionar la preferencia de idioma.
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageContextProviderProps {
  children: ReactNode;
}

/**
 * Proveedor del contexto de idioma.
 * Gestiona el cambio entre español e inglés y persiste la preferencia en localStorage.
 */
export function LanguageContextProvider({ children }: LanguageContextProviderProps) {
  const [isSpanish, setIsSpanish] = useState<boolean>(true);

  // Recuperar preferencia de idioma al montar el componente
  useEffect(() => {
    const storedValue = localStorage.getItem('isSpanish');
    if (storedValue !== null) {
      setIsSpanish(storedValue === 'true');
    }
  }, []);

  // Guardar preferencia de idioma en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('isSpanish', JSON.stringify(isSpanish));
  }, [isSpanish]);

  return (
    <LanguageContext.Provider value={{ isSpanish, setIsSpanish }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageContext;