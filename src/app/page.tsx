import { Metadata } from 'next';
import HomeClient from './HomeClient';

/**
 * Metadata estática de la página.
 * - canonical: evita contenido duplicado y mejora SEO.
 */
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://krlozmedina.dev',
  },
};

/**
 * Componente de página (Server Component por defecto).
 * Delegará la lógica y UI interactiva a HomeClient.
 */
export const Page = () => {
  return <HomeClient />;
};

export default Page;
