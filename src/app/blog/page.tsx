'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { SectionTemplate } from '@/components/templates/sectionTemplate/SectionTemplate';
// import { QuoteBlock } from '@/components/molecules/Block/QuoteBlock';
import Spinner from '@/components/atom/feedback/Spinner';
import style from './page.module.css';
import Image from 'next/image';
import { useTranslation } from '@/hooks/useTranslation';

interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  date: string;
}

const LIMIT = 9;

const BlogPage: React.FC = () => {
  // const { isSpanish } = useLanguage();
  // const lang = isSpanish ? 'es' : 'en';
  const { t, language } = useTranslation();

  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const observerRef = useRef<HTMLDivElement>(null);

  const fetchArticles = useCallback(async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/v2/blog?lang=${language}&limit=${LIMIT}&page=${page}`);
      if (!res.ok) throw new Error('Failed to fetch articles');
      const data = await res.json();

      // Evitar artículos duplicados
      setArticles(prev => [
        ...prev,
        ...data.data.filter(
          (newArticle: Article) => !prev.some(a => a.id === newArticle.id)
        ),
      ]);

      setHasMore(data.data.length === LIMIT);
      setPage(prev => prev + 1);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, [language, page, hasMore, loading]);

  // Reset al cambiar idioma
  useEffect(() => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
  }, [language]);

  // Scroll infinito con IntersectionObserver
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchArticles();
      }
    });

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchArticles]);

  return (
    <>
      {/* <QuoteBlock page="blog" lang={language} /> */}

      <SectionTemplate
        title={t.blog.hero.title}
        intro={t.blog.hero.subtitle}
      >
        {articles.length === 0 && loading && <Spinner />}
        {error && <p>Error: {error}</p>}

        <section className={style["article__container"]}>
          {articles.map(article => (
            <div key={article.id} className={style["article-card"]}>
              {article.image ? (
                <Image src={article.image} alt={article.title} width={300} height={200} />
              ) : null}
              <h2 className={style["article-card__title"]}>{article.title}</h2>
              <p className={style["article-card__description"]}>{article.description}</p>
              <div className={style["article-card__tags"]}>
                {article.tags.map((tag, index) => tag ? (
                  <Image src={tag} alt={tag} width={24} height={24} key={index} />
                ) : null)}
              </div>
              <div className={style['article-card__footer']}>
                <a className={style["article-card__link"]} href={article.link}>{t.blog.readMore}</a>
                <span className={style["article-card__date"]}>{t.blog.publish} {new Date(article.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </section>

        {loading && articles.length > 0 && <Spinner />}
        <div ref={observerRef}></div> {/* Sentinel para scroll infinito */}
      </SectionTemplate>
    </>
  );
};

export default BlogPage;










// 'use client'

// // import MainLayout from '@/components/layouts/MainLayout/MainLayout';
// import React, { useContext } from 'react';
// import LanguageContext, { LanguageContextType } from '@/context/LanguageContext';
// import style from './page.module.css'
// import Image from 'next/image';
// import articles from '@/mocks/articles.json';
// import tagsMock from '@/mocks/tags.json';
// // import { Intro, Phrase } from '@/components/templates/IntroTemplate/import React from 'react'; import style from './QuoteBlock.module.scss';  interface IntroBlockProps {   /**    * Título de la sección de introducción.    */   title: string;    /**    * Texto introductorio o descriptivo de la sección.    */   intro: string; }  /**  * 📘 IntroBlock  *  * Componente de presentación que muestra un título y una introducción para una sección de la página.  *   * Ideal para encabezados de secciones con contexto explicativo.  */ export const IntroBlock: React.FC<IntroBlockProps> = ({ title, intro }) => (   <section className={style['intro-section']}>     <h1 className={style['intro-section__title']}>{title}</h1>     <p className={style['intro-section__paragraph']}>{intro}</p>   </section> );';
// // import StatusNotice from '@/components/organisms/Notice/Notice';

// const BlogPage = () => {
//   const { isSpanish } = useContext(LanguageContext) as LanguageContextType;
  
//   const texts = {
//     intro: {
//       es: {
//         title: 'Blog de Tecnología, Desarrollo y Automatización',
//         intro: 'Publicaciones sobre programación, desarrollo web y experiencias en proyectos reales.'
//       },
//       en: {
//         title: 'Technology, Development, and Automation Blog',
//         intro: 'Posts about programming, web development, and real-world project experiences.'
//       }
//     },
//     phrase: {
//       es: 'Escribimos para saborear la vida dos veces, en el momento y en la retrospección.',
//       en: 'We write to taste life twice, in the moment and in retrospect.'
//     },
//     author: 'Anaïs Nin'
//   }
  

//   return (
//     <>
//       {/* <Phrase
//         phrase={isSpanish ? texts.phrase.es : texts.phrase.en}
//         author={texts.author}
//       /> */}

//       {/* <Intro
//         title={isSpanish ? texts.intro.es.title : texts.intro.en.title}
//         intro={isSpanish ? texts.intro.es.intro : texts.intro.en.intro}
//       /> */}
//       {/* <StatusNotice
//         type='dummy'
//         language={isSpanish ? 'en' : 'en'}
//       />
//       <StatusNotice
//         type='construction'
//         language={isSpanish ? 'en' : 'en'}
//       />
//       <StatusNotice
//         type='incomplete'
//         language={isSpanish ? 'en' : 'en'}

//       />
//       <StatusNotice
//         type='maintenance'
//         language={isSpanish ? 'en' : 'en'}

//       />
//       <StatusNotice
//         type='comingSoon'
//         language={isSpanish ? 'en' : 'en'}

//       />
//       <StatusNotice
//         type='beta'
//         language={isSpanish ? 'en' : 'en'}

//       /> */}

//       <section className={style["article__container"]}>
//         {articles.map((article) => (
//           <div key={article.id} className={style["article-card"]}>
//             <Image
//               src={article.image}
//               width={200}
//               height={300}
//               alt={article.title.es}
//               className={style["article-card__image"]} 
//               loading='lazy'
//             />
//             <h2 className={style["article-card__title"]}>{article.title.es}</h2>
//             <p className={style["article-card__description"]}>{article.description.es}</p>
//             <div className={style["article-card__tags"]}>
//               {
//                 article.tags.map((tag, index) => (
//                   <Image
//                     key={index}
//                     src={tagsMock.filter(item => item.id===tag)[0].icon}
//                     width={200}
//                     height={24}
//                     alt={tagsMock.filter(item => item.id===tag)[0].name.es}
//                     className={style['article-card__tag']}
//                     loading='lazy'
//                   />
//                 ))
//               }
//             </div>
//             <div className={style['article-card__footer']}>
//               <a className={style["article-card__link"]} href={article.link}>Leer más</a>
//               <span className={style["article-card__date"]}>Publicado: {new Date(article.date).toLocaleDateString()}</span>
//             </div>
//           </div>
//         ))}
//       </section>
//     </>
//   );
// };

// export default BlogPage;