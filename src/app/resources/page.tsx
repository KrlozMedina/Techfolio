'use client';

import { useEffect, useRef, useState } from 'react';
import { useResources } from '@/hooks/useResources';
// import ResourceSkeleton from '@/components/skeletons/ResourceSkeleton';
import style from './page.module.scss';

const categories = ['all', 'frontend', 'backend', 'devops', 'general'] as const;

export default function ResourcesPage() {
  const [category, setCategory] = useState('all');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { resources, isValidating, hasMore, setSize } =
    useResources(category === 'all' ? undefined : category);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setSize(s => s + 1),
      { rootMargin: '200px' }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, setSize]);

  return (
    <section className={style.resources}>
      <h1>Resources</h1>

      <div className={style.filters}>
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={category === c ? style.active : ''}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className={style.list}>
        {resources.map(r => (
          <li key={r.id} className={style.card}>
            <h2>{r.title}</h2>
            <p>{r.description}</p>

            <div className={style.actions}>
              <a href={r.link} target="_blank">Visitar</a>
              <button onClick={() => toggleFavorite(r.id)}>
                {favorites.has(r.id) ? '★' : '☆'}
              </button>
            </div>
          </li>
        ))}

        {/* Skeletons */}
        {isValidating &&
          Array.from({ length: 3 }).map((_, i) => (
            <li className={style.cardSkeleton}>
              <div className={style.titleSkeleton} />
              <div className={style.textSkeleton} />
              <div className={style.actionsSkeleton}>
                <div />
                <div />
              </div>
            </li>
          ))}
      </ul>

      {hasMore && <div ref={loaderRef} className={style.loader} />}
    </section>
  );
}




  // import React from 'react';

  // const ResourcesPage: React.FC = () => {
  //     const resources = [
  //         {
  //             title: 'React Documentation',
  //             description: 'Oficial documentación de React para aprender y consultar.',
  //             link: 'https://reactjs.org/docs/getting-started.html',
  //         },
  //         {
  //             title: 'TypeScript Handbook',
  //             description: 'Guía oficial para aprender TypeScript.',
  //             link: 'https://www.typescriptlang.org/docs/',
  //         },
  //         {
  //             title: 'MDN Web Docs',
  //             description: 'Recursos y documentación para desarrolladores web.',
  //             link: 'https://developer.mozilla.org/',
  //         },
  //         {
  //             title: 'FreeCodeCamp',
  //             description: 'Tutoriales y recursos gratuitos para aprender programación.',
  //             link: 'https://www.freecodecamp.org/',
  //         },
  //     ];

  //     return (
  //         <div style={{ padding: '20px' }}>
  //             <h1>Recursos Útiles</h1>
  //             <p>Comparte y explora recursos útiles relacionados con el desarrollo web.</p>
  //             <ul>
  //                 {resources.map((resource, index) => (
  //                     <li key={index} style={{ marginBottom: '15px' }}>
  //                         <h2>{resource.title}</h2>
  //                         <p>{resource.description}</p>
  //                         <a href={resource.link} target="_blank" rel="noopener noreferrer">
  //                             Visitar recurso
  //                         </a>
  //                     </li>
  //                 ))}
  //             </ul>
  //         </div>
  //     );
  // };

  // export default ResourcesPage;