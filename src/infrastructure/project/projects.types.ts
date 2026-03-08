import { ProjectListDTO } from "@/infrastructure/project/project.list.dto";
import { ExperienceLevel, Page, Platform } from "@/shared/enums";

/* =========================================================
  TEXT STRUCTURES
  ---------------------------------------------------------
  Tipos utilizados para representar textos dinámicos
  provenientes de i18n o configuración externa.
  ========================================================= */

interface Texts {
  projects: {
    title: string;
    intro: string;
    filters: {
      features: {
        title: string;
        all: string;
      };
      platform: {
        title: string;
        all: string;
      };
      technologies: {
        title: string;
        all: string;
      };
    }
  };
  stack: {
    title: string;
    intro: string;
  };
  labels: {
    project: string;
  };
  successCases: {
    title: string;
    intro: string;
  };
}

/* =========================================================
  SUMMARY STRUCTURE
  ---------------------------------------------------------
  Datos agregados utilizados para filtros, conteos
  y secciones derivadas (stack, outcomes, etc.).
  ========================================================= */

interface Summary {
  filters: {
    features: {
      slug: string;
      name: string;
    }[];
    platform: {
      platform: Platform;
    }[];
    categories: {
      name: string;
    }[];
    outcome: {
      slug: string;
      title: string;
      solution: string;
      media: {
        cover: {
          src: string;
        };
      };
    }[];
  }
}

/* =========================================================
  FILTER STATE
  ---------------------------------------------------------
  Representa el estado actual de filtros activos.
  ========================================================= */

interface Filters {
  feature: string;
  platform: string;
  technology: string;
  page: number;
}

interface SetFilters
  extends React.Dispatch<React.SetStateAction<Filters>> {}

/* =========================================================
  COMMONS
  ---------------------------------------------------------
  Textos y enums compartidos entre secciones.
  ========================================================= */

interface Commons {
  actions: {
    reset: string;
    seeMore: string;
  };
  enums: {
    platforms: {
      [key in Platform]: string;
    }
  }
}

/* =========================================================
  PAGINATION RESPONSE
  ---------------------------------------------------------
  Contrato de respuesta paginada para proyectos.
  ========================================================= */

export interface ProjectsPagination {
  data: ProjectListDTO[];
  pagination: {
    total: number;
    limit: number;
    currentPage: number;
    totalPages: number;
  }
}

/* =========================================================
  TECH STACK STRUCTURE
  ========================================================= */

export interface ITechStack {
  count: number;
  experience: string;
  icon: string;
  name: string;
  category: string;
}

/* =========================================================
  SECTION PROPS COMPOSITION
  ---------------------------------------------------------
  Composición tipada para evitar duplicación
  en componentes grandes.
  ========================================================= */

export type ProjectsSectionProps =
  ProjectsFiltersProps &
  ProjectsListProps &
  ProjectModalProps & {
    page: Page;
  };

export type ProjectsFiltersProps = {
  summary: Summary;
  filters: Filters;
  setFilters: SetFilters;
  hasActiveFilters: boolean;
  setHasActiveFilters: React.Dispatch<React.SetStateAction<boolean>>;
  texts: Texts;
  commons: Commons;
};

export type ProjectsListProps = {
  projects: ProjectsPagination | undefined;
  isLoading: boolean;
  isError: boolean;
  setSelectedProject: React.Dispatch<ProjectListDTO | null>;
};

export type ProjectModalProps = {
  selectedProject: ProjectListDTO | null;
  setSelectedProject: React.Dispatch<ProjectListDTO | null>;
};

export type TechStackSectionProps = {
  texts: Texts;
  summary: Summary;
  filterTech: { category: string };
  setFilterTech: React.Dispatch<
    React.SetStateAction<{ category: string }>
  >;
  filteredTechnologies: (ITechStack & {
    count: number;
    slug: string;
    experience: ExperienceLevel;
  })[];
  setFilters: React.Dispatch<
    React.SetStateAction<{
      platform: string;
      technology: string;
      feature: string;
      page: number;
    }>
  >;
  setHasActiveFilters: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SuccessCasesSectionProps = {
  summary: Summary;
  texts: Texts;
  commons: Commons;
};