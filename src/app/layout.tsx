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
    default:
      'Carlos Medina | Full Stack Developer & Ingeniero en Control y Automatización',
    template: '%s | Carlos Medina',
  },

  description:
    'Desarrollador Full Stack e Ingeniero en Control y Automatización en Colombia. Especializado en aplicaciones web modernas, IoT y soluciones tecnológicas industriales.',

  alternates: {
    canonical: siteUrl,
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
    title:
      'Carlos Medina | Full Stack Developer & Ingeniero en Control y Automatización',
    description:
      'Portafolio profesional con proyectos de desarrollo web, IoT y automatización industrial.',
    url: siteUrl,
    siteName: 'Carlos Medina',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Carlos Medina - Full Stack & Control Engineer',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title:
      'Carlos Medina | Full Stack Developer & Ingeniero en Control y Automatización',
    description:
      'Proyectos reales de desarrollo web, IoT y automatización.',
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

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Carlos Medina',
              url: 'https://krlozmedina.dev',
              jobTitle:
                'Full Stack Developer & Ingeniero en Control y Automatización',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'CO',
              },
              sameAs: [
                'https://www.linkedin.com/in/krlozmedina/',
                'https://github.com/KrlozMedina',
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}