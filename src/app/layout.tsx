// app/layout.tsx

import localFont from "next/font/local";
import { Metadata } from "next";
import { Providers } from "@/providers/provider";
import { LanguageContextProvider } from "@/context/LanguageContext";
import "./globals.css";

// =======================
// 📦 Fuentes Locales
// =======================

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// =======================
// 📈 Metadatos Globales
// =======================

export const metadata: Metadata = {
  metadataBase: new URL("https://krlozmedina.dev"), // ✅ Soluciona la advertencia sobre URLs absolutas

  title: {
    default: "KrlozMedina Portfolio Lab",
    template: "%s | KrlozMedina Portfolio Lab",
  },

  description:
    "Desarrollador de Software e Ingeniero en Control y Automatización. Descubre mis proyectos, habilidades y experiencia integrando tecnología, electrónica y programación.",

  keywords: [
    "KrlozMedina",
    "Carlos Alidio Medina Lopez",
    "Portafolio",
    "Ingeniería de control",
    "Automatización",
    "Desarrollador web",
    "Next.js",
    "MongoDB",
    "Electrónica",
    "Freelancer",
  ],

  icons: {
    icon: "./favicon.ico",
  },

  openGraph: {
    title: "KrlozMedina | Portfolio Lab",
    description:
      "Descubre los proyectos de Carlos Medina, desarrollador fullstack e ingeniero en control y automatización.",
    url: "https://www.krlozmedina.dev",
    siteName: "KrlozMedina Portfolio Lab",
    images: [
      {
        url: "/og-image.jpg", // Se convierte automáticamente en absoluta por metadataBase
        width: 1200,
        height: 630,
        alt: "Portafolio de KrlozMedina",
      },
    ],
    locale: "es_CO",
    type: "website",
  },

  robots: "index, follow",
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
      <head>
        <link rel="canonical" href="https://krlozmedina.dev" />
        <link rel="manifest" href="/manifest.json" />
      </head>

      <body
        id="app"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageContextProvider>
          <Providers>{children}</Providers>
        </LanguageContextProvider>
      </body>
    </html>
  );
}
