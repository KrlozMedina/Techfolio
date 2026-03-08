"use client";

import { Hero } from "@/components/organisms/Hero/Hero";
import CTAWithQuote from "@/components/molecules/cta/CTAWithQuote";
import { useProjectsState } from "./hooks/useProjectsState";
import ProjectsSection from "./components/sections/ProjectsSection";
import TechStackSection from "./components/sections/TechStackSection";
import SuccessCasesSection from "./components/sections/SuccessCasesSection";

/**
 * =========================================================
 * ProjectsClient
 * ---------------------------------------------------------
 * Componente cliente principal de la página Projects.
 *
 * Responsabilidades:
 * - Consumir el hook useProjectsState (fuente única de estado).
 * - Orquestar todas las secciones de la página.
 * - Pasar props necesarias a cada sub-sección.
 *
 * Arquitectura:
 * - Estado centralizado en hook.
 * - Secciones desacopladas.
 * - Composición limpia y declarativa.
 * =========================================================
 */
const ProjectsClient = () => {
  /**
   * Estado global de la página Projects.
   */
  const state = useProjectsState();

  return (
    <>
      {/* HERO */}
      <Hero page={state.page} />

      {/* PROJECTS (filters + list + modal) */}
      <ProjectsSection {...state} />
      
      {/* TECH STACK */}
      <TechStackSection {...state} />

      {/* SUCCESS CASES */}
      <SuccessCasesSection
        summary={state.summary}
        texts={state.texts}
        commons={state.commons}
      />

      {/* CTA FINAL */}
      <CTAWithQuote
        title={state.texts.cta.title}
        valueButton={state.texts.cta.action}
        pathButton="/projects/services"
        lang={state.language}
        page={state.page}
      />
    </>
  );
};

export default ProjectsClient;