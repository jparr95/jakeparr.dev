# jakeparr.dev

Personal portfolio and dev blog built with Next.js.

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI:** shadcn/ui components

## Getting started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint

# Run e2e tests (requires dev server or Playwright will start it)
npm run test:e2e

# Run e2e tests with UI
npm run test:e2e:ui
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project structure

- `app/` — Next.js App Router (layout, pages, global styles)
- `components/` — React components (sections, UI primitives)
- `hooks/` — Custom React hooks
- `lib/` — Utilities
- `public/` — Static assets

## Deployment (Cloudflare Pages)

1. Push to GitHub and connect the repo at [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Build settings:
   - **Framework preset:** Next.js (Static HTML Export)
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
3. Deploy. Add your custom domain in **Custom domains**.
