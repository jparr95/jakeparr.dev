export type ProjectCategory = "mine" | "loved"

export type Project = {
  slug: string
  title: string
  tagline: string
  description: string
  tech: string[]
  category: ProjectCategory
  repoUrl: string
  /** Present only for "mine" projects with a built, embeddable web demo. */
  embed?: {
    path: string
    /** "takeover" fills the viewport below the site header instead of the usual project page. */
    layout?: "takeover"
  }
  /** A hosted external site, for projects that are linked out rather than embedded. */
  siteUrl?: string
  /** Required for "loved" projects; never set for "mine". */
  attribution?: {
    author: string
    authorUrl?: string
    license?: string
  }
  year: number
  status: "live" | "wip" | "archived"
}

export const projects: Project[] = [
  {
    slug: "omniphys-particle-sandbox",
    title: "OmniPhys Particle Sandbox",
    tagline: "See how charged particles really move through electric and magnetic fields.",
    description:
      "A field-physics lab in the browser. Fire electrons, protons and alpha particles through electric and magnetic fields and watch cyclotron orbits, E×B drift, a Wien filter, a mass spectrometer, a magnetic bottle and Rutherford scattering. Each guided experiment compares the measured result with the textbook prediction live. A Particle Zoo tab explores the Standard Model, wave packets, atomic orbitals and the double slit.",
    tech: ["React", "TypeScript", "Three.js", "WebGL", "Web Workers"],
    category: "mine",
    repoUrl: "https://github.com/JPs-works/OmniPhysParticleSandbox",
    embed: { path: "/apps/omniphys-particle-sandbox/index.html" },
    year: 2026,
    status: "live",
  },
  {
    slug: "scale-of-everything",
    title: "Scale of Everything",
    tagline: "A 3D sense of scale, from the Planck length to the observable universe.",
    description:
      "An interactive 3D scale-comparison tool. Scroll, drag or pinch through 62 orders of magnitude, from the Planck length to the observable universe, and compare any two of 32 objects side by side at true relative size. Real models and NASA imagery sit alongside procedural scenes for the things nobody can photograph, with full credits in the app.",
    tech: ["React", "Three.js", "react-three-fiber", "glTF"],
    category: "mine",
    repoUrl: "https://github.com/JPs-works/ScaleOfEverything",
    embed: { path: "/apps/scale-of-everything/index.html" },
    year: 2026,
    status: "live",
  },
  {
    slug: "mechlearning",
    title: "MechLearning",
    tagline:
      "Learn mechatronics through simulation — a crash course and a sandbox of robot-control exercises.",
    description:
      "A hands-on mechatronics course built on MuJoCo, running entirely in the browser. Pick a lesson, read the docs, edit the Python controller and watch a pendulum, a Franka Panda arm or a Unitree Go2 respond in 3D. Sliders stay in sync with the code, and each lesson grades your controller with the same checks as the desktop course. MuJoCo runs as WebAssembly and Python runs through Pyodide, with nothing to install.",
    tech: ["Python", "MuJoCo (WebAssembly)", "Pyodide", "Three.js", "React"],
    category: "mine",
    repoUrl: "https://github.com/JPs-works/MechLearning",
    embed: { path: "/apps/mechlearning/index.html", layout: "takeover" },
    year: 2026,
    status: "wip",
  },
  {
    slug: "in-the-bag",
    title: "In The Bag",
    tagline: "A disc golf website, built while learning HTML, CSS and JavaScript.",
    description:
      "A disc golf website from my early days of learning web development. It is hosted separately on GitHub Pages, so it opens in its own tab rather than embedding here.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "mine",
    repoUrl: "https://github.com/jparr95/In-The-Bag",
    siteUrl: "https://jparr95.github.io/In-The-Bag/",
    year: 2022,
    status: "archived",
  },
]

export function getProjectsByCategory(category: ProjectCategory) {
  return projects.filter((p) => p.category === category)
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug)
}
