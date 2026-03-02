import { IconArrowUpRight } from "@/components/icons/arrow-up-right"

const projects = [
  {
    name: "synthwave-ui",
    description: "A component library for building futuristic interfaces with React and Tailwind.",
    tech: ["React", "TypeScript", "Tailwind"],
    url: "#projects",
  },
  {
    name: "devlog",
    description: "A minimal, fast, markdown-powered blogging engine built on Next.js.",
    tech: ["Next.js", "MDX", "Static"],
    url: "#projects",
  },
  {
    name: "packet",
    description: "Real-time WebSocket message inspector for debugging distributed systems.",
    tech: ["Go", "WebSockets", "React"],
    url: "#projects",
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="border-t border-border py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 flex items-baseline justify-between">
          <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Projects
          </h2>
          <span className="hidden text-xs text-muted-foreground/60 sm:inline">
            Open source & side projects
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              className="group flex flex-col justify-between border border-border/50 bg-card/50 p-6 transition-all hover:border-primary/30 hover:bg-card"
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-mono text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                    {project.name}
                  </h3>
                  <IconArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </div>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] tracking-wider text-primary/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
