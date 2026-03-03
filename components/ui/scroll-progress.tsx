"use client"

import { motion, useScroll, type MotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollProgressProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  ref?: React.Ref<HTMLDivElement>
}

export function ScrollProgress({ className, ref, ...props }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll()

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
      <motion.div
        ref={ref}
        className={cn(
          "h-full origin-left rounded-r-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 shadow-[0_0_18px_rgba(6,182,212,0.65)]",
          className
        )}
        style={{ scaleX: scrollYProgress }}
        {...props}
      />
    </div>
  )
}

