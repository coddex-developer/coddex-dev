"use client"

import { TextGenerateEffectComponent } from "@/app/components/TextGenerateEffectComponent/intex"
import { ContainerTextFlip } from "@/app/components/ui/container-text-flip"
import WrapperPopUpComponent from "@/app/components/WrapperPopUpComponent"
import { BlurFade } from "@/components/ui/blur-fade"
import { Box, Flex } from "@radix-ui/themes"
import { ChevronDown, Layers3, Orbit, Rocket, ScanSearch } from "lucide-react"
import { MarqueeComponent } from "@/app/components/MarqueeComponent"
import { StickyScrollComponent } from "@/app/components/StickyScrollComponent"
import TimelineComponent from "@/app/components/TimeLineComponent"
import { FooterComponent } from "@/app/components/FooterComponent"
import { ProjectsSectionComponent } from "@/app/components/ProjectsSectionComponent"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const pillars = [
  {
    icon: Rocket,
    title: "Entrega orientada a resultado",
    text: "Projetos com objetivo claro, impacto mensuravel e foco no que importa para o negocio.",
  },
  {
    icon: Orbit,
    title: "Interacao moderna",
    text: "Animacoes fluidas, hierarquia visual e navegacao natural para aumentar engajamento.",
  },
  {
    icon: Layers3,
    title: "Escalabilidade real",
    text: "Codigo limpo, padroes reutilizaveis e arquitetura preparada para crescer.",
  },
  {
    icon: ScanSearch,
    title: "Leitura de produto",
    text: "Antes de codar, alinhamento de contexto, usuario e estrategia de implementacao.",
  },
]

const highlights = [
  { label: "Anos em evolucao", value: "4+" },
  { label: "Projetos reais", value: "20+" },
  { label: "Stacks dominadas", value: "10+" },
]

function PillarCard({
  title,
  text,
  icon: Icon,
  progress,
  index,
}: {
  title: string
  text: string
  icon: typeof Rocket
  progress: import("framer-motion").MotionValue<number>
  index: number
}) {
  const rotateX = useTransform(progress, [0, 1], [12 - index, -8])
  const rotateY = useTransform(progress, [0, 1], [index % 2 === 0 ? -8 : 8, 0])
  const y = useTransform(progress, [0, 1], [30 + index * 10, -30])

  return (
    <motion.article
      style={{ rotateX, rotateY, y, transformPerspective: 1400 }}
      whileHover={{ scale: 1.02, rotateX: -4, rotateY: index % 2 === 0 ? 5 : -5 }}
      className="rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-transparent p-6 backdrop-blur-sm"
    >
      <Icon className="mb-4 text-cyan-400" size={22} />
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-sm text-neutral-600 dark:text-neutral-300">{text}</p>
    </motion.article>
  )
}

export default function HomePage() {
  const cardsRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: cardsRef,
    offset: ["start end", "end start"],
  })
  const titleY = useTransform(scrollYProgress, [0, 1], [40, -30])

  return (
    <>
      <Box className="relative w-full">
        <Flex justify={"center"} className="flex-col items-center h-screen">
          <BlurFade>
            <p className="text-4xl md:text-7xl bg-clip-text text-transparent bg-linear-to-b from-neutral-400 dark:from-neutral-200 to-neutral-700 text-center font-sans font-bold">
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
          <h2 className="text-xl md:text-4xl text-black dark:text-white">
            <TextGenerateEffectComponent />
          </h2>
          <p className="max-w-3xl text-sm text-neutral-700 dark:text-neutral-300 md:text-base">
            Desenvolvimento de experiencias digitais com identidade forte, performance e arquitetura de longo prazo.
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
              className="rounded-xl border border-white/15 bg-white/5 p-5 text-center backdrop-blur-sm"
            >
              <p className="text-3xl font-bold text-cyan-500">{item.value}</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </Box>

      <MarqueeComponent />

      <div ref={cardsRef}>
        <Box className="px-4 py-14 md:px-8 md:py-24">
          <motion.div style={{ y: titleY }} className="mb-10 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-500">Diferenciais</p>
            <h2 className="text-3xl font-bold md:text-5xl">Secoes pensadas como produto</h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {pillars.map((pillar, index) => (
              <PillarCard
                key={pillar.title}
                title={pillar.title}
                text={pillar.text}
                icon={pillar.icon}
                progress={scrollYProgress}
                index={index}
              />
            ))}
          </div>
        </Box>
      </div>

      <ProjectsSectionComponent />

      <Box id="services" className="py-10 md:py-16">
        <StickyScrollComponent />
      </Box>

      <Box id="journey" className="py-10 md:py-16">
        <TimelineComponent />
      </Box>

      <Box className="px-4 pb-6 md:px-8">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/15 via-cyan-500/5 to-transparent p-6 md:p-10"
        >
          <p className="mb-2 text-xs uppercase tracking-[0.25em] text-cyan-500">Next step</p>
          <h3 className="mb-3 text-2xl font-bold md:text-4xl">Vamos desenhar o proximo projeto juntos</h3>
          <p className="mb-5 max-w-2xl text-sm text-neutral-600 dark:text-neutral-300 md:text-base">
            Se voce precisa de um site institucional, landing page de conversao ou plataforma web completa, posso estruturar e implementar com foco em experiencia e resultado.
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
