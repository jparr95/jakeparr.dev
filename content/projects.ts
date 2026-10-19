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
    repoUrl: "https://github.com/JakeQAWolf/OmniPhys-Particle-Sandbox",
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
    repoUrl: "https://github.com/jparr95/ScaleOfEverything",
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
      "A hands-on mechatronics course built on MuJoCo: write controllers against real robot models, run them in a physics simulator, and get graded on the result. Currently a native desktop app (MuJoCo's viewer needs a native window); a browser-playable version is in progress.",
    tech: ["Python", "MuJoCo", "NiceGUI"],
    category: "mine",
    repoUrl: "https://github.com/jparr95/MechLearning",
    year: 2026,
    status: "wip",
  },
]

export function getProjectsByCategory(category: ProjectCategory) {
  return projects.filter((p) => p.category === category)
}

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug)
}
