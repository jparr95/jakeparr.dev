"use client"

import { useEffect, useRef } from "react"

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const initParticles = () => {
      particles.length = 0
      const count = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 15000)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1
        if (p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(56, 199, 176, ${p.opacity})`
        ctx.fill()
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(56, 199, 176, ${0.06 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    resize()
    initParticles()
    animate()

    const handleResize = () => {
      resize()
      initParticles()
    }
    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden pt-16">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="mb-4 font-mono text-sm tracking-widest text-primary uppercase">
            Software Developer
          </p>

          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            <span className="text-balance">Jake Parr</span>
          </h1>

          <p className="mb-8 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Building software and writing about web development, systems design,
            and the craft of engineering. Based on the internet.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#writing"
              className="inline-flex items-center gap-2 border border-primary bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
            >
              Read the blog
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
