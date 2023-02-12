import React, { useState } from 'react'

const LenguajeContext = React.createContext(null)

export function LenguajeContextProvider({ children }) {
    const valueIsSpanish = localStorage.getItem('isSpanish');
    let valueLocal;
    valueIsSpanish && (valueIsSpanish == 'false' ? valueLocal = false : valueLocal = true)

    const [isSpanish, setIsSpanish] = useState(valueLocal);

    return(
        <LenguajeContext.Provider value={{isSpanish, setIsSpanish}}>
            {children}
        </LenguajeContext.Provider>
    );
}

export default LenguajeContext;