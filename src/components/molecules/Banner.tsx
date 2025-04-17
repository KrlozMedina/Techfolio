import React, { useContext } from 'react'
import LanguageContext from '@/redux/context/LanguageContext'
import '@/styles/components/molecules.css'
import Image from 'next/image';

// Define the type for the props that are expected
interface BannerProps {
  url: string;
  logo: string;
  alt: string;
  titulo: string;
  title: string;
}

// Define the context type if not already defined
interface LanguageContextType {
  isSpanish: boolean;
}

const Banner: React.FC<BannerProps> = (props) => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;
  const { url, logo, alt, titulo, title } = props;

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
          <h3>{isSpanish ? titulo : title}</h3>
        </div>
      </article>
    </a>
  );
}

export default Banner;
