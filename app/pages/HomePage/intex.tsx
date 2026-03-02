"use client"
import { TextGenerateEffectComponent } from "@/app/components/TextGenerateEffectComponent/intex"
import { TextParallaxContentComponent } from "@/app/components/TextParallaxContentComponent"
import { ContainerTextFlip } from "@/app/components/ui/container-text-flip"
import WrapperPopUpComponent from "@/app/components/WrapperPopUpComponent"
import { BlurFade } from "@/components/ui/blur-fade"
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
                        <WrapperPopUpComponent />
                    </Flex>
                </Flex>
                <ChevronDown size={35} className="absolute opacity-50 text-neutral-700 dark:text-neutral-400 block text-center -translate-x-1/2 -translate-y-1/2 left-1/2 top-10/12 animate-bounce duration-200 ease-in-out" />
            </Box>
            <Box>
                <Flex className="flex-col items-center gap-1 md:text-base w-full mb-5 py-7 md:py-32  rounded-lg px-4 md:px-8 lg:px-10">
                
                <h2 className="text-xl md:text-4xl mb-4 text-black dark:text-white text-center">
                    <TextGenerateEffectComponent />
                </h2>

                <p className="text-neutral-700 dark:text-neutral-300 text-center text-sm md:text-base max-w-ld">
                    Desde 2022 venho evoluindo continuamente na área de desenvolvimento de software,
                    aprendendo novas tecnologias, construindo projetos reais e aprimorando minhas
                    habilidades em Front-End, Back-End e desenvolvimento Full Stack.
                </p>
            </Flex>
            </Box>
            <Box>
                <TextParallaxContentComponent />
            </Box>
        </>
    )
}