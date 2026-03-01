import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Providers } from '@/providers/provider';
import { LanguageContextProvider } from '@/context/LanguageContext';
import './globals.scss';

/* ==================================================
   📦 LOCAL FONTS (Optimized with next/font)
   --------------------------------------------------
   - Carga fuentes locales como variables CSS
   - Evita FOUT
   - Permite control tipográfico global
================================================== */

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

/* ==================================================
   📈 GLOBAL METADATA (SEO + Social + PWA)
   --------------------------------------------------
   Configuración centralizada de:
   - Title template
   - Description
   - Canonical
   - Robots
   - OpenGraph
   - Twitter Cards
   - Manifest
================================================== */

const siteUrl = 'https://krlozmedina.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'Techfolio KrlozMedina',
    template: '%s | Techfolio KrlozMedina',
  },

  description:
    'Desarrollador de Software e Ingeniero en Control y Automatización. Descubre mis proyectos, habilidades y experiencia integrando tecnología, electrónica y programación.',

  alternates: {
    canonical: '/',
  },

  robots: {
    index: true,
    follow: true,
  },

  manifest: '/manifest.json',

  icons: {
    icon: '/favicon.ico',
  },

  openGraph: {
    title: 'Techfolio KrlozMedina',
    description:
      'Descubre los proyectos de Carlos Medina, desarrollador fullstack e ingeniero en control y automatización.',
    url: siteUrl,
    siteName: 'Techfolio KrlozMedina',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Portafolio de KrlozMedina',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Techfolio KrlozMedina',
    description:
      'Portafolio de Carlos Medina, desarrollador fullstack e ingeniero en control y automatización.',
    images: ['/og-image.jpg'],
  },
};

/* ==================================================
   🌐 ROOT LAYOUT
   --------------------------------------------------
   - Define estructura HTML base
   - Aplica fuentes globales
   - Inyecta providers globales
   - Renderiza fondo decorativo
================================================== */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        id="app"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Fondo decorativo global */}
        <span className="background__image" aria-hidden="true" />

        {/* Providers globales */}
        <Providers>
          <LanguageContextProvider>
            {children}
          </LanguageContextProvider>
        </Providers>
      </body>
    </html>
  );
}