"use client";

import Image from "next/image";
import styles from "./ProjectDetail.module.scss";
import { ProjectListDTO } from "@/infrastructure/project/project.list.dto";
import { useTranslation } from "@/hooks/useTranslation";
import { ButtonLink } from "@/components/atom/ButtonLink/ButtonLink";

/**
 * Props del componente ProjectDetail
 */
interface Props {
  /** Proyecto a renderizar en vista de detalle */
  project: ProjectListDTO;
}

/**
 * =========================================================
 * ProjectDetail
 * ---------------------------------------------------------
 * Vista detallada de un proyecto.
 *
 * Responsabilidades:
 * - Mostrar imagen principal optimizada.
 * - Renderizar metadatos (platform, type).
 * - Mostrar descripción.
 * - Renderizar tecnologías en grid.
 * - Renderizar features.
 * - Proveer CTAs (demo, repo, detalle).
 *
 * Es un componente de presentación.
 * No contiene lógica de negocio.
 * =========================================================
 */
export default function ProjectDetail({ project }: Props) {
  const { t } = useTranslation();

  return (
    <section className={styles["card"]}>

      {/* ================= HEADER ================= */}
      <div className={styles["card__header"]}>

        {/* Imagen principal */}
        <div className={styles["card__image-container"]}>
          <Image
            src={project.imageMain}
            alt={project.title}
            fill
            placeholder="blur"
            blurDataURL={project.imageBlur}
            className={styles["card__image"]}
          />
        </div>

        <div className={styles["card__header-content"]}>

          {/* Título */}
          <div className={styles["card__title-row"]}>
            <h2 className={styles["card__title"]}>
              {project.title}
            </h2>
          </div>

          {/* Badges */}
          <div className={styles["card__badges"]}>
            <span
              className={`${styles["card__badge"]} ${styles["card__badge--blue"]}`}
            >
              {project.platform}
            </span>

            <span
              className={`${styles["card__badge"]} ${styles["card__badge--orange"]}`}
            >
              {project.type}
            </span>
          </div>

          {/* Descripción */}
          <p className={styles["card__subtitle"]}>
            {project.description}
          </p>

          {/* ================= CTA ================= */}
          <div className={styles["card__footer"]}>

            {project.liveUrl && (
              <ButtonLink
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
              >
                Ver Demo
              </ButtonLink>
            )}

            {project.repositoryUrl && (
              <ButtonLink
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="md"
              >
                Ver Código
              </ButtonLink>
            )}

            <ButtonLink
              href={`/projects/${project.slug}`}
              variant="ghost"
              size="md"
            >
              {t.projects.labels.details} →
            </ButtonLink>

          </div>
        </div>
      </div>

      <div className={styles["card__divider"]} />

      {/* ================= BODY ================= */}
      <div className={styles["card__body"]}>

        {/* ===== TECH GRID ===== */}
        <section>
          <h3>{t.projects.labels.technologies}</h3>

          <div className={styles["card__tech-grid"]}>
            {project.technologies.map((tech) => (
              <div
                key={tech.name}
                className={styles["card__tech-card"]}
              >
                <div className={styles["card__tech-header"]}>
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={28}
                    height={28}
                  />
                  <h4>{tech.name}</h4>
                </div>

                <span
                  className={`${styles.card__experience} ${
                    styles[
                      `card__experience--${tech.experience.toLowerCase()}`
                    ]
                  }`}
                >
                  {tech.category} - {tech.experience}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section className={styles["card__feat-grid"]}>
          <h3>{t.projects.labels.features}</h3>

          <div className={styles["card__features"]}>
            {project.features.map((feature) => (
              <span
                key={feature.title}
                className={styles["card__feat-card"]}
              >
                ✔ {feature.title}
              </span>
            ))}
          </div>
        </section>

      </div>
    </section>
  );
}