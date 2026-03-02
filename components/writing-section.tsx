import { ArrowUpRight } from "lucide-react"

const posts = [
  {
    title: "On Building Resilient Distributed Systems",
    description: "Exploring patterns for fault tolerance and graceful degradation in modern microservices architectures.",
    date: "2026-02-14",
    tag: "systems",
  },
  {
    title: "The Case for Server Components",
    description: "Why the shift toward server-first rendering is more than a trend — it is a fundamental rethinking of web architecture.",
    date: "2026-01-28",
    tag: "web",
  },
  {
    title: "Type-Safe APIs with tRPC and Zod",
    description: "A practical guide to building end-to-end type-safe APIs that catch errors before they reach production.",
    date: "2025-12-10",
    tag: "typescript",
  },
  {
    title: "Rethinking State Management in 2026",
    description: "From Redux to signals — how the ecosystem evolved and what patterns actually matter for real applications.",
    date: "2025-11-22",
    tag: "web",
  },
]

function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function WritingSection() {
  return (
    <section id="writing" className="border-t border-border py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 flex items-baseline justify-between">
          <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            Writing
          </h2>
          <span className="hidden text-xs text-muted-foreground/60 sm:inline">
            Thoughts on code and craft
          </span>
        </div>

        <div className="flex flex-col">
          {posts.map((post, index) => (
            <a
              key={post.title}
              href="#writing"
              className={`group flex cursor-pointer flex-col gap-3 py-6 transition-colors hover:bg-secondary/30 sm:flex-row sm:items-start sm:justify-between sm:gap-8 ${
                index !== posts.length - 1 ? "border-b border-border/50" : ""
              }`}
            >
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-3">
                  <span className="font-mono text-[10px] tracking-widest text-primary/70 uppercase">
                    {post.tag}
                  </span>
                  <span className="text-border">{"/"}</span>
                  <time className="font-mono text-[10px] tracking-wider text-muted-foreground/60">
                    {formatDate(post.date)}
                  </time>
                </div>

                <h3 className="mb-1 text-base font-medium text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h3>

                <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">
                  {post.description}
                </p>
              </div>

              <div className="flex shrink-0 items-center self-start pt-1">
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
