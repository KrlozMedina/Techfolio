import React, { useState } from 'react'

const LanguageContext = React.createContext(null)

export function LanguageContextProvider({ children }) {
    const valueIsSpanish = localStorage.getItem('isSpanish');
    let valueLocal;
    valueIsSpanish && (valueIsSpanish == 'false' ? valueLocal = false : valueLocal = true)

    const [isSpanish, setIsSpanish] = useState(valueLocal);

    return(
        <LanguageContext.Provider value={{isSpanish, setIsSpanish}}>
            {children}
        </LanguageContext.Provider>
    );
}

export default LanguageContext;