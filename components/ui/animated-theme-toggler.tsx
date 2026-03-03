"use client"

import { useCallback, useRef } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"
import { useTheme } from "@/app/contexts/ThemeContext"
import { cn } from "@/lib/utils"

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {

  const { theme, toggleTheme } = useTheme()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleToggle = useCallback(async () => {
    if (!buttonRef.current) return

    if (!document.startViewTransition) {
      toggleTheme()
      return
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        toggleTheme() // 👈 só chama o contexto
      })
    }).ready

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect()

    const x = left + width / 2
    const y = top + height / 2

    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    )

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    )

  }, [toggleTheme, duration])

  return (
    <button
      ref={buttonRef}
      onClick={handleToggle}
      className={cn(className)}
      {...props}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}