import React, { useContext } from 'react';
import LanguageContext, { LanguageContextType } from '@/redux/context/LanguageContext';
import style from './TextBlocks.module.css'

interface PhraseProps {
  phraseSpanish: string;
  phraseEnglish: string;
  author: string;
}

interface IntroContent {
  title: string;
  intro: string;
}

interface IntroProps {
  es: IntroContent;
  en: IntroContent;
}

export const Phrase: React.FC<PhraseProps> = ({ phraseSpanish, phraseEnglish, author }) => {
  const { isSpanish} = useContext(LanguageContext) as LanguageContextType;

  return (
    <div className={style['container']}>
      <p className={style['phrase']}>
          {
            isSpanish
              ? phraseSpanish
              : phraseEnglish
          }
        </p>

        <p className={style['author']}>{author}</p>
    </div>
  )
}

export const Intro: React.FC<IntroProps> = ({ es, en }) => {
  const { isSpanish} = useContext(LanguageContext) as LanguageContextType;

  return (
    <>
      <h1 className={style["title"]}>
        {isSpanish ? es.title : en.title}
      </h1>
      
      <h3 className={style["intro"]}>
        {isSpanish ? es.intro : en.intro}
      </h3>
    </>
  )
}
