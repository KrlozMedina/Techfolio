"use client";

import React, { FC, useEffect, useState } from "react";
import styles from "./FeatureForm.module.scss";
import {
  useCreateFeatureMutation,
  useGetFeatureForEditQuery,
  useUpdateFeatureMutation,
} from "@/infrastructure/feature/feature.api";
import { IFeature } from "@/models/features/feature.interface";
import { FeatureDomain } from "@/shared/enums/feature-domain.enum";

interface FeatureFormProps {
  id?: string;
  onClose: () => void;
  onSuccess: () => void;
}

type FeatureFormState = {
  domain: FeatureDomain | "";
  content: {
    es: { title: string; description: string };
    en: { title: string; description: string };
  };
};

const initialState: FeatureFormState = {
  domain: "",
  content: {
    es: { title: "", description: "" },
    en: { title: "", description: "" },
  },
};

export const FeatureForm: FC<FeatureFormProps> = ({
  id,
  onClose,
  onSuccess,
}) => {
  const isEditMode = Boolean(id);

  const { data, refetch } = useGetFeatureForEditQuery(id!, {
    skip: !isEditMode,
  });

  const [createFeature] = useCreateFeatureMutation();
  const [updateFeature] = useUpdateFeatureMutation();

  const [formState, setFormState] =
    useState<FeatureFormState>(initialState);

  /* ================= LOAD DATA WHEN EDITING ================= */

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

  /* ================= HANDLERS ================= */

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

  const handleDomainChange = (value: FeatureDomain) => {
    setFormState((prev) => ({
      ...prev,
      domain: value,
    }));
  };

  const isValid =
    formState.domain &&
    formState.content.es.title.trim() &&
    formState.content.en.title.trim();

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

  /* ================= UI ================= */

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {isEditMode ? "Editar Feature" : "Crear Feature"}
      </h2>

      {/* Domain */}
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

      {(["es", "en"] as const).map((lang) => (
        <div key={lang} className={styles.section}>
          <h3>
            {lang === "es"
              ? "Detalles en Español"
              : "Details in English"}
          </h3>

          <div className={styles.field}>
            <label>{lang === "es" ? "Título" : "Title"}</label>
            <input
              value={formState.content[lang].title}
              onChange={(e) =>
                handleContentChange(lang, "title", e.target.value)
              }
            />
          </div>

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


// "use client";

// import React, { FC, useEffect, useState } from "react";
// import styles from "./FeatureForm.module.scss";
// import {
//   useCreateFeatureMutation,
//   useGetFeatureForEditQuery,
//   useUpdateFeatureMutation,
// } from "@/store/service/featureApi";
// import { IFeature } from "@/models/features/feature.interface";
// import { FeatureDomain } from "@/shared/enums/feature-domain.enum";

// interface FeatureFormProps {
//   featureId?: string;
//   onClose: () => void;
//   onSuccess: () => void;
// }

// type FeatureFormState = {
//   domain: FeatureDomain | "";
//   content: {
//     es: { title: string; description: string };
//     en: { title: string; description: string };
//   };
// };

// const initialState: FeatureFormState = {
//   domain: "",
//   content: {
//     es: { title: "", description: "" },
//     en: { title: "", description: "" },
//   },
// };

// export const FeatureForm: FC<FeatureFormProps> = ({
//   featureId,
//   onClose,
//   onSuccess,
// }) => {
//   const isEditMode = Boolean(featureId);

//   const { data, refetch } = useGetFeatureForEditQuery(featureId!, {
//     skip: !isEditMode,
//   });

//   const [createFeature] = useCreateFeatureMutation();
//   const [updateFeature] = useUpdateFeatureMutation();

//   const [formState, setFormState] = useState<FeatureFormState>(initialState);

//   useEffect(() => {
//     if (!data) return;
//     refetch()

//     setFormState({
//       domain: data.domain,
//       content: data.content,
//     });
//   }, [data]);

//   const handleContentChange = (
//     lang: "es" | "en",
//     field: "title" | "description",
//     value: string
//   ) => {
//     setFormState((prev) => ({
//       ...prev,
//       content: {
//         ...prev.content,
//         [lang]: {
//           ...prev.content[lang],
//           [field]: value,
//         },
//       },
//     }));
//   };

//   const handleDomainChange = (value: FeatureDomain) => {
//     setFormState((prev) => ({
//       ...prev,
//       domain: value,
//     }));
//   };

//   const isValid =
//     formState.domain &&
//     formState.content.es.title &&
//     formState.content.en.title;

//   const handleSubmit = async () => {
//     if (!isValid) return;

//     if (isEditMode) {
//       await updateFeature({
//         id: featureId!,
//         data: formState as IFeature,
//       });
//     } else {
//       await createFeature(formState as IFeature);
//     }

//     onSuccess();
//     onClose();
//   };

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title}>
//         {isEditMode ? "Editar Feature" : "Crear Feature"}
//       </h2>

//       {/* Domain */}
//       <div className={styles.field}>
//         <label>Dominio</label>
//         <select
//           value={formState.domain}
//           onChange={(e) =>
//             handleDomainChange(e.target.value as FeatureDomain)
//           }
//         >
//           <option value="">Seleccionar dominio</option>
//           {Object.values(FeatureDomain).map((domain) => (
//             <option key={domain} value={domain}>
//               {domain}
//             </option>
//           ))}
//         </select>
//       </div>

//       {(["es", "en"] as const).map((lang) => (
//         <div key={lang} className={styles.section}>
//           <h3>
//             {lang === "es"
//               ? "Detalles en Español"
//               : "Details in English"}
//           </h3>

//           <div className={styles.field}>
//             <label>{lang === "es" ? "Título" : "Title"}</label>
//             <input
//               value={formState.content[lang].title}
//               onChange={(e) =>
//                 handleContentChange(lang, "title", e.target.value)
//               }
//             />
//           </div>

//           <div className={styles.field}>
//             <label>
//               {lang === "es" ? "Descripción" : "Description"}
//             </label>
//             <textarea
//               rows={4}
//               value={formState.content[lang].description}
//               onChange={(e) =>
//                 handleContentChange(lang, "description", e.target.value)
//               }
//             />
//           </div>
//         </div>
//       ))}

//       <div className={styles.actions}>
//         <button className={styles.cancel} onClick={onClose}>
//           Cancelar
//         </button>
//         <button
//           className={styles.save}
//           onClick={handleSubmit}
//           disabled={!isValid}
//         >
//           {isEditMode ? "Actualizar" : "Crear"}
//         </button>
//       </div>
//     </div>
//   );
// };


// // "use client";

// // import { IFeature, IFeatureList } from "@/models/features/feature.interface";
// // import { FeatureDomain } from "@/shared/enums/feature-domain.enum";
// // import React, { FC, useEffect, useState } from "react";
// // import styles from "./FeatureForm.module.scss";
// // import { useCreateFeatureMutation, useGetFeatureForEditQuery, useGetFeaturesQuery, useUpdateFeatureMutation } from "@/store/service/featureApi";
// // import { QueryActionCreatorResult } from "@reduxjs/toolkit/query";

// // interface FeatureFormProps {
// //   formData: Partial<IFeatureList>;
// //   setIsOpen: React.Dispatch<boolean>
// //   // refetch: any
// //   refetch: () => ReturnType<
// //   ReturnType<typeof useGetFeaturesQuery>["refetch"]
// // >

// // }

// // export const FeatureForm: FC<FeatureFormProps> = ({
// //   formData,
// //   setIsOpen,
// //   refetch
// // }) => {
// //   const { data } = useGetFeatureForEditQuery(formData.id || "")
// //   const [createFeature] = useCreateFeatureMutation();
// //   const [updateFeature] = useUpdateFeatureMutation();

// //   const [newData, setNewData] = useState({
// //     content: {
// //       es: {
// //         title: "",
// //         description: ""
// //       },
// //       en: {
// //         title: "",
// //         description: ""
// //       },
// //     },
// //     domain: ""
// //   })

// //   useEffect(() => {
// //     if (!formData.id || !data) return

// //     setNewData({
// //       content: {
// //         es: {
// //           title: data?.content.es.title,
// //           description: data?.content.es.description
// //         },
// //         en: {
// //           title: data?.content.en.title,
// //           description: data?.content.en.description
// //         },
// //       },
// //       domain: data?.domain
// //     })
// //   }, [data])


// //   const handleContentChange = (
// //     lang: "es" | "en",
// //     field: "title" | "description",
// //     value: string
// //   ) => {
// //     setNewData((prev) => ({
// //       ...prev,
// //       content: {
// //         es: {
// //           title: prev.content?.es?.title || "",
// //           description: prev.content?.es?.description || "",
// //         },
// //         en: {
// //           title: prev.content?.en?.title || "",
// //           description: prev.content?.en?.description || "",
// //         },
// //         [lang]: {
// //           ...prev.content?.[lang],
// //           [field]: value,
// //         },
// //       },
// //     }));
// //   };

// //   const handleSave = async () => {
// //     console.log(newData)
// //     if (formData.id) {
// //       await updateFeature({
// //         id: formData.id.toString(),
// //         data: newData as IFeature,
// //       });
// //     } else {
// //       await createFeature(newData as IFeature);
// //     }
// //     setIsOpen(false);
// //     refetch()
// //   };

// //   return (
// //     <div className={styles.container}>
// //       <h2 className={styles.title}>Crear Nueva Feature</h2>

// //       {/* Domain */}
// //       <div className={styles.field}>
// //         <label>Dominio</label>
// //         <select
// //           value={newData.domain || ""}
// //           onChange={(e) =>
// //             setNewData((prev) => ({
// //               ...prev,
// //               domain: e.target.value as FeatureDomain,
// //             }))
// //           }
// //         >
// //           <option value="">Seleccionar dominio</option>
// //           {Object.values(FeatureDomain).map((domain) => (
// //             <option key={domain} value={domain}>
// //               {domain}
// //             </option>
// //           ))}
// //         </select>
// //       </div>

// //       {/* Español */}
// //       <div className={styles.section}>
// //         <h3>Detalles en Español</h3>

// //         <div className={styles.field}>
// //           <label>Título</label>
// //           <input
// //             value={newData?.content?.es?.title || ""}
// //             onChange={(e) =>
// //               handleContentChange("es", "title", e.target.value)
// //             }
// //           />
// //         </div>

// //         <div className={styles.field}>
// //           <label>Descripción</label>
// //           <textarea
// //             rows={4}
// //             value={newData?.content?.es?.description || ""}
// //             onChange={(e) =>
// //               handleContentChange("es", "description", e.target.value)
// //             }
// //           />
// //         </div>
// //       </div>

// //       {/* English */}
// //       <div className={styles.section}>
// //         <h3>Details in English</h3>

// //         <div className={styles.field}>
// //           <label>Title</label>
// //           <input
// //             value={newData?.content?.en?.title || ""}
// //             onChange={(e) =>
// //               handleContentChange("en", "title", e.target.value)
// //             }
// //           />
// //         </div>

// //         <div className={styles.field}>
// //           <label>Description</label>
// //           <textarea
// //             rows={4}
// //             value={newData?.content?.en?.description || ""}
// //             onChange={(e) =>
// //               handleContentChange("en", "description", e.target.value)
// //             }
// //           />
// //         </div>
// //       </div>

// //       {/* Actions */}
// //       <div className={styles.actions}>
// //         <button className={styles.cancel} onClick={() => setIsOpen(false)}>
// //           Cancelar
// //         </button>
// //         <button className={styles.save} onClick={handleSave}>
// //           Crear Feature
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };
