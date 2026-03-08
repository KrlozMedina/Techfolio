import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Proyectos',
  description:
    'Proyectos de desarrollo Full Stack, IoT y automatización industrial aplicados a soluciones reales.',
  openGraph: {
    title: 'Proyectos',
    description:
      'Casos de éxito y soluciones tecnológicas desarrolladas por Carlos Medina.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Proyectos - Carlos Medina',
      },
    ],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
