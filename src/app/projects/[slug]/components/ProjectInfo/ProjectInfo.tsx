import { useTranslation } from "@/hooks/useTranslation";
import styles from "./ProjectInfo.module.scss";

/**
 * =========================================================
 * TeamInfo Interface
 * ---------------------------------------------------------
 * Representa la información del equipo o contexto del
 * proyecto.
 *
 * Campos:
 * - company: empresa o cliente asociado al proyecto
 * - projectType: tipo de proyecto o industria
 * - duration: duración del proyecto
 * - teamSize: número de integrantes del equipo
 * - role: rol desempeñado dentro del proyecto
 * =========================================================
 */
interface TeamInfo {
  company: string | null;
  projectType: string;
  duration: string;
  teamSize: number;
  role: string;
}

/**
 * Props del componente ProjectInfo
 */
interface Props {
  /**
   * Lista de aprendizajes obtenidos durante el proyecto
   */
  learnings: string[];

  /**
   * Información del equipo y contexto del proyecto
   */
  teamInfo: TeamInfo;
}

/**
 * =========================================================
 * ProjectInfo Component
 * ---------------------------------------------------------
 * Sección que muestra información adicional del proyecto:
 *
 * - Aprendizajes obtenidos durante el desarrollo
 * - Información del equipo y del proyecto
 *
 * Estructura visual:
 *
 * Info Section
 * ├─ Learnings Card
 * │   └─ Lista de aprendizajes
 * └─ Metadata Card
 *     └─ Información del proyecto (cliente, duración, rol, etc.)
 *
 * Utiliza internacionalización para los labels.
 * =========================================================
 */
const ProjectInfo = ({ learnings, teamInfo }: Props) => {

  /**
   * Hook de traducción
   */
  const { t } = useTranslation();

  /**
   * Labels de la sección de proyectos
   */
  const texts = t.projects.labels;

  return (
    <section className={styles.info}>

      {/* =====================================================
          LEARNINGS
         ===================================================== */}
      <div className={styles["info__card"]}>

        <h3 className={styles["info__title"]}>
          {texts.keyLearning}
        </h3>

        <ul className={styles["info__list"]}>
          {learnings.map((learning, index) => (
            <li
              key={index}
              className={styles["info__list-item"]}
            >
              {learning}
            </li>
          ))}
        </ul>

      </div>

      {/* =====================================================
          PROJECT METADATA
         ===================================================== */}
      <div className={styles["info__card"]}>

        <h3 className={styles["info__title"]}>
          {texts.teamInfo}
        </h3>

        <div className={styles["info__meta"]}>

          {/* CLIENT */}
          <div className={styles["info__meta-row"]}>
            <span className={styles["info__label"]}>
              {texts.client}
            </span>

            <span className={styles["info__value"]}>
              {teamInfo.company ?? "—"}
            </span>
          </div>

          {/* PROJECT TYPE */}
          <div className={styles["info__meta-row"]}>
            <span className={styles["info__label"]}>
              {texts.projectType}
            </span>

            <span className={styles["info__value"]}>
              {teamInfo.projectType}
            </span>
          </div>

          {/* DURATION */}
          <div className={styles["info__meta-row"]}>
            <span className={styles["info__label"]}>
              {texts.duration}
            </span>

            <span className={styles["info__value"]}>
              {teamInfo.duration}
            </span>
          </div>

          {/* TEAM SIZE */}
          <div className={styles["info__meta-row"]}>
            <span className={styles["info__label"]}>
              {texts.teamSize}
            </span>

            <span className={styles["info__value"]}>
              {teamInfo.teamSize}
            </span>
          </div>

          {/* ROLE */}
          <div className={styles["info__meta-row"]}>
            <span className={styles["info__label"]}>
              {texts.role}
            </span>

            <span className={styles["info__value"]}>
              {teamInfo.role}
            </span>
          </div>

        </div>
      </div>

    </section>
  );
};

export default ProjectInfo;