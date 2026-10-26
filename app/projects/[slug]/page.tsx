import Link from "next/link"
import { notFound } from "next/navigation"
import { projects, getProjectBySlug } from "@/content/projects"
import { ProjectEmbed } from "@/components/project-embed"
import { IconArrowUpRight } from "@/components/icons/arrow-up-right"

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export const dynamicParams = false

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <main className="mx-auto max-w-5xl px-6 pt-32 pb-20">
      <Link
        href="/"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        &larr; back
      </Link>

      <div className="mt-6 mb-10">
        <div className="mb-2 flex flex-wrap items-center gap-3">
          <h1 className="font-mono text-2xl font-medium text-foreground">{project.title}</h1>
          {project.status === "wip" && (
            <span className="rounded border border-border/50 px-2 py-0.5 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
              work in progress
            </span>
          )}
        </div>
        <p className="max-w-2xl text-muted-foreground">{project.tagline}</p>
      </div>

      {project.embed ? (
        <ProjectEmbed src={project.embed.path} title={project.title} />
      ) : project.siteUrl ? (
        <div className="border border-border/50 bg-card/30 p-10 text-center">
          <a
            href={project.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 text-primary transition-colors hover:text-foreground"
          >
            Visit the live site
            <IconArrowUpRight className="h-4 w-4 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      ) : (
        <div className="border border-dashed border-border/50 bg-card/30 p-10 text-center text-sm text-muted-foreground">
          No live demo embedded yet — see the source below.
        </div>
      )}

      <div className="mt-10 grid gap-10 md:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="mb-3 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            About
          </h2>
          <p className="leading-relaxed text-foreground/90">{project.description}</p>
        </div>

        <div>
          <h2 className="mb-3 font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Details
          </h2>
          <ul className="space-y-3 text-sm">
            <li className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="font-mono text-[10px] tracking-wider text-primary/60">
                  {t}
                </span>
              ))}
            </li>
            <li>
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                source
                <IconArrowUpRight className="h-3 w-3 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
            {project.attribution && (
              <li className="text-muted-foreground">
                Built by{" "}
                {project.attribution.authorUrl ? (
                  <a
                    href={project.attribution.authorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-foreground"
                  >
                    {project.attribution.author}
                  </a>
                ) : (
                  project.attribution.author
                )}
                {project.attribution.license ? ` · ${project.attribution.license}` : ""}
              </li>
            )}
          </ul>
        </div>
      </div>
    </main>
  )
}
