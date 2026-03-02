export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="font-mono text-xs tracking-wider text-muted-foreground/50">
          jakeparr.dev
        </p>
        <p className="font-mono text-xs text-muted-foreground/40">
          {"Built with Next.js"}
        </p>
      </div>
    </footer>
  )
}
