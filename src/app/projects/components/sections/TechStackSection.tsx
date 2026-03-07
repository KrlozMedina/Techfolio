"use client";

import Image from "next/image";
import SectionTemplate from "@/components/templates/sectionTemplate/SectionTemplate";
import styles from "./sections.module.scss";
import { TechStackSectionProps } from "@/infrastructure/project/projects.types";

/**
 * =========================================================
 * TechStackSection
 * ---------------------------------------------------------
 * Sección encargada de:
 * - Mostrar categorías de tecnologías (tabs / select).
 * - Renderizar tecnologías filtradas.
 * - Permitir aplicar filtro hacia sección de proyectos.
 *
 * Responsabilidades:
 * - Manejar UI de selección de categoría.
 * - Delegar estado al hook superior.
 * - Disparar filtros hacia ProjectsSection.
 *
 * No contiene lógica de negocio.
 * Solo orquesta interacciones.
 * =========================================================
 */
const TechStackSection = ({
  texts,
  summary,
  filterTech,
  setFilterTech,
  filteredTechnologies,
  setFilters,
  setHasActiveFilters,
}: TechStackSectionProps) => {

  return (
    <SectionTemplate
      title={texts.stack.title}
      intro={texts.stack.intro}
    >

      {/* ================= DESKTOP TABS ================= */}
      <div className={styles["tech__tabs"]}>
        <div key={filterTech.category}>
          {summary?.filters.categories?.map((c) => (
            <button
              type="button"
              key={c.name}
              className={styles["tech__tab"]}
              onClick={() =>
                setFilterTech({ category: c.name })
              }
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* ================= TECH GRID ================= */}
      <div className={styles["tech__radar"]}>
        <div
          key={filterTech.category}
          className={styles["tech__grid"]}
        >
          {filteredTechnologies.map((tech) => (
            <a
              type="button"
              key={tech.slug}
              href="#projects"
              className={styles["tech__card"]}
              onClick={() => {
                setHasActiveFilters(true);
                setFilters({
                  platform: "",
                  technology: tech.slug,
                  feature: "",
                  page: 1,
                });
              }}
            >
              <Image
                src={tech.icon}
                alt={tech.name}
                width={64}
                height={64}
              />

              <h3 className={styles["tech__name"]}>
                {tech.name}
              </h3>

              <p className={styles["tech__experience"]}>
                {tech.experience}
              </p>

              <p className={styles["tech__projects"]}>
                {tech.count}{" "}
                {tech.count > 1
                  ? `${texts.labels.project}s`
                  : texts.labels.project}
              </p>
            </a>
          ))}
        </div>
      </div>

    </SectionTemplate>
  );
};

export default TechStackSection;