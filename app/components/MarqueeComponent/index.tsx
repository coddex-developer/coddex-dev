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
} from "@icons-pack/react-simple-icons";

import Marquee from "@/components/ui/marquee";
import { Flex } from "@radix-ui/themes";

export function MarqueeComponent() {
  return (
    <Marquee
      grayscale={false}
      fade
      pauseOnHover
      className="py-8"
    >
      <Logo><SiReact size={32} color="#61DAFB" /></Logo>
      <Logo><SiNextdotjs size={32} color="#000000" /></Logo>
      <Logo><SiPostgresql size={32} color="#4169E1" /></Logo>
      <Logo><SiGit size={32} color="#F05032" /></Logo>
      <Logo><SiGithub size={32} color="#181717" /></Logo>
      <Logo><SiExpress size={32} color="#000000" /></Logo>
      <Logo><SiBootstrap size={32} color="#7952B3" /></Logo>
      <Logo><SiTypescript size={32} color="#3178C6" /></Logo>
      <Logo><SiJavascript size={32} color="#F7DF1E" /></Logo>
      <Logo><SiTailwindcss size={32} color="#06B6D4" /></Logo>
      <Logo><SiSass size={32} color="#CC6699" /></Logo>
      <Logo><SiPrisma size={32} color="#2D3748" /></Logo>
      <Logo><SiEjs size={32} color="#B4CA65" /></Logo>
      <Logo><SiNodedotjs size={32} color="#339933" /></Logo>
    </Marquee>
  );
}


function Logo({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      as="div"
      align="center"
      justify="center"
      className="
        mx-6
        shrink-0
        transition-transform duration-300
        hover:scale-110
      "
    >
      <div className="px-6 py-4 flex items-center justify-center">
        {children}
      </div>
    </Flex>
  );
}