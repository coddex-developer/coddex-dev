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
      <Logo><SiReact color="#61DAFB" /></Logo>
      <Logo><SiNextdotjs color="#000000" /></Logo>
      <Logo><SiPostgresql color="#4169E1" /></Logo>
      <Logo><SiGit color="#F05032" /></Logo>
      <Logo><SiGithub color="#181717" /></Logo>
      <Logo><SiExpress color="#000000" /></Logo>
      <Logo><SiBootstrap color="#7952B3" /></Logo>
      <Logo><SiTypescript color="#3178C6" /></Logo>
      <Logo><SiJavascript color="#F7DF1E" /></Logo>
      <Logo><SiTailwindcss color="#06B6D4" /></Logo>
      <Logo><SiSass color="#CC6699" /></Logo>
      <Logo><SiPrisma color="#2D3748" /></Logo>
      <Logo><SiEjs color="#B4CA65" /></Logo>
      <Logo><SiNodedotjs color="#339933" /></Logo>
    </Marquee>
  );
}


function Logo({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        flex items-center justify-center
        mx-6 shrink-0
        w-14 h-14
        sm:w-16 sm:h-16
        md:w-20 md:h-20
        lg:w-24 lg:h-24
        xl:w-28 xl:h-28
        transition-transform duration-300
        hover:scale-110
      "
    >
      <div className="w-[70%] h-[70%]">
        {children}
      </div>
    </div>
  );
}