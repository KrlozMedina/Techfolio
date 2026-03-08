"use client";

import Image from "next/image";
import Link from "next/link";
import SectionTemplate from "@/components/templates/sectionTemplate/SectionTemplate";
import styles from "./sections.module.scss";
import { SuccessCasesSectionProps } from "@/infrastructure/project/projects.types";

/**
 * =========================================================
 * SuccessCasesSection
 * ---------------------------------------------------------
 * Sección encargada de mostrar casos de éxito destacados.
 *
 * Responsabilidades:
 * - Obtener casos desde summary.
 * - Renderizar máximo 2 casos destacados.
 * - Mostrar imagen hero con overlay.
 * - Proveer navegación hacia detalle del caso.
 *
 * No contiene lógica de negocio.
 * Solo presenta información resumida.
 * =========================================================
 */
const SuccessCasesSection = ({
  summary,
  texts,
  commons,
}: SuccessCasesSectionProps) => {

  /**
   * Se limitan los casos mostrados a 2.
   */
  const cases =
    summary?.filters.outcome?.slice(0, 2) || [];

  // Si no hay casos, no renderiza sección.
  if (!cases.length) return null;

  return (
    <SectionTemplate
      title={texts.successCases?.title}
      intro={texts.successCases?.intro}
    >
      <div className={styles["projects__case-study"]}>

        {cases.map((successCase) => (
          <article
            key={successCase.slug}
            className={styles["case-card"]}
          >

            {/* Imagen de fondo */}
            <Image
              src={successCase.media.cover.src}
              alt={successCase.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />

            {/* Overlay */}
            <div className={styles["case-card__overlay"]}>
              <h3>{successCase.title}</h3>
              <p>{successCase.solution}</p>

              <Link
                href={`projects/success-cases/${successCase.slug}`}
                className={styles["case-card__button"]}
              >
                {commons?.actions.seeMore}
              </Link>
            </div>

          </article>
        ))}

      </div>
    </SectionTemplate>
  );
};

export default SuccessCasesSection;