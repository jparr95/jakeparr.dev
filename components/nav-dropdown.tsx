"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import type { Project } from "@/content/projects"

export function NavDropdown({ label, items }: { label: string; items: Project[] }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("click", onClickOutside)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("click", onClickOutside)
      document.removeEventListener("keydown", onKey)
    }
  }, [])

  if (items.length === 0) return null

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {label}
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute top-full right-0 z-50 mt-3 w-64 border border-border/50 bg-background/95 py-2 backdrop-blur-md"
        >
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/projects/${item.slug}`}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
