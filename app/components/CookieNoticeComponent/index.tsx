"use client"

import { useEffect, useState } from "react"
import { siteConfig } from "@/app/config/site"

export function CookieNoticeComponent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent")
    if (!accepted) setVisible(true)
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[95] mx-auto w-[min(960px,calc(100vw-2rem))] rounded-xl border border-cyan-500/30 bg-background/95 p-4 shadow-[0_0_30px_rgba(6,182,212,0.18)] backdrop-blur-md">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted-foreground">
          Este site utiliza cookies para melhorar sua experiencia, analisar navegacao e personalizar conteudo.
          <a
            href={siteConfig.links.cookiePolicy}
            target="_blank"
            rel="noreferrer"
            className="ml-1 text-cyan-600 underline-offset-4 hover:underline dark:text-cyan-300"
          >
            Politica de Cookies
          </a>
        </p>
        <button
          onClick={acceptCookies}
          className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-400"
        >
          Entendi
        </button>
      </div>
    </div>
  )
}

