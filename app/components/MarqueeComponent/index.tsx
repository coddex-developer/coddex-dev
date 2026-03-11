import {
  SiBootstrap,
  SiEjs,
  SiExpress,
  SiGit,
  SiGithub,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiSass,
  SiTailwindcss,
  SiTypescript,
} from "@icons-pack/react-simple-icons"

import Marquee from "@/components/ui/marquee"
import { Flex } from "@radix-ui/themes"

export function MarqueeComponent() {
  return (
    <Marquee grayscale={false} fade pauseOnHover className="py-8">
      <Logo><SiReact size={32} color="currentColor" /></Logo>
      <Logo><SiNextdotjs size={32} color="currentColor" /></Logo>
      <Logo><SiPostgresql size={32} color="currentColor" /></Logo>
      <Logo><SiGit size={32} color="currentColor" /></Logo>
      <Logo><SiGithub size={32} color="currentColor" /></Logo>
      <Logo><SiExpress size={32} color="currentColor" /></Logo>
      <Logo><SiBootstrap size={32} color="currentColor" /></Logo>
      <Logo><SiTypescript size={32} color="currentColor" /></Logo>
      <Logo><SiJavascript size={32} color="currentColor" /></Logo>
      <Logo><SiTailwindcss size={32} color="currentColor" /></Logo>
      <Logo><SiSass size={32} color="currentColor" /></Logo>
      <Logo><SiPrisma size={32} color="currentColor" /></Logo>
      <Logo><SiEjs size={32} color="currentColor" /></Logo>
      <Logo><SiNodedotjs size={32} color="currentColor" /></Logo>
    </Marquee>
  )
}

function Logo({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      align="center"
      justify="center"
      className="
        mx-6
        shrink-0
        text-neutral-700
        dark:text-neutral-300
        transition-all duration-300
        hover:scale-110
        hover:text-cyan-500
      "
    >
      <div className="px-6 py-4 flex items-center justify-center">
        {children}
      </div>
    </Flex>
  )
}