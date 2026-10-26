"use client"

import { useState } from "react"

const hobbies = [
  "Kite Flying",
  "Coffee Connoisseur",
  "Working Out",
  "Knitting",
  "Crochet",
  "Tai Kwon Do",
  "Parkour",
  "NFC Tag Automation",
  "Mechanical Keyboards",
]

export function HobbyGenerator() {
  const [hobby, setHobby] = useState<string | null>(null)

  function generate() {
    setHobby(hobbies[Math.floor(Math.random() * hobbies.length)])
  }

  return (
    <div className="flex flex-col items-start gap-4 border border-border/50 bg-card/30 p-6">
      <button
        onClick={generate}
        className="border border-primary/60 px-4 py-2 font-mono text-xs tracking-widest text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        Generate
      </button>
      <p aria-live="polite" className="text-sm text-muted-foreground">
        {hobby ? `I think I'm going to try ${hobby} next!` : "Click the button to generate."}
      </p>
    </div>
  )
}
