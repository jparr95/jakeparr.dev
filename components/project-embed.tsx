"use client"

import { useEffect, useState } from "react"
import { Maximize2, Minimize2 } from "lucide-react"

export function ProjectEmbed({ src, title }: { src: string; title: string }) {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (!expanded) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setExpanded(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [expanded])

  return (
    <div
      className={
        expanded
          ? "fixed inset-4 z-50 flex flex-col border border-border bg-background shadow-2xl"
          : "relative flex flex-col border border-border/50 bg-card/30"
      }
    >
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">{title}</span>
        <button
          onClick={() => setExpanded((e) => !e)}
          className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          aria-label={expanded ? "Collapse demo" : "Expand demo"}
        >
          {expanded ? (
            <Minimize2 className="h-3.5 w-3.5" />
          ) : (
            <Maximize2 className="h-3.5 w-3.5" />
          )}
          {expanded ? "collapse" : "expand"}
        </button>
      </div>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-pointer-lock"
        className={expanded ? "w-full flex-1" : "h-[70vh] w-full"}
      />
    </div>
  )
}
