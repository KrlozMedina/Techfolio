import SectionTemplate from "@/components/templates/sectionTemplate/SectionTemplate";
import styles from "./ProjectFeatures.module.scss";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * =========================================================
 * Feature Interface
 * ---------------------------------------------------------
 * Representa una funcionalidad o característica del proyecto.
 *
 * Campos:
 * - title: nombre de la funcionalidad
 * - description: explicación breve de lo que hace
 * =========================================================
 */
interface Feature {
  title: string;
  description: string;
}

/**
 * Props del componente ProjectFeatures
 */
interface Props {
  features: Feature[];
}

/**
 * =========================================================
 * ProjectFeatures Component
 * ---------------------------------------------------------
 * Sección que muestra las funcionalidades principales
 * implementadas dentro de un proyecto.
 *
 * Funcionalidades:
 * - Renderiza una lista de features.
 * - Cada feature se muestra como una tarjeta.
 * - Utiliza internacionalización para el título de la sección.
 *
 * Estructura visual:
 *
 * SectionTemplate
 *   └─ Grid
 *       ├─ Feature Card
 *       ├─ Feature Card
 *       └─ Feature Card
 *
 * =========================================================
 */
const ProjectFeatures = ({ features }: Props) => {

  /**
   * Hook de traducción
   */
  const { t } = useTranslation();

  /**
   * Textos de la sección de detalles de proyecto
   */
  const titles = t.projects.details;

  return (
    <SectionTemplate title={titles.features}>

      {/* Grid de funcionalidades */}
      <ul className={styles["features__grid"]}>

        {features.map((feature) => (
          <li
            key={feature.title}
            className={styles["features__card"]}
          >

            {/* Título de la funcionalidad */}
            <h3 className={styles["features__card-title"]}>
              {feature.title}
            </h3>

            {/* Descripción de la funcionalidad */}
            <p className={styles["features__card-description"]}>
              {feature.description}
            </p>

          </li>
        ))}

      </ul>
    </SectionTemplate>
  );
};

export default ProjectFeatures;