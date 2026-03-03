"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface IsOpenContextType {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const IsOpenContext = createContext<IsOpenContextType | undefined>(undefined)

export function IsOpenProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <IsOpenContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </IsOpenContext.Provider>
  )
}

export function useIsOpen() {
  const context = useContext(IsOpenContext)

  if (!context) {
    throw new Error("useIsOpen deve ser usado dentro de IsOpenProvider")
  }

  return context
}