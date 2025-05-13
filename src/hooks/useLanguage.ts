import { useContext } from 'react';
import { LanguageContext, LanguageContextType } from '@/context/LanguageContext';

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageContextProvider');
  }
  return context;
}
