# Portfolio frontend

Dynamic, multi-lens portfolio for **MD Mazharul Islam**, generated from a single source of truth: [`portfolio.yaml`](./portfolio.yaml). Built with Vite + React + TypeScript + Tailwind.

## Lenses

Navigate the same career data from four angles:

| # | Lens | What it shows |
|---|------|---------------|
| 01 | **Overview** | Hero (photo, headline, contact), stats, current role, jump cards |
| 02 | **Experience** | Companies reverse-chronological — expandable highlights, stack, projects |
| 03 | **Skills** | Skill matrix. Click any skill → every company that used it (cross-link) |
| 04 | **Projects** | Flagship builds as image-forward cards |

Cross-navigation: stack chips jump to the Skills lens focused on that skill; clicking a company (from a skill) jumps to Experience.

## Develop

```bash
cd portfolio
npm install
npm run dev          # http://localhost:5173
```

`portfolio.yaml` is parsed at **build time** by a Vite plugin (`vite.config.ts`) — edit it and Vite HMR picks up the change.

## Build / preview

```bash
npm run build        # type-check + production build → dist/
npm run preview      # serve the production build locally
```

`base: './'` (relative) so the build works at any path — no rebuild needed for GitHub Pages.

## Assets

See [`src/media/README.md`](./src/media/README.md). Tech icons are CC0 from [simpleicons.org](https://simpleicons.org), normalized to monochrome. Company logos and project visuals are **auto-detected** if you drop files into `src/media/companies/` or `src/media/projects/` (no code change); absent assets fall back to generated on-brand art.

```bash
npm run fetch-icons  # re-fetch / extend the icon set (network required)
```

## Deploy (GitHub Pages)

A workflow at [`.github/workflows/deploy-portfolio.yml`](../.github/workflows/deploy-portfolio.yml) builds and deploys on every push to `main` that touches `portfolio/`.

**One-time setup** (repo → Settings → Pages):
- **Source:** `GitHub Actions`

After that, pushes to `main` publish automatically to **`https://mithucste30.github.io/cv-builder/`**.

## Theme

Cinematic dark (default) with a one-tap light toggle; preference persisted in `localStorage`, applied before first paint (no flash).
