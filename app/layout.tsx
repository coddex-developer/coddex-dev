import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackgroundBeams } from "./components/ui/background-beams";
import { IsOpenProvider } from "./contexts/isOpenContext";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { WhatsAppFloatComponent } from "./components/WhatsAppFloatComponent";
import { ContactModalComponent } from "./components/ContactModalComponent";

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
        <head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
          (function() {
            const saved = localStorage.getItem("theme");
            if (saved === "dark") {
              document.documentElement.classList.add("dark");
            }
          })();
        `,
            }}
          />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} mx-auto w-full max-w-7xl px-4 antialiased sm:px-6 lg:px-10`}>
          <IsOpenProvider>
            <ThemeContextProvider>
              {children}
              <ContactModalComponent />
              <WhatsAppFloatComponent />
            </ThemeContextProvider>
          </IsOpenProvider>
          <div className="pointer-events-none fixed inset-0 z-50">
            <ProgressiveBlur
              height="5%"
              position="bottom"
            />
            <ScrollProgress />
          </div>
          <BackgroundBeams className="pointer-events-none fixed -z-10 hidden md:block opacity-70" />
        </body>
      </html>
    </>
  );
}
