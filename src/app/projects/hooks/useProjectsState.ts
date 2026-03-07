"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import {
  useGetProjectsQuery,
  useGetProjectsSummaryQuery
} from "@/infrastructure/project/projects.api";
import { Page, Status } from "@/shared/enums";
import { ProjectListDTO } from "@/infrastructure/project/project.list.dto";
import { ITechStack } from "../../../infrastructure/project/projects.types";

/**
 * =========================================================
 * useProjectsState
 * ---------------------------------------------------------
 * Hook de estado centralizado para la sección de proyectos.
 *
 * Responsabilidades:
 * - Obtener textos i18n.
 * - Manejar estado de filtros.
 * - Gestionar selección de proyecto (modal).
 * - Consultar listado paginado.
 * - Consultar summary para filtros agregados.
 * - Filtrar stack tecnológico por categoría.
 *
 * Este hook actúa como:
 * - Orquestador de estado UI
 * - Adaptador entre API y componentes
 * =========================================================
 */
export const useProjectsState = () => {

  /* ================= CONTEXT ================= */

  const page: Page = "projects";

  const { t, language } = useTranslation();
  const texts = t[page];
  const commons = t.common;

  const status = Status.PUBLISHED;

  /* ================= UI STATE ================= */

  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  const [selectedProject, setSelectedProject] =
    useState<ProjectListDTO | null>(null);

  const [filterTech, setFilterTech] = useState({
    category: "Backend",
  });

  const [filters, setFilters] = useState({
    platform: "",
    technology: "",
    feature: "",
    page: 1,
  });

  /* ================= API CALLS ================= */

  const { data: summary } =
    useGetProjectsSummaryQuery({ language, status });

  const { data: projects, isLoading, isError } =
    useGetProjectsQuery({
      language,
      page: filters.page,
      limit: 10,
      platform: filters.platform || undefined,
      technology: filters.technology || undefined,
      feature: filters.feature || undefined,
      status,
    });

  /* ================= DERIVED DATA ================= */

  const techStack = summary?.filters.technologies;

  const filteredTechnologies = useMemo(() => {
    if (!techStack) return [];

    return techStack.filter(
      (tech: ITechStack) =>
        !filterTech.category ||
        tech.category === filterTech.category
    );
  }, [techStack, filterTech]);

  /* ================= RETURN ================= */

  return {
    page,
    texts,
    commons,
    language,
    summary,
    projects,
    isLoading,
    isError,
    filters,
    setFilters,
    hasActiveFilters,
    setHasActiveFilters,
    selectedProject,
    setSelectedProject,
    filterTech,
    setFilterTech,
    filteredTechnologies,
  };
};