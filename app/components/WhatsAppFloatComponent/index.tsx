"use client"

import { MessageCircleMore } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useIsOpen } from "@/app/contexts/isOpenContext"

export function WhatsAppFloatComponent() {
  const { setIsOpen } = useIsOpen()
  const [canShow, setCanShow] = useState(false)

  useEffect(() => {
    const target =
      document.getElementById("home-primary-cta") ??
      document.getElementById("home-contact-trigger")
    if (!target) {
      setCanShow(true)
      return
    }

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
    <motion.button
      type="button"
      onClick={() => setIsOpen(true)}
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.04 }}
      className="fixed bottom-6 right-6 z-[85] inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(6,182,212,0.45)]"
      aria-label="Abrir contato rapido"
    >
      <motion.span
        className="absolute inset-0 rounded-full border border-cyan-300/40"
        animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0, 0.35] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
      />
      <MessageCircleMore size={18} className="relative z-10" />
      <span className="relative z-10">WhatsApp</span>
    </motion.button>
  )
}
