import React, { useContext } from 'react';
import LanguageContext, { LanguageContextType } from '@/redux/context/LanguageContext';
import { FaCode } from 'react-icons/fa';
import { IProject } from '@/models/Project.model';
import style from './Cards.module.css'
import Image from 'next/image';

interface CardProjectProps {
  data: IProject;
}

export const CardProject: React.FC<CardProjectProps> = ({ data }) => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;
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
        <FaCode /> {isSpanish ? 'Código' : 'Code'}
      </a>
    </article>
  );
};

// Tipos para las propiedades de CardVideo
// interface CardVideoProps {
//   children: {
//     description: string;
//     link: string;
//     title: string;
//     thumbnails: {
//       medium: {
//         url: string;
//       };
//     };
//   };
// }

// export const CardVideo: React.FC<CardVideoProps> = ({ children }) => {
//   // const { isSpanish } = useContext(LanguageContext) as LanguageContextType;
//   const { link, title, thumbnails } = children;

//   return (
//     <article className="card__video">
//       <a
//         className="card__video--link"
//         href={link}
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         <div>
//           <Image
//             src={thumbnails.medium.url}
//             className="card__video--image"
//             alt={title}
//           />
//           <p className="card__video--description">
//             description
//           </p>
//         </div>

//         <p className="card__video--title">{title}</p>
//       </a>
//     </article>
//   );
// };