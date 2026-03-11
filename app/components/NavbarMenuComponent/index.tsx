"use client"

import { DownloadCloud } from "lucide-react"
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarButton,
  NavbarLogo,
  NavBody,
  NavItems,
} from "../ui/resizable-navbar"

import { useState } from "react"
import { AnimatedThemeToggler } from "../ui/AnimatedThemeToggler"
import { siteConfig } from "@/app/config/site"
import { toast } from "sonner"

interface TextItemsProps {
  name: string
  link: string
}

export function NavbarMenuComponent() {
  const navItems: TextItemsProps[] = [
    { name: "Sobre", link: "#features" },
    { name: "Projetos", link: "#projects" },
    { name: "Jornada", link: "#journey" },
    { name: "Contato", link: "#contact" },
  ]

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function handleDownload(ev: React.MouseEvent<HTMLAnchorElement>) {
      ev.preventDefault()
      toast.warning("CV indisponível", {
        description: "O currículo ainda não foi disponibilizado para download.",
      })
    
  }

  return (
    <div className="relative w-full">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />

          <div className="flex items-center gap-4">
            <AnimatedThemeToggler />

            <NavbarButton
              // href={siteConfig.links.cv || "#"}
              href={"#"}
              rel="noreferrer"
              onClick={handleDownload}
              className="flex items-center gap-1"
              variant="primary"
            >
              <DownloadCloud size={16} />
              Download CV
            </NavbarButton>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />

            <div className="flex items-center gap-2">
              <AnimatedThemeToggler />

              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-md px-2 py-1 text-sm text-neutral-700 transition hover:bg-cyan-500/10 hover:text-cyan-700 dark:text-neutral-200 dark:hover:text-cyan-200"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}

            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                href={siteConfig.links.cv || "#"}
                target="_blank"
                rel="noreferrer"
                onClick={(ev: React.MouseEvent<HTMLAnchorElement>) => {
                  handleDownload(ev)
                  setIsMobileMenuOpen(false)
                }}
                variant="primary"
                className="w-full justify-center gap-1"
              >
                <DownloadCloud size={16} />
                Download CV
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  )
}