'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './Filter.module.scss';

type Project = {
  title: string;
  description: string;
  category: 'web' | 'mobile' | 'design' | 'data';
  image: string;
};

const projects: Project[] = [
  {
    title: 'Responsive Portfolio Website',
    description: 'A sleek portfolio site built with React and CSS Grid.',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'E-commerce Mobile App',
    description: 'Cross-platform app for shopping with easy UI and cart system.',
    category: 'mobile',
    image: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Brand Identity Design',
    description: 'Logo and branding creation for a startup company.',
    category: 'design',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Data Visualization Dashboard',
    description: 'Interactive charts to analyze sales data using D3.js.',
    category: 'data',
    image: 'https://images.unsplash.com/photo-1517971071642-4f1f32e1cfa4?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Progressive Web App',
    description: 'Offline-capable weather forecast app with service workers.',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Fitness Tracker App',
    description: 'Mobile health app with tracking and social features.',
    category: 'mobile',
    image: 'https://images.unsplash.com/photo-1523475496153-3af250ca5d78?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'UX/UI Revamp',
    description: 'Modern redesign of an existing product UI for better retention.',
    category: 'design',
    image: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Machine Learning Model',
    description: 'Predictive model trained on sales data with Scikit-learn.',
    category: 'data',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
  },
];

export default function ProjectSlider(): React.JSX.Element {
  const [filter, setFilter] = useState<'all' | Project['category']>('all');
  const sliderRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  const scroll = (direction: 'left' | 'right') => {
    const container = sliderRef.current;
    if (!container) return;
    const amount = 280 + 16;
    container.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  // useEffect(() => {
  //   const container = sliderRef.current;
  //   if (!container) return;

  //   // let isDown = false;
  //   // let startX = 0;
  //   // let scrollLeft = 0;

  //   // const onMouseDown = (e: MouseEvent) => {
  //   //   isDown = true;
  //   //   startX = e.pageX - container.offsetLeft;
  //   //   scrollLeft = container.scrollLeft;
  //   // };

  //   // const onMouseMove = (e: MouseEvent) => {
  //   //   if (!isDown) return;
  //   //   const x = e.pageX - container.offsetLeft;
  //   //   const walk = (x - startX) * 2;
  //   //   container.scrollLeft = scrollLeft - walk;
  //   // };

  //   // const onMouseUp = () => {
  //   //   isDown = false;
  //   // };

  //   // container.addEventListener('mousedown', onMouseDown);
  //   // container.addEventListener('mousemove', onMouseMove);
  //   // container.addEventListener('mouseup', onMouseUp);
  //   // container.addEventListener('mouseleave', onMouseUp);

  //   return () => {
  //     // container.removeEventListener('mousedown', onMouseDown);
  //     // container.removeEventListener('mousemove', onMouseMove);
  //     // container.removeEventListener('mouseup', onMouseUp);
  //     // container.removeEventListener('mouseleave', onMouseUp);
  //   };
  // }, []);

  return (
    <>
      <section className={styles.filters} aria-label="Project category filters">
        {['all', 'web', 'mobile', 'design', 'data'].map((cat) => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${filter === cat ? styles.active : ''}`}
            aria-pressed={filter === cat}
            onClick={() => setFilter(cat as 'all' | Project['category'])}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </section>

      <main className={styles.main}>
        <div className={styles.sliderWrapper} aria-label="Project cards slider">
          <button
            className={`${styles.btnSlider} ${styles.left}`}
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            title="Scroll Left"
          >
            &lt;
          </button>

          <div className={styles.sliderContainer} ref={sliderRef} tabIndex={0}>
            <div className={styles.slider}>
              {filteredProjects.length === 0 ? (
                <p style={{ padding: '1rem', color: '#666' }}>No projects found for this filter.</p>
              ) : (
                filteredProjects.map((project, i) => (
                  <div key={i} className={styles.card} tabIndex={0}>
                    <img src={project.image} alt={project.title} loading="lazy" />
                    <div className={styles.cardContent}>
                      <span className={styles.cardCategory}>{project.category}</span>
                      <h2 className={styles.cardTitle}>{project.title}</h2>
                      <p className={styles.cardDescription}>{project.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <button
            className={`${styles.btnSlider} ${styles.right}`}
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            title="Scroll Right"
          >
            &gt;
          </button>
        </div>
      </main>
    </>
  );
}


// 'use client'

// import React, { useState } from 'react';
// import style from './Filter.module.scss';
// import { CATEGORIES, Language, PLATFORMS, TECHNOLOGIES } from '@/shared/constants';

// interface FilterProps {
//   lang: Language;
//   filter: {
//     category: string;
//     platform: string;
//     technology: string;
//   };
//   setFilter: React.Dispatch<React.SetStateAction<any>>;
// }

// const TEXTS = {
//   title: {
//     es: 'Filtros',
//     en: 'Filters'
//   },
//   all: {
//     es: 'Todos',
//     en: 'All'
//   },
//   platform: {
//     es: 'Plataforma',
//     en: 'Platform'
//   },
//   category: {
//     es: 'Categoría',
//     en: 'Category'
//   },
//   technology: {
//     es: 'Tecnología',
//     en: 'Technology'
//   },
//   clean: {
//     es: 'Limpiar',
//     en: 'Clean'
//   },
//   toggle: {
//     es: 'Mostrar/Ocultar filtros',
//     en: 'Show/Hide filters'
//   }
// };

// const Filter: React.FC<FilterProps> = ({ lang, filter, setFilter }) => {
//   const [isCollapsed, setIsCollapsed] = useState(true);

//   const clearFilters = () => {
//     setFilter({ category: "", platform: "", technology: "" });
//   };

//   const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFilter((prev: any) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <form className={style['projects__filter']}>
//       <button
//         type="button"
//         className={style['projects__filter-toggle']}
//         onClick={() => setIsCollapsed(!isCollapsed)}
//       >
//         {TEXTS.toggle[lang]}
//       </button>

//       {!isCollapsed && (
//         <fieldset className={style['projects__filter-fieldset']}>
//           <legend className={style['projects__filter-legend']}>{TEXTS.title[lang]}</legend>
//           <div className={style['projects__filter-controls']}>
//             <label>
//               {TEXTS.platform[lang]}
//               <select name="platform" value={filter.platform} onChange={handleFilterChange}>
//                 <option value="">{TEXTS.all[lang]}</option>
//                 {PLATFORMS.map((platform) => (
//                   <option key={platform.id} value={platform[lang].name}>
//                     {platform[lang].name}
//                   </option>
//                 ))}
//               </select>
//             </label>
//             <label>
//               {TEXTS.category[lang]}
//               <select name="category" value={filter.category} onChange={handleFilterChange}>
//                 <option value="">{TEXTS.all[lang]}</option>
//                 {CATEGORIES.map((category) => (
//                   <option key={category.id} value={category[lang].name}>
//                     {category[lang].name}
//                   </option>
//                 ))}
//               </select>
//             </label>
//             <label>
//               {TEXTS.technology[lang]}
//               <select name="technology" value={filter.technology} onChange={handleFilterChange}>
//                 <option value="">{TEXTS.all[lang]}</option>
//                 {TECHNOLOGIES.map(tech => (
//                   <option key={tech.id} value={tech.name}>{tech.name}</option>
//                 ))}
//               </select>
//             </label>
//           </div>
//           <button
//             type="button"
//             onClick={clearFilters}
//             className={style['projects__filter-clear-button']}
//           >
//             {TEXTS.clean[lang]}
//           </button>
//         </fieldset>
//       )}
//     </form>
//   );
// };

// export default Filter;
