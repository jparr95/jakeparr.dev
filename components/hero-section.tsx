"use client"

import { useEffect, useRef } from "react"

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  /** Where the particle wants to be. The home itself wanders slowly, so the field keeps its drift. */
  homeX: number
  homeY: number
  driftX: number
  driftY: number
  size: number
  opacity: number
}

type Ripple = { x: number; y: number; born: number }

// Pointer hover acts like a magnet of the same pole: particles inside HOVER_RADIUS are
// pushed away, harder the closer they are. A click on the background fires a one-off
// blast with a wider radius and much more force, plus a visible ripple. A weak spring
// pulls every particle back to its (slowly drifting) home so the field always re-forms.
const HOVER_RADIUS = 160
const HOVER_STRENGTH = 1.1
const BLAST_RADIUS = 440
const BLAST_STRENGTH = 26
const RIPPLE_MS = 650
const MAX_SPEED = 20
const SPRING = 0.0025
/** Velocity kept per 60 Hz frame; the rest is shed as damping. */
const DAMP = 0.94
const CONNECT_DIST = 120
const FRAME_MS = 1000 / 60
const ACCENT = "56, 199, 176"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let animationId = 0
    let lastFrame = 0
    let blasts = 0
    const particles: Particle[] = []
    const ripples: Ripple[] = []
    const pointer = { x: 0, y: 0, active: false }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const initParticles = () => {
      particles.length = 0
      const count = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 15000)
      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.offsetWidth
        const y = Math.random() * canvas.offsetHeight
        const driftX = (Math.random() - 0.5) * 0.3
        const driftY = (Math.random() - 0.5) * 0.3
        particles.push({
          x,
          y,
          vx: driftX,
          vy: driftY,
          homeX: x,
          homeY: y,
          driftX,
          driftY,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
        })
      }
    }

    /** Push every particle within `radius` of (x, y) directly away from it. */
    const repel = (x: number, y: number, radius: number, strength: number) => {
      for (const p of particles) {
        const dx = p.x - x
        const dy = p.y - y
        const dist = Math.hypot(dx, dy)
        if (dist >= radius) continue
        // Quadratic falloff: strong up close, gentle at the edge of the field.
        const falloff = 1 - dist / radius
        const force = falloff * falloff * strength
        // A particle sitting exactly on the pointer has no direction; nudge it anywhere.
        const nx = dist > 0.001 ? dx / dist : Math.cos(p.opacity * 20)
        const ny = dist > 0.001 ? dy / dist : Math.sin(p.opacity * 20)
        p.vx += nx * force
        p.vy += ny * force
      }
    }

    /** Advance the simulation by `dt` frames (1 = one 60 Hz frame). */
    const step = (dt: number) => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const damp = Math.pow(DAMP, dt)

      if (pointer.active) repel(pointer.x, pointer.y, HOVER_RADIUS, HOVER_STRENGTH * dt)

      for (const p of particles) {
        // The home wanders at the drift speed and bounces off the edges.
        p.homeX += p.driftX * dt
        p.homeY += p.driftY * dt
        if (p.homeX < 0) {
          p.homeX = 0
          p.driftX = Math.abs(p.driftX)
        } else if (p.homeX > w) {
          p.homeX = w
          p.driftX = -Math.abs(p.driftX)
        }
        if (p.homeY < 0) {
          p.homeY = 0
          p.driftY = Math.abs(p.driftY)
        } else if (p.homeY > h) {
          p.homeY = h
          p.driftY = -Math.abs(p.driftY)
        }

        // Spring back toward home, damped, so a pushed particle settles instead of flying forever.
        p.vx = (p.vx + (p.homeX - p.x) * SPRING * dt) * damp
        p.vy = (p.vy + (p.homeY - p.y) * SPRING * dt) * damp

        const speed = Math.hypot(p.vx, p.vy)
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED
          p.vy = (p.vy / speed) * MAX_SPEED
        }

        p.x += p.vx * dt
        p.y += p.vy * dt

        // Clamp so a hard blast can't tunnel a particle out of view.
        if (p.x < 0) {
          p.x = 0
          p.vx = Math.abs(p.vx)
        } else if (p.x > w) {
          p.x = w
          p.vx = -Math.abs(p.vx)
        }
        if (p.y < 0) {
          p.y = 0
          p.vy = Math.abs(p.vy)
        } else if (p.y > h) {
          p.y = h
          p.vy = -Math.abs(p.vy)
        }
      }
    }

    const draw = (now: number) => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${ACCENT}, ${p.opacity})`
        ctx.fill()
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECT_DIST) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${ACCENT}, ${0.06 * (1 - dist / CONNECT_DIST)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Blast ripples: an expanding ring that fades out over RIPPLE_MS.
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i]
        // Clamped at 0: a click stamped between two frames can be "younger" than this frame's
        // timestamp, and a negative radius would make ctx.arc throw and kill the loop.
        const t = Math.max(0, (now - r.born) / RIPPLE_MS)
        if (t >= 1) {
          ripples.splice(i, 1)
          continue
        }
        const eased = 1 - (1 - t) * (1 - t)
        ctx.beginPath()
        ctx.arc(r.x, r.y, eased * BLAST_RADIUS, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${ACCENT}, ${0.35 * (1 - t)})`
        ctx.lineWidth = 1.5 * (1 - t) + 0.5
        ctx.stroke()
      }
    }

    const animate = (now: number) => {
      // Time-based so the feel is the same at 60, 120 or 144 Hz; capped so a background
      // tab coming back doesn't integrate one giant step.
      const dt = lastFrame ? Math.min((now - lastFrame) / FRAME_MS, 3) : 1
      lastFrame = now
      step(dt)
      draw(now)
      animationId = requestAnimationFrame(animate)
    }

    const toCanvasPoint = (e: PointerEvent | MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const handlePointerMove = (e: PointerEvent) => {
      const { x, y } = toCanvasPoint(e)
      pointer.x = x
      pointer.y = y
      if (!pointer.active) {
        pointer.active = true
        canvas.dataset.pointer = "1"
      }
    }

    const handlePointerLeave = () => {
      pointer.active = false
      canvas.dataset.pointer = "0"
    }

    const handleClick = (e: MouseEvent) => {
      // Links and buttons keep their own behaviour; everything else in the hero is "background".
      if ((e.target as Element | null)?.closest("a, button")) return
      const { x, y } = toCanvasPoint(e)
      repel(x, y, BLAST_RADIUS, BLAST_STRENGTH)
      ripples.push({ x, y, born: lastFrame || performance.now() })
      canvas.dataset.blasts = String(++blasts)
    }

    resize()
    initParticles()

    if (reduceMotion) {
      // Still paint the constellation, but leave it still and non-reactive.
      draw(performance.now())
    } else {
      animationId = requestAnimationFrame(animate)
      section.addEventListener("pointermove", handlePointerMove)
      section.addEventListener("pointerleave", handlePointerLeave)
      section.addEventListener("click", handleClick)
    }
    // Marks the canvas as live; the e2e specs wait on it.
    canvas.dataset.ready = "1"

    const handleResize = () => {
      resize()
      initParticles()
      if (reduceMotion) draw(performance.now())
    }
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
      section.removeEventListener("pointermove", handlePointerMove)
      section.removeEventListener("pointerleave", handlePointerLeave)
      section.removeEventListener("click", handleClick)
      delete canvas.dataset.ready
      delete canvas.dataset.blasts
      delete canvas.dataset.pointer
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden pt-16"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-20">
        <div className="max-w-2xl">
          {/* Labels never break mid-phrase; the dots are decorative and the spaces stay readable. */}
          <p className="mb-4 font-mono text-sm tracking-widest text-primary uppercase">
            <span className="whitespace-nowrap">Software Developer</span>{" "}
            <span className="text-primary/40" aria-hidden="true">·</span>{" "}
            <span className="whitespace-nowrap">Automation Specialist</span>{" "}
            <span className="text-primary/40" aria-hidden="true">·</span>{" "}
            <span className="whitespace-nowrap">Robotics Hobbyist</span>
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            <span className="text-balance">Jake Parr</span>
          </h1>

          <p className="mb-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Crafting and innovating at the intersection of software and hardware,
            where the physical world meets the coded imagination.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 border border-primary bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
            >
              View projects
              <span aria-hidden="true">&rarr;</span>
            </a>
            <a
              href="#about"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              More about me
            </a>
          </div>
        </div>
      </div>

      {/* Decorative scanline */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-border"
        aria-hidden="true"
      />
    </section>
  )
}
