"use client";

import React, { FC, useEffect, useState } from "react";
import styles from "./FeatureForm.module.scss";
import {
  useCreateFeatureMutation,
  useGetFeatureForEditQuery,
  useUpdateFeatureMutation,
} from "@/infrastructure/feature/feature.api";
import { IFeature } from "@/models/feature/feature.interface";
import { FeatureDomain } from "@/shared/enums/feature-domain.enum";

/**
 * Props del formulario de Feature.
 */
interface FeatureFormProps {

  /** ID de la feature a editar (opcional) */
  id?: string;

  /** Callback para cerrar el formulario */
  onClose: () => void;

  /** Callback ejecutado cuando la operación es exitosa */
  onSuccess: () => void;
}

/**
 * Estado interno del formulario.
 */
type FeatureFormState = {

  /** Dominio funcional de la feature */
  domain: FeatureDomain | "";

  /** Contenido localizado */
  content: {
    es: { title: string; description: string };
    en: { title: string; description: string };
  };
};

/**
 * Estado inicial del formulario.
 */
const initialState: FeatureFormState = {
  domain: "",
  content: {
    es: { title: "", description: "" },
    en: { title: "", description: "" },
  },
};

/**
 * =========================================================
 * FeatureForm
 * ---------------------------------------------------------
 * Componente de formulario utilizado para:
 *
 * - Crear nuevas features
 * - Editar features existentes
 *
 * Funcionalidades principales:
 *
 * - Carga datos cuando se edita una feature
 * - Maneja estado de formulario multilenguaje
 * - Permite seleccionar dominio funcional
 * - Ejecuta mutaciones RTK Query
 *
 * El formulario soporta contenido en:
 * - Español (es)
 * - Inglés (en)
 * =========================================================
 */
export const FeatureForm: FC<FeatureFormProps> = ({
  id,
  onClose,
  onSuccess,
}) => {

  /**
   * Determina si el formulario está en modo edición.
   */
  const isEditMode = Boolean(id);

  /**
   * Query utilizada para obtener los datos
   * de una feature existente cuando se edita.
   */
  const { data, refetch } = useGetFeatureForEditQuery(id!, {
    skip: !isEditMode,
  });

  /**
   * Mutaciones para crear o actualizar features.
   */
  const [createFeature] = useCreateFeatureMutation();
  const [updateFeature] = useUpdateFeatureMutation();

  /**
   * Estado del formulario.
   */
  const [formState, setFormState] =
    useState<FeatureFormState>(initialState);

  /* ======================================================
     LOAD DATA WHEN EDITING
  ====================================================== */

  /**
   * Cuando el formulario está en modo edición,
   * se cargan los datos de la feature seleccionada.
   */
  useEffect(() => {
    if (!isEditMode) {
      setFormState(initialState);
      return;
    }

    if (!data) return;
    refetch();

    setFormState({
      domain: data.domain,
      content: data.content,
    });
  }, [id, data, isEditMode]);

  /* ======================================================
     HANDLERS
  ====================================================== */

  /**
   * Maneja cambios en los campos de contenido
   * según idioma y campo.
   */
  const handleContentChange = (
    lang: "es" | "en",
    field: "title" | "description",
    value: string
  ) => {
    setFormState((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [lang]: {
          ...prev.content[lang],
          [field]: value,
        },
      },
    }));
  };

  /**
   * Maneja cambios en el dominio de la feature.
   */
  const handleDomainChange = (value: FeatureDomain) => {
    setFormState((prev) => ({
      ...prev,
      domain: value,
    }));
  };

  /**
   * Valida que el formulario tenga los datos mínimos
   * requeridos para ser enviado.
   */
  const isValid =
    formState.domain &&
    formState.content.es.title.trim() &&
    formState.content.en.title.trim();

  /**
   * Envía el formulario.
   *
   * - Si está en modo edición → actualiza
   * - Si no → crea una nueva feature
   */
  const handleSubmit = async () => {
    if (!isValid) return;

    if (isEditMode) {
      await updateFeature({
        id: id!,
        data: formState as IFeature,
      });
    } else {
      await createFeature(formState as IFeature);
    }

    onSuccess();
    onClose();
  };

  /* ======================================================
     UI
  ====================================================== */

  return (
    <div className={styles.container}>

      {/* Título del formulario */}
      <h2 className={styles.title}>
        {isEditMode ? "Editar Feature" : "Crear Feature"}
      </h2>

      {/* Selección de dominio */}
      <div className={styles.field}>
        <label>Dominio</label>
        <select
          value={formState.domain}
          onChange={(e) =>
            handleDomainChange(e.target.value as FeatureDomain)
          }
        >
          <option value="">Seleccionar dominio</option>

          {Object.values(FeatureDomain).map((domain) => (
            <option key={domain} value={domain}>
              {domain}
            </option>
          ))}
        </select>
      </div>

      {/* Campos de contenido por idioma */}
      {(["es", "en"] as const).map((lang) => (
        <div key={lang} className={styles.section}>

          <h3>
            {lang === "es"
              ? "Detalles en Español"
              : "Details in English"}
          </h3>

          {/* Campo título */}
          <div className={styles.field}>
            <label>{lang === "es" ? "Título" : "Title"}</label>
            <input
              value={formState.content[lang].title}
              onChange={(e) =>
                handleContentChange(lang, "title", e.target.value)
              }
            />
          </div>

          {/* Campo descripción */}
          <div className={styles.field}>
            <label>
              {lang === "es" ? "Descripción" : "Description"}
            </label>
            <textarea
              rows={4}
              value={formState.content[lang].description}
              onChange={(e) =>
                handleContentChange(
                  lang,
                  "description",
                  e.target.value
                )
              }
            />
          </div>
        </div>
      ))}

      {/* Acciones del formulario */}
      <div className={styles.actions}>
        <button className={styles.cancel} onClick={onClose}>
          Cancelar
        </button>

        <button
          className={styles.save}
          onClick={handleSubmit}
          disabled={!isValid}
        >
          {isEditMode ? "Actualizar" : "Crear"}
        </button>
      </div>
    </div>
  );
};