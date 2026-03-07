'use client';

import { CrudLayout } from '@/components/templates/CrudLayout/CrudLayout';
import {
  useGetFeaturesQuery,
  useDeleteFeatureMutation,
} from '@/infrastructure/feature/feature.api';
import { IFeatureList } from '@/models/features/feature.interface';
import { FeatureForm } from './FeatureForm/FeatureForm';
import styles from './page.module.scss';
import { FeatureDomain } from '@/shared/enums/feature-domain.enum';

export default function FeaturesPage() {
  return (
    <CrudLayout<IFeatureList>
      title="Features"
      useQueryHook={useGetFeaturesQuery}
      useDeleteHook={useDeleteFeatureMutation}
      FormComponent={FeatureForm}
      renderCard={(feature, onEdit, onDelete) => (
        <div className={styles.card}>
          <span className={styles.badge}>{feature.domain}</span>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>

          <div className={styles.actions}>
            <button onClick={() => onEdit(feature)}>
              ✏️ Editar
            </button>
            <button
              className={styles.delete}
              onClick={() => onDelete(feature._id.toString())}
            >
              🗑 Eliminar
            </button>
          </div>
        </div>
      )}
      renderFilters={(setExtraParams, extraParams) => (
        <>
          <button
            className={!extraParams.domain ? 'active' : ''}
            onClick={() => setExtraParams({ domain: undefined })}
          >
            Todos
          </button>

          {Object.values(FeatureDomain).map((domain) => (
            <button
              key={domain}
              className={
                extraParams.domain === domain ? 'active' : ''
              }
              onClick={() => setExtraParams({ domain })}
            >
              {domain}
            </button>
          ))}
        </>
      )}
    />
  );
}


// 'use client';

// import { useState } from "react";
// import Modal from "@/components/organisms/Modal/Modal";
// import { useTranslation } from "@/hooks/useTranslation";
// import { IFeatureList } from "@/models/features/feature.interface";
// import { FeatureDomain } from "@/shared/enums/feature-domain.enum";
// import {
//   useDeleteFeatureMutation,
//   useGetFeaturesQuery,
// } from "@/store/service/featureApi";
// import { FeatureForm } from "./FeatureForm/FeatureForm";
// import styles from "./page.module.scss";

// type DomainFilter = FeatureDomain | null;

// export default function FeaturesPage() {
//   const { language } = useTranslation();

//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedDomain, setSelectedDomain] = useState<DomainFilter>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedFeatureId, setSelectedFeatureId] = useState<string | null>(null);

//   const { data, isLoading, error, refetch } = useGetFeaturesQuery({
//     language,
//     limit: 8,
//     page: currentPage,
//     search: searchQuery,
//     domain: selectedDomain ?? undefined,
//   });

//   const [deleteFeature] = useDeleteFeatureMutation();

//   const features = data?.data ?? [];
//   const pagination = data?.pagination;

//   // --------------------
//   // Handlers
//   // --------------------

//   const handleCreate = () => {
//     setSelectedFeatureId(null);
//     setIsModalOpen(true);
//   };

//   const handleEdit = (feature: IFeatureList) => {
//     if (!feature.id) return;
//     setSelectedFeatureId(feature.id);
//     setIsModalOpen(true);
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("¿Eliminar feature?")) return;

//     await deleteFeature(id);
//     refetch();
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setSelectedFeatureId(null);
//   };

//   if (isLoading) return <p className={styles.loading}>Cargando...</p>;
//   if (error) return <p className={styles.error}>Error al cargar features</p>;

//   return (
//     <div className={styles.container}>
//       {/* Header */}
//       <div className={styles.header}>
//         <h1>Features</h1>
//         <button className={styles.createBtn} onClick={handleCreate}>
//           + Crear Feature
//         </button>
//       </div>

//       {/* Filters */}
//       <div className={styles.filters}>
//         <input
//           placeholder="Buscar feature..."
//           value={searchQuery}
//           onChange={(e) => {
//             setCurrentPage(1);
//             setSearchQuery(e.target.value);
//           }}
//         />

