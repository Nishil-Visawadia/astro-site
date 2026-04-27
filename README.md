# Astro Documentation Framework

A production-ready, reusable documentation framework built with Astro 6, Tailwind CSS 4, Pagefind, and an Apple Human Interface Guidelines-inspired design system.

This project is set up as a real documentation product starter, not just a demo site. It covers the full path from local development to production build, containerized deployment, and CI/CD automation.

## What This Template Is For

Use this repository when you want:

- a fast static documentation site with clean routing
- a canonical intro page and nested docs structure
- a maintainable content-first workflow for technical writing
- a modern light-mode visual system with strong readability
- production deployment through Docker or any static host
- a CI/CD pipeline that validates the site on every change

## Key Features

- Canonical docs entry at `/docs/introduction`
- Redirect from `/docs` to `/docs/introduction`
- Type-safe content collections with frontmatter validation
- Reusable route helpers for nested docs and custom slugs
- Responsive docs shell with:
  - desktop left navigation
  - mobile navigation drawer
  - top search input
  - generated right-side table of contents
- Pagefind search index generated after build
- GSAP-powered motion for polished page transitions and interactions
- Shared typography and UI tokens in one global stylesheet
- Docker-ready production build
- GitHub Actions workflow for CI
- GitHub Actions workflow for container publishing

## Tech Stack

- Astro 6
- Tailwind CSS 4
- `@tailwindcss/vite`
- `@tailwindcss/typography`
- daisyUI in light mode
- Pagefind
- GSAP
- React 19 runtime dependencies for future extensibility
- Node.js 20 LTS for local development and container builds

## Repository Layout

```text
src/
├── config/
│   └── site.ts                 # Brand metadata and key links
├── content/
│   └── docs/                   # Markdown docs content
│       ├── index.md            # Intro content (slug: introduction)
│       ├── getting-started.md
│       └── advanced-usage.md
├── layouts/
│   └── DocsLayout.astro        # Shared docs shell and search/TOC logic
├── lib/
│   └── docs.ts                 # Route + sorting helpers
├── pages/
│   ├── index.astro             # Landing page
│   └── docs/
│       ├── index.astro         # /docs redirect page
│       └── [...slug].astro     # Dynamic docs route
├── styles/
│   └── global.css              # Design tokens + reusable UI classes
├── content.config.ts           # Content collection schema
└── env.d.ts                    # Astro type references

.github/
└── workflows/
    ├── ci.yml                  # Install, typecheck, and build
    └── docker-publish.yml      # Build and publish container image

Dockerfile                      # Production container image

docker-compose.yml              # Local container run example
```

## Prerequisites

- Node.js 20 LTS or newer
- npm 10 or newer
- Git
- Docker Desktop or Docker Engine if you want container deployment

## Local Development

Install dependencies:

```bash
npm install
```

Start the Astro dev server:

```bash
npm run dev
```

Open the local URL shown by Astro, usually `http://localhost:4321`.

### Recommended Developer Workflow

1. Edit docs content in `src/content/docs`.
2. Update brand and links in `src/config/site.ts`.
3. Adjust layout and navigation in `src/layouts/DocsLayout.astro`.
4. Run `npm run check` before committing.
5. Run `npm run build` before shipping.

## Quality Gates

These commands represent the expected local and CI validation path:

```bash
npm run check
npm run build
```

`npm run check` runs Astro diagnostics and type validation.

`npm run build` performs the production build and then generates the Pagefind search index in `dist/pagefind`.

## Content Model

Docs pages live in `src/content/docs`.

Supported frontmatter:

```yaml
---
title: "Page title"
description: "Page summary"
slug: "optional/custom-path"
icon: "book"
order: 10
---
```

Behavior:

- `slug` present: the route uses the custom value
- `slug` absent: the route is derived from the file path
- nested folders are supported automatically
- lower `order` values appear earlier in navigation

### Canonical Routing Rules

- `/docs` redirects to `/docs/introduction`
- `/docs/introduction` is the canonical entry page
- `/docs/<path>` pages are generated from `src/pages/docs/[...slug].astro`

## Typography and Visual System

The site uses a compact, readable type system tuned for documentation:

- Inter is the primary font
- SF Pro style fallbacks are included for a more native Apple feel
- headings use tighter tracking and balanced wrapping
- docs prose has explicit sizing for better long-form reading
- body copy uses a readable default scale with responsive limits

Reusable UI classes in `src/styles/global.css` include:

- `hig-shell`
- `hig-button-primary`
- `hig-button-secondary`
- `hig-card`
- `hig-input`
- `docs-prose`

Design goals:

