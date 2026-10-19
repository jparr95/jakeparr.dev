#!/usr/bin/env node
// Builds each embedded project's own static web app and copies the result
// into public/apps/<slug>/, where the Next.js project pages iframe it. See
// content/projects.ts for the project list and architecture.md for why
// these are NOT bundled into the main app.
import { execSync } from "node:child_process"
import { existsSync, rmSync, cpSync, mkdirSync, readdirSync } from "node:fs"
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

// Make sure a submodule is checked out. Cloudflare's build may or may not
// clone submodules for us, so fetch any that are missing (they're public
// repos on https, so no credentials are needed). Never updates one that's
// already present — the site builds the commit this repo pins.
function ensureSubmodule(dir) {
  const rel = `projects/${dir}`
  const projectDir = path.join(root, rel)
  if (existsSync(projectDir) && readdirSync(projectDir).length > 0) return
  console.log(`[build-projects] ${rel} is empty, running git submodule update --init...`)
  try {
    execSync(`git submodule update --init --recursive -- ${rel}`, { cwd: root, stdio: "inherit" })
  } catch {
    // fall through to the check below for a clear error
  }
  if (!existsSync(projectDir) || readdirSync(projectDir).length === 0) {
    throw new Error(
      `[build-projects] ${rel} is missing and could not be fetched. ` +
        `Run 'git submodule update --init --recursive' (needs a .git directory and network access).`
    )
  }
}

for (const app of apps) {
  ensureSubmodule(app.dir)
  const projectDir = path.join(root, "projects", app.dir)

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

  // Deps come from the root install (npm workspaces — see package.json), so
  // there's no per-project `npm install`.
  console.log(`[build-projects] building ${app.dir}...`)
  execSync(`npm run build -w projects/${app.dir}`, { cwd: root, stdio: "inherit" })

  const distDir = path.join(projectDir, app.dist)
  if (!existsSync(distDir)) {
    throw new Error(`[build-projects] ${app.dir} build finished but ${app.dist}/ is missing`)
  }

  cpSync(distDir, outDir, { recursive: true })
  console.log(`[build-projects] -> public/apps/${app.slug}`)
}
