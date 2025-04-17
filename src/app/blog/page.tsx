'use client'

import MainLayout from '@/components/templates/MainLayout/MainLayout';
import React, { useContext } from 'react';
import LanguageContext, { LanguageContextType } from '@/redux/context/LanguageContext';
import style from './page.module.css'
import Image from 'next/image';

const BlogPage = () => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;
  const articles = [
    {
      id: 1,
      title: 'Introducción a la Automatización',
      description: 'Descubre cómo la automatización puede mejorar tus procesos y ahorrar tiempo.',
      link: '/blog/introduccion-automatizacion',
      image: 'https://www.firgelliauto.com/cdn/shop/articles/Untitled.jpg?v=1675204202',
      date: '2023-10-01',
      tags: [
        {
          name: 'automatización',
          color: 'blue',
          icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL4AXfr6TWe8kJ-9ymaXq72ent3ulz3vQO5g&s',
        },
        {
          name: 'desarrollo',
          color: 'green',
          icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL4AXfr6TWe8kJ-9ymaXq72ent3ulz3vQO5g&s',
        }
      ],
    },
    {
      id: 2,
      title: 'Mejores Prácticas en Desarrollo Web',
      description: 'Aprende las mejores prácticas para construir aplicaciones web modernas.',
      link: '/blog/mejores-practicas-desarrollo-web',
      image: 'https://www.firgelliauto.com/cdn/shop/articles/Untitled.jpg?v=1675204202',
      date: '2023-10-01',
      tags: [
        {
          name: 'automatización',
          color: 'blue',
          icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL4AXfr6TWe8kJ-9ymaXq72ent3ulz3vQO5g&s',
        },
        {
          name: 'desarrollo',
          color: 'green',
          icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL4AXfr6TWe8kJ-9ymaXq72ent3ulz3vQO5g&s',
        }
      ],
    },
    {
      id: 3,
      title: 'Tendencias Tecnológicas 2023',
      description: 'Explora las tendencias tecnológicas más importantes de este año.',
      link: '/blog/tendencias-tecnologicas-2023',
      image: 'https://www.firgelliauto.com/cdn/shop/articles/Untitled.jpg?v=1675204202',
      date: '2023-10-01',
      tags: [
        {
          name: 'automatización',
          color: 'blue',
          icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL4AXfr6TWe8kJ-9ymaXq72ent3ulz3vQO5g&s',
        },
        {
          name: 'desarrollo',
          color: 'green',
          icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL4AXfr6TWe8kJ-9ymaXq72ent3ulz3vQO5g&s',
        }
      ],
    },
  ];

  return (
    <MainLayout isAdmin={false}>
      <section>
        <p className='phrase'>
          {
            isSpanish
              ? "Escribimos para saborear la vida dos veces, en el momento y en la retrospección."
              : "We write to taste life twice, in the moment and in retrospect."
          }
        </p>

        <p className='author'>Anaïs Nin</p>
      </section>
      
      <section>
        <h1 className="title">Blog de Tecnología, Desarrollo y Automatización</h1>
        <h2 className='subtitle'>Publicaciones sobre programación, desarrollo web y experiencias en proyectos reales.</h2>
      </section>

      <section className={style["article__container"]}>
        {articles.map((article) => (
          <div key={article.id} className={style["article-card"]}>
            <Image
              src={article.image}
              width={200}
              height={300}
              alt={article.title}
              className={style["article-card__image"]} 
            />
            <h2 className={style["article-card__title"]}>{article.title}</h2>
            <p className={style["article-card__description"]}>{article.description}</p>
            <div className={style["article-card__tags"]}>
              {
                article.tags.map((tag, index) => (
                  <Image
                    key={index}
                    src={tag.icon}
                    width={200}
                    height={24}
                    alt={tag.name}
                    className={style['article-card__tag']}
                  />
                ))
              }
            </div>
            <div className={style['article-card__footer']}>
              <a className={style["article-card__link"]} href={article.link}>Leer más</a>
              <span className={style["article-card__date"]}>Publicado: {new Date(article.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </section>
    </MainLayout>
  );
};

export default BlogPage;