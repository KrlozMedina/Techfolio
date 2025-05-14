"use client";

import React, { useContext } from "react";
import successCases from "@/mocks/caseStudies.json";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
// import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import LanguageContext, {
  LanguageContextType,
} from "@/context/LanguageContext";
import { Intro, Phrase } from "@/components/atom/TextBlocks/TextsBlocks";
// import StatusNotice from "@/components/organisms/Notice/Notice";

const CaseStudiesPage: React.FC = () => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;

  // const links = [
  //   {
  //     title: {es: "Servicios", en: "Services"},
  //     path: "/projects/services",
  //     isActive: false,
  //   },
  //   {
  //     title: {es: "Testimonios", en: "Testimonials"},
  //     path: "/projects/testimonials",
  //     isActive: false,
  //   },
  //   {
  //     title: {es: "Casos de éxito", en: "Success Stories"},
  //     path: "/projects/case-studies",
  //     isActive: true,
  //   },
  // ];

  const texts = {
    intro: {
      es: {
        title: "Casos de Éxito",
        intro:
          "En esta sección, te presento algunos de los casos de éxito que he tenido el placer de desarrollar. Cada uno refleja mi enfoque en la resolución de problemas, mi habilidad para adaptarme a diferentes necesidades y mi compromiso con entregar soluciones que superen las expectativas. ¡Echa un vistazo a cómo mis proyectos han generado un impacto real!",
      },
      en: {
        title: "Success Stories",
        intro:
          "In this section, I present some of the success stories I've had the pleasure of developing. Each one reflects my approach to problem-solving, my ability to adapt to different needs, and my commitment to delivering solutions that exceed expectations. Take a look at how my projects have made a real impact!",
      },
    },
    phrase: {
      es: 'El éxito es la suma de pequeños esfuerzos repetidos día tras día.',
      en: 'Success is the sum of small efforts, repeated day in and day out.',
      author: 'Robert Collier'
    }
  };

  return (
    <>
      <Phrase
        phrase={isSpanish ? texts.phrase.es : texts.phrase.en}
        author={texts.phrase.author}
      />


      <section>
        <Intro
          title={isSpanish ? texts.intro.es.title : texts.intro.en.title}
          intro={isSpanish ? texts.intro.es.intro : texts.intro.en.intro}
        />
        {/* <StatusNotice type="dummy" language={isSpanish ? 'es' : 'en'} /> */}

        <section className={styles["page"]}>
          <div className={styles["caseList"]}>
            {successCases.map((caseItem, index) => (
              <div
                key={index}
                className={`${styles["caseItem"]} ${
                  index % 2 !== 0 ? styles["caseItem--reverse"] : ""
                }`}
              >
                <div className={styles["caseImage"]}>
                  <Image
                    src={caseItem.imageUrl}
                    alt={isSpanish ? caseItem.es.title : caseItem.en.title}
                    width={200}
                    height={300}
                    className={styles["image"]}
                    loading="lazy"
                  />
                </div>

                <div className={styles["caseContent"]}>
                  <h2 className={styles["caseTitle"]}>
                    {isSpanish ? caseItem.es.title : caseItem.en.title}
                  </h2>
                  <p className={styles["caseDescription"]}>
                    {isSpanish ? caseItem.es.summary : caseItem.en.summary}
                  </p>
                  <p className={styles["caseResult"]}>
                    {isSpanish ? caseItem.es.results : caseItem.en.results}
                  </p>
                  <blockquote className={styles["caseQuote"]}>
                    {isSpanish
                      ? caseItem.testimonials[0].es
                      : caseItem.testimonials[0].en}
                  </blockquote>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cta}>
            <h3 className={styles.ctaTitle}>
              ¿Te gustaría que tu proyecto sea nuestro próximo caso de éxito?
            </h3>
            <div className={styles.ctaButtons}>
              <Link href="/contact" className={styles.ctaBtnPrimary}>
                Contáctame
              </Link>
              <Link href="/services" className={styles.ctaBtnSecondary}>
                Explorar servicios
              </Link>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default CaseStudiesPage;
