"use client";

import React, { useMemo, useState } from "react";
import Slider from "@/components/organisms/Slider/Slider";
import { useGetProjectsSimpleDataQuery } from "@/store/service/projectsApi";
import { ProjectCard } from "@/components/molecules/CardViews/CardViews";
import { Intro, Phrase } from "@/components/atom/TextBlocks/TextsBlocks";
import { DatabaseError, Loading, NoData } from "@/components/molecules/FeedbackStates/FeedbackStates";
import style from './page.module.css'
import caseStudies from "@/mocks/caseStudies.json";
import Image from "next/image";
import Link from "next/link";
import { IProjectV2 } from "@/models/interfaces";
import { CATEGORIES, PLATFORMS, TECHNOLOGIES } from "@/shared/constants";
import { useLanguage } from "@/hooks";

const TEXTS = {
  hero: {
    title: {
      es: 'Proyectos',
      en: 'Projects',
    },
    intro: {
      es: 'Una muestra de proyectos que reflejan mi experiencia construyendo soluciones tecnológicas...',
      en: 'A selection of projects that reflect my experience building technological solutions...',
    }
  },
  successStories: {
    title: {
      es: 'Casos de Éxito',
      en: 'Success Stories',
    },
    intro: {
      es: 'Descubre cómo mis soluciones han marcado la diferencia en diversos proyectos. Cada caso de éxito refleja el compromiso, la innovación y el enfoque personalizado para resolver desafíos reales y generar impacto.',
      en: 'Discover how my solutions have made a difference in various projects. Each success story reflects commitment, innovation, and a tailored approach to solving real-world challenges and creating impact.'
    }
  },
  phrase: {
    es: 'Las recompensas y la motivación son un cambio de aceite...',
    en: 'Rewards and motivation are an oil change for the engines of a project...',
  },
  author: 'Woody Williams'
};

