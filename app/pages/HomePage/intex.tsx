import { StickyScrollComponent } from "@/app/components/StickyScrollComponent"
import TimelineComponent from "@/app/components/TimeLineComponent"
import { ContainerTextFlip } from "@/app/components/ui/container-text-flip"
import { Box, Flex } from "@radix-ui/themes"
import { ChevronDown } from "lucide-react"

export default function HomePage() {
    return (
        <>
            <Box className="w-full">
                <Flex justify={"center"} className="flex-col items-center h-screen">
                    <p className="text-4xl md:text-7xl  bg-clip-text text-transparent bg-linear-to-b from-neutral-400 dark:from-neutral-200 to-neutral-700  text-center font-sans font-bold">
                        Gabriel Rodrigues
                    </p>
                    <Box className="">
                        <ContainerTextFlip words={["Desenvolverdor Front-End", "Desenvolverdor Back-Edn", "Desenvolverdor Api-Rest"]} />
                    </Box>
                </Flex>
                <ChevronDown size={35} className="absolute opacity-50 text-neutral-700 dark:text-neutral-400 block right-1/2 top-10/12 animate-bounce duration-200 ease-in-out" />
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