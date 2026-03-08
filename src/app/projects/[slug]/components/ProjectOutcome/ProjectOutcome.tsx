import Image from "next/image";
import styles from "./ProjectOutcome.module.scss";
import SectionTemplate from "@/components/templates/sectionTemplate/SectionTemplate";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * =========================================================
 * ProjectOutcome Props
 * ---------------------------------------------------------
 * Representa el resultado o impacto final del proyecto.
 *
 * Campos:
 * - solution: descripción del resultado o impacto obtenido
 * - media: recurso visual opcional que ilustra el resultado
 * =========================================================
 */
interface Props {
  outcome: {
    solution: string | undefined;
    media?: {
      src: string | undefined;
    };
  };
}

/**
 * =========================================================
 * ProjectOutcome Component
 * ---------------------------------------------------------
 * Sección que muestra el resultado final o impacto
 * generado por el proyecto.
 *
 * Contenido:
 * - Descripción del resultado obtenido
 * - Imagen opcional que ilustra el outcome
 *
 * Características:
 * - Usa SectionTemplate para mantener consistencia visual
 *   entre secciones del portafolio.
 * - Soporta internacionalización para el título.
 * - Renderiza la imagen solo si existe media disponible.
 *
 * Estructura visual:
 *
 * SectionTemplate
 *   └─ Outcome Container
 *        ├─ Text Content
 *        └─ Media (opcional)
 *
 * =========================================================
 */
const ProjectOutcome = ({ outcome }: Props) => {

  /**
   * Hook de traducción
   */
  const { t } = useTranslation();

  /**
   * Textos de la sección de detalles del proyecto
   */
  const title = t.projects.details;

  return (
    <SectionTemplate title={title.outcome}>
      <div className={styles.outcome}>

        {/* =================================================
            TEXT CONTENT
           ================================================= */}
        <div className={styles.outcome__content}>
          <p className={styles.outcome__text}>
            {outcome.solution}
          </p>
        </div>

        {/* =================================================
            MEDIA (OPTIONAL)
           ================================================= */}
        {outcome.media?.src && (
          <div className={styles.outcome__media}>
            <Image
              src={outcome.media.src}
              alt="Project outcome preview"
              width={900}
              height={600}
              className={styles.outcome__image}
            />
          </div>
        )}

      </div>
    </SectionTemplate>
  );
};

export default ProjectOutcome;