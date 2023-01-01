import React, { useState } from 'react'

const LenguajeContext = React.createContext({})

export function LenguajeContextProvider({ children }) {
    const [isSpanish, setIsSpanish] = useState(true);

    return(
        <LenguajeContext.Provider value={{isSpanish, setIsSpanish}}>
            {children}
        </LenguajeContext.Provider>
    );
}

export default LenguajeContext;