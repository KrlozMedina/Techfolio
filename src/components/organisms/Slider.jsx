import React, { useContext } from 'react';
import LanguageContext from '../../context/LanguageContext';
import { CardVideo, CardProject } from '../molecules/Cards';

import '../../styles/components/organisms.css'

const Slider = (props) => {
  const {isSpanish} = useContext(LanguageContext);
  const {spanish, english, data} = props.children;
  
  return (
    <section className="slider">
      <h2 className='title'>{isSpanish ? spanish.title : english.title}</h2>
      <div className='slider__cards'>
        {
          data.map(element => (
            (element.app=="WEB" && <CardProject key={element.id}>{element}</CardProject>) ||
            (element.app=="DESKTOP" && <CardProject key={element.id}>{element}</CardProject>) ||
            (element.app=="VIDEO" && <CardVideo key={element.id}>{element}</CardVideo>)
          ))
        }
      </div>
    </section>
  )
}

export default Slider