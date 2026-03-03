export type TimelineItem = {
  year: string
  title: string
  summary: string
  bullets: string[]
  image: string
  imageAlt: string
}

export const timelineItems: TimelineItem[] = [
  {
    year: "2022",
    title: "Inicio da jornada",
    summary:
      "Comecei os estudos em programacao com foco em logica, fundamentos web e construcao de interfaces com HTML, CSS e JavaScript.",
    bullets: [
      "Base tecnica de desenvolvimento",
      "Compreensao de estrutura web",
      "Primeiros projetos funcionais",
    ],
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Fundamentos web",
  },
  {
    year: "2023",
    title: "Primeiros projetos reais",
    summary:
      "Passei para projetos completos, organizacao com Git e consumo de APIs REST em fluxo de front-end e back-end.",
    bullets: [
      "Versionamento e fluxo Git",
      "Consumo e integracao de APIs",
      "Organizacao por componentes",
    ],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Projetos com React",
  },
  {
    year: "2024",
    title: "Especializacao Front-End",
    summary:
      "Aprofundei em React e Next.js, com foco em performance, responsividade e experiencia visual moderna.",
    bullets: [
      "Arquitetura em React",
      "Renderizacao hibrida no Next.js",
      "TailwindCSS para UI responsiva",
    ],
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Especializacao front-end",
  },
  {
    year: "2025",
    title: "Evolucao Full Stack",
    summary:
      "Ampliei para desenvolvimento full stack, criando APIs, regras de negocio e persistencia de dados com TypeScript.",
    bullets: [
      "APIs REST e CRUD completo",
      "Tipagem forte com TypeScript",
      "Integracao de ponta a ponta",
    ],
    image:
      "https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Evolucao full stack",
  },
  {
    year: "2026",
    title: "Consolidacao profissional",
    summary:
      "Foco em produtos digitais com arquitetura limpa, identidade visual forte e experiencia orientada a resultado.",
    bullets: [
      "Arquitetura escalavel",
      "Animacoes e interacoes modernas",
      "Performance e qualidade visual",
    ],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Consolidacao profissional",
  },
]
