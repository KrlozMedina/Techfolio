import Slider from "@/components/organisms/Slider/Slider";
import { ProjectCard } from "@/components/molecules/projects-card/ProjectCard";
import {
  LoadingState,
  DatabaseErrorState,
  NoDataState
} from "@/components/molecules/feedback";
import { ProjectsListProps } from "@/infrastructure/project/projects.types";

/**
 * =========================================================
 * ProjectsList
 * ---------------------------------------------------------
 * Componente encargado de renderizar el listado
 * visual de proyectos.
 *
 * Responsabilidades:
 * - Manejar estados de carga.
 * - Manejar estado de error.
 * - Manejar estado vacío.
 * - Renderizar proyectos dentro de un Slider.
 *
 * No contiene lógica de negocio.
 * Solo orquesta estados visuales.
 * =========================================================
 */
const ProjectsList = ({
  projects,
  isLoading,
  isError,
  setSelectedProject,
}: ProjectsListProps) => {

  /* ================= STATES ================= */

  if (isLoading) return <LoadingState />;

  if (isError) return <DatabaseErrorState />;

  if (!projects?.data.length)
    return <NoDataState reason="no-match" />;

  /* ================= RENDER ================= */

  return (
    <Slider>
      {projects.data.map((project) => (
        <ProjectCard
          key={project.id?.toString()}
          data={project}
          onSelect={setSelectedProject}
        />
      ))}
    </Slider>
  );
};

export default ProjectsList;