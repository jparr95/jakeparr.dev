#!/usr/bin/env node
// Builds each embedded project's own static web app and copies the result
// into public/apps/<slug>/, where the Next.js project pages iframe it. See
// content/projects.ts for the project list and architecture.md for why
// these are NOT bundled into the main app.
import { execSync } from "node:child_process"
import { existsSync, rmSync, cpSync, mkdirSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")

// One entry per embeddable project, each living in projects/<dir>/ as a git
// submodule.
//   - `dist`: that project has its own package.json/toolchain — build it
//      with npm and copy this output folder (relative to the submodule root).
//   - `static`: no build step — just copy this folder (relative to the
//      submodule root) as-is. Use this for a plain HTML/JS demo that lives
//      inside a larger, non-web-app repo (e.g. MechLearning's
//      web/pendulum-swingup/, a port of one lesson — the rest of that repo
//      is a native Python/MuJoCo app, not something we build here).
const apps = [
  { dir: "omniphys-particle-sandbox", slug: "omniphys-particle-sandbox", dist: "dist" },
  { dir: "scale-of-everything", slug: "scale-of-everything", dist: "dist" },
  { dir: "mechlearning", slug: "mechlearning", static: "web/pendulum-swingup" },
]

for (const app of apps) {
  const projectDir = path.join(root, "projects", app.dir)
  if (!existsSync(projectDir)) {
    console.warn(
      `[build-projects] skipping ${app.dir} — not found. Run 'git submodule update --init --recursive' first?`
    )
    continue
  }

  const outDir = path.join(root, "public", "apps", app.slug)
  rmSync(outDir, { recursive: true, force: true })
  mkdirSync(outDir, { recursive: true })

  if (app.static) {
    const srcDir = path.join(projectDir, app.static)
    if (!existsSync(srcDir)) {
      throw new Error(`[build-projects] ${app.dir}: static source ${app.static} not found`)
    }
    cpSync(srcDir, outDir, { recursive: true })
    console.log(`[build-projects] (static copy) -> public/apps/${app.slug}`)
    continue
  }

  console.log(`[build-projects] installing deps for ${app.dir}...`)
  execSync("npm install", { cwd: projectDir, stdio: "inherit" })

  console.log(`[build-projects] building ${app.dir}...`)
  execSync("npm run build", { cwd: projectDir, stdio: "inherit" })

  const distDir = path.join(projectDir, app.dist)
  if (!existsSync(distDir)) {
    throw new Error(`[build-projects] ${app.dir} build finished but ${app.dist}/ is missing`)
  }

  cpSync(distDir, outDir, { recursive: true })
  console.log(`[build-projects] -> public/apps/${app.slug}`)
}
