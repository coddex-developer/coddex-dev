import { StickyScrollComponent } from "@/app/components/StickyScrollComponent"
import { BackgroundBeams } from "@/app/components/ui/background-beams"
import { ContainerTextFlip } from "@/app/components/ui/container-text-flip"
import { Box } from "@radix-ui/themes"

export default function HomePage() {
    return (
        <>
            <Box>
                <Box as="div" className="h-screen relative bg-blue-300">
                    <Box className="relative bg-amber-300 top-1/3">
                        <p className="relative z-10 text-5xl md:text-7xl  bg-clip-text text-transparent bg-linear-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
                            Gabriel Rodrigues
                        </p>
                        <Box className="text-center relative">
                            <ContainerTextFlip words={["Desenvolverdor Front-End", "Desenvolverdor Back-Edn", "Desenvolverdor Api-Rest"]} />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className="">
                <StickyScrollComponent />
            </Box>
        </>
    )
}