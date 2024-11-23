'use client'

import React, { useContext } from 'react';
import LanguageContext from '@/context/LanguageContext';
import Page from '@/components/templates/Page';
import { ApplicationDesktop, ApplicationMobile, ApplicationWeb } from '@/components/organisms/Applications';

interface LanguageContextType {
  isSpanish: boolean;
}

const Projects: React.FC = () => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;

  return (
    <div>
      <Page>
        <p className='phrase'>
          {
            isSpanish
              ? "Las recompensas y la motivación son un cambio de aceite para los motores del proyecto. Hazlo regularmente y con frecuencia."
              : "Rewards and motivation are an oil change for the engines of a project. Do it regularly and frequently."
          }
        </p>

        <p className='author'>Woody Williams</p>

        <ApplicationWeb />
        <ApplicationDesktop />
        <ApplicationMobile />
      </Page>
    </div>
  );
};

export default Projects;
