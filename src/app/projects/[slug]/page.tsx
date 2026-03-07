'use client'

import { useGetProjectBySlugQuery } from "@/infrastructure/project/projects.api";
import { useParams } from "next/navigation";
import { LoadingState, NoDataState } from "@/components/molecules/feedback";
import ProjectHero from "./components/ProjectHero/ProjectHero";
import ProjectProblemSolution from "./components/ProjectProblemSolution/ProjectProblemSolution";
import ProjectArchitecture from "./components/ProjectArchitecture/ProjectArchitecture";
import ProjectTechnologies from "./components/ProjectTechnologies/ProjectTechnologies";
import ProjectFeatures from "./components/ProjectFeatures/ProjectFeatures";
import ProjectInfo from "./components/ProjectInfo/ProjectInfo";
import ProjectOutcome from "./components/ProjectOutcome/ProjectOutcome";
import { useTranslation } from "@/hooks/useTranslation";

/**
 * =========================================================
 * ProjectDetailPage
 * ---------------------------------------------------------
 * Página encargada de mostrar el detalle completo
 * de un proyecto específico dentro del portafolio.
 *
 * Flujo de funcionamiento:
 *
 * 1. Obtiene el `slug` desde la URL mediante `useParams`.
 * 2. Obtiene el idioma activo desde el sistema de i18n.
 * 3. Realiza la consulta del proyecto mediante
 *    `useGetProjectBySlugQuery`.
 * 4. Maneja estados de UI:
 *      - Loading
 *      - No data
 * 5. Renderiza las diferentes secciones del proyecto:
 *
 *      - Hero
 *      - Problem / Solution
 *      - Architecture
 *      - Technologies
 *      - Features
 *      - Project Info
 *      - Outcome (opcional)
 *
 * Arquitectura:
 * Esta página funciona como **orquestador de secciones**,
 * delegando la lógica visual a componentes especializados.
 *
 * Esto mantiene:
 * - Alta modularidad
 * - Reutilización
 * - Código fácil de mantener
 * =========================================================
 */
export default function ProjectDetailPage() {

  /**
   * Obtiene el slug del proyecto desde la ruta dinámica
   * /projects/[slug]
   */
  const { slug } = useParams() as { slug: string };

  /**
   * Obtiene el idioma actual del sistema i18n
   */
  const { language } = useTranslation();

  /**
   * Consulta del proyecto mediante RTK Query
   */
  const { data, isLoading } = useGetProjectBySlugQuery({ slug, language });

  /**
   * Estado de carga
   */
  if (isLoading) return <LoadingState />;

  /**
   * Estado cuando no existe información del proyecto
   */
  if (!data) return <NoDataState reason="no-match" />;

  return (
    <div>

      {/* =====================================================
          HERO SECTION
         ===================================================== */}
      <ProjectHero data={data} />

      {/* =====================================================
          PROBLEM / SOLUTION
         ===================================================== */}
      <ProjectProblemSolution
        problem={data.problem}
        solution={data.solution}
      />

      {/* =====================================================
          ARCHITECTURE
         ===================================================== */}
      <ProjectArchitecture architecture={data.architecture} />

      {/* =====================================================
          TECHNOLOGIES
         ===================================================== */}
      <ProjectTechnologies technologies={data.technologies} />

      {/* =====================================================
          FEATURES
         ===================================================== */}
      <ProjectFeatures features={data.features} />

      {/* =====================================================
          PROJECT INFO
         ===================================================== */}
      <ProjectInfo
        learnings={data.learnings}
        teamInfo={data.teamInfo}
      />

      {/* =====================================================
          OUTCOME (OPTIONAL)
         ===================================================== */}
      {data.outcome && (
        <ProjectOutcome outcome={data.outcome} />
      )}

    </div>
  );
}