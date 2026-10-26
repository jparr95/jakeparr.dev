import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { HobbyGenerator } from "@/components/hobby-generator"

export const metadata: Metadata = {
  title: "About — Jake Parr",
  description:
    "The longer story: family, work, a tiny house on wheels, and the hobbies that keep me busy.",
}

type PhotoProps = {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
}

function Photo({ src, alt, width, height, caption }: PhotoProps) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-auto w-full border border-border/50"
      />
      {caption && (
        <figcaption className="mt-2 font-mono text-xs text-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  )
}

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-16 mb-4 font-mono text-xl font-medium text-foreground">{children}</h2>
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="mb-5 leading-relaxed text-foreground/90">{children}</p>
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 pt-32 pb-20">
      <Link
        href="/"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        &larr; back
      </Link>

      <header className="mt-6">
        <h1 className="mb-3 font-mono text-3xl font-medium text-foreground">Hi, I&apos;m Jake</h1>
        <p className="text-muted-foreground">
          The longer story, in the order I would tell it over coffee.
        </p>
      </header>

      <Photo src="/about/jake.jpg" alt="A photo of Jake" width={1200} height={1600} />

      <article>
        <Heading>Family</Heading>
        <Paragraph>
          I have a lovely family of five: my wife, Paige, my dog, Dipper, and my three cats, Van,
          Ash and Lola.
        </Paragraph>
        <Photo src="/about/paige-jake.jpg" alt="Paige and Jake" width={1600} height={1200} />
        <Paragraph>
          They may not be kids, but they are just as much a handful for Paige and me, and each of
          them has a personality of their own.
        </Paragraph>
        <Photo src="/about/dipper.jpg" alt="Dipper the dog" width={640} height={480} caption="Dipper" />
        <Photo src="/about/cats.jpg" alt="Van, Ash and Lola the cats" width={1600} height={1200} caption="Van, Ash and Lola" />

        <Heading>Work</Heading>
        <Paragraph>
          I spent seven years as a Security &amp; Automation Technician, doing low-voltage
          electrical work across New England. I grew a lot in communication, troubleshooting and
          customer relations, running training for new technicians and visiting customer sites to
          find and resolve service issues. Along the way I kept noticing how much of the growth was
          on the software side of things, and I started picking up IT and networking.
        </Paragraph>
        <Paragraph>
          After seeing how much my brother loved full-stack web development, I decided to chase
          software too. I left my job to study full-time while Paige worked in industrial design,
          and that bet paid off: today I am a QA Automation Engineer, writing end-to-end tests for
          web and mobile in TypeScript, Appium, Swift and Kotlin.
        </Paragraph>

        <Heading>The tiny house</Heading>
        <Paragraph>
          Paige and I built the tiny house we live in. We bought a travel trailer in the fall of
          2020, during the pandemic, and renovated it throughout the year until we moved in the
          fall of 2021. We planned only interior work to make it less of an RV and more of a home,
          but we learned that many RVs are not built to withstand New England weather, so the list
          of significant renovations kept growing.
        </Paragraph>
        <Photo src="/about/tiny-house-1.jpg" alt="The tiny house, exterior" width={640} height={480} />
        <Photo src="/about/tiny-house-2.jpg" alt="The tiny house, interior" width={1600} height={1200} />
        <Photo src="/about/tiny-house-3.jpg" alt="The tiny house, detail" width={640} height={480} />
        <Paragraph>
          We have been living happily ever since, enjoying the small footprint and the balance of
          indoor and outdoor life it provides.
        </Paragraph>

        <Heading>Tinkering</Heading>
        <Paragraph>
          I have always loved computers and electronics. I built my own gaming PC, set up my home
          network with a Pi-hole (an ad and tracker blocker), and love messing around with
          Raspberry Pi and Arduino boards.
        </Paragraph>
        <Photo src="/about/desk-setup.jpg" alt="Jake's desk setup" width={640} height={480} caption="The desk" />
        <Photo src="/about/soldering.jpg" alt="Soldering at the workbench" width={1600} height={1200} caption="The bench" />
        <Paragraph>
          My current fun project is custom LED lighting for a full-wall shelf system we built, and
          helping a friend turn a garage into a home gym got me increasingly into woodworking.
        </Paragraph>

        <Heading>Outdoors</Heading>
        <Paragraph>
          I enjoy hiking, hammocking, running and flying drones, and my latest outdoor obsession
          is disc golf. Sudoku and strategy board games fill the rest of the time.
        </Paragraph>
        <Photo src="/about/running.jpg" alt="Jake out running" width={426} height={640} />
        <Photo src="/about/drone.jpg" alt="Drone flying" width={1600} height={1200} />
        <Photo src="/about/hammock.jpg" alt="Hammocking" width={640} height={480} />
        <Paragraph>
          I even built a small{" "}
          <a
            href="https://jparr95.github.io/In-The-Bag/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4 hover:text-foreground"
          >
            disc golf website
          </a>
          , which lives with my other work on the projects list.
        </Paragraph>

        <Heading>What will be next?</Heading>
        <Paragraph>
          My hobbies tend to multiply faster than I can pick them up. When I cannot decide, I let
          a few lines of JavaScript choose for me. This was one of my first scripts while I was
          learning to code, and it is still my favorite way to settle the matter.
        </Paragraph>
        <HobbyGenerator />
      </article>
    </main>
  )
}
