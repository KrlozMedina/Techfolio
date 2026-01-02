import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Providers } from '@/providers/provider';
import { LanguageContextProvider } from '@/context/LanguageContext';
import './globals.css';

// =======================
// 📦 Fuentes Locales
// =======================

// Fuente Geist Sans Variable
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans', // CSS variable para body
  weight: '100 900',
});

// Fuente Geist Mono Variable
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

// =======================
// 📈 Metadatos Globales (SEO, Social, PWA)
// =======================
export const metadata: Metadata = {
  metadataBase: new URL('https://krlozmedina.dev'),

  title: {
    default: 'Techfolio KrlozMedina',
    template: '%s | Techfolio KrlozMedina',
  },

  description:
    'Desarrollador de Software e Ingeniero en Control y Automatización. Descubre mis proyectos, habilidades y experiencia integrando tecnología, electrónica y programación.',

  keywords: [
    'KrlozMedina',
    'Carlos Alidio Medina Lopez',
    'Portafolio',
    'Ingeniería de control',
    'Automatización',
    'Desarrollador web',
    'Next.js',
    'MongoDB',
    'Electrónica',
    'Freelancer',
  ],

  alternates: {
    canonical: 'https://krlozmedina.dev',
  },

  manifest: '/manifest.json',

  icons: {
    icon: '/favicon.ico',
  },

  openGraph: {
    title: 'KrlozMedina | Portfolio Lab',
    description:
      'Descubre los proyectos de Carlos Medina, desarrollador fullstack e ingeniero en control y automatización.',
    url: 'https://www.krlozmedina.dev',
    siteName: 'Techfolio Krloz Medina',
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

  robots: 'index, follow', // permite indexación en buscadores
};

// =======================
// 🌐 Root Layout
// =======================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        id="app"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`} // aplica fuentes globales
      >
        {/* Fondo decorativo global, sin relevancia semántica */}
        <span className="background__image" aria-hidden="true" />

        {/* Providers globales */}
        <Providers>
          {/* Contexto de idioma */}
          <LanguageContextProvider>{children}</LanguageContextProvider>
        </Providers>
      </body>
    </html>
  );
}
