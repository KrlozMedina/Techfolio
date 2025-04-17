import React, { useContext, useState } from 'react';
import LanguageContext from '../../redux/context/LanguageContext';
import { BiCaretDown, BiCaretUp } from 'react-icons/bi';
import "../../styles/components/molecules.css";

// Define the type for LanguageContext
type LanguageContextType = {
  isSpanish: boolean;
  setIsSpanish: (language: boolean) => void;
};

const Language: React.FC = () => {
  const { isSpanish, setIsSpanish } = useContext(LanguageContext) as LanguageContextType;

  const [menuLanguage, setMenuLanguage] = useState<boolean>(false);

  const handlerMenuLanguage = () => {
    setMenuLanguage(!menuLanguage);
  };

  const setLanguage = (languageSpanish: boolean) => {
    setIsSpanish(languageSpanish);
    localStorage.setItem('isSpanish', JSON.stringify(languageSpanish));
    handlerMenuLanguage();
  };

  return (
    <div className="language__container">
      <button className="language__button" onClick={handlerMenuLanguage}>
        {isSpanish ? "Idioma" : "Language"}
        {menuLanguage ? (
          <BiCaretUp className="language__deploy" />
        ) : (
          <BiCaretDown className="language__deploy" />
        )}
      </button>

      <div className={menuLanguage ? 'language__item--container' : 'none'}>
        <p className="language__item" onClick={() => setLanguage(true)}>
          Español
        </p>
        <p className="language__item" onClick={() => setLanguage(false)}>
          English
        </p>
      </div>
    </div>
  );
};

const LanguagePhone: React.FC = () => {
  const { setIsSpanish } = useContext(LanguageContext) as LanguageContextType;

  const setLanguage = (languageSpanish: boolean) => {
    setIsSpanish(languageSpanish);
    localStorage.setItem('isSpanish', JSON.stringify(languageSpanish));
  };

  return (
    <div className="language__item--container">
      <p className="language__item" onClick={() => setLanguage(true)}>
        Español
      </p>
      <p className="language__item" onClick={() => setLanguage(false)}>
        English
      </p>
    </div>
  );
};

export { Language, LanguagePhone }
