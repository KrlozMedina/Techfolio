"use client";

import React, { useContext } from "react";
import successCases from "@/mock/caseStudies.json";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import LanguageContext, {
  LanguageContextType,
} from "@/redux/context/LanguageContext";
import { Intro, Phrase } from "@/components/atom/TextBlocks/TextsBlocks";

const CaseStudiesPage: React.FC = () => {
  const { isSpanish } = useContext(LanguageContext) as LanguageContextType;

  const links = [
    {
      title: isSpanish ? "Servicios" : "Services",
      href: "/projects/services",
      isActive: false,
    },
    {
      title: isSpanish ? "Testimonios" : "Testimonials",
      href: "/projects/testimonials",
      isActive: false,
    },
    {
      title: isSpanish ? "Casos de éxito" : "Success Stories",
      href: "/projects/case-studies",
      isActive: true,
    },
  ];

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
  };

  return (
    <MainLayout isAdmin={false} links={links}>
      <Phrase
        phraseSpanish="El éxito es la suma de pequeños esfuerzos repetidos día tras día."
        phraseEnglish="Success is the sum of small efforts, repeated day in and day out."
        author="Robert Collier"
      />

      <section>
        <Intro es={texts.intro.es} en={texts.intro.en} />

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
    </MainLayout>
  );
};

export default CaseStudiesPage;
