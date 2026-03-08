import SectionTemplate from "@/components/templates/sectionTemplate/SectionTemplate";
import styles from "./ProjectTechnologies.module.scss";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * =========================================================
 * Technology Interface
 * ---------------------------------------------------------
 * Representa una tecnología utilizada dentro de un proyecto.
 *
 * Campos:
 * - name: nombre de la tecnología
 * - icon: ruta del icono representativo
 * - experience: nivel o descripción de experiencia
 * - category: categoría tecnológica (ej: Backend, Frontend)
 * =========================================================
 */
interface Technology {
  name: string;
  icon: string;
  experience: string;
  category: string;
}

/**
 * Props del componente ProjectTechnologies
 */
interface Props {
  technologies: Technology[];
}

/**
 * =========================================================
 * ProjectTechnologies Component
 * ---------------------------------------------------------
 * Sección que muestra las tecnologías utilizadas en
 * un proyecto específico.
 *
 * Funcionalidades:
 * - Agrupa tecnologías por categoría.
 * - Renderiza cada grupo con su título.
 * - Muestra icono, nombre y experiencia de cada tecnología.
 *
 * Organización visual:
 * Category
 *   ├─ Technology
 *   ├─ Technology
 *   └─ Technology
 *
 * El agrupamiento se realiza dinámicamente usando `reduce`.
 * =========================================================
 */
const ProjectTechnologies = ({ technologies }: Props) => {

  /**
   * Agrupa las tecnologías por categoría.
   *
   * Resultado esperado:
   * {
   *   Backend: [tech1, tech2],
   *   Frontend: [tech3],
   *   DevOps: [tech4, tech5]
   * }
   */
  const grouped = technologies.reduce(
    (acc: Record<string, any[]>, tech) => {
      if (!acc[tech.category]) acc[tech.category] = [];
      acc[tech.category].push(tech);
      return acc;
    },
    {}
  );

  /**
   * Hook de traducción
   */
  const { t } = useTranslation();

  /**
   * Texto del título de la sección
   */
  const title = t.projects.details;

  return (
    <SectionTemplate title={title.technologies} >
      {Object.entries(grouped).map(([category, techs]) => (
        <div key={category} className={styles.tech__group}>
          
          {/* Nombre de la categoría */}
          <h3 className={styles.tech__category}>{category}</h3>

          {/* Grid de tecnologías */}
          <div className={styles.tech__grid}>
            {techs.map((tech: any) => (
              <div key={tech.name} className={styles.tech__item}>
                
                {/* Icono de la tecnología */}
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className={styles.tech__icon}
                />

                {/* Información textual */}
                <div>
                  <strong>{tech.name}</strong>
                  <span>{tech.experience}</span>
                </div>

              </div>
            ))}
          </div>

        </div>
      ))}
    </SectionTemplate>
  );
};

export default ProjectTechnologies;