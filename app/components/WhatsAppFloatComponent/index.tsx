"use client"

import { MessageCircleMore } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useIsOpen } from "@/app/contexts/isOpenContext"

export function WhatsAppFloatComponent() {
  const { setIsOpen } = useIsOpen()
  const [canShow, setCanShow] = useState(true)

  useEffect(() => {
    const target = document.querySelector(
      "#home-primary-cta, #home-contact-trigger"
    )
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setCanShow(!entry.isIntersecting)
      },
      { threshold: 0.25 }
    )
    observer.observe(target)

    return () => observer.disconnect()
  }, [])

  if (!canShow) return null

  return (
    <>
      {
        canShow && (
          <AnimatePresence>
            <motion.button
              type="button"
              onClick={() => setIsOpen(true)}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ y: -4, scale: 1.04 }}
              className="fixed cursor-pointer bottom-6 right-6 z-85 inline-flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-500 text-white shadow-[0_0_30px_rgba(6,182,212,0.45)]"
              aria-label="Abrir contato rapido"
            >
              <motion.span
                aria-label="Abrir formulário de contato"
                className="absolute inset-0 rounded-full border border-cyan-300/40"
                animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0, 0.35] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              />
              <MessageCircleMore size={18} className="relative z-10" />
            </motion.button>
          </AnimatePresence>
        )
      }
    </>
  )
}
