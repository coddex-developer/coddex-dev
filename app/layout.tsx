import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
          className={`${geistSans.variable} px-6 md:px-16 bg-neutral-100 max-w-7xl mx-auto dark:bg-neutral-950! ${geistMono.variable} antialiased`}>
          {children}
          <BackgroundBeams />
        </body>
      </html>
    </>
  );
}
