import Image from "next/image";
import StarRating from "@/components/atom/star-rating/StarRating";
import styles from "./ProjectHero.module.scss";
import { ButtonLink } from "@/components/atom/ButtonLink/ButtonLink";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Props del componente ProjectHero
 */
interface Props {
  /**
   * Datos del proyecto.
   * Actualmente tipado como any.
   * Idealmente debería ser ProjectDetailDTO.
   */
  data: any;
}

/**
 * =========================================================
 * ProjectHero
 * ---------------------------------------------------------
 * Sección hero del detalle de un proyecto.
 *
 * Responsabilidades:
 * - Mostrar rating del proyecto (importanceScore).
 * - Mostrar título y descripción principal.
 * - Renderizar imagen destacada del proyecto.
 *
 * Esta sección funciona como encabezado visual
 * de la página de detalle del proyecto.
 * =========================================================
 */
const ProjectHero = ({ data }: Props) => {

  /**
   * Desestructuración de datos del proyecto
   */
  const {
    title,
    description,
    importanceScore,
    imageMain,
    imageBlur,
    platform,
    type,
    status,
    repositoryUrl,
    liveUrl,
    documentationUrl,
    impact
  } = data;

  const { t } = useTranslation();
  const texts = t.projects.labels;

  return (
    <section className={styles["hero"]}>
      
      {/* Contenido textual */}
      <div className={styles["hero__content"]}>
        <StarRating value={importanceScore} />

        <h1 className={styles["hero__title"]}>
          {title}
        </h1>

        <p className={styles["hero__description"]}>
          {description}
        </p>

        <div className={styles.hero__badges}>
          <span className={styles.hero__badge}>
            <strong>{texts.platform}</strong> {platform}
          </span>

          <span className={styles.hero__badge}>
            <strong>{texts.type}</strong> {type}
          </span>

          {impact.users && (
            <span className={styles.hero__badge}>
              <strong>{texts.userImpact}</strong>
              {impact.users}
            </span>
          )}

          <span className={styles.hero__badge} style={{color: "green"}}>
            {status}
          </span>
        </div>

        <div className={styles["hero__links"]}>
          {repositoryUrl && (
            <ButtonLink
              href={repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              size="md"
            >
              {texts.repository}
            </ButtonLink>
          )}

          {liveUrl && (
            <ButtonLink
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="md"
            >
              {texts.live}
            </ButtonLink>
          )}

          {documentationUrl && (
            <ButtonLink
              href={documentationUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              size="md"
            >
              {texts.documentation}
            </ButtonLink>
          )}
        </div>
      </div>

      {/* Imagen principal del proyecto */}
      <Image
        src={imageMain}
        alt={title}
        width={540}
        height={375}
        placeholder="blur"
        blurDataURL={imageBlur}
        className={styles.hero__image}
      />
    </section>
  );
};

export default ProjectHero;
