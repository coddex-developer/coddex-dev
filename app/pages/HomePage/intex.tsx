import { StickyScrollComponent } from "@/app/components/StickyScrollComponent"
import TimelineComponent from "@/app/components/TimeLineComponent"
import { ContainerTextFlip } from "@/app/components/ui/container-text-flip"
import { BlurFade } from "@/components/ui/blur-fade"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"
import { Box, Flex } from "@radix-ui/themes"
import { ChevronDown } from "lucide-react"

export default function HomePage() {
    return (
        <>
            <Box className="w-full relative">
                <Flex justify={"center"} className="flex-col items-center h-screen">
                    <BlurFade>
                        <p className="text-4xl md:text-7xl  bg-clip-text text-transparent bg-linear-to-b from-neutral-400 dark:from-neutral-200 to-neutral-700  text-center font-sans font-bold">
                            Gabriel Rodrigues
                        </p>
                    </BlurFade>
                    <Flex className="w-full items-center max-w-xl flex-col gap-6">
                        <ContainerTextFlip words={["Desenvolverdor Front-End", "Desenvolverdor Back-Edn", "Desenvolverdor Api-Rest"]} />
                        <InteractiveHoverButton>Entrar em contato</InteractiveHoverButton>
                    </Flex>
                </Flex>
                <ChevronDown size={35} className="absolute opacity-50 text-neutral-700 dark:text-neutral-400 block text-center -translate-x-1/2 -translate-y-1/2 left-1/2 top-10/12 animate-bounce duration-200 ease-in-out" />
            </Box>
            <Box className="">
                <TimelineComponent />
            </Box>
            <Box>
                <StickyScrollComponent />
            </Box>
        </>
    )
}