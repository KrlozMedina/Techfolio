"use client";

import React, { useMemo, useState } from "react";
import Slider from "@/components/organisms/Slider/Slider";
import { useGetProjectsSimpleDataQuery } from "@/store/service/projectsApi";
import { ProjectCard } from "@/components/molecules/Cards/CardViews";
import { IntroTemplate } from "@/components/templates/IntroTemplate/IntroTemplate";
import { DatabaseError, Loading, NoData } from "@/components/molecules/FeedbackStates/FeedbackStates";
import style from './page.module.scss'
import caseStudies from "@/mocks/caseStudies.mock";
import Image from "next/image";
import { IProjectV2 } from "@/models/interfaces";
import { useLanguage } from "@/hooks";
import { QuoteBlock } from "@/components/molecules/blocks";
import Filter from "@/components/organisms/Filter/Filter";
import CTA from "@/components/molecules/Cards/CTA";
import { CATEGORIES, PLATFORMS, TECHNOLOGIES } from "@/shared/constants";

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
  cta: {
    title: {
      es: '¿Te gustaría trabajar conmigo en tu próximo proyecto?',
      en: 'Would you like to work with me on your next project?'
    },
    button: {
      es: 'Explorar servicios',
      en: 'Explore services',
      path: '/projects/services'
    }
  }
};

const Projects: React.FC = () => {
  const { isSpanish } = useLanguage();
  const language = isSpanish ? 'es' : 'en';
  const { data: projects, isLoading, isError, error } = useGetProjectsSimpleDataQuery(language);
  const [filter, setFilter] = useState({ category: "", platform: "", technology: "" });

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return projects.data.filter((project: IProjectV2) => {
      const matchType = !filter.platform || project.tags.platformId === filter.platform;
      const matchCategory = !filter.category || project.tags.categoryIds?.includes(filter.category);
      const matchTech = !filter.technology || project.tags.technologyIds?.includes(filter.technology);
      return matchType && matchCategory && matchTech;
    });
  }, [projects, filter]);

  return (
    <>
      <title>{`${TEXTS.hero.title[language]} | Techfolio KrlozMedina`}</title>
      <meta name="description" content="Muestra de proyectos - Carlos Medina" />
      <meta name="keyword" content="Proyectos, Full Stack, Electronica" />
      <meta property="og:title" content="Projects - KrlozMedina" />
      <meta property="og:description" content="Muestra de proyectos - Carlos Medina" />
      <meta property="og:image" content="https://tusitio.com/og-image.jpg" />
      <meta property="og:url" content="https://tusitio.com/demo" />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Techfolio KrlozMedina" />
      <meta property="og:locale" content="es_CO" />

      <QuoteBlock
        page="projects"
        lang={language}
      />

      <section>
        <IntroTemplate title={TEXTS.hero.title[language]} intro={TEXTS.hero.intro[language]} >
          {/* <Filter lang={language} filter={filter} setFilter={setFilter} /> */}

          <Slider>
            {isLoading && <Loading language={language} />}
            {isError && <DatabaseError reason={error} language={language} />}
            {!isLoading && !isError && filteredProjects.length === 0 && <NoData reason="no-match" language={language} />}
            {!isLoading && filteredProjects.map((project, idx) => (
              <ProjectCard key={idx} data={project} language={language} />
            ))}
          </Slider>
        </IntroTemplate>

      </section>

      <section>
        <IntroTemplate
          title={TEXTS.successStories.title[language]}
          intro={TEXTS.successStories.intro[language]}
        >
          <section className={style["projects__case-study"]}>
            {
              caseStudies.slice(0, 2).map((caseStudy, index) => (
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
        </IntroTemplate>
      </section>

      <CTA title={TEXTS.cta.title[language]} valueButton={TEXTS.cta.button[language]} pathButton={TEXTS.cta.button.path} lang={language} />
    </>
  );
};

export default Projects;
