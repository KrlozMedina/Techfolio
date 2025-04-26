import React from 'react';
import { FaCode } from 'react-icons/fa';
import { IProject } from '@/models/Project.model';
import style from './CardViews.module.css'
import Image from 'next/image';

interface ProjectCardProps {
  data: IProject;
  language: 'es' | 'en';
}

// Define the type for the props that are expected
interface BannerProps {
  data: {
    url: string;
    logo: string;
    alt: string;
    title: string;
  }
}

const codeLabels = {
  es: 'Código',
  en: 'Code'
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ data, language }) => {
  const { liveUrl, repositoryUrl, imageUrl, title, description } = data;

  return (
    <article className={style["card__project"]}>
      <a
        // className={style["card__project--link"]}
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src={imageUrl}
          width={300}
          height={200}
          className={style["card__project--image"]}
          alt={title}
        />
        <h3>{title}</h3>
        <p className={style["card__project--description"]}>{description}</p>
      </a>

      <a
        // className={style["card__project--code"]}
        href={repositoryUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaCode /> {codeLabels[language]}
      </a>
    </article>
  );
};

// Card para videos
interface CardVideoData {
  description: string;
  link: string;
  title: string;
  thumbnails: {
    medium: {
      url: string;
    };
  };
}

interface VideoCardProps {
  children: CardVideoData;
}

export const VideoCard: React.FC<VideoCardProps> = ({ children }) => {
  const { link, title, thumbnails } = children;

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
            description
          </p>
        </div>

        <p className="card__video--title">{title}</p>
      </a>
    </article>
  );
};

export const Banner: React.FC<BannerProps> = ({ data }) => {
  const { url, logo, alt, title } = data;

  return (
    <a href={url} onClick={() => localStorage.setItem('diploma', logo)} target="_blank" rel="noopener noreferrer">
      <article className="card-education">
        <div>
          <Image
            className="education-logo"
            src={logo}
            width={50}
            height={50}
            alt={alt}
          />
          <h3>{title}</h3>
        </div>
      </article>
    </a>
  );
}