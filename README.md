# jakeparr.dev

Personal portfolio built with Next.js: an intro, embedded project demos, and links.

## Tech stack

- **Framework:** Next.js 16 (App Router), static export
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Hosting:** Cloudflare Workers (static assets)
- **Tests:** Playwright (e2e)

## Getting started

```bash
npm install       # install dependencies
npm run dev       # dev server at http://localhost:3000
npm run build     # production build -> ./out
npm run lint      # eslint
npm run test:e2e  # playwright e2e (starts a server if needed)
```

## Project structure

- `app/` — App Router: layout, page, global styles, per-project pages, app icons
- `components/` — page sections and icons
- `content/projects.ts` — the project list (drives the nav, the home page and `/projects/[slug]`)
- `lib/` — utilities (`cn` helper)
- `projects/` — git submodules, one per embedded project
- `scripts/build-projects.mjs` — builds each project into `public/apps/` (generated, gitignored)
- `e2e/` — Playwright specs

The site has no runtime dependencies beyond React and `lucide-react`.
`components.json` is kept so `npx shadcn add <component>` still works when a
UI primitive is actually needed.

## Deployment (Cloudflare Workers)

The site is a static export (`output: "export"` in `next.config.mjs`) served from
Cloudflare Workers' static assets. `wrangler.jsonc` is the source of truth: it has
no `main` script, only `assets.directory: "./out"`.

```bash
npm run deploy    # next build + wrangler deploy
npm run preview   # next build + wrangler dev (local)
```

Cloudflare dashboard build settings:

- **Build command:** `git submodule update --init --recursive && npm install && npm run build`
- **Deploy command:** `npx wrangler deploy`

The embedded projects are git submodules (public repos, plain `https` URLs, so no
credentials are needed). The build uses the commit this repo pins for each one — it
never pulls newer commits. To ship a project update, run
`git submodule update --remote`, then commit and push the new pointers. The submodule
init in the build command is there because the root `npm install` needs
`projects/*` present (they are npm workspaces); `scripts/build-projects.mjs` also
inits any missing submodule and fails the build, rather than silently skipping the
embed, if it can't.

Do not let wrangler auto-configure this project. With no `wrangler.jsonc` present it
detects "Next.js", runs `@opennextjs/cloudflare migrate`, and tries to bundle a
server-side Worker from `.next/standalone` — a directory a static export never
produces. That is what the `pages-manifest.json` ENOENT failure was.