//         <div className={styles.domainFilters}>
//           <button
//             className={!selectedDomain ? styles.active : ""}
//             onClick={() => {
//               setCurrentPage(1);
//               setSelectedDomain(null);
//             }}
//           >
//             Todos
//           </button>

//           {Object.values(FeatureDomain).map((domain) => (
//             <button
//               key={domain}
//               className={selectedDomain === domain ? styles.active : ""}
//               onClick={() => {
//                 setCurrentPage(1);
//                 setSelectedDomain(domain);
//               }}
//             >
//               {domain}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Cards */}
//       <div className={styles.grid}>
//         {features.map((feature) => (
//           <div key={feature.id} className={styles.card}>
//             <span className={styles.badge}>{feature.domain}</span>

//             <h3>{feature.title}</h3>
//             <p>{feature.description}</p>

//             <div className={styles.actions}>
//               <button onClick={() => handleEdit(feature)}>
//                 ✏️ Editar
//               </button>
//               <button
//                 className={styles.delete}
//                 onClick={() => handleDelete(feature.id)}
//               >
//                 🗑 Eliminar
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className={styles.pagination}>
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage((prev) => prev - 1)}
//         >
//           ← Anterior
//         </button>

//         <span>
//           Página {currentPage} de {pagination?.totalPages ?? 1}
//         </span>

//         <button
//           disabled={currentPage === pagination?.totalPages}
//           onClick={() => setCurrentPage((prev) => prev + 1)}
//         >
//           Siguiente →
//         </button>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <Modal
//           title={selectedFeatureId ? "Editar Feature" : "Crear Feature"}
//           onClose={handleModalClose}
//         >
//           <FeatureForm
//             featureId={selectedFeatureId ?? undefined}
//             onClose={handleModalClose}
//             onSuccess={refetch}
//           />
//         </Modal>
//       )}
//     </div>
//   );
// }


// // 'use client'

// // import { useState } from "react";
// // import Modal from "@/components/organisms/Modal/Modal";
// // import { useTranslation } from "@/hooks/useTranslation";
// // import { IFeature, IFeatureList } from "@/models/features/feature.interface";
// // import { FeatureDomain } from "@/shared/enums/feature-domain.enum";
// // import {
// //   useDeleteFeatureMutation,
// //   useGetFeaturesQuery,
// // } from "@/store/service/featureApi";
// // import { FeatureForm } from "./FeatureForm/FeatureForm";
// // import styles from "./page.module.scss";

// // type DomainFilter = FeatureDomain | null;

// // export default function FeaturesPage() {
// //   const { language } = useTranslation();

// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [selectedDomain, setSelectedDomain] = useState<DomainFilter>(null);

// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [selectedFeature, setSelectedFeature] = useState<Partial<IFeature> | null>(null);

// //   const { data, isLoading, error, refetch } = useGetFeaturesQuery({
// //     language,
// //     limit: 8,
// //     page: currentPage,
// //     search: searchQuery,
// //     domain: selectedDomain ?? undefined,
// //   });

// //   const [deleteFeature] = useDeleteFeatureMutation();

// //   const features = data?.data ?? [];
// //   const pagination = data?.pagination;

// //   // --------------------
// //   // Handlers
// //   // --------------------

// //   const handleCreate = () => {
// //     setSelectedFeature({
// //       domain: FeatureDomain.ARCHITECTURE,
// //       content: {
// //         es: { title: "", description: "" },
// //         en: { title: "", description: "" },
// //       },
// //     });
// //     setIsModalOpen(true);
// //   };

// //   const handleEdit = (feature: IFeatureList) => {
// //     if (!feature.id) return;
// //     setSelectedFeature(feature);
// //     setIsModalOpen(true);
// //   };

// //   const handleDelete = async (id: string) => {
// //     if (!confirm("¿Eliminar feature?")) return;

// //     await deleteFeature(id);
// //     refetch();
// //   };

// //   if (isLoading) return <p className={styles.loading}>Cargando...</p>;
// //   if (error) return <p className={styles.error}>Error al cargar features</p>;

// //   return (
// //     <div className={styles.container}>
// //       <div className={styles.header}>
// //         <h1>Features</h1>
// //         <button className={styles.createBtn} onClick={handleCreate}>
// //           + Crear Feature
// //         </button>
// //       </div>

// //       {/* Filters */}
// //       <div className={styles.filters}>
// //         <input
// //           placeholder="Buscar feature..."
// //           value={searchQuery}
// //           onChange={(e) => {
// //             setCurrentPage(1);
// //             setSearchQuery(e.target.value);
// //           }}
// //         />

// //         <div className={styles.domainFilters}>
// //           <button
// //             className={!selectedDomain ? styles.active : ""}
// //             onClick={() => setSelectedDomain(null)}
// //           >
// //             Todos
// //           </button>

// //           {Object.values(FeatureDomain).map((domain) => (
// //             <button
// //               key={domain}
// //               className={selectedDomain === domain ? styles.active : ""}
// //               onClick={() => {
// //                 setCurrentPage(1);
// //                 setSelectedDomain(domain);
// //               }}
// //             >
// //               {domain}
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Cards */}
// //       <div className={styles.grid}>
// //         {features.map((feature) => (
// //           <div key={feature.id} className={styles.card}>
// //             <span className={styles.badge}>{feature.domain}</span>

// //             <h3>{feature.title}</h3>
// //             <p>{feature.description}</p>

// //             <div className={styles.actions}>
// //               <button onClick={() => handleEdit(feature)}>
// //                 ✏️ Editar
// //               </button>
// //               <button
// //                 className={styles.delete}
// //                 onClick={() => handleDelete(feature.id)}
// //               >
// //                 🗑 Eliminar
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Pagination */}
// //       <div className={styles.pagination}>
// //         <button
// //           disabled={currentPage === 1}
// //           onClick={() => setCurrentPage((prev) => prev - 1)}
// //         >
// //           ← Anterior
// //         </button>

// //         <span>
// //           Página {currentPage} de {pagination?.totalPages ?? 1}
// //         </span>

// //         <button
// //           disabled={currentPage === pagination?.totalPages}
// //           onClick={() => setCurrentPage((prev) => prev + 1)}
// //         >
// //           Siguiente →
// //         </button>
// //       </div>

// //       {isModalOpen && selectedFeature && (
// //         <Modal
// //           title={selectedFeature.id ? "Editar Feature" : "Crear Feature"}
// //           onClose={() => setIsModalOpen(false)}
// //         >
// //           <FeatureForm
// //             formData={selectedFeature}
// //             setIsOpen={setIsModalOpen}
// //             refetch={refetch}
// //           />
// //         </Modal>
// //       )}
// //     </div>
// //   );
// // }


// // // 'use client'

// // // import Modal from "@/components/organisms/Modal/Modal";
// // // import { useTranslation } from "@/hooks/useTranslation";
// // // import { IFeature, IFeatureList } from "@/models/features/feature.interface";
// // // import { FeatureDomain } from "@/shared/enums/feature-domain.enum";
// // // import {
// // //   useDeleteFeatureMutation,
// // //   useGetFeaturesQuery,
// // // } from "@/store/service/featureApi";
// // // import { useState } from "react";
// // // import { FeatureForm } from "./FeatureForm/FeatureForm";
// // // import styles from "./page.module.scss";

// // // export default function FeaturesPage() {
// // //   const { language } = useTranslation();

// // //   const [page, setPage] = useState(1);
// // //   const [search, setSearch] = useState("");
// // //   const [domainFilter, setDomainFilter] = useState<FeatureDomain | "ALL">("ALL");

// // //   const { data, isLoading, error, refetch } = useGetFeaturesQuery({
// // //     language,
// // //     limit: 8,
// // //     page,
// // //     search,
// // //     domain: domainFilter === "ALL" ? undefined : domainFilter,
// // //   });

// // //   const [deleteFeature] = useDeleteFeatureMutation();
// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const [editingFeature, setEditingFeature] = useState<Partial<IFeature> | null>(null);
// // //   const [formData, setFormData] = useState<Partial<IFeature>>({});
// // //   const features = data?.data ?? [];
// // //   const pagination = data?.pagination;

// // //   const openCreateModal = () => {
// // //     setEditingFeature(null);
// // //     setFormData({
// // //       domain: FeatureDomain.ARCHITECTURE,
// // //       content: {
// // //         es: { title: "", description: "" },
// // //         en: { title: "", description: "" },
// // //       },
// // //     });
// // //     setIsOpen(true);
// // //   };

// // //   const openEditModal = (feature: Partial<IFeatureList>) => {
// // //     console.log(feature.id)

// // //     if (feature.id) {
// // //       setEditingFeature(feature);
// // //       setFormData(feature);
// // //       setIsOpen(true);
// // //     }
// // //   };

// // //   const handleDelete = async (id: string) => {
// // //     if (!confirm("¿Eliminar feature?")) return;
// // //     refetch()
// // //     await deleteFeature(id);
// // //   };

// // //   if (isLoading) return <p className={styles.loading}>Cargando...</p>;

// // //   return (
// // //     <div className={styles.container}>
// // //       {/* Header */}
// // //       <div className={styles.header}>
// // //         <h1>Features</h1>
// // //         <button className={styles.createBtn} onClick={openCreateModal}>
// // //           + Crear Feature
// // //         </button>
// // //       </div>

// // //       {/* Filters */}
// // //       <div className={styles.filters}>
// // //         <input
// // //           placeholder="Buscar feature..."
// // //           value={search}
// // //           onChange={(e) => setSearch(e.target.value)}
// // //         />

// // //         <div className={styles.domainFilters}>
// // //           <button
// // //             className={domainFilter === "ALL" ? styles.active : ""}
// // //             onClick={() => setDomainFilter("ALL")}
// // //           >
// // //             Todos
// // //           </button>

// // //           {Object.values(FeatureDomain).map((domain) => (
// // //             <button
// // //               key={domain}
// // //               className={domainFilter === domain ? styles.active : ""}
// // //               onClick={() => setDomainFilter(domain)}
// // //             >
// // //               {domain}
// // //             </button>
// // //           ))}
// // //         </div>
// // //       </div>

// // //       {/* Cards */}
// // //       <div className={styles.grid}>
// // //         {features.map((feature) => (
// // //           <div key={feature.id.toString()} className={styles.card}>
// // //             <span className={styles.badge}>{feature.domain}</span>

// // //             <h3>
// // //               {language === "es"
// // //                 ? feature.title
// // //                 : feature.title}
// // //             </h3>

// // //             <p>{feature.description}</p>

// // //             <div className={styles.actions}>
// // //               <button onClick={() => openEditModal(feature)}>
// // //                 ✏️ Editar
// // //               </button>
// // //               <button
// // //                 className={styles.delete}
// // //                 onClick={() => handleDelete(feature.id.toString())}
// // //               >
// // //                 🗑 Eliminar
// // //               </button>
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       {/* Pagination */}
// // //       <div className={styles.pagination}>
// // //         <button
// // //           disabled={page === 1}
// // //           onClick={() => setPage((prev) => prev - 1)}
// // //         >
// // //           ← Anterior
// // //         </button>

// // //         <span>
// // //           Página {page} de {pagination?.totalPages}
// // //         </span>

// // //         <button
// // //           disabled={page === pagination?.totalPages}
// // //           onClick={() => setPage((prev) => prev + 1)}
// // //         >
// // //           Siguiente →
// // //         </button>
// // //       </div>

// // //       {isOpen && (
// // //         <Modal
// // //           title={editingFeature ? "Editar Feature" : "Crear Feature"}
// // //           onClose={() => setIsOpen(false)}
// // //         >
// // //           <FeatureForm
// // //             formData={formData}
// // //             setIsOpen={setIsOpen}
// // //             refetch={refetch}
// // //           />
// // //         </Modal>
// // //       )}
// // //     </div>
// // //   );
// // // }
