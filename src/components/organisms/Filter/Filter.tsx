'use client';

/**
 * =========================================================
 * ProjectSlider Component
 * ---------------------------------------------------------
 * Componente interactivo que permite visualizar proyectos
 * en formato de carrusel horizontal con filtrado por
 * categoría.
 *
 * Características principales:
 * - Filtro dinámico por categorías de proyectos
 * - Carrusel horizontal con scroll controlado
 * - Navegación mediante botones izquierda/derecha
 * - Accesibilidad básica mediante atributos ARIA
 * - Lazy loading de imágenes
 *
 * Arquitectura:
 * - React + TypeScript
 * - Next.js Client Component
 * - SCSS Modules para estilos encapsulados
 *
 * Responsabilidades:
 * - Mostrar lista de proyectos en formato slider
 * - Filtrar proyectos por categoría seleccionada
 * - Permitir desplazamiento horizontal del carrusel
 * - Mantener experiencia accesible para usuarios
 *
 * Utilizado en:
 * - página de proyectos del portafolio
 * - secciones de showcase de trabajos
 * =========================================================
 */

import React, { useRef, useState } from 'react';
import styles from './Filter.module.scss';

/**
 * =========================================================
 * Project Type
 * ---------------------------------------------------------
 * Define la estructura de datos de cada proyecto mostrado
 * dentro del slider.
 *
 * @property title - Título del proyecto.
 * @property description - Descripción breve del proyecto.
 * @property category - Categoría del proyecto utilizada
 *                      para el filtrado.
 * @property image - URL de la imagen representativa.
 * =========================================================
 */
type Project = {
  title: string;
  description: string;
  category: 'web' | 'mobile' | 'design' | 'data';
  image: string;
};

/**
 * =========================================================
 * Projects Data
 * ---------------------------------------------------------
 * Conjunto de datos de ejemplo utilizados para renderizar
 * las tarjetas del slider.
 *
 * En una implementación real estos datos podrían provenir de:
 * - API
 * - CMS
 * - Base de datos
 * =========================================================
 */
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

/**
 * =========================================================
 * ProjectSlider Component
 * ---------------------------------------------------------
 * Componente principal que renderiza:
 * - filtros por categoría
 * - carrusel de tarjetas de proyectos
 * - controles de desplazamiento horizontal
 *
 * @returns JSX.Element
 * =========================================================
 */
export default function ProjectSlider(): React.JSX.Element {

  /**
   * Estado que controla el filtro activo.
   *
   * 'all' muestra todos los proyectos.
   */
  const [filter, setFilter] = useState<'all' | Project['category']>('all');

  /**
   * Referencia al contenedor del slider para
   * controlar el scroll programáticamente.
   */
  const sliderRef = useRef<HTMLDivElement>(null);

  /**
   * ======================================================
   * filteredProjects
   * ------------------------------------------------------
   * Lista de proyectos filtrada según la categoría
   * seleccionada.
   * ======================================================
   */
  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  /**
   * ======================================================
   * scroll
   * ------------------------------------------------------
   * Función encargada de desplazar horizontalmente
   * el contenedor del slider.
   *
   * @param direction - Dirección del desplazamiento
   *                    ('left' o 'right').
   *
   * El desplazamiento se calcula basado en el ancho
   * aproximado de cada tarjeta más el espacio entre ellas.
   * ======================================================
   */
  const scroll = (direction: 'left' | 'right') => {
    const container = sliderRef.current;

    if (!container) return;

    /**
     * Cantidad de desplazamiento horizontal.
     * 280px -> ancho aproximado de tarjeta
     * 16px  -> gap entre tarjetas
     */
    const amount = 280 + 16;

    container.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <>

      {/* ====================================================
          FILTER SECTION
          ----------------------------------------------------
          Controles para filtrar proyectos por categoría.
          ==================================================== */}
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


      {/* ====================================================
          MAIN CONTENT
          ----------------------------------------------------
          Contiene el carrusel de proyectos.
          ==================================================== */}
      <main className={styles.main}>

        <div className={styles.sliderWrapper} aria-label="Project cards slider">

          {/* Botón para desplazamiento hacia la izquierda */}
          <button
            className={`${styles.btnSlider} ${styles.left}`}
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            title="Scroll Left"
          >
            &lt;
          </button>


          {/* Contenedor scrollable del slider */}
          <div
            className={styles.sliderContainer}
            ref={sliderRef}
            tabIndex={0}
          >

            <div className={styles.slider}>

              {/* Estado cuando no hay resultados */}
              {filteredProjects.length === 0 ? (

                <p style={{ padding: '1rem', color: '#666' }}>
                  No projects found for this filter.
                </p>

              ) : (

                /**
                 * Renderizado de tarjetas de proyecto
                 */
                filteredProjects.map((project, i) => (

                  <div key={i} className={styles.card} tabIndex={0}>

                    {/* Imagen del proyecto */}
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                    />

                    {/* Contenido textual de la tarjeta */}
                    <div className={styles.cardContent}>

                      <span className={styles.cardCategory}>
                        {project.category}
                      </span>

                      <h2 className={styles.cardTitle}>
                        {project.title}
                      </h2>

                      <p className={styles.cardDescription}>
                        {project.description}
                      </p>

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>


          {/* Botón para desplazamiento hacia la derecha */}
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