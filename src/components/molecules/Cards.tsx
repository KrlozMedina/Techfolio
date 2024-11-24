import React, { useContext } from 'react';
import LanguageContext from '@/context/LanguageContext';
import { FaCode } from 'react-icons/fa';

import '@/styles/components/molecules.css';
import Image from 'next/image';

// Tipos para las propiedades de CardProject
interface CardProjectProps {
  children: {
    linkDeploy: string;
    linkCode: string;
    image: string;
    title: string;
    description: string;
  };
}

interface LanguageContextType {
  isSpanish:boolean;
}

export const CardProject: React.FC<CardProjectProps> = ({ children }) => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;
  const { linkDeploy, linkCode, image, title, description } = children;

  return (
    <article className="card__project">
      <a
        className="card__project--link"
        href={linkDeploy}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={image}
          className="card__project--image"
          alt={title}
        />
        <h3 className="card__project--title">{title}</h3>
        <p className="card__project--description">{description}</p>
      </a>

      <a
        className="card__project--code"
        href={linkCode}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaCode /> {isSpanish ? 'Código' : 'Code'}
      </a>
    </article>
  );
};

// Tipos para las propiedades de CardVideo
interface CardVideoProps {
  children: {
    descripcion: string;
    description: string;
    link: string;
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
}

export const CardVideo: React.FC<CardVideoProps> = ({ children }) => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;
  const { descripcion, description, link, title, thumbnails } = children;

  return (
    <article className="card__video">
      <a
        className="card__video--link"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div>
          <Image
            src={thumbnails.medium.url}
            className="card__video--image"
            alt={title}
          />
          <p className="card__video--description">
            {isSpanish ? descripcion : description}
          </p>
        </div>

        <p className="card__video--title">{title}</p>
      </a>
    </article>
  );
};