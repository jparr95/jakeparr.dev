"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { NavDropdown } from "@/components/nav-dropdown"
import { getProjectsByCategory } from "@/content/projects"

const navLinks = [
  { label: "projects", href: "#projects" },
  { label: "about", href: "#about" },
  { label: "story", href: "/about" },
]

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const mine = getProjectsByCategory("mine")
  const loved = getProjectsByCategory("loved")

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono text-sm tracking-wider text-primary">
          jakeparr.dev
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <NavDropdown label="my projects" items={mine} />
          </li>
          <li>
            <NavDropdown label="projects i love" items={loved} />
          </li>
          <li>
            <Link
              href="https://github.com/jparr95"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              github
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-muted-foreground transition-colors hover:text-foreground md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t border-border/50 bg-background/95 backdrop-blur-md md:hidden">
          <ul className="mx-auto flex max-w-5xl flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {mine.length > 0 && (
              <li className="pt-3">
                <span className="block px-0 py-1 font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
                  my projects
                </span>
                <ul>
                  {mine.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/projects/${p.slug}`}
                        className="block py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        onClick={() => setMobileOpen(false)}
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )}

            {loved.length > 0 && (
              <li className="pt-3">
                <span className="block px-0 py-1 font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
                  projects i love
                </span>
                <ul>
                  {loved.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/projects/${p.slug}`}
                        className="block py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        onClick={() => setMobileOpen(false)}
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )}

            <li className="pt-3">
              <Link
                href="https://github.com/jparr95"
                target="_blank"
                rel="noopener noreferrer"
                className="block py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                github
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
