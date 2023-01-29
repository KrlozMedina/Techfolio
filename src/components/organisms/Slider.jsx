import React, { useContext, useEffect, useState } from 'react';
import LenguajeContext from '../../context/LenguajeContext';
import { CardVideo, CardProject } from '../molecules/Cards';

import '../../styles/components/organisms/Slider.css'

const Slider = (props) => {
  // console.log(props.children)
  const {isSpanish, setIsSpanish} = useContext(LenguajeContext);
  const {spanish, english, data} = props.children;
  
  return (
    <section className="slider">
      <h2 className='title'>{isSpanish ? spanish.title : english.title}</h2>
      <div className='slider__cards'>
        {
          data.map(element => (
            (element.type=="application" && <CardProject key={element.id}>{element}</CardProject>) ||
            (element.type=="project" && <CardProject key={element.id}>{element}</CardProject>) ||
            (element.type=="video" && <CardVideo key={element.id}>{element}</CardVideo>)
          ))
        }
      </div>
    </section>
  )
}

export default Slider