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
              <p className="mb-1 font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
                Location
              </p>
              <p className="text-sm text-foreground">Internet</p>
            </div>
            <div>
              <p className="mb-1 font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
                Focus
              </p>
              <p className="text-sm text-foreground">Full-stack web development</p>
            </div>
            <div>
              <p className="mb-1 font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
                Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {["TypeScript", "React", "Next.js", "Node.js", "Go", "PostgreSQL"].map(
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

            <div className="flex gap-4 pt-2">
              <a
                href="https://github.com/jakeparr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                GitHub
              </a>
              <a
                href="https://x.com/jakeparr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                X / Twitter
              </a>
              <a
                href="https://linkedin.com/in/jakeparr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-muted-foreground transition-colors hover:text-primary"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right column — bio */}
          <div className="flex flex-col gap-5">
            <p className="text-base leading-relaxed text-muted-foreground">
              I am a software developer interested in the intersection of design
              and engineering. My work spans web applications, developer tools,
              and distributed systems.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              I believe in building software that is fast, accessible, and
              thoughtfully crafted. Most of my time is spent writing TypeScript
              and Go, exploring new patterns in web architecture, and
              contributing to open source.
            </p>
            <p className="text-base leading-relaxed text-muted-foreground">
              When I am not coding, you will find me reading about systems
              design, experimenting with new frameworks, or writing about what I
              have learned along the way.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
