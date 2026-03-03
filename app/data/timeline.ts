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
    image: "/skills/html5andJs.png",
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
    image: "/skills/nextAndReact.png",
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
    image: "/skills/jsAndTs.png",
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
    image: "/skills/jsAndTs.png",
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
    image: "/skills/nextAndReact.png",
    imageAlt: "Consolidacao profissional",
  },
]

