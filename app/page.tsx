import { Box, Text } from "@radix-ui/themes";
import { BackgroundBeams } from "./components/ui/background-beams";
import { ContainerTextFlip } from "./components/ui/container-text-flip";
import { NavbarMenu } from "./components/NavbarMenu";

export default function Home() {
  return (
    <>
    <NavbarMenu />
      <Box as="div" className="w-dvw">
        <Box as="div" className="bg-gray-900">
          <Text as="p" className="relative z-10 text-4xl md:text-7xl  bg-clip-text text-transparent bg-linear-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            Gabriel Rodrigues
          </Text>
          <Text as="p" className="text-center">
            <ContainerTextFlip words={["Desenvolverdor Front-End", "Desenvolverdor Back-Edn", "Desenvolverdor Api-Rest"]}/>
          </Text>
        </Box>
        <BackgroundBeams className="bg-gray-50 h-dvh" />
      </Box>
    </>
  );
}
