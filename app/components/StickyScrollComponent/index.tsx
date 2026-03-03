"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import {
  IconBriefcase,
  IconDatabase,
  IconFileCode2,
  IconGauge,
  IconLayersDifference,
  IconRocket,
} from "@tabler/icons-react"
import { useRef } from "react"

const services = [
  {
    icon: IconRocket,
    title: "Front-End com foco em conversao",
    description:
      "Interfaces modernas, responsivas e objetivas para transformar visitas em contatos e vendas.",
    label: "UI Engineering",
  },
  {
    icon: IconDatabase,
    title: "Integracao de APIs com consistencia",
    description:
      "Conexao segura entre front e back-end com padrao de dados pronto para escalar.",
    label: "API Integration",
  },
  {
    icon: IconLayersDifference,
    title: "Arquitetura limpa e reutilizavel",
    description:
      "Componentes padronizados para acelerar evolucao do produto sem perder qualidade.",
    label: "Clean Architecture",
  },
  {
    icon: IconGauge,
    title: "Performance e experiencia fluida",
    description:
      "Aprimoramento de carregamento, renderizacao e animacoes para manter a experiencia leve.",
    label: "Performance First",
  },
  {
    icon: IconFileCode2,
    title: "Entrega Full Stack",
    description:
      "Implementacao ponta a ponta com base pronta para futuras integracoes e novos modulos.",
    label: "Full Stack Delivery",
  },
  {
    icon: IconBriefcase,
    title: "Visao de negocio aplicada",
    description:
      "Solucoes orientadas por objetivo, funil e posicionamento da sua marca no digital.",
    label: "Business Impact",
  },
]

export function StickyScrollComponent() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const previewY = useTransform(scrollYProgress, [0, 1], [20, -20])

  return (
    <section ref={sectionRef} className="mx-auto w-full max-w-6xl px-4 md:px-8">
      <div className="mb-10 text-center md:mb-14">
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-500">Servicos</p>
        <h2 className="text-3xl font-bold md:text-5xl">Implementacao moderna e escalavel</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-600 dark:text-neutral-300 md:text-base">
          Processo tecnico pensado para entregar valor hoje e facilitar evolucao com backend no futuro.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -2, scale: 1.01 }}
                className="rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-transparent p-5 backdrop-blur-sm"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-lg border border-cyan-400/30 bg-cyan-500/15 p-2 text-cyan-600 dark:text-cyan-300">
                    <Icon size={20} />
                  </div>
                  <span className="text-xs uppercase tracking-[0.16em] text-cyan-500">{service.label}</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold md:text-xl">{service.title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">{service.description}</p>
              </motion.article>
            )
          })}
        </div>

        <motion.aside
          style={{ y: previewY }}
          className="sticky top-24 hidden h-fit rounded-3xl border border-cyan-500/25 bg-gradient-to-b from-cyan-500/20 via-cyan-500/10 to-transparent p-6 shadow-[0_0_45px_rgba(6,182,212,0.16)] lg:block"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-500">Roadmap tecnico</p>
          <h3 className="mt-3 text-2xl font-bold">Base pronta para backend</h3>
          <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">
            Componentes desacoplados, dados estruturados e URLs centralizadas em config para facilitar a integracao com API, CMS ou painel administrativo.
          </p>

          <ul className="mt-6 space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
            <li className="rounded-lg border border-white/10 px-3 py-2">Separacao de conteudo em camada de dados</li>
            <li className="rounded-lg border border-white/10 px-3 py-2">Rotas de API previstas via variaveis de ambiente</li>
            <li className="rounded-lg border border-white/10 px-3 py-2">Padrao visual unico em dark e light mode</li>
          </ul>
        </motion.aside>
      </div>
    </section>
  )
}
