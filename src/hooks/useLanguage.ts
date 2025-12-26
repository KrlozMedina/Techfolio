import { useContext, useMemo } from 'react';
import { LanguageContext, LanguageContextType } from '@/context/LanguageContext';

const defaultLanguage: LanguageContextType = { 
  isSpanish: true, 
  setIsSpanish: () => {} // setter dummy para cumplir con el tipo
};

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext) || defaultLanguage;
  return useMemo(() => context, [context]);
}




// import { useContext } from 'react';
// import { LanguageContext, LanguageContextType } from '@/context/LanguageContext';

// export function useLanguage(): LanguageContextType {
//   const context = useContext(LanguageContext);
//   if (!context) {
//     throw new Error('useLanguage must be used within a LanguageContextProvider');
//   }
//   return context;
// }
