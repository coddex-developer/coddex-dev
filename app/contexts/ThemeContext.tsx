"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light"

interface ThemeProviderProps {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeProviderProps | undefined>(undefined)

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {

    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("theme") as Theme | null
            return saved ?? "dark"
        }
        return "dark"
    })

    useEffect(() => {
        const root = document.documentElement

        if (theme === "dark") {
            root.classList.add("dark")
        } else {
            root.classList.remove("dark")
        }

        localStorage.setItem("theme", theme)

    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => prev === "dark" ? "light" : "dark")
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme deve ser usado dentro de ThemeContextProvider")
    }
    return context
}