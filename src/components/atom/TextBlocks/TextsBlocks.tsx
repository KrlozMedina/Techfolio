import React from 'react';
import style from './TextBlocks.module.css'

interface PhraseProps {
  phrase: string;
  author: string;
}

interface IntroProps {
  title: string;
  intro: string;
}

export const Phrase: React.FC<PhraseProps> = ({ phrase, author }) => {
  return (
    <div className={style['container']}>
      <p className={style['phrase']}>
          {phrase}
        </p>

        <p className={style['author']}>{author}</p>
    </div>
  )
}

export const Intro: React.FC<IntroProps> = ({ title, intro }) => {
  return (
    <>
      <h1 className={style["title"]}>
        { title }
      </h1>
      
      <h3 className={style["intro"]}>
        { intro }
      </h3>
    </>
  )
}
