import Link from "next/link"

export function AboutSection() {
  return (
    <section id="about" className="border-t border-border py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12">
          <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            About
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          {/* Left column — quick facts */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-1 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                Focus
              </p>
              <p className="text-sm text-foreground">Software, automation, robotics</p>
            </div>
            <div>
              <p className="mb-1 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {["TypeScript", "React", "Python", "Swift", "Kotlin", "Appium", "MuJoCo"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="border border-border/50 px-2 py-0.5 font-mono text-[10px] tracking-wider text-muted-foreground"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="https://github.com/jparr95"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                GitHub (jparr95)
              </a>
              <a
                href="https://github.com/JPs-works"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                GitHub (JPs-works)
              </a>
              <a
                href="https://linkedin.com/in/jakeparr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                LinkedIn
              </a>
              <a
                href="https://x.com/jakeparr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                X / Twitter
              </a>
            </div>
          </div>

          {/* Right column — bio */}
          <div className="flex flex-col gap-5">
            <p className="text-base leading-relaxed text-muted-foreground">
              I am a software developer and automation specialist who likes to
              work where code meets the physical world. By day I build test
              automation across web and mobile; the rest of the time I tinker
              with robotics, simulation, and whatever hardware is on the bench.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              The fun is in the crossing: a controller typed into an editor
              swinging a pendulum upright, a browser rendering the scale of the
              universe, a script pressing the buttons on a phone so a person
              does not have to. Software is imagination written down; hardware
              is where it gets to move.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              This site is the short version. The projects above are the long
              version, and the links on this page are where to find me.
            </p>
            <Link
              href="/about"
              className="font-mono text-sm text-primary transition-colors hover:text-foreground"
            >
              Read the longer story &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
