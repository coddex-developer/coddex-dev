"use client"

import { AnimatePresence, motion } from "framer-motion"
import { FormComponent } from "../FormComponent"
import { useIsOpen } from "@/app/contexts/isOpenContext"

export function ContactModalComponent() {
  const { isOpen, setIsOpen } = useIsOpen()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[90] bg-slate-950/45 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.92, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 24, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => event.stopPropagation()}
            className="relative flex min-h-screen w-full items-center justify-center p-4"
          >
            <FormComponent />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

