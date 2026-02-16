/**
 * DTO que representa la estructura expuesta al cliente
 * para una categoría.
 * 
 * Contiene información localizada en:
 * - Español (es)
 * - Inglés (en)
 */
export interface CategoryEntityDTO {
  content: {
    es: {
      title: string;
      description: string;
    };
    en: {
      title: string;
      description: string;
    };
  };
}
