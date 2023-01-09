import React, { useContext, useState } from "react";
import LenguajeContext from "../../context/LenguajeContext";

const ButtonLenguaje = () => {
    const {isSpanish, setIsSpanish} = useContext(LenguajeContext);

    const handlerLenguaje = () => {
        setIsSpanish(!isSpanish)
    }

    return (
        <button className="navbar--buttonLenguaje" onClick={handlerLenguaje}>
            {isSpanish ? "Ingles" : "Spanish"}
        </button>
    )
}

export default ButtonLenguaje
