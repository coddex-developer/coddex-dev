"use client"

import { cn } from "@/lib/utils"
import { IconMenu2, IconX } from "@tabler/icons-react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import Image from "next/image"
import React, { useRef, useState } from "react"

interface NavbarProps {
  children: React.ReactNode
  className?: string
}

interface NavBodyProps {
  children: React.ReactNode
  className?: string
  visible?: boolean
}

interface NavItemsProps {
  items: {
    name: string
    link: string
  }[]
  className?: string
  onItemClick?: () => void
}

interface MobileNavProps {
  children: React.ReactNode
  className?: string
  visible?: boolean
}

interface MobileNavHeaderProps {
  children: React.ReactNode
  className?: string
}

interface MobileNavMenuProps {
  children: React.ReactNode
  className?: string
  isOpen: boolean
  onClose: () => void
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 80)
  })

  return (
    <motion.div ref={ref} className={cn("fixed inset-x-0 top-3 z-40 px-4 md:px-6", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ visible?: boolean }>, { visible })
          : child
      )}
    </motion.div>
  )
}

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "blur(0px)",
        width: visible ? "min(92%, 1180px)" : "min(100%, 1180px)",
        y: visible ? 2 : 0,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 40 }}
      className={cn(
        "mx-auto hidden items-center justify-between rounded-2xl border border-transparent px-4 py-2 lg:flex",
        visible && "border-cyan-500/20 bg-background/75 shadow-[0_10px_40px_rgba(6,182,212,0.12)]",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn("hidden flex-1 items-center justify-center gap-2 text-sm font-medium lg:flex", className)}
    >
      {items.map((item, idx) => (
        <a
          key={`link-${idx}`}
          href={item.link}
          onClick={onItemClick}
          onMouseEnter={() => setHovered(idx)}
          className="relative rounded-full px-4 py-2 text-neutral-700 transition-colors hover:text-cyan-700 dark:text-neutral-200 dark:hover:text-cyan-200"
        >
          {hovered === idx && (
            <motion.div
              layoutId="nav-hover"
              className="absolute inset-0 rounded-full border border-cyan-500/20 bg-cyan-500/12"
            />
          )}
          <span className="relative z-10">{item.name}</span>
        </a>
      ))}
    </motion.div>
  )
}

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "blur(0px)",
        y: visible ? 12 : 0,
      }}
      transition={{ type: "spring", stiffness: 170, damping: 38 }}
      className={cn(
        "mx-auto flex w-full max-w-6xl flex-col rounded-2xl px-3 py-2 lg:hidden",
        visible && "border border-cyan-500/20 bg-background/80 shadow-[0_10px_36px_rgba(6,182,212,0.16)]",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => {
  return <div className={cn("flex w-full items-center justify-between", className)}>{children}</div>
}

export const MobileNavMenu = ({ children, className, isOpen, onClose }: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "mt-3 flex w-full flex-col gap-3 rounded-xl border border-cyan-500/20 bg-background/95 px-4 py-5 shadow-[0_10px_34px_rgba(6,182,212,0.14)]",
            className
          )}
          onClick={onClose}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean
  onClick: () => void
}) => {
  return isOpen ? (
    <IconX size={34} className="cursor-pointer text-foreground" onClick={onClick} />
  ) : (
    <IconMenu2 size={34} className="cursor-pointer text-foreground" onClick={onClick} />
  )
}

export const NavbarLogo = () => {
  return (
    <a href="#" className="relative z-20 mr-2 flex items-center gap-2 px-1 py-1">
      <Image src="/logo-coddex.png" alt="logo" className="w-11" width={1080} height={1080} />
      <span className="text-base font-semibold text-foreground sm:text-lg">
        Codde<span className="text-green-500">X</span> Developer
      </span>
    </a>
  )
}

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "dark" | "gradient"
} & (React.ComponentPropsWithoutRef<"a"> | React.ComponentPropsWithoutRef<"button">)) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition duration-200 hover:-translate-y-0.5"

  const variantStyles = {
    primary: "border border-cyan-500/30 bg-cyan-500/20 text-cyan-700 dark:text-cyan-200",
    secondary: "border border-white/20 bg-transparent text-foreground",
    dark: "bg-neutral-900 text-white dark:bg-white dark:text-black",
    gradient: "bg-gradient-to-r from-cyan-500 to-blue-600 text-white",
  }

  return (
    <Tag href={href || undefined} className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {children}
    </Tag>
  )
}

