"use client";

import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Mail, Sparkles, MessageCircleMore, Youtube, AtSign, Music2, Palette, Dribbble } from "lucide-react";
import { siteConfig } from "@/app/config/site";

const contactMap = {
  email: {
    href: `mailto:${siteConfig.contactEmail}`,
    label: "Email",
    icon: Mail,
  },
  linkedin: {
    href: siteConfig.links.linkedin,
    label: "LinkedIn",
    icon: Linkedin,
  },
  github: {
    href: siteConfig.links.github,
    label: "GitHub",
    icon: Github,
  },
  instagram: {
    href: siteConfig.links.instagram,
    label: "Instagram",
    icon: Instagram,
  },
  whatsapp: {
    href: siteConfig.links.whatsapp,
    label: "WhatsApp",
    icon: MessageCircleMore,
  },
  youtube: {
    href: siteConfig.links.youtube,
    label: "YouTube",
    icon: Youtube,
  },
  x: {
    href: siteConfig.links.x,
    label: "X",
    icon: AtSign,
  },
  tiktok: {
    href: siteConfig.links.tiktok,
    label: "TikTok",
    icon: Music2,
  },
  behance: {
    href: siteConfig.links.behance,
    label: "Behance",
    icon: Palette,
  },
  dribbble: {
    href: siteConfig.links.dribbble,
    label: "Dribbble",
    icon: Dribbble,
  },
} as const;

export function FooterComponent() {
  const year = new Date().getFullYear();

  const links = siteConfig.contactChannels
    .map((channel) => contactMap[channel as keyof typeof contactMap])
    .filter((item) => item && item.href);

  const sections = [
    { label: "Sobre", href: "#features" },
    { label: "Projetos", href: "#projects" },
    { label: "Jornada", href: "#journey" },
    { label: "Contato", href: "#contact" },
  ];

  return (
    <footer className="relative mt-20 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-cyan-500/10 via-background to-background px-6 py-12 md:px-10">
      <div className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />

      <div className="relative grid gap-10 md:grid-cols-2 md:items-end">
        <div className="space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300">
            <Sparkles size={14} />
            Future Ready
          </p>

          <h3 className="text-2xl font-bold leading-tight md:text-4xl">
            Vamos construir uma experiência digital de alto impacto.
          </h3>

          <p className="max-w-md text-sm text-neutral-600 dark:text-neutral-300">
            Interfaces modernas, animações fluidas e código escalável para transformar ideias em produto.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {sections.map((section) => (
              <a
                key={section.label}
                href={section.href}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-600 transition hover:border-cyan-400/60 hover:text-cyan-600 dark:text-neutral-300 dark:hover:text-cyan-200"
              >
                {section.label}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:justify-items-end">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                whileHover={{ y: -4, rotateX: 10, rotateY: -10 }}
                transition={{ duration: 0.2 }}
                className="group flex h-16 w-full flex-col items-center justify-center gap-1 rounded-xl border border-white/15 bg-white/5 text-xs text-neutral-700 backdrop-blur-sm dark:text-neutral-200"
              >
                <Icon size={16} className="transition group-hover:scale-110" />
                {item.label}
              </motion.a>
            );
          })}
        </div>
      </div>

      <div className="relative mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
        <span>© {year} Gabriel Rodrigues</span>
        <span>Front-End • Full Stack • APIs</span>
      </div>
    </footer>
  );
}