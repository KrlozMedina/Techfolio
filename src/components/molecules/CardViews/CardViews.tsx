import React from 'react';
import Image from 'next/image';
import { FaCode } from 'react-icons/fa';
import style from './CardViews.module.css';
import { Language } from '@/shared/constants';
import { IProjectV2 } from '@/models/interfaces';

// === Interfaces ===
/**
 * Props for the ProjectCard component.
 */
interface ProjectCardProps {
  data: IProjectV2;
  language: Language;
}

/**
 * Props for the Banner component.
 */
interface BannerProps {
  data: {
    url: string;
    logo: string;
    alt: string;
    title: string;
  };
}

/**
 * Data structure for the video card.
 */
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

/**
 * Props for the VideoCard component.
 */
interface VideoCardProps {
  children: CardVideoData;
}

// === Constantes ===
const codeLabels = {
  es: 'Código',
  en: 'Code',
};

// === Componente Reutilizable para enlaces externos ===
/**
 * Reusable component for external links to avoid repetition.
 * @param href - The URL to link to.
 * @param children - The content inside the link.
 */
const ExternalLink: React.FC<React.PropsWithChildren<{ href: string }>> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

// === Componentes ===

/**
 * ProjectCard component to display information about a project.
 * @param data - Project data including URLs and assets.
 * @param language - The selected language for the project details.
 */
export const ProjectCard: React.FC<ProjectCardProps> = ({ data, language }) => {
  const { projectInfo, urls, assets } = data;
  const info = projectInfo?.[language];

  if (!info) return null; // Return null if no data available for the selected language

  return (
    <article className={style["card__project"]}>
      <ExternalLink href={urls.live}>
        <Image
          src={assets.main}
          width={240}
          height={132}
          className={style["card__project--image"]}
          alt={info?.title || "Project image"}
          loading="lazy"
          placeholder="blur"
          blurDataURL={assets.blur}
        />
        <h3>{info.title}</h3>
        <p className={style["card__project--description"]}>{info.description}</p>
      </ExternalLink>

      <ExternalLink href={urls.repository}>
        <div className={style["card__project--code"]}>
          <FaCode /> {codeLabels[language]}
        </div>
      </ExternalLink>
    </article>
  );
};

/**
 * VideoCard component to display a video project with thumbnail and description.
 * @param children - Video card data including title, description, link, and thumbnails.
 */
export const VideoCard: React.FC<VideoCardProps> = ({ children }) => {
  const { link, title, thumbnails, description } = children;

  return (
    <article className="card__video">
      <ExternalLink href={link}>
        <div>
          <Image
            src={thumbnails.medium.url}
            className="card__video--image"
            alt={title}
            loading="lazy"
          />
          <p className="card__video--description">{description}</p>
        </div>
        <p className="card__video--title">{title}</p>
      </ExternalLink>
    </article>
  );
};

/**
 * Banner component to display educational or promotional content with logo and title.
 * @param data - Banner data containing URL, logo, alt text, and title.
 */
export const Banner: React.FC<BannerProps> = ({ data }) => {
  const { url, logo, alt, title } = data;

  const handleClick = () => localStorage.setItem('diploma', logo); // Store logo in localStorage on click

  return (
    <ExternalLink href={url}>
      <article className="card-education" onClick={handleClick}>
        <div>
          <Image
            className="education-logo"
            src={logo}
            width={50}
            height={50}
            alt={alt}
            loading="lazy"
          />
          <h3>{title}</h3>
        </div>
      </article>
    </ExternalLink>
  );
};
