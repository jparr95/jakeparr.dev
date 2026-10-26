import Link from "next/link"
import { IconArrowUpRight } from "@/components/icons/arrow-up-right"
import { getProjectsByCategory } from "@/content/projects"

const statusLabel = {
  live: "live",
  wip: "work in progress",
  archived: "archived",
} as const

export function ProjectsSection() {
  const mine = getProjectsByCategory("mine")

  return (
    <section id="projects" className="border-t border-border py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 flex items-baseline justify-between">
          <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Projects
          </h2>
          <span className="hidden text-xs text-muted-foreground sm:inline">
            Live demos, embedded on each page
          </span>
        </div>

        <div className="flex flex-col">
          {mine.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`group flex flex-col gap-3 py-6 transition-colors hover:bg-secondary/30 sm:flex-row sm:items-start sm:justify-between sm:gap-8 ${
                index !== mine.length - 1 ? "border-b border-border/50" : ""
              }`}
            >
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-widest text-primary/70 uppercase">
                    {statusLabel[project.status]}
                  </span>
                  <span className="text-border" aria-hidden="true">{"/"}</span>
                  <span className="font-mono text-[11px] tracking-wider text-muted-foreground">
                    {project.tech.join(" · ")}
                  </span>
                </div>

                <h3 className="mb-1 text-base font-medium text-foreground transition-colors group-hover:text-primary">
                  {project.title}
                </h3>

                <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
                  {project.tagline}
                </p>
              </div>

              <div className="flex shrink-0 items-center self-start pt-1">
                <IconArrowUpRight className="h-4 w-4 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
