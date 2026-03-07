'use client';

import Image from "next/image";
import styles from "./ProjectCard.module.scss";
import { FaCode } from "react-icons/fa";
import { useTranslation } from "@/hooks/useTranslation";
import { ProjectListDTO } from "@/infrastructure/project/project.list.dto";

/**
 * Props del componente ProjectCard
 */
interface Props {
  /** Datos resumidos del proyecto */
  data: ProjectListDTO;

  /** Callback al seleccionar la card */
  onSelect: (project: ProjectListDTO) => void;
}

/**
 * =========================================================
 * ProjectCard
 * ---------------------------------------------------------
 * Tarjeta visual que representa un proyecto en listados
 * o carruseles.
 *
 * Responsabilidades:
 * - Mostrar imagen principal optimizada.
 * - Mostrar badges (tipo y plataforma).
 * - Mostrar descripción resumida.
 * - Mostrar features como tags.
 * - Permitir selección completa de la tarjeta.
 * - Proveer enlaces externos (live / repo).
 *
 * Accesibilidad:
 * - role="button"
 * - tabIndex
 * - Soporte Enter key
 *
 * No maneja navegación directamente.
 * Delegación a onSelect.
 * =========================================================
 */
export const ProjectCard: React.FC<Props> = ({ data, onSelect }) => {

  const {
    title,
    description,
    repositoryUrl,
    liveUrl,
    imageMain,
    imageBlur,
    platform,
    features,
    type,
  } = data;

  const { t } = useTranslation();
  const texts = t.projects.labels;

  return (
    <article
      className={styles.card}
      onClick={() => onSelect(data)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSelect(data);
      }}
    >

      {/* ================= MEDIA ================= */}
      <div className={styles.card__media}>
        <Image
          src={imageMain}
          alt={title || "Project image"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={imageBlur}
          loading="lazy"
        />

        <div className={styles.card__badges}>
          <span className={styles.card__badge}>
            {type}
          </span>

          <span className={styles.card__badge}>
            {platform}
          </span>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className={styles.card__content}>

        <h3 className={styles.card__title}>
          {title}
        </h3>

        <p className={styles.card__description}>
          {description}
        </p>

        {/* ===== TECH STACK TAGS ===== */}
        <div className={styles.card__tags}>
          {features?.slice(0, 6).map((feat) => (
            <span
              key={feat.title}
              className={styles.card__tag}
            >
              {feat.title}
            </span>
          ))}
        </div>

        {/* ===== CTA LINKS ===== */}
        <div className={styles.card__cta}>

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {texts.details}
            </a>
          )}

          {repositoryUrl && (
            <a
              href={repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <FaCode /> {texts.code}
            </a>
          )}

        </div>
      </div>
    </article>
  );
};