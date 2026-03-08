import styles from "./ProjectsFilters.module.scss";
import { ProjectsFiltersProps } from "../../../../infrastructure/project/projects.types";
import { Button } from "@/components/atom/Button/Button";
import { Select } from "@/components/atom/Select/Select";

/**
 * =========================================================
 * ProjectsFilters
 * ---------------------------------------------------------
 * Componente encargado de renderizar y controlar
 * los filtros de la sección de proyectos.
 *
 * Responsabilidades:
 * - Renderizar filtros de feature y platform.
 * - Mostrar botón de reset cuando hay filtros activos.
 * - Actualizar estado externo mediante setFilters.
 * - Mantener accesibilidad básica (labels ocultos).
 *
 * No contiene lógica de negocio.
 * Solo controla estado UI y emite cambios.
 * =========================================================
 */
const ProjectsFilters = ({
  summary,
  filters,
  setFilters,
  hasActiveFilters,
  setHasActiveFilters,
  texts,
  commons,
}: ProjectsFiltersProps) => {

  /* ================= RESET ================= */

  const handleReset = () => {
    setFilters({
      platform: "",
      technology: "",
      feature: "",
      page: 1,
    });
    setHasActiveFilters(false);
  };

  /* ================= HANDLERS ================= */

  const handleFeatureChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setHasActiveFilters(true);
    setFilters((f) => ({
      ...f,
      feature: e.target.value,
    }));
  };

  const handlePlatformChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setHasActiveFilters(true);
    setFilters((f) => ({
      ...f,
      platform: e.target.value,
    }));
  };

  /* ================= RENDER ================= */

  return (
    <div className={styles["projects__filters"]}>

      {/* Botón Reset (solo si hay filtros activos) */}
      {hasActiveFilters && (
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={handleReset}
        >
          {commons.actions.reset}
        </Button>
      )}

      {/* ===== Feature Filter ===== */}
      <div className={styles["projects__filter-group"]}>
        <label
          className="sr-only"
          htmlFor="feature-filter"
        >
          {texts.projects.filters.features.title}
        </label>

        <Select
          id="feature-filter"
          size="sm"
          value={filters.feature}
          onChange={handleFeatureChange}
        >
          <option value="">
            {texts.projects.filters.features.all}
          </option>

          {summary?.filters.features?.map((f) => (
            <option key={f.slug} value={f.slug}>
              {f.name}
            </option>
          ))}
        </Select>
      </div>

      {/* ===== Platform Filter ===== */}
      <div className={styles["projects__filter-group"]}>
        <label
          className="sr-only"
          htmlFor="platform-filter"
        >
          {texts.projects.filters.platform.title}
        </label>

        <Select
          id="platform-filter"
          value={filters.platform}
          onChange={handlePlatformChange}
          size="sm"
        >
          <option value="">
            {texts.projects.filters.platform.all}
          </option>

          {summary?.filters.platform?.map((p) => (
            <option key={p.platform} value={p.platform}>
              {commons.enums.platforms[p.platform]}
            </option>
          ))}
        </Select>
      </div>

    </div>
  );
};

export default ProjectsFilters;