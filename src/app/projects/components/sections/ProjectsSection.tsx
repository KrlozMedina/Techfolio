import SectionTemplate from "@/components/templates/sectionTemplate/SectionTemplate";
import ProjectsFilters from "../filters/ProjectsFilters";
import ProjectsList from "./ProjectsList";
import ProjectModal from "../modal/ProjectModal";
import { ProjectsSectionProps } from "@/infrastructure/project/projects.types";

/**
 * =========================================================
 * ProjectsSection
 * ---------------------------------------------------------
 * Sección principal de proyectos.
 *
 * Responsabilidades:
 * - Renderizar encabezado de sección (title + intro).
 * - Orquestar:
 *    • Filtros
 *    • Listado
 *    • Modal de detalle
 * - Delegar toda la lógica al hook superior.
 *
 * Es un componente de composición.
 * No contiene lógica propia.
 * =========================================================
 */
const ProjectsSection = (props: ProjectsSectionProps) => {

  const {
    page,
    texts,
    ...rest
  } = props;

  return (
    <SectionTemplate
      id={page}
      title={texts.projects.title}
      intro={texts.projects.intro}
    >

      {/* ===== FILTERS ===== */}
      <ProjectsFilters
        texts={texts}
        {...rest}
      />

      {/* ===== LIST ===== */}
      <ProjectsList {...rest} />

      {/* ===== MODAL ===== */}
      <ProjectModal {...rest} />

    </SectionTemplate>
  );
};

export default ProjectsSection;