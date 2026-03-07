import ProjectsClient from "./ProjectsClient";

/**
 * =========================================================
 * ProjectsPage (Server Component)
 * ---------------------------------------------------------
 * Entry point de la ruta /projects.
 *
 * Responsabilidades:
 * - Actuar como contenedor server-side.
 * - Delegar toda la lógica interactiva al
 *   componente cliente (ProjectsClient).
 *
 * Nota:
 * Actualmente no realiza fetching server-side.
 * Solo renderiza el componente cliente.
 * =========================================================
 */
export default async function ProjectsPage() {
  return <ProjectsClient />;
}