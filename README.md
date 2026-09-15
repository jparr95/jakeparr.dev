# jakeparr.dev

Personal portfolio and dev blog built with Next.js.

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

- `app/` — App Router: layout, page, global styles
- `components/` — page sections and icons
- `lib/` — utilities (`cn` helper)
- `public/` — static assets (favicons)
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

- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy`

Do not let wrangler auto-configure this project. With no `wrangler.jsonc` present it
detects "Next.js", runs `@opennextjs/cloudflare migrate`, and tries to bundle a
server-side Worker from `.next/standalone` — a directory a static export never
produces. That is what the `pages-manifest.json` ENOENT failure was.
