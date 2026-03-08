import { useTranslation } from "@/hooks/useTranslation";
import styles from "./ProjectProblemSolution.module.scss";

/**
 * Props del componente ProjectProblemSolution
 */
interface Props {
  /**
   * Problema o necesidad que el proyecto intenta resolver.
   */
  problem: string;

  /**
   * Solución implementada para resolver el problema.
   */
  solution: string;
}

/**
 * =========================================================
 * ProjectProblemSolution
 * ---------------------------------------------------------
 * Sección que muestra el contexto principal del proyecto:
 * - Problema identificado
 * - Solución propuesta/implementada
 *
 * Estructura:
 * - Dos bloques visuales dentro de un grid responsive.
 * - Cada bloque representa una fase del caso.
 *
 * Uso:
 * Generalmente se utiliza en la página de detalle del
 * proyecto para explicar el valor del desarrollo.
 * =========================================================
 */
const ProjectProblemSolution = ({ problem, solution }: Props) => {
  const { t } = useTranslation();
  const texts = t.projects.labels;

  return (
    <section className={styles.block}>
      {/* PROBLEM */}
      <div
        className={styles.block__item}
        style={{ borderLeft: "4px solid red" }}
      >
        <h2 className={styles.block__title}>{texts.problem}</h2>
        <p>{problem}</p>
      </div>

      {/* SOLUTION */}
      <div
        className={styles.block__item}
        style={{ borderLeft: "4px solid green" }}
      >
        <h2 className={styles.block__title}>{texts.solution}</h2>
        <p>{solution}</p>
      </div>
    </section>
  );
};

export default ProjectProblemSolution;