"use client"

import { TextGenerateEffectComponent } from "@/app/components/TextGenerateEffectComponent/intex"
import { ContainerTextFlip } from "@/app/components/ui/container-text-flip"
import WrapperPopUpComponent from "@/app/components/WrapperPopUpComponent"
import { BlurFade } from "@/components/ui/blur-fade"
import { Box, Flex } from "@radix-ui/themes"
import { ChevronDown, Layers3, Orbit, Rocket, ScanSearch } from "lucide-react"
import { FooterComponent } from "@/app/components/FooterComponent"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"

const MarqueeComponent = dynamic(
  () => import("@/app/components/MarqueeComponent").then((module) => module.MarqueeComponent),
  { ssr: false }
)
export const ProjectsSectionComponent = dynamic(
  () =>
    import("@/app/components/ProjectsSectionComponent").then(
      (module) => module.ProjectsSectionComponent
    ),
  { ssr: false }
)
const StickyScrollComponent = dynamic(
  () => import("@/app/components/StickyScrollComponent").then((module) => module.StickyScrollComponent),
  { ssr: false }
)
const TimelineComponent = dynamic(() => import("@/app/components/TimeLineComponent"), {
  ssr: false,
})
const FaqComponent = dynamic(
  () => import("@/app/components/FaqComponent").then((module) => module.FaqComponent),
  { ssr: false }
)

const pillars = [
  {
    icon: Rocket,
    title: "Entrega orientada a resultado",
    text: "Projetos com objetivo claro, impacto mensuravel e foco no que importa para o negocio.",
  },
  {
    icon: Orbit,
    title: "Interação moderna",
    text: "Animações fluidas, hierarquia visual clara e navegação natural para aumentar engajamento.",
  },
  {
    icon: Layers3,
    title: "Escalabilidade real",
    text: "Código limpo, padrões reutilizaveis e arquitetura preparada para crescer.",
  },
  {
    icon: ScanSearch,
    title: "Leitura de produto",
    text: "Antes de codar, alinhamento de contexto, usuário e estrategia de implementação.",
  },
]

const highlights = [
  { label: "Anos em evolução", value: "2+" },
  { label: "Projetos entregues", value: "3+" },
  { label: "Stacks dominadas", value: "10+" },
]

function PillarCard({
  title,
  text,
  icon: Icon,
  index,
}: {
  title: string
  text: string
  icon: typeof Rocket
  index: number
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.28, delay: index * 0.05 }}
      whileHover={{ scale: 1.02, rotateX: -4, rotateY: index % 2 === 0 ? 5 : -5 }}
      style={{ transformPerspective: 1200 }}
      className="rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-transparent p-6"
    >
      <Icon className="mb-4 text-cyan-400" size={22} />
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{text}</p>
    </motion.article>
  )
}

export default function HomePage() {
  return (
    <>
      <Box className="relative w-full">
        <Flex justify={"center"} className="flex-col items-center h-screen">
          <BlurFade>
            <p className="text-4xl md:text-7xl bg-clip-text text-transparent bg-linear-to-b from-neutral-500 to-neutral-800 dark:from-neutral-200 dark:to-neutral-400 text-center font-sans font-bold">
              Gabriel Rodrigues
            </p>
          </BlurFade>

          <Flex className="w-full items-center max-w-xl flex-col gap-6">
            <ContainerTextFlip words={["Desenvolvedor Front-End", "Desenvolvedor Back-End", "Desenvolvedor Full Stack"]} />
            <div className="flex flex-wrap justify-center gap-3">
              <WrapperPopUpComponent />
            </div>
          </Flex>
        </Flex>

        <ChevronDown
          size={35}
          className="absolute opacity-50 text-neutral-700 dark:text-neutral-400 block text-center -translate-x-1/2 -translate-y-1/2 left-1/2 top-10/12 animate-bounce duration-200 ease-in-out"
        />
      </Box>

      <Box id="features" className="px-4 py-14 md:px-8 md:py-20">
        <Flex className="mb-10 flex-col items-center gap-3 text-center">
          <h2 className="text-xl md:text-4xl text-foreground">
            <TextGenerateEffectComponent />
          </h2>
          <p className="max-w-3xl text-sm text-muted-foreground md:text-base">
            Desenvolvimento de experiências digitáis com identidade forte, performance consistente e arquitetura preparada para evolução.
          </p>
        </Flex>

        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="rounded-xl border border-white/15 bg-white/5 p-5 text-center"
            >
              <p className="text-3xl font-bold text-cyan-500">{item.value}</p>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </Box>

      <MarqueeComponent />

      <div>
        <Box className="px-4 py-14 md:px-8 md:py-24">
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.28 }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-500">Diferenciais</p>
            <h2 className="text-3xl font-bold text-foreground md:text-5xl">Seções pensadas como produto</h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {pillars.map((pillar, index) => (
              <PillarCard
                key={pillar.title}
                title={pillar.title}
                text={pillar.text}
                icon={pillar.icon}
                index={index}
              />
            ))}
          </div>
        </Box>
      </div>

      {/* <ProjectsSectionComponent /> */}

      <Box id="services" className="py-10 md:py-16">
        <StickyScrollComponent />
      </Box>

      <Box id="journey" className="py-10 md:py-16">
        <TimelineComponent />
      </Box>

      <FaqComponent />

      <Box className="px-4 pb-6 md:px-8">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/15 via-cyan-500/5 to-transparent p-6 md:p-10"
        >
          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-cyan-500">Next step</p>
          <h3 className="mb-3 text-2xl font-bold md:text-4xl">Vamos desenhar o próximo projeto juntos</h3>
          <p className="mb-5 max-w-2xl text-sm text-muted-foreground md:text-base">
            Se voçê precisa de um site institucional, landing page de conversão ou plataforma web completa, posso estruturar e implementar com foco em experiencia, performance e resultado.
          </p>
          <a
            href="#contact"
            className="inline-flex rounded-lg bg-cyan-500/20 px-5 py-2 text-sm font-medium text-cyan-700 transition hover:bg-cyan-500/30 dark:text-cyan-200"
          >
            Ir para contato
          </a>
        </motion.section>
      </Box>

      <Box id="contact" className="px-4 md:px-0 pb-10 md:pb-16">
        <FooterComponent />
      </Box>
    </>
  )
}
