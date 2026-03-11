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
    title: "Início da jornada",
    summary:
      "Comecei meus estudos em programação focando em lógica, fundamentos da web e criação de interfaces utilizando HTML, CSS e JavaScript.",
    bullets: [
      "Base de desenvolvimento web",
      "Entendimento da estrutura das aplicações",
      "Primeiros projetos funcionais",
    ],
    image: "/timeline-images/img01.png",
    imageAlt: "Fundamentos web",
  },
  {
    year: "2023",
    title: "Primeiros projetos reais",
    summary:
      "Passei a desenvolver projetos mais completos, utilizando Git para versionamento e integrando APIs REST em aplicações web.",
    bullets: [
      "Controle de versão com Git",
      "Consumo e integração de APIs",
      "Organização de código por componentes",
    ],
    image: "/timeline-images/img02.png",
    imageAlt: "Projetos com React",
  },
  {
    year: "2024",
    title: "Especialização Front-End",
    summary:
      "Aprofundei meus conhecimentos em React e Next.js, trabalhando com interfaces modernas, responsividade e boas práticas de desenvolvimento.",
    bullets: [
      "Estrutura de aplicações com React",
      "Renderização híbrida no Next.js",
      "Interfaces responsivas com Tailwind CSS",
    ],
    image: "/timeline-images/img03.png",
    imageAlt: "Especialização front-end",
  },
  {
    year: "2025",
    title: "Evolução Full Stack",
    summary:
      "Ampliei meus estudos para o desenvolvimento full stack, criando APIs, implementando regras de negócio e trabalhando com persistência de dados em TypeScript.",
    bullets: [
      "Criação de APIs REST",
      "Tipagem com TypeScript",
      "Integração entre front-end e back-end",
    ],
    image: "/timeline-images/img04.png",
    imageAlt: "Evolução full stack",
  },
  {
    year: "2026",
    title: "Consolidação profissional",
    summary:
      "Foco no desenvolvimento de produtos digitais com organização de código, interfaces bem estruturadas e atenção à experiência do usuário.",
    bullets: [
      "Arquitetura de projetos escalável",
      "Interações e animações modernas",
      "Performance e qualidade visual",
    ],
    image: "/timeline-images/img05.png",
    imageAlt: "Consolidação profissional",
  },
]