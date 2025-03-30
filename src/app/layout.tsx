import type { Metadata } from "next";
import localFont from "next/font/local";
import { LanguageContextProvider } from "@/context/LanguageContext";
import "./globals.css";
import { Providers } from "@/redux/provider";

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
  title: "KrlozMedina",
  description: "Portafolio profesional de Carlos Alidio Medina Lopez",
  keywords: "portafolio, desarrollador web, full stack, tecnología",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageContextProvider>
      <html lang="en">
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
