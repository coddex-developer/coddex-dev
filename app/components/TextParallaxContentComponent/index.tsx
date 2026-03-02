"use client"

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"
import { CircleFadingArrowUp } from "lucide-react"
import {
  useRef,
  type ReactNode,
  type FC,
} from "react"

const IMG_PADDING = 12

interface TextParallaxContentProps {
  imgUrl: string
  subheading: string
  heading: string
  children?: ReactNode
}

interface StickyImageProps {
  imgUrl: string
}

interface OverlayCopyProps {
  subheading: string
  heading: string
}

export const TextParallaxContentComponent: FC = () => {
  return (
    <div className="bg-white">
      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
        subheading="Collaborate"
        heading="Built for all of us."
      >
        <ExampleContent />
      </TextParallaxContent>

      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1530893609608-32a9af3aa95c"
        subheading="Quality"
        heading="Never compromise."
      >
        <ExampleContent />
      </TextParallaxContent>

      <TextParallaxContent
        imgUrl="https://images.unsplash.com/photo-1504610926078-a1611febcad3"
        subheading="Modern"
        heading="Dress for the best."
      >
        <ExampleContent />
      </TextParallaxContent>
    </div>
  )
}

const TextParallaxContent: FC<TextParallaxContentProps> = ({
  imgUrl,
  subheading,
  heading,
  children,
}) => {
  return (
    <section
      style={{
        paddingInline: IMG_PADDING,
      }}
    >
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy
          heading={heading}
          subheading={subheading}
        />
      </div>

      {children}
    </section>
  )
}

const StickyImage: FC<StickyImageProps> = ({
  imgUrl,
}) => {
  const targetRef =
    useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  })

  const scale: MotionValue<number> =
    useTransform(scrollYProgress, [0, 1], [1, 0.85])

  const opacity: MotionValue<number> =
    useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <motion.div
      ref={targetRef}
      className="sticky top-3 z-0 overflow-hidden rounded-3xl"
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${
          IMG_PADDING * 2
        }px)`,
        scale,
      }}
    >
      <motion.div
        className="absolute inset-0 bg-neutral-950/70"
        style={{ opacity }}
      />
    </motion.div>
  )
}

const OverlayCopy: FC<OverlayCopyProps> = ({
  subheading,
  heading,
}) => {
  const targetRef =
    useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [250, -250]
  )

  const opacity = useTransform(
    scrollYProgress,
    [0.25, 0.5, 0.75],
    [0, 1, 0]
  )

  return (
    <motion.div
      ref={targetRef}
      style={{ y, opacity }}
      className="absolute inset-0 flex h-screen w-full flex-col items-center justify-center text-white"
    >
      <p className="mb-2 text-center text-xl md:text-3xl">
        {subheading}
      </p>

      <h2 className="text-center text-4xl font-bold md:text-7xl">
        {heading}
      </h2>
    </motion.div>
  )
}

const ExampleContent: FC = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
      Additional content explaining the above card
    </h2>

    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
        Lorem ipsum dolor sit amet consectetur
        adipisicing elit.
      </p>

      <p className="mb-8 text-xl text-neutral-600 md:text-2xl">
        Accusantium reiciendis blanditiis aliquam.
      </p>

      <button className="flex items-center gap-2 rounded bg-neutral-900 px-9 py-4 text-xl text-white transition hover:bg-neutral-700">
        Learn more
        <CircleFadingArrowUp />
      </button>
    </div>
  </div>
)