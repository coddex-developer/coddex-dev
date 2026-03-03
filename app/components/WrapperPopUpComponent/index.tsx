"use client"

import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { useIsOpen } from "@/app/contexts/isOpenContext"

const WrapperPopUpComponent = () => {
  const { setIsOpen } = useIsOpen()

  return (
    <InteractiveHoverButton id="home-contact-trigger" onClick={() => setIsOpen(true)}>
      Entrar em contato
    </InteractiveHoverButton>
  )
}

export default WrapperPopUpComponent

