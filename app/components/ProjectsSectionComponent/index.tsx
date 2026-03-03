"use client"

import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Github, X, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { siteConfig } from "@/app/config/site"

type Project = {
  id: string
  title: string
  category: string
  description: string
  stack: string[]
  highlights: string[]
  images: string[]
  liveUrl?: string
  repoUrl?: string
}

const projects: Project[] = [
  {
    id: "nexus-ui",
    title: "Nexus UI Platform",
    category: "SaaS Dashboard",
    description:
      "Painel administrativo com foco em performance, tema dinamico e experiencia orientada a dados.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    highlights: [
      "Arquitetura por componentes reutilizaveis",
      "Indicadores e graficos em tempo real",
      "Fluxo responsivo para desktop e mobile",
    ],
    images: ["/skills/nextAndReact.png", "/skills/jsAndTs.png", "/skills/html5andJs.png"],
    liveUrl: siteConfig.projects.nexusLive,
    repoUrl: siteConfig.projects.nexusRepo,
  },
  {
    id: "aurora-commerce",
    title: "Aurora Commerce",
    category: "E-commerce",
    description:
      "Loja digital com jornada de compra otimizada, paginas de produto detalhadas e foco em conversao.",
    stack: ["React", "Node.js", "PostgreSQL"],
    highlights: [
      "Catalogo com filtros inteligentes",
      "Checkout simplificado",
      "Integracao com APIs de pagamento",
    ],
    images: ["/skills/ChatGPT Image 1 de mar. de 2026, 01_10_56.png"],
    liveUrl: siteConfig.projects.auroraLive,
    repoUrl: siteConfig.projects.auroraRepo,
  },
  {
    id: "pulse-api",
    title: "Pulse API Hub",
    category: "Full Stack",
    description:
      "Plataforma para integracao de APIs com monitoramento de status, logs e controle de versao.",
    stack: ["Next.js", "Express", "Prisma", "PostgreSQL"],
    highlights: [
      "Documentacao interativa de endpoints",
      "Monitoramento de disponibilidade",
      "Controle de acesso por perfis",
    ],
    images: ["/skills/jsAndTs.png", "/skills/nextAndReact.png"],
    liveUrl: siteConfig.projects.pulseLive,
    repoUrl: siteConfig.projects.pulseRepo,
  },
]

export function ProjectsSectionComponent() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [imageIndex, setImageIndex] = useState(0)

  const openProject = (project: Project) => {
    setSelectedProject(project)
    setImageIndex(0)
  }

  const closeProject = () => setSelectedProject(null)

  const nextImage = () => {
    if (!selectedProject || selectedProject.images.length < 2) return
    setImageIndex((prev) => (prev + 1) % selectedProject.images.length)
  }

  const prevImage = () => {
    if (!selectedProject || selectedProject.images.length < 2) return
    setImageIndex((prev) =>
      prev === 0 ? selectedProject.images.length - 1 : prev - 1
    )
  }

  return (
    <>
      <section id="projects" className="px-4 py-16 md:px-8 md:py-24">
        <div className="mb-10 flex flex-col gap-4 text-center md:mb-14">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-500">Portfolio Projects</p>
          <h2 className="text-3xl font-bold md:text-5xl">Projetos pensados como produto</h2>
          <p className="mx-auto max-w-2xl text-sm text-neutral-600 dark:text-neutral-300 md:text-base">
            Cada projeto combina design, engenharia e estrategia para gerar resultado real.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              whileHover={{ rotateX: -6, rotateY: 6, y: -6 }}
              className="group rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-transparent p-5 backdrop-blur-sm"
              style={{ transformPerspective: 1200 }}
            >
              <div className="mb-4 overflow-hidden rounded-xl border border-white/10">
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  width={1200}
                  height={700}
                  className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <p className="mb-1 text-xs uppercase tracking-widest text-cyan-500">{project.category}</p>
              <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
              <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-300">{project.description}</p>

              <div className="mb-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <button
                onClick={() => openProject(project)}
                className="w-full rounded-lg bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-700 transition hover:bg-cyan-500/30 dark:text-cyan-200"
              >
                Visualizar projeto
              </button>
            </motion.article>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/70 p-4 backdrop-blur-md"
            onClick={closeProject}
          >
            <motion.div
              initial={{ scale: 0.95, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 24, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              className="mx-auto mt-8 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/10 bg-background p-5 md:p-7"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-500">{selectedProject.category}</p>
                  <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
                </div>
                <button
                  onClick={closeProject}
                  className="rounded-lg border border-white/10 p-2 text-neutral-500 transition hover:text-neutral-200"
                  aria-label="Fechar modal"
                >
                  <X size={18} />
                </button>
              </div>

              <p className="mb-5 text-sm text-neutral-600 dark:text-neutral-300">{selectedProject.description}</p>

              <div className="relative mb-5 overflow-hidden rounded-xl border border-white/10">
                <Image
                  src={selectedProject.images[imageIndex]}
                  alt={`${selectedProject.title} imagem ${imageIndex + 1}`}
                  width={1400}
                  height={800}
                  className="h-64 w-full object-cover md:h-96"
                />

                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/45 p-2 text-white"
                      aria-label="Imagem anterior"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black/45 p-2 text-white"
                      aria-label="Proxima imagem"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>

              {selectedProject.images.length > 1 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {selectedProject.images.map((image, index) => (
                    <button
                      key={`${selectedProject.id}-thumb-${index}`}
                      onClick={() => setImageIndex(index)}
                      className={`overflow-hidden rounded-lg border ${
                        imageIndex === index ? "border-cyan-400" : "border-white/10"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${selectedProject.title} miniatura ${index + 1}`}
                        width={120}
                        height={80}
                        className="h-16 w-24 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              <div className="mb-6">
                <h4 className="mb-2 text-sm font-semibold uppercase tracking-widest text-cyan-500">Destaques</h4>
                <ul className="grid gap-2 text-sm text-neutral-600 dark:text-neutral-300">
                  {selectedProject.highlights.map((item) => (
                    <li key={item} className="rounded-lg border border-white/10 px-3 py-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-700 transition hover:bg-cyan-500/30 dark:text-cyan-200"
                  >
                    <ExternalLink size={16} />
                    Ver online
                  </a>
                )}

                {selectedProject.repoUrl && (
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm font-medium"
                  >
                    <Github size={16} />
                    Repositorio
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
