"use client"

import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import type { TimelineItem } from "@/app/data/timeline"

export function Timeline({ items }: { items: TimelineItem[] }) {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 75%", "end 25%"],
  })

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="mx-auto w-full max-w-6xl px-4 md:px-8">
      <div className="mb-10 text-center md:mb-14">
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-500">Trajetoria</p>
        <h2 className="text-3xl font-bold text-foreground md:text-5xl">Linha do tempo profissional</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
          Evolucao continua com foco em engenharia, produto e experiencia de usuario.
        </p>
      </div>

      <div ref={trackRef} className="relative pb-2">
        <div className="absolute left-4 top-0 h-full w-px bg-neutral-300/70 dark:bg-neutral-700/70 md:left-1/2 md:-translate-x-1/2" />
        <motion.div
          style={{ scaleY: lineScale, transformOrigin: "top" }}
          className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-cyan-400 via-cyan-500 to-transparent md:left-1/2 md:-translate-x-1/2"
        />

        <div className="space-y-8 md:space-y-12">
          {items.map((item, index) => {
            const isLeft = index % 2 === 0
            return (
              <motion.article
                key={`${item.year}-${item.title}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35 }}
                className="relative grid md:grid-cols-[1fr_auto_1fr] md:items-start"
              >
                <div className={`pl-11 md:pl-0 ${isLeft ? "md:pr-8" : "md:col-start-3 md:pl-8"}`}>
                  <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-transparent p-4 md:p-5">
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium tracking-wide text-cyan-600 dark:text-cyan-200">
                        {item.year}
                      </span>
                      <span className="text-xs uppercase tracking-wider text-neutral-500">Milestone</span>
                    </div>

                    <h3 className="mb-2 text-lg font-semibold md:text-xl">{item.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{item.summary}</p>

                    <ul className="mb-4 space-y-2 text-sm text-muted-foreground">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2">
                          <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-cyan-500" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="overflow-hidden rounded-xl border border-white/10">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        width={1000}
                        height={600}
                        className="h-40 w-full object-cover md:h-48"
                      />
                    </div>
                  </div>
                </div>

                <div className="absolute left-4 top-6 z-10 -translate-x-1/2 md:static md:left-auto md:top-auto md:col-start-2 md:translate-x-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/40 bg-background shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                    <div className="h-2.5 w-2.5 rounded-full bg-cyan-500" />
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
