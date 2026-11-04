# alderline-site

Alderline is a demo site for a fictional custom-kitchen studio in Portland, Oregon, built as a portfolio project.
Strapi 5 serves the content, Next.js 16 renders it with Cache Components, and every contact form feeds a lead pipeline
that posts to a CRM (Bitrix24) with an on-disk retry queue so that no request is lost. The whole stack ships as Docker
images built in GitHub Actions and published to GHCR.

| App | Stack | Port |
| --- | --- | --- |
| `apps/cms` | Strapi 5 (TypeScript), SQLite in dev / PostgreSQL in prod, Navigation plugin | 1337 |
| `apps/web` | Next.js 16 (App Router, TypeScript, Tailwind CSS 4, `src/`, Cache Components) | 3000 |

Highlights:

- **Warm-minimal design system** — tokens in one file (`apps/web/src/app/globals.css`), Instrument Serif + Inter via `next/font`, CSS scroll-driven reveals that respect `prefers-reduced-motion`.
- **Conversion-first home page** — a specific value claim and a price anchor above the fold, proof points next to every call to action, an instant **cost estimator** that passes the configuration into the lead form, a process timeline and a sticky call / estimate bar on phones.
- **Lead pipeline** — every form posts to `/api/lead`: validation, honeypot and rate limits, a CRM call with an on-disk retry queue and Telegram alerts (disabled in the demo deployment).
- **SEO basics** — `sitemap.xml`, `robots.txt`, Open Graph image, schema.org `HomeAndConstructionBusiness` JSON-LD.

All content and images are demo data. Photographs are Creative Commons licensed; credits are listed on the `/credits` page.

## Quick start

Requirements: Node.js 20.9-24 (24 LTS recommended, see `.nvmrc`; `npm test` needs 22.18+), npm 10+.

```bash
npm run setup          # dependencies of the root and both apps
cp apps/cms/.env.example apps/cms/.env   # then generate secrets, see below
cp apps/web/.env.example apps/web/.env.local
npm run dev            # Strapi :1337 and Next.js :3000 together
```

- Strapi admin: http://localhost:1337/admin (create an administrator on first start).
- Site: http://localhost:3000 - all data comes from Strapi, so Strapi must be running
  (for both `npm run dev` and `npm run build`).
- In dev set `SEED_DEMO=true` in `apps/cms/.env`: on first start the database is filled with demo content and menus.
- Site cache reset on admin edits: the same `REVALIDATE_SECRET` in `apps/cms/.env` and `apps/web/.env.local`, plus
  `FRONTEND_REVALIDATE_URL=http://localhost:3000/api/revalidate` in cms - Strapi registers the webhook itself.

Strapi secrets (`APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`,
`JWT_SECRET`, `ENCRYPTION_KEY`, `REVALIDATE_SECRET`) can be generated like this:

```bash
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | both apps in dev mode |
| `npm run dev:cms` / `npm run dev:web` | one at a time |
| `npm run build` | production build of both |
| `npm run lint` | ESLint for the frontend |
| `npm run typecheck` | frontend type check |
| `npm test` | frontend tests (`node --test`, `apps/web/src/**/*.test.ts`) |

## Deployment

The images `ghcr.io/kadkinroman/alderline-cms` and `alderline-web` are built by GitHub Actions
(`.github/workflows/build.yml`); on the server `docker compose` (`deploy/compose.yaml`) runs behind Caddy, and
`deploy/scripts/deploy.sh <tag>` handles release and rollback. Step by step (first deploy, update, rollback,
backups, monitoring) is in **`docs/deploy.md`**.

## Why not npm workspaces

Strapi 5 (its admin) runs on React 18, Next.js 16 on React 19. With a shared `node_modules` the packages conflict
during hoisting. So each app has its own `node_modules` and lock file, and the root `package.json` only holds wrapper scripts.

## Structure

```
apps/
  cms/                 Strapi 5
    config/plugins.ts  Navigation plugin settings
    config/database.ts SQLite / PostgreSQL via DATABASE_CLIENT
    src/api/           content types; src/components/ - shared components
    src/bootstrap/     Navigation config migration, Public read permissions
    src/seed/          demo content and menus (SEED_DEMO=true|force)
    Dockerfile         alderline-cms image (admin built inside)
  web/                 Next.js 16
    src/app/           pages (App Router)
    src/components/    ui / layout / sections / modals / forms / catalog / blog
    src/lib/content/   content access (Strapi, 'use cache')
    src/lib/strapi/    Strapi REST client and mappers to domain types
    src/lib/routes.ts  every site URL in one place
    Dockerfile         alderline-web image (output: 'standalone'; environment addresses are build args)
deploy/                compose.yaml, env templates, caddy/ (alderline.caddy, prod.caddy.example), scripts/ (deploy, backup, restore, healthcheck)
docs/deploy.md         deployment: first deploy, release, rollback, backups, monitoring
.github/workflows/     CI: checks and image builds to GHCR
```

## Page map

| URL | Page |
| --- | --- |
| `/` | Home |
| `/catalog`, `/catalog/[category]`, `/catalog/[category]/[slug]` | Catalog, category, kitchen detail |
| `/projects`, `/projects/[slug]` | Projects |
| `/blog`, `/blog/[slug]` | Blog |
| `/offers` | Special offers |
| `/about` (`#workshop`, `#team`, `#reviews`) | About |
| `/reviews` | Reviews |
| `/contact` (`#company`) | Contact |
| `/guide` | Buyer's guide |
| `/guide/measurement-and-design`, `/guide/materials`, `/guide/delivery` | Buyer's guide pages |
| `/guide/installation`, `/guide/warranty`, `/guide/payment-and-financing` | Buyer's guide pages |
| `/privacy-policy` | Privacy Policy |
| `/credits` | Photo credits |

## If npm fails with ETIMEDOUT

On slow networks Node (20+) may not connect within the 250 ms per attempt (happy eyeballs). Increasing the timeout helps:

```bash
export NODE_OPTIONS=--network-family-autoselection-attempt-timeout=2000
```