const Projects: React.FC = () => {
  const { isSpanish } = useLanguage();
  const language = isSpanish ? 'es' : 'en';
  const { data: projects, isLoading, isError, error } = useGetProjectsSimpleDataQuery(language);
  const [filter, setFilter] = useState({ category: "", platform: "", technology: "" });
  const clearFilters = () => setFilter({ category: "", platform: "", technology: "" });

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return projects.data.filter((project: IProjectV2) => {
      const matchType = !filter.platform || project.tags.platformId === filter.platform;
      const matchCategory = !filter.category || project.tags.categoryIds?.includes(filter.category);
      const matchTech = !filter.technology || project.tags.technologyIds?.includes(filter.technology);
      return matchType && matchCategory && matchTech;
    });
  }, [projects, filter]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <title>{`${TEXTS.hero.title[language]} | KrlozMedina Portfolio Lab`}</title>
      <meta name="description" content="Una demostración de ModalJS en Next.js" />
      <meta name="keyword" content="Proyectos, Full Stack, Electronica" />
      <meta property="og:title" content="Demo - ModalJS" />
      <meta property="og:description" content="Una demostración de ModalJS en Next.js" />
      <meta property="og:image" content="https://tusitio.com/og-image.jpg" />
      <meta property="og:url" content="https://tusitio.com/demo" />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="KrlozMedina Portfolio Lab" />
      <meta property="og:locale" content="es_CO" />

      <Phrase phrase={TEXTS.phrase[language]} author={TEXTS.author} />

      <section>
        <Intro title={TEXTS.hero.title[language]} intro={TEXTS.hero.intro[language]} />

        <form className={style['projects__filter']}>
          <fieldset className={style['projects__filter-fieldset']}>
            <legend className={style['projects__filter-legend']}>{isSpanish ? 'Filtros' : 'Filters'}</legend>
            <div>
              <label>
                {isSpanish ? 'Plataforma' : 'Platform'}
                <select name="platform" value={filter.platform} onChange={handleFilterChange}>
                  <option value="">{isSpanish ? 'Todos' : 'All'}</option>
                  {PLATFORMS.map((platform) => (
                    <option key={platform.id} value={platform[language].name}>{platform[language].name}</option>
                  ))}
                </select>
              </label>
              <label>
                {isSpanish ? 'Categoría' : 'Category'}
                <select name="category" value={filter.category} onChange={handleFilterChange}>
                  <option value="">{isSpanish ? 'Todos' : 'All'}</option>
                  {CATEGORIES.map((category) => (
                    <option key={category.id} value={category[language].name}>{category[language].name}</option>
                  ))}
                </select>
              </label>
              <label>
                {isSpanish ? 'Tecnología' : 'Technology'}
                <select name="technology" value={filter.technology} onChange={handleFilterChange}>
                  <option value="">{isSpanish ? 'Todos' : 'All'}</option>
                  {TECHNOLOGIES.map(tech => (
                    <option key={tech.id} value={tech.name}>{tech.name}</option>
                  ))}
                </select>
              </label>
            </div>
            <button type="button" onClick={clearFilters}>
              {isSpanish ? 'Limpiar' : 'Clear'}
            </button>
          </fieldset>
        </form>

        <Slider>
          {isLoading && <Loading language={language} />}
          {isError && <DatabaseError reason={error} language={language} />}
          {!isLoading && !isError && filteredProjects.length === 0 && <NoData reason="no-match" language={language} />}
          {!isLoading && filteredProjects.map((project, idx) => (
            <ProjectCard key={idx} data={project} language={language} />
          ))}
        </Slider>
      </section>

      <section>
        <Intro
          title={TEXTS.successStories.title[language]}
          intro={TEXTS.successStories.intro[language]}
        />
        
        <section className={style["projects__case-study"]}>
          {
            caseStudies.slice(0,2).map((caseStudy, index) => (
              <div key={index} className={style["projects__case-study__content"]}>
                {caseStudy.imageUrl && (
                  <Image
                    src={caseStudy.imageUrl}
                    width={300}
                    height={200}
                    alt={caseStudy[language].title}
                  />
                )}

                <div className={style['projects__case-study__content-text']}>
                  <h2 className={style["projects__case-study__title"]}>{caseStudy[language].title}</h2>
                  {caseStudy.client && (
                    <p>
                      <strong>{isSpanish ? 'Cliente' : 'Client'}:</strong> {caseStudy.client}
                    </p>
                  )}
                  <p>
                    <strong>{isSpanish ? 'Reto' : 'Challenge'}:</strong> {isSpanish ? caseStudy.es.challenges : caseStudy.en.challenges}
                  </p>
                  <p>
                    <strong>{isSpanish ? 'Solución' : 'Solution'}:</strong> {isSpanish ? caseStudy.es.solution : caseStudy.en.solution}
                  </p>
                  <p>
                    <strong>{isSpanish ? 'Resultados' : 'Results'}:</strong> {isSpanish ? caseStudy.es.results : caseStudy.en.results}
                  </p>
                  {/* {caseStudy.testimonial && ( */}
                    <blockquote>“{caseStudy.testimonials[0][language]}”</blockquote>
                  {/* )} */}
                </div>
              </div>
            ))
          }
        </section>
      </section>

      <section className={style["projects__cta"]}>
        <h2 className={style["projects__cta__title"]}>
          {
            isSpanish
              ? '¿Te gustaría trabajar conmigo en tu próximo proyecto?'
              : 'Would you like to work with me on your next project?'
          }
        </h2>
        <div className={style["projects__cta__actions"]}>
          <Link href="/contact" className={style["projects__cta__button--primary"]}>
            {isSpanish ? 'Contáctame' : 'Contact me'}
          </Link>

          <Link href="/projects/services" className={style["projects__cta__button--secondary"]}>
            {isSpanish ? 'Explorar servicios' : 'Explore services'}
          </Link>
        </div>
      </section>
    </>
  );
};

export default Projects;
