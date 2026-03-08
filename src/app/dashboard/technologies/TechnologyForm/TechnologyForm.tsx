"use client";

import { FC, useEffect, useState } from "react";
import styles from "./TechnologyForm.module.scss";
import {
  useCreateTechnologyMutation,
  // useGetTechnologyForEditQuery,
  // useUpdateTechnologyMutation,
} from "@/infrastructure/technology/technologies.api";
import { ITechnology } from "@/models/technology/technology.interface";
import { ExperienceLevel } from "@/shared/enums/experience-level.enum";

interface TechnologyFormProps {
  id?: string;
  onClose: () => void;
  onSuccess: () => void;
}

type TechnologyFormState = {
  name: string;
  slug: string;
  categoryId: string;
  iconUrl?: string;
  websiteUrl?: string;
  experienceLevel: ExperienceLevel | "";
};

const initialState: TechnologyFormState = {
  name: "",
  slug: "",
  categoryId: "",
  iconUrl: "",
  websiteUrl: "",
  experienceLevel: "",
};

export const TechnologyForm: FC<TechnologyFormProps> = ({
  id,
  onClose,
  onSuccess,
}) => {
  const isEditMode = Boolean(id);

  // const { data } = useGetTechnologyForEditQuery(id!, {
  //   skip: !isEditMode,
  // });

  const [createTechnology] = useCreateTechnologyMutation();
  // const [updateTechnology] = useUpdateTechnologyMutation();

  const [formState, setFormState] =
    useState<TechnologyFormState>(initialState);

  /* ================= LOAD DATA ================= */

  // useEffect(() => {
  //   if (!isEditMode) {
  //     setFormState(initialState);
  //     return;
  //   }

  //   if (!data) return;

  //   setFormState({
  //     name: data.name,
  //     slug: data.slug,
  //     categoryId: data.categoryId.toString(),
  //     iconUrl: data.iconUrl ?? "",
  //     websiteUrl: data.websiteUrl ?? "",
  //     experienceLevel: data.experienceLevel,
  //   });
  // }, [id, data, isEditMode]);

  /* ================= HANDLERS ================= */

  const handleChange = (
    field: keyof TechnologyFormState,
    value: string
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isValid =
    formState.name.trim() &&
    formState.slug.trim() &&
    formState.categoryId &&
    formState.experienceLevel;

  const handleSubmit = async () => {
    if (!isValid) return;

    const payload = {
      ...formState,
    } as ITechnology;

    if (isEditMode) {
      // await updateTechnology({
      //   id: id!,
      //   data: payload,
      // });
    } else {
      await createTechnology(payload);
    }

    onSuccess();
    onClose();
  };

  /* ================= UI ================= */

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {isEditMode ? "Editar Tecnología" : "Crear Tecnología"}
      </h2>

      <div className={styles.field}>
        <label>Nombre</label>
        <input
          value={formState.name}
          onChange={(e) =>
            handleChange("name", e.target.value)
          }
        />
      </div>

      <div className={styles.field}>
        <label>Slug</label>
        <input
          value={formState.slug}
          onChange={(e) =>
            handleChange("slug", e.target.value)
          }
        />
      </div>

      <div className={styles.field}>
        <label>Category ID</label>
        <input
          value={formState.categoryId}
          onChange={(e) =>
            handleChange("categoryId", e.target.value)
          }
        />
      </div>

      <div className={styles.field}>
        <label>Nivel de experiencia</label>
        <select
          value={formState.experienceLevel}
          onChange={(e) =>
            handleChange(
              "experienceLevel",
              e.target.value as ExperienceLevel
            )
          }
        >
          <option value="">Seleccionar nivel</option>
          {Object.values(ExperienceLevel).map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label>Icon URL (opcional)</label>
        <input
          value={formState.iconUrl}
          onChange={(e) =>
            handleChange("iconUrl", e.target.value)
          }
        />
      </div>

      <div className={styles.field}>
        <label>Website URL (opcional)</label>
        <input
          value={formState.websiteUrl}
          onChange={(e) =>
            handleChange("websiteUrl", e.target.value)
          }
        />
      </div>

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
