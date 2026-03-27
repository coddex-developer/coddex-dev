"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqItems = [
  {
    question: "Qual tipo de projeto você desenvolve?",
    answer:
      "Landing pages, sites institucionais, dashboards e aplicacoes web completas com foco em performance e conversão.",
  },
  {
    question: "Como funciona o processo de trabalho?",
    answer:
      "Começamos com alinhamento de objetivo e escopo, depois wireframe/estrutura, desenvolvimento e validação final com ajustes.",
  },
  {
    question: "Voçê integra com backend ou API existente?",
    answer:
      "Sim. A estrutura atual ja foi preparada para integrar APIs, autenticação e painel administrativo de forma escalavel.",
  },
  {
    question: "Em quanto tempo um projeto costuma ficar pronto?",
    answer:
      "Depende da complexidade. Projetos menores costumam levar de 1 a 3 semanas, e projetos maiores sao planejados por etapas.",
  },
]

export function FaqComponent() {
  const [openItem, setOpenItem] = useState<number | null>(0)

  return (
    <section id="faq" className="mx-auto w-full max-w-4xl px-4 py-14 md:px-8 md:py-20">
      <div className="mb-8 text-center md:mb-10">
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-500">FAQ</p>
        <h2 className="text-3xl font-bold text-foreground md:text-5xl">Perguntas frequentes</h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
          Respostas diretas para acelerar decisão e início do projeto.
        </p>
      </div>

      <div className="space-y-3">
        {faqItems.map((item, index) => {
          const isOpen = openItem === index
          return (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.25, delay: index * 0.04 }}
              className="overflow-hidden rounded-xl border border-cyan-500/20 bg-gradient-to-b from-cyan-500/10 to-transparent"
            >
              <button
                className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left text-sm font-semibold text-foreground md:px-5 md:text-base"
                onClick={() => setOpenItem(isOpen ? null : index)}
              >
                <span>{item.question}</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-sm text-muted-foreground md:px-5">
                  {item.answer}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

