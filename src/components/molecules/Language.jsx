import React, { useContext, useState } from 'react';
import LenguajeContext from '../../context/LanguageContext';
import { BiCaretDown, BiCaretUp } from 'react-icons/bi';
import "../../styles/components/molecules.css"

const Lenguaje = () => {
  const {isSpanish, setIsSpanish} = useContext(LenguajeContext);

  const [menuLenguaje, setMenuLenguaje] = useState(false)
  
  function handlerMenuLenguaje() {
    setMenuLenguaje(!menuLenguaje);
  }

  function setLenguaje(lenguajeSpanish) {
    setIsSpanish(lenguajeSpanish)
    localStorage.setItem('isSpanish', lenguajeSpanish)
  }

  return (
    <div className='lenguaje__container'>
      <button className='lenguaje__button' onClick={() => handlerMenuLenguaje()}>
        {
          isSpanish
            ? "Idioma"
            : "Language"
        }
        {
          menuLenguaje
            ? <BiCaretUp className='lenguaje__deploy' />
            : <BiCaretDown className='lenguaje__deploy' />
        }
        
      </button>
      
      <div className={menuLenguaje ? 'lenguaje__item--container' : 'none'}>
        <p className='lenguaje__item' onClick={() => setLenguaje(true)}>Espanol</p>
        <p className='lenguaje__item' onClick={() => setLenguaje(false)}>English</p>
      </div>
    </div>
  )
}

export default Lenguaje
