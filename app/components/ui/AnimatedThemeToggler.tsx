"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"

import { cn } from "@/lib/utils"

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [isDark, setIsDark] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Detecta mudanças no tema
  useEffect(() => {
    const updateTheme = () => {
      setIsDark(
        document.documentElement.classList.contains("dark")
      )
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return

    const applyTheme = () => {
      const newTheme = !isDark

      setIsDark(newTheme)

      document.documentElement.classList.toggle("dark")

      localStorage.setItem(
        "theme",
        newTheme ? "dark" : "light"
      )
    }

    if (!document.startViewTransition) {
      applyTheme()
      return
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        applyTheme()
      })
    })

    await transition.ready

    const rect =
      buttonRef.current.getBoundingClientRect()

    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
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
        pseudoElement:
          "::view-transition-new(root)",
      }
    )
  }, [isDark, duration])

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(
        "relative flex items-center justify-center cursor-pointer",
        className
      )}
      {...props}
    >
      {isDark ? <Sun className="text-yellow-300" size={25} /> : <Moon size={25} />}
      <span className="sr-only">
        Toggle theme
      </span>
    </button>
  )
}