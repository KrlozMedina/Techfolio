import Modal from "@/components/organisms/Modal/Modal";
import ProjectDetail from "../detail/ProjectDetail";

/**
 * =========================================================
 * ProjectModal
 * ---------------------------------------------------------
 * Componente encargado de renderizar el detalle
 * de un proyecto dentro de un Modal.
 *
 * Responsabilidades:
 * - Controlar visibilidad según selectedProject.
 * - Cerrar modal limpiando el estado.
 * - Delegar contenido a ProjectDetail.
 *
 * Nota:
 * Actualmente usa tipado "any" en props.
 * =========================================================
 */
const ProjectModal = (props: any) => {
  const {
    selectedProject,
    setSelectedProject
  } = props;

  // Si no hay proyecto seleccionado, no renderiza nada.
  if (!selectedProject) return null;

  return (
    <Modal onClose={() => setSelectedProject(null)}>
      <ProjectDetail project={selectedProject} />
    </Modal>
  );
};

export default ProjectModal;