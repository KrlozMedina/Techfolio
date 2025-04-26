"use client";

import React, { useContext, useEffect, useState } from "react";
import LanguageContext, { LanguageContextType } from "@/context/LanguageContext";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import Slider from "@/components/organisms/Slider/Slider";
import { useGetProjectsQuery } from "@/redux/service/projectsApi";
import { ProjectCard } from "@/components/molecules/CardViews/CardViews";
import { CATEGORIES, PROJECT_TYPE } from "@/types/constants";
import { useGetTechnologiesQuery } from "@/redux/service/technologiesApi";
import { IProject } from "@/models/Project.model";
import caseStudies from "@/mock/caseStudies.json";
import style from './page.module.css'
import Link from "next/link";
import { Intro, Phrase } from "@/components/atom/TextBlocks/TextsBlocks";
import { DatabaseError, Loading, NoData } from "@/components/molecules/FeedbackStates/FeedbackStates";
import Image from "next/image";
import StatusNotice from "@/components/organisms/Notice/Notice";
// import { text } from "stream/consumers";

const texts = {
  intro: {
    es: {
      title: 'Proyectos',
      intro: 'Una muestra de proyectos que reflejan mi experiencia construyendo soluciones tecnológicas. Desde aplicaciones web hasta proyectos en electrónica, cada uno representa parte de mi aprendizaje, evolución y pasión por la tecnología.'
    },
    en: {
      title: 'Projects',
      intro: 'A selection of projects that reflect my experience building technological solutions. From web applications to electronics projects, each one represents my learning journey, growth, and passion for technology.'
    }
  },
  successStories: {
    es: {
      title: 'Casos de Éxito',
      intro: 'Descubre cómo mis soluciones han marcado la diferencia en diversos proyectos. Cada caso de éxito refleja el compromiso, la innovación y el enfoque personalizado para resolver desafíos reales y generar impacto.'
    },
    en: {
      title: 'Success Stories',
      intro: 'Discover how my solutions have made a difference in various projects. Each success story reflects commitment, innovation, and a tailored approach to solving real-world challenges and creating impact.'
    }
  },
  phrase: {
    es: 'Las recompensas y la motivación son un cambio de aceite para los motores del proyecto. Hazlo regularmente y con frecuencia.',
    en: 'Rewards and motivation are an oil change for the engines of a project. Do it regularly and frequently.'
  },
  author: 'Woody Williams',
}

const Projects: React.FC = () => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;
  const { data: dataTechnologies } = useGetTechnologiesQuery(null);
  const { data: dataProjects, isLoading, isSuccess, isError, error: errorProjects, refetch } = useGetProjectsQuery(null);
  const [newDataProjects, setNewDataProjects] = useState<IProject[] | undefined>(undefined);

  // console.log(errorProjects)

  const [filter, setFilters] = useState({
    category: "",
    projectType: "",
    technology: "",
  });

  const links = [
    {
      title: isSpanish ? "Servicios" : "Services",
      href: "/projects/services",
      isActive: false
    },
    {
      title: isSpanish ? "Testimonios" : "Testimonials",
      href: "/projects/testimonials",
      isActive: false
    },
    {
      title: isSpanish ? "Casos de éxito" : "Success Stories",
      href: "/projects/case-studies",
      isActive: false
    },
  ];

  const handlerFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlerClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFilters({
      category: "",
      projectType: "",
      technology: "",
    });
    setNewDataProjects(dataProjects);
  };

  useEffect(() => {
    setNewDataProjects(dataProjects);
  }, [isSuccess]);

  useEffect(() => {
    const filtered = dataProjects?.filter((project) => {
      const matchType = filter.projectType === "" || project.projectType === filter.projectType;
      const matchCategory = filter.category === "" || project.category.includes(filter.category);
      const matchTechnology = filter.technology === "" || project.technologies.includes(filter.technology);
      return matchType && matchCategory && matchTechnology;
    });
    setNewDataProjects(filtered);
  }, [filter]);  

  return (
    <div>
      <title>{isSpanish ? 'Proyectos | KrlozMedina Portfolio Lab' : 'Projects | KrlozMedina Portfolio Lab'}</title>
      <meta name="keyword" content="Proyectos, Full Stack, Electronica" />
      <meta name="description" content="Una demostración de ModalJS en Next.js" />
      <meta property="og:title" content="Demo - ModalJS" />
      <meta property="og:description" content="Una demostración de ModalJS en Next.js" />
      <meta property="og:image" content="https://tusitio.com/og-image.jpg" />
      <meta property="og:url" content="https://tusitio.com/demo" />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="KrlozMedina Portfolio Lab" />
      <meta property="og:locale" content="es_CO" />

      <MainLayout isAdmin={false} links={links}>
        <Phrase
          // phraseEnglish="Rewards and motivation are an oil change for the engines of a project. Do it regularly and frequently."
          // phraseSpanish="Las recompensas y la motivación son un cambio de aceite para los motores del proyecto. Hazlo regularmente y con frecuencia."
          phrase={isSpanish ? texts.phrase.es : texts.phrase.en}
          author={texts.author}
        />

        <section>
          <Intro title={isSpanish ? texts.intro.es.title : texts.intro.en.title} intro={isSpanish ? texts.intro.es.intro : texts.intro.en.intro} />
          <StatusNotice type="incomplete" language={isSpanish ? 'es' : 'en'} />

          <form className={style['projects__filter']}>
            <fieldset className={style['projects__filter-fieldset']}>
              <legend className={style['projects__filter-legend']}>{isSpanish ? 'Filtros' : 'Filters'}</legend>
              <div>
                <label htmlFor="projectType" >
                  {isSpanish ? 'Tipo de proyecto' : 'Project type'}
                  <select
                    name="projectType"
                    value={filter.projectType}
                    onChange={handlerFilter}
                  >
                    <option value="">{isSpanish ? 'Todos' : 'All'}</option>
                    {PROJECT_TYPE.map((type, index) => (
                      <option value={type} key={index}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor="category">
                  {isSpanish ? 'Categoria' : 'Category'}
                  <select
                    name="category"
                    value={filter.category}
                    onChange={handlerFilter}
                  >
                    <option value="">{isSpanish ? 'Todos' : 'All'}</option>
                    {CATEGORIES?.map((category, index) => (
                      <option value={category} key={index}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor="technology">
                  {isSpanish ? 'Tecnología' : 'Technology'}
                  <select
                    name="technology"
                    value={filter.technology}
                    onChange={handlerFilter}
                  >
                    <option value="">{isSpanish ? 'Todos' : 'All'}</option>
                    {dataTechnologies?.map((technology) => (
                      <option value={technology.name} key={technology._id}>
                        {technology.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <button onClick={handlerClear}>{isSpanish ? 'Limpiar' : 'Clear'}</button>
            </fieldset>
          </form>

          {/* <button onClick={() => refetch()}>Reload</button> */}

          <Slider>
            {
              isLoading
              ? <Loading language={isSpanish ? 'es' : 'en'} />
              : isError
                ? <DatabaseError reason={errorProjects} language={isSpanish ? 'es' : 'en'} />
                : newDataProjects?.length === 0
                  ? <NoData reason="no-match" language={isSpanish ? 'es' : 'en'} />
                  : newDataProjects?.map((element) => (
                    <ProjectCard
                      key={element._id}
                      data={element}
                      language={isSpanish ? 'es' : 'en'}
                    />
                  ))
            }
          </Slider>
        </section>

        <section>
          <Intro
            title={isSpanish ? texts.successStories.es.title : texts.successStories.en.title}
            intro={isSpanish ? texts.successStories.en.intro : texts.successStories.en.intro}
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
                      alt={isSpanish ? caseStudy.es.title : caseStudy.en.title}
                      className={style["projects__case-study__image"]}
                    />
                  )}

                  <div className={style['projects__case-study__content-text']}>
                    <h2 className={style["projects__case-study__title"]}>{isSpanish ? caseStudy.es.title : caseStudy.en.title}</h2>
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
                      <blockquote>“{isSpanish ? caseStudy.testimonials[0].es : caseStudy.testimonials[0].en}”</blockquote>
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
      </MainLayout>
    </div>
  );
};

export default Projects;