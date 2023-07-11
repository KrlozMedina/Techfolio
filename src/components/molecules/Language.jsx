import React, { useContext, useState } from 'react';
import LanguageContext from '../../context/LanguageContext';
import { BiCaretDown, BiCaretUp } from 'react-icons/bi';
import "../../styles/components/molecules.css"

const Language = () => {
  const {isSpanish, setIsSpanish} = useContext(LanguageContext);

  const [menuLanguage, setMenuLanguage] = useState(false)
  
  function handlerMenuLanguage() {
    setMenuLanguage(!menuLanguage);
  }

  function setLanguage(languageSpanish) {
    setIsSpanish(languageSpanish)
    localStorage.setItem('isSpanish', languageSpanish)
    handlerMenuLanguage()
  }

  return (
    <div className='language__container'>
      <button className='language__button' onClick={() => handlerMenuLanguage()}>
        {
          isSpanish
            ? "Idioma"
            : "Language"
        }
        {
          menuLanguage
            ? <BiCaretUp className='language__deploy' />
            : <BiCaretDown className='language__deploy' />
        }
        
      </button>
      
      <div className={menuLanguage ? 'language__item--container' : 'none'}>
        <p className='language__item' onClick={() => setLanguage(true)}>Español</p>
        <p className='language__item' onClick={() => setLanguage(false)}>English</p>
      </div>
    </div>
  )
}

const LanguagePhone = () => {
  const {isSpanish, setIsSpanish} = useContext(LanguageContext);

  function setLanguage(languageSpanish) {
    setIsSpanish(languageSpanish)
    localStorage.setItem('isSpanish', languageSpanish)
  }

  return (
    <div className='language__item--container'>
      <p className='language__item' onClick={() => setLanguage(true)}>Espanol</p>
      <p className='language__item' onClick={() => setLanguage(false)}>English</p>
    </div>
  )
}

export { Language, LanguagePhone }
