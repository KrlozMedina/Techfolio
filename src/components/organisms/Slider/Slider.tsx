import React, { ReactNode} from 'react';
import style from './Slider.module.css';

interface SliderProps {
  children: ReactNode;
}

const Slider: React.FC<SliderProps> = ({ children }) => {
  return (
    <div className={style['slider__cards']}>
      {children}
    </div>
  );
}

export default Slider;
