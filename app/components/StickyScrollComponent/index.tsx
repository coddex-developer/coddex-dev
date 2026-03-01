"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import { IconBriefcase, IconDatabase, IconFileCode2, IconGauge, IconLayersDifference, IconPower, IconRocket, IconSparkles, IconUserScan } from "@tabler/icons-react";

const content = [
  {
    title: "Interfaces modernas e performáticas",
    description:
      "Desenvolvo interfaces responsivas focadas em experiência do usuário, performance e acessibilidade utilizando React, Next.js e TailwindCSS.",
    content: (
      <div className="flex flex-col gap-4 h-full w-full items-center justify-center bg-gradient-to-br from-cyan-500 to-emerald-500 text-white">
        <IconRocket size={60} />
        <p className="text-xl font-semibold">Front-End Development</p>
      </div>
    ),
  },

  {
    title: "Integração com APIs e sistemas",
    description:
      "Integro aplicações com APIs REST garantindo comunicação eficiente entre cliente e servidor.",
    content: (
      <div className="flex flex-col gap-4 h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 to-blue-600 text-white">
        <IconDatabase size={60} />
        <p className="text-xl font-semibold">API Integration</p>
      </div>
    ),
  },

  {
    title: "Arquitetura organizada",
    description:
      "Estruturo projetos com componentização e separação de responsabilidades para facilitar manutenção.",
    content: (
      <div className="flex flex-col gap-4 h-full w-full items-center justify-center bg-gradient-to-br from-orange-500 to-yellow-500 text-white">
        <IconLayersDifference size={60} />
        <p className="text-xl font-semibold">Clean Architecture</p>
      </div>
    ),
  },

  {
    title: "Performance e otimização",
    description:
      "Aplico lazy loading, code splitting e renderização híbrida para melhorar carregamento.",
    content: (
      <div className="flex flex-col gap-4 h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
        <IconGauge size={60} />
        <p className="text-xl font-semibold">Performance First</p>
      </div>
    ),
  },

  {
    title: "Experiência do usuário (UX)",
    description:
      "Interfaces intuitivas com navegação fluida e feedback visual focado no usuário.",
    content: (
      <div className="flex flex-col gap-4 h-full w-full items-center justify-center bg-gradient-to-br from-pink-500 to-purple-600 text-white">
        <IconUserScan size={60} />
        <p className="text-xl font-semibold">User Experience</p>
      </div>
    ),
  },

  {
    title: "Desenvolvimento Full Stack",
    description:
      "Construção completa de aplicações incluindo front-end, back-end e APIs.",
    content: (
      <div className="flex flex-col gap-4 h-full w-full items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
        <IconFileCode2 size={60} />
        <p className="text-xl font-semibold">Full Stack Apps</p>
      </div>
    ),
  },

  {
    title: "Código limpo e sustentável",
    description:
      "Código legível, escalável e padronizado facilitando evolução e trabalho em equipe.",
    content: (
      <div className="flex flex-col gap-4 h-full w-full items-center justify-center bg-gradient-to-br from-amber-500 to-red-500 text-white">
        <IconSparkles size={60} />
        <p className="text-xl font-semibold">Clean Code</p>
      </div>
    ),
  },

  {
    title: "Soluções orientadas a negócio",
    description:
      "Transformo necessidades reais em soluções digitais alinhadas aos objetivos do negócio.",
    content: (
      <div className="flex flex-col gap-4 h-full w-full items-center justify-center bg-gradient-to-br from-sky-500 to-blue-700 text-white">
        <IconBriefcase size={60} />
        <p className="text-xl font-semibold">Business Solutions</p>
      </div>
    ),
  },

  {
    title: "Evolução contínua",
    description:
      "Aprendizado constante acompanhando novas tecnologias e boas práticas.",
    content: (
      <div className="flex flex-col gap-4 h-full w-full items-center justify-center bg-gradient-to-br from-neutral-700 to-neutral-900 text-white">
        <IconPower size={60} />
        <p className="text-xl font-semibold">Continuous Learning</p>
      </div>
    ),
  },
];

export function StickyScrollComponent() {
    return (
        <div className="w-full py-4 hidden md:flex">
            <StickyScroll content={content} />
        </div>
    );
}
