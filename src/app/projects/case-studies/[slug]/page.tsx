"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "@/hooks";
import { caseStudies } from "@/mocks/caseStudies.mock";
import React from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

const CaseStudyDetailPage: React.FC<Props> = async ({ params }) => {
  const { isSpanish } = useLanguage();
  const lang = isSpanish ? "es" : "en";

  const resolvedParams = await params; // Desempaquetar la promesa
  const { slug } = resolvedParams;

  const caseStudy = caseStudies.find(
    cs => cs.link.split("/").pop() === slug
  );

  if (!caseStudy) notFound();

  const content = caseStudy[lang];

  return (
    <article style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
      <h1>{content.title}</h1>
      <p><strong>{caseStudy.client}</strong></p>

      <Image
        src={caseStudy.imageUrl}
        alt={content.title}
        width={800}
        height={400}
        style={{ width: "100%", height: "auto", margin: "1.5rem 0" }}
      />

      <section>
        <h2>{isSpanish ? "Reto" : "Challenge"}</h2>
        <p>{content.challenges}</p>
      </section>

      <section>
        <h2>{isSpanish ? "Solución" : "Solution"}</h2>
        <p>{content.solution}</p>
      </section>

      <section>
        <h2>{isSpanish ? "Resultados" : "Results"}</h2>
        <p>{content.results}</p>
      </section>

      {caseStudy.testimonials?.length > 0 && (
        <blockquote style={{ marginTop: "2rem", fontStyle: "italic" }}>
          “{caseStudy.testimonials[0][lang]}”
          <footer>
            — {caseStudy.testimonials[0].interviewee.name},{" "}
            {caseStudy.testimonials[0].interviewee.position}
          </footer>
        </blockquote>
      )}
    </article>
  );
};

export default CaseStudyDetailPage;
