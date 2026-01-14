/**
 * Representa la estructura base de una categoría.
 * Usada para tipado del schema y contratos internos.
 */
export interface ICategory {
  _id: string;        // Identificador MongoDB
  slug: string;       // Slug único para URLs

  es: {
    title: string;
    description: string;
  };

  en: {
    title: string;
    description: string;
  };
}