- light-only clarity
- strong contrast
- restrained motion
- large enough tap targets on mobile
- consistent spacing and readable hierarchy

## Search

The docs layout includes a client-side search box.

Production behavior:

- Pagefind runs after every build
- search results are served from the generated `dist/pagefind` index
- the build remains fully static

Development behavior:

- if Pagefind assets are not available, the UI shows a helpful fallback message

## Docker Deployment

The repository includes a production-ready multi-stage Dockerfile.

### Build the Image

```bash
docker build -t astro-site:latest .
```

### Run the Container

```bash
docker run --rm -p 8080:80 astro-site:latest
```

Open `http://localhost:8080`.

### Docker Compose

The included `docker-compose.yml` file builds and runs the site on port `8080`:

```bash
docker compose up --build
```

Use Docker deployment when you want a predictable runtime, easy rollback, and a single artifact for staging or production.

## CI/CD Pipeline

Two GitHub Actions workflows are included.

### CI Workflow

File: `.github/workflows/ci.yml`

Runs on pull requests and pushes. It:

- checks out the repository
- installs dependencies with `npm ci`
- runs `npm run check`
- runs `npm run build`
- uploads the production `dist` output as an artifact

This workflow is the quality gate for every code change.

### Container Publishing Workflow

File: `.github/workflows/docker-publish.yml`

Runs on pushes to `main` and on version tags like `v1.2.3`. It:

- builds the Docker image with the repo Dockerfile
- tags the image using Git metadata
- publishes the image to GitHub Container Registry (`ghcr.io`)

Recommended usage:

- `main` is your integration branch
- version tags represent production releases
- a deployment target pulls the new image after publish

## Production Deployment Options

You can deploy this project in several ways.

### Option 1: Static Host

Best for simplicity.

Examples:

- Netlify
- Vercel
- Cloudflare Pages
- GitHub Pages
- AWS S3 + CloudFront
- Azure Static Web Apps

Deploy the generated `dist/` directory.

### Option 2: Docker Container

Best when you want a repeatable runtime, container registry promotion, or a platform like ECS, AKS, GKE, Fly.io, or Render.

Typical flow:

1. CI builds the site
2. Docker image is published to a registry
3. production pulls the tagged image
4. rollout happens through the container platform

### Option 3: Hybrid

Use static hosting for the public site and Docker for internal previews, staging, or isolated release testing.

## DevOps Guidance

A practical operating model for this repository:

- protect `main` with required CI checks
- use pull requests for all code changes
- keep the build reproducible with `npm ci`
- treat `npm run build` as the release gate
- publish container images on tagged releases
- keep the docs source in markdown, not in generated HTML
- version the site configuration instead of hardcoding brand values in page markup

### Suggested Branch Strategy

- `main`: stable and releasable
- feature branches: active development
- release tags: production-ready snapshots

### Suggested Release Flow

1. Merge a feature branch into `main`.
2. CI validates the build.
3. Create a semantic version tag.
4. Docker publish workflow pushes a versioned image.
5. Your deployment target promotes the new image.

### Suggested Environment Strategy

This site currently has no required runtime secrets. If you add any later, keep them out of the repo and inject them through your deployment platform.

Recommended placeholders for future growth:

- analytics IDs
- search provider keys if external search is added later
- feature flags
- contact or feedback endpoints

## Operational Checklist

Before release:

- `npm install` completed successfully
- `npm run check` passed
- `npm run build` passed
- docs content titles and descriptions are present
- canonical intro page remains `/docs/introduction`
- navigation order is correct
- Docker image builds successfully
- container starts and serves the production site

## Troubleshooting

### Dependency Installation Issues

- Use Node.js 20 LTS or newer
- Remove `node_modules` and reinstall if the lockfile gets out of sync
- Prefer `npm ci` in CI and production builds

### Build Issues

- Run `npm run check` first to catch schema or type issues
- Verify content frontmatter matches `src/content.config.ts`
- Confirm page slugs are unique
- Make sure all docs files have valid markdown

### Docker Issues

- Rebuild the image after any content or code change
- Verify port `8080` is free locally
- Check that the container can read the generated `dist/` output

### Search Issues

- Build the site before testing search
- Confirm `dist/pagefind` exists after build
- Test with `npm run preview` or the Docker image, not just the dev server

## Maintenance Notes

Good next improvements for a real team rollout:

- add versioned docs collections for major releases
- add link checking in CI
- add sitemap or metadata validation in CI
- add analytics and search zero-result reporting
- add docs ownership metadata or review dates
- add a staging deployment job before production promotion
- add container health checks and rollout alerts in the target platform

## License

MIT
