import localFont from "next/font/local";
import { LanguageContextProvider } from "@/redux/context/LanguageContext";
import "./globals.css";
import { Providers } from "@/redux/provider";
import { Metadata } from "next";

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

export const metadata: Metadata = {
  title: {
    default: 'KrlozMedina Portfolio Lab',
    template: '%s | KrlozMedina Portfolio Lab'
  },
  description: "Desarrollador de Software e Ingeniero en Control y Automatización. Descubre mis proyectos, habilidades y experiencia integrando tecnología, electrónica y programación.",
  icons: {
    icon: './favicon.ico'
  },
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
  openGraph: {
    title: "KrlozMedina | Portfolio Lab",
    description: "Descubre los proyectos de Carlos Medina, desarrollador fullstack e ingeniero en control y automatización.",
    url: "https://www.krlozmedina.dev",
    siteName: "KrlozMedina Portfolio Lab",
    images: [
      {
        url: "/og-image.jpg", // Puedes crear una imagen para compartir en redes
        width: 1200,
        height: 630,
        alt: "Portafolio de KrlozMedina",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
  robots: 'index, follow'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageContextProvider>
      <html lang="es">
        <head>
          <link rel="canonical" href={'https://krlozmedina.dev'} />
        </head>
        <body id="app" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <span className="background__image"></span>
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    </LanguageContextProvider>
  );
}
