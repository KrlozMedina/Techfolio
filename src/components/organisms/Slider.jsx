import React, { useContext } from 'react';
import LanguageContext from '../../context/LanguageContext';
import { CardProject } from '../molecules/Cards';
import { BsServer } from 'react-icons/bs'

import '../../styles/components/organisms.css'

const Slider = (props) => {
  const {isSpanish} = useContext(LanguageContext);
  const {spanish, english, data} = props.children;
  
  return (
    <section className="slider">
      {(data == null || data.length != 0) && <h2 className='title'>{isSpanish ? spanish.title : english.title}</h2>}
      <div className='slider__cards'>
        {
          data == null
          ? <span className='slider__error'><BsServer /> {'<Error 500 /> Server offline'}</span>
          : data.map(element => (<CardProject key={element.id}>{element}</CardProject>))
        }
      </div>
    </section>
  )
}

export default Slider