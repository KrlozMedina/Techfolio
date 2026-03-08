import styles from "./ProjectArchitecture.module.scss";
import SectionTemplate from "@/components/templates/sectionTemplate/SectionTemplate";
import { useTranslation } from "@/hooks/useTranslation";
import {
  ArchitectureCommunication,
  ArchitectureStyle,
  ArchitectureType,
  DatabaseModel
} from "@/shared/enums";

import { ARCHITECTURE_TYPE_META } from "@/domain/architecture/architecture-type.meta";
import { ARCHITECTURE_STYLE_META } from "@/domain/architecture/architecture-style.meta";
import { DATABASE_MODEL_META } from "@/domain/architecture/database-model.meta";
import { ARCHITECTURE_COMMUNICATION_META } from "@/domain/architecture/architecture-communication.meta";

/**
 * =========================================================
 * Architecture Type
 * ---------------------------------------------------------
 * Representa la estructura arquitectónica de un proyecto.
 * Incluye:
 * - Tipo de arquitectura
 * - Estilo arquitectónico
 * - Modelo de base de datos
 * - Comunicación interna y externa
 * =========================================================
 */
type Architecture = {
  type: ArchitectureType;
  style: ArchitectureStyle;
  databaseModel: DatabaseModel;
  communication: {
    internal: ArchitectureCommunication[];
    external: ArchitectureCommunication[];
  };
};

/**
 * Props del componente ProjectArchitecture
 */
type Props = {
  architecture: Architecture;
};

/**
 * =========================================================
 * ProjectArchitecture Component
 * ---------------------------------------------------------
 * Sección que muestra la arquitectura técnica del proyecto.
 *
 * Funcionalidades:
 * - Presenta información estructural del sistema.
 * - Muestra metadatos visuales (iconos, colores, descripción).
 * - Soporta internacionalización.
 * - Renderiza badges de comunicación interna y externa.
 *
 * La información se obtiene a partir de metadatos definidos
 * en el dominio de arquitectura.
 * =========================================================
 */
const ProjectArchitecture = ({ architecture }: Props) => {

  /**
   * Hook de traducciones
   */
  const { t, language } = useTranslation();

  /**
   * Textos de la sección
   */
  const title = t.projects.details;
  const labels = t.projects.labels;

  /**
   * Metadatos de arquitectura
   */
  const typeMeta = ARCHITECTURE_TYPE_META[architecture.type];
  const styleMeta = ARCHITECTURE_STYLE_META[architecture.style];
  const dbMeta = DATABASE_MODEL_META[architecture.databaseModel];

  /**
   * Validaciones para mostrar comunicación
   */
  const hasInternalCommunication =
    architecture.communication.internal.length > 0;

  const hasExternalCommunication =
    architecture.communication.external.length > 0;

  return (
    <SectionTemplate title={title.architecture}>
      <section className={styles.architecture}>
        <div className={styles.architecture__grid}>

          {/* =================================================
              ARCHITECTURE TYPE
             ================================================= */}
          {typeMeta && (
            <article className={styles.architecture__card}>
              <span className={styles.architecture__category}>
                {labels.type}
              </span>

              <typeMeta.icon
                size={28}
                className={styles.architecture__icon}
                style={{ color: typeMeta.color }}
              />

              <h3 className={styles.architecture__name}>
                {typeMeta[language].labels}
              </h3>

              <p className={styles.architecture__description}>
                {typeMeta[language].description}
              </p>
            </article>
          )}

          {/* =================================================
              ARCHITECTURE STYLE
             ================================================= */}
          {styleMeta && (
            <article className={styles.architecture__card}>
              <span className={styles.architecture__category}>
                {labels.style}
              </span>

              <styleMeta.icon
                size={28}
                className={styles.architecture__icon}
                style={{ color: styleMeta.color }}
              />

              <h3 className={styles.architecture__name}>
                {styleMeta[language].labels}
              </h3>

              <p className={styles.architecture__description}>
                {styleMeta[language].description}
              </p>
            </article>
          )}

          {/* =================================================
              DATABASE MODEL
             ================================================= */}
          {dbMeta && (
            <article className={styles.architecture__card}>
              <span className={styles.architecture__category}>
                {labels.databaseModel}
              </span>

              <dbMeta.icon
                size={28}
                className={styles.architecture__icon}
                style={{ color: dbMeta.color }}
              />

              <h3 className={styles.architecture__name}>
                {dbMeta[language].labels}
              </h3>

              <p className={styles.architecture__description}>
                {dbMeta[language].description}
              </p>
            </article>
          )}

          {/* =================================================
              COMMUNICATION
             ================================================= */}
          {(hasInternalCommunication || hasExternalCommunication) && (
            <article className={styles.architecture__card}>

              <span className={styles.architecture__category}>
                {labels.communication}
              </span>

              <div className={styles.architecture__communication}>

                {/* INTERNAL COMMUNICATION */}
                {hasInternalCommunication && (
                  <div>
                    <h4 className={styles.architecture__name}>
                      {labels.internal}
                    </h4>

                    {architecture.communication.internal.map((c) => {
                      const meta = ARCHITECTURE_COMMUNICATION_META[c];
                      if (!meta) return null;

                      return (
                        <span
                          key={c}
                          className={styles.architecture__badge}
                        >
                          <meta.icon
                            size={24}
                            className={styles.architecture__icon}
                            style={{ color: meta.color }}
                          />
                          {meta[language].labels}
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* EXTERNAL COMMUNICATION */}
                {hasExternalCommunication && (
                  <div>
                    <h4 className={styles.architecture__name}>
                      {labels.external}
                    </h4>

                    {architecture.communication.external.map((c) => {
                      const meta = ARCHITECTURE_COMMUNICATION_META[c];
                      if (!meta) return null;

                      return (
                        <span
                          key={c}
                          className={styles.architecture__badge}
                        >
                          <meta.icon
                            size={16}
                            className={styles.architecture__icon}
                            style={{ color: meta.color }}
                          />
                          {meta[language].labels}
                        </span>
                      );
                    })}
                  </div>
                )}

              </div>
            </article>
          )}

        </div>
      </section>
    </SectionTemplate>
  );
};

export default ProjectArchitecture;