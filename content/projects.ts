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
    tagline: "An interactive particle physics playground in the browser.",
    description:
      "A real-time particle simulation sandbox: tune forces live, watch an oscilloscope of the system's behavior, and inspect the underlying simulation model as it runs.",
    tech: ["React", "TypeScript", "Vite"],
    category: "mine",
    repoUrl: "https://github.com/JPs-works/OmniPhysParticleSandbox",
    embed: { path: "/apps/omniphys-particle-sandbox/index.html" },
    year: 2026,
    status: "live",
  },
  {
    slug: "scale-of-everything",
    title: "Scale of Everything",
    tagline: "A 3D, zoomable sense of scale, from quarks to galaxies.",
    description:
      "An interactive 3D scale-comparison tool built on react-three-fiber. Drag through scales from the subatomic to the cosmic and compare real-world objects against each other.",
    tech: ["React", "Three.js", "react-three-fiber"],
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
      "A hands-on mechatronics course built on MuJoCo: write controllers against real robot models, run them in a physics simulator, and get graded on the result. The full course runs as a native desktop app (MuJoCo's viewer needs a native window) — the embed above is a browser port of just the pendulum swing-up lesson: same physics and controller (energy-pump control, then a PD balance near upright), reimplemented in canvas so it runs without installing anything.",
    tech: ["Python", "MuJoCo", "NiceGUI", "JavaScript (browser port)"],
    category: "mine",
    repoUrl: "https://github.com/JPs-works/MechLearning",
    embed: { path: "/apps/mechlearning/index.html" },
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
