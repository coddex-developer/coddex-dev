import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackgroundBeams } from "./components/ui/background-beams";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoddeX Developer",
  description: "Olá, eu sou Gabriel Rodrigues — Vamos construir sua presença digital juntos?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="pt-BR">
        <body
          className={`${geistSans.variable} md:px-16  max-w-7xl mx-auto  ${geistMono.variable} antialiased`}>
          {children}
          <div className="pointer-events-none fixed inset-0 z-50">
            <ProgressiveBlur
              height="5%"
              position="bottom"
            />
            <ScrollProgress /> 
          </div>
            <BackgroundBeams className="fixed pointer-events-none -z-10" />
        </body>
      </html>
    </>
  );
}
