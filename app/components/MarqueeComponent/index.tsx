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

export function MarqueeComponent() {
  return (
    <Marquee
      grayscale={false}
      fade
      pauseOnHover
      className="py-8"
    >
      <Logo><SiReact size={40} color="#61DAFB" /></Logo>
      <Logo><SiNextdotjs size={40} color="#000000" /></Logo>
      <Logo><SiPostgresql size={40} color="#4169E1" /></Logo>
      <Logo><SiGit size={40} color="#F05032" /></Logo>
      <Logo><SiGithub size={40} color="#181717" /></Logo>
      <Logo><SiExpress size={40} color="#000000" /></Logo>
      <Logo><SiBootstrap size={40} color="#7952B3" /></Logo>
      <Logo><SiTypescript size={40} color="#3178C6" /></Logo>
      <Logo><SiJavascript size={40} color="#F7DF1E" /></Logo>
      <Logo><SiTailwindcss size={40} color="#06B6D4" /></Logo>
      <Logo><SiSass size={40} color="#CC6699" /></Logo>
      <Logo><SiPrisma size={40} color="#2D3748" /></Logo>
      <Logo><SiEjs size={40} color="#B4CA65" /></Logo>
      <Logo><SiNodedotjs size={40} color="#339933" /></Logo>
    </Marquee>
  );
}


function Logo({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        flex items-center justify-center
        mx-6 shrink-0
        transition-transform duration-300
        hover:scale-110
      "
    >
      <div>
        {children}
      </div>
    </div>
  );
}