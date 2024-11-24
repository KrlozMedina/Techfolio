import React, { useContext } from 'react';
import LanguageContext, { LanguageContextType } from '../../context/LanguageContext';
import { CardProject } from '../molecules/Cards';
import { BsServer } from 'react-icons/bs';

// Define el tipo para los datos que recibirán los proyectos
interface ProjectData {
  id: number; // O el tipo adecuado si no es string
  linkDeploy: string;
  linkCode: string;
  image: string;
  title: string;
  description: string;
  // Agrega más campos según la estructura de los proyectos
}

interface SliderProps {
  children: {
    spanish: {
      title: string;
    };
    english: {
      title: string;
    };
    data: ProjectData[] | null;
  };
}

const Slider: React.FC<SliderProps> = (props) => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;

  // Desestructuraron de las props
  const { spanish, english, data } = props.children;
  
  return (
    <section className={data == null || data.length !== 0 ? 'slider' : 'none'}>
      <h2 className='title'>{isSpanish ? spanish.title : english.title}</h2>
      <div className='slider__cards'>
        {
          data == null
          ? <span className='slider__error'><BsServer /> {'<Error 500 /> Server offline'}</span>
          : data.map(element => (
            <CardProject key={element.id}>{element}</CardProject>
          ))
        }
      </div>
    </section>
  );
}

export default Slider;
