'use client';

import { ReactNode, useRef } from 'react';
import styles from './Slider.module.scss';
import { Button } from '@/components/atom/Button/Button';
import { Icon } from '@/components/atom/Icon/Icon';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

/**
 * Props del componente Slider
 */
interface SliderProps {
  /** Lista de elementos a renderizar como slides */
  children: ReactNode[];

  /** Etiqueta accesible para el carrusel */
  ariaLabel?: string;
}

/**
 * =========================================================
 * Slider (Carousel Component)
 * ---------------------------------------------------------
 * Componente carrusel horizontal con:
 * - Scroll manual mediante botones
 * - Soporte de teclado (ArrowLeft / ArrowRight)
 * - Scroll suave
 * - Snap scrolling (CSS)
 *
 * Responsabilidades:
 * - Controlar desplazamiento horizontal.
 * - Garantizar accesibilidad básica.
 * - Encapsular estructura de slides.
 *
 * Dependencias:
 * - Button (sistema de diseño)
 * - Icon (abstracción de iconos)
 * =========================================================
 */
export default function Slider({
  children,
  ariaLabel = 'Project carousel',
}: SliderProps) {

  /* ================= REF ================= */

  const sliderRef = useRef<HTMLDivElement>(null);

  /**
   * Cantidad fija de scroll por acción.
   */
  const scrollAmount = 320;

  /* ================= ACTIONS ================= */

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    });
  };

  /**
   * Soporte de navegación por teclado.
   */
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (e.key === 'ArrowRight') scrollRight();
    if (e.key === 'ArrowLeft') scrollLeft();
  };

  /* ================= RENDER ================= */

  return (
    <section
      className={styles.carousel}
      aria-label={ariaLabel}
    >

      {/* Arrow Left */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={scrollLeft}
        aria-label="Previous slide"
        className={`${styles['carousel__arrow']} ${styles['carousel__arrow--left']}`}
      >
        <Icon icon={BiChevronLeft} />
      </Button>

      {/* Track */}
      <div
        ref={sliderRef}
        className={styles['carousel__track']}
        role="region"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className={styles['carousel__slide']}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${children.length}`}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Arrow Right */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={scrollRight}
        aria-label="Next slide"
        className={`${styles['carousel__arrow']} ${styles['carousel__arrow--right']}`}
      >
        <Icon icon={BiChevronRight} />
      </Button>

    </section>
  );
}