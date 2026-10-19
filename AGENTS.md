<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# jakeparr.dev

Personal site: a Next.js 16 static export (`output: "export"`) served from Cloudflare Workers static assets. See `README.md` for deployment.

## Layout

- `app/`, `components/`, `content/projects.ts`, `lib/` — the Next.js site. `content/projects.ts` is the project list.
- `projects/<name>/` — git submodules (JPs-works GitHub account), each embedded project's own source. Do not edit them as if they were part of the site; changes there must be committed and pushed in the submodule repo, then the pointer bumped here.
- `public/apps/<slug>/` — **generated, gitignored.** Built output of each project, iframed by `/projects/[slug]`. Never edit by hand.
- `scripts/build-projects.mjs` — builds each project and copies it into `public/apps/`.

## Architecture rules

- Projects are embedded via iframe, **not** bundled into the Next app. Keep them isolated.
- Root `package.json` uses npm workspaces for the Vite projects (`omniphys-particle-sandbox`, `scale-of-everything`). Run a single `npm install` at the root; never `npm install` inside a project. React is pinned to one version across all of them — keep it aligned when upgrading.
- `mechlearning` has no toolchain: `web/pendulum-swingup/` is copied as-is.
- To add a project: add the submodule, add an entry to `apps` in `scripts/build-projects.mjs`, add it to `content/projects.ts`, and (if it is a Vite app) add it to `workspaces`. Vite projects need `base: '/apps/<slug>/'`.
- `tsconfig.json` and `eslint.config.mjs` exclude `projects/` and `public/apps/`. Keep it that way, otherwise submodule sources and bundles break `next build` and lint.

## Commands

- `npm install` — after cloning run `git submodule update --init --recursive` first.
- `npm run build` — builds projects, then the site into `out/`.
- `npm run build:site-only` — site only, reuses existing `public/apps/`.
- `npm run dev`, `npm run lint`, `npm run test:e2e` (Playwright; starts `npm run dev`).
- `npm run deploy` — build + `wrangler deploy`. Do not run without being asked.

## Gotchas

- The build never pulls newer commits from the project repos: it uses the commit each submodule is pinned to. Update with `git submodule update --remote` and commit the new pointers. Missing submodules are cloned automatically (public https) and a project that can't be fetched fails the build. Submodule changes must be pushed in the submodule repo *before* pushing the pointer here, or Cloudflare can't check out the pinned SHA.
- Do not let wrangler auto-configure the project (see README); `wrangler.jsonc` is the source of truth.
