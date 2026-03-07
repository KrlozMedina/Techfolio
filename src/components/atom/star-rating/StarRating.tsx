/**
 * =========================================================
 * Star Component
 * ---------------------------------------------------------
 * Icono SVG que representa una estrella.
 *
 * Props:
 * - filled: determina si la estrella está rellena
 *   (representa una estrella activa en el rating)
 * =========================================================
 */
const Star = ({ filled }: { filled: boolean }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill={filled ? "#f5b50a" : "none"}
    stroke="#f5b50a"
    strokeWidth="2"
  >
    <polygon points="12 2 15 9 22 9 17 14 19 22 12 18 5 22 7 14 2 9 9 9" />
  </svg>
);

/**
 * =========================================================
 * StarRating Component
 * ---------------------------------------------------------
 * Renderiza una escala visual de 5 estrellas basada en
 * un valor numérico recibido.
 *
 * Props:
 * - value: número de estrellas activas (1 a 5).
 *
 * Comportamiento:
 * - Se renderizan siempre 5 estrellas.
 * - Cada estrella se marca como "filled" si su índice
 *   es menor o igual al valor recibido.
 *
 * Ejemplo:
 * value = 3
 * ★ ★ ★ ☆ ☆
 * =========================================================
 */
export default function StarRating({ value }: { value: number }) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} filled={star <= value} />
      ))}
    </div>
  );
}