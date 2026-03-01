import { StickyScrollComponent } from "@/app/components/StickyScrollComponent"
import TimelineComponent from "@/app/components/TimeLineComponent"
import { ContainerTextFlip } from "@/app/components/ui/container-text-flip"
import { Box } from "@radix-ui/themes"

export default function HomePage() {
    return (
        <>
            <Box>
                <Box as="div" className="h-screen relative">
                    <Box className="relative top-1/3">
                        <p className="relative z-10 text-4xl md:text-7xl  bg-clip-text text-transparent bg-linear-to-b from-neutral-400 dark:from-neutral-200 to-neutral-700  text-center font-sans font-bold">
                            Gabriel Rodrigues
                        </p>
                        <Box className="text-center relative">
                            <ContainerTextFlip words={["Desenvolverdor Front-End", "Desenvolverdor Back-Edn", "Desenvolverdor Api-Rest"]} />
                        </Box>
                    </Box>
                </Box>
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