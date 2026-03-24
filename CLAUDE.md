# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working Principles

### Planning
- For any non-trivial task (≥ 3 steps or architectural decisions), plan first and confirm with the user before implementing.
- If something goes wrong mid-task, stop and replan rather than pushing forward.

### Code Quality
- **Simplicity first**: every change should be as small and focused as possible. Minimal blast radius.
- **No laziness**: find real root causes, not temporary workarounds. Aim for senior-engineer quality.
- Before presenting a non-trivial fix, ask: "Is there a more elegant solution?" — but don't over-engineer obvious fixes.

### Verification
- Never mark a task done without proving it works: run the build/lint, read the output, demonstrate the fix.
- Distinguish between expected vs. actual behavior and call out relevant differences.

### Debugging
- When given a bug report: fix it autonomously. Read the logs, trace the error, resolve it.
- Zero back-and-forth on the same bug — drive to green without hand-holding.

---

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Build for production (Nitro/Node)
npm run generate     # Static site generation
npm run preview      # Preview production build locally
npm run lint         # Run ESLint (via @nuxt/eslint)
```

## Architecture

This is a **Nuxt 4** portfolio site using:
- **Nuxt UI** (Tailwind CSS 4) for components — colors/theme in `app/app.config.ts`
- **Nuxt Content** for content management (MDC)
- **@nuxtjs/i18n** — French default (`fr`), English for blog only (`prefix_except_default`)
- **@nuxtjs/seo** + `nuxt-og-image` + sitemap for SEO
- **npm** as the package manager

### Directory structure

```
app/                      # Nuxt app directory (Nuxt 4 layout)
  app.config.ts           # Navigation, footer, UI color tokens (primary: blue, neutral: slate)
  app.vue                 # Root component
  pages/                  # File-based routing
  components/             # Global components (AppHeader, AppFooter, CanvasEffect, Particules)
  components/content/     # MDC components injected into Markdown via ::component-name
  layouts/                # default.vue
  assets/css/main.css     # Global CSS entry point

content/                  # Content database
  *.yml                   # Page data: index.yml, about.yml, services.yml, contact.yml, blog.yml, projects.yml
  blog/fr/*.md            # French blog posts
  blog/en/*.md            # English blog posts
  projects/*.md           # Project case studies
  services/*.md           # Service detail pages
  legal/*.md              # Legal pages (CGV, mentions legales, confidentialite)

content.config.ts         # Nuxt Content collection schemas (Zod)
nuxt.config.ts            # Nuxt config: modules, i18n routes, route rules, sitemap
server/                   # Nitro server APIs and middleware
```

### Content collections (content.config.ts)

Collections are typed with Zod schemas. Key ones:
- `index`, `about`, `services`, `contact`, `blog`, `projects` — page-level YAML data
- `blog_articles` — sourced from `content/blog/*.md` (unifié fr+en)
- `projects_articles`, `services_articles` — wrapped with `asSitemapCollection`
- `legal` — wrapped with `asSitemapCollection`

**Helpers réutilisables dans `content.config.ts` :**
- `createBaseSchema()` — `title` + `description` (requis)
- `createBaseSectionSchema()` — + `headline`
- `createLinkSchema()` — lien avec label, to, icon, color, variant, trailing
- `createButtonSchema()` — bouton CTA avec defaults (color: primary, variant: solid)
- `createImageSchema()` — src (media), alt, loading, srcset
- `createFeatureSchema()` — title, description (max 120), icon, to
- `createIconString()` — champ icône avec picker lucide/simple-icons
- `createMediaString()` — champ media avec upload UI

### index.yml — structure complète

```yaml
hero:
  badge: boolean           # true = "Available for work" (ping vert), false = "Working on a project" (ping rouge)
  title, description, links, image
  socialProof:             # Bloc avatars + étoiles sous les CTAs dans le hero
    text: string
    rating: number (1–5)
    avatars: [{ alt: string }]   # src optionnel — UAvatar affiche les initiales sans src

projects:   # headline, title, description
testimonials:              # Section masonry avec UPageColumns
  headline, title, description
  items: [{ quote, user: { name, description, avatar?: { src? } } }]
about:      # headline, title, description, links, image
services:   # headline, title, description, features[]
faq:        # title, description, items[]
contact:    # headline, title, description, links[]
```

### Home page sections (app/pages/index.vue)

Ordre des sections :
1. Hero (`UPageHero` horizontal, `LazyParticules` background, `CanvasEffect` desktop)
2. `USeparator`
3. Projects (`UBlogPosts` + `UBlogPost`)
4. Testimonials (`UPageColumns` masonry `sm:columns-2 lg:columns-3 xl:columns-4`, `UPageCard` + `UUser`)
5. About (bg-elevated, orientation horizontal)
6. Services (`features` prop)
7. FAQ (`UAccordion`)
8. Contact (`UPageCTA`)

### Icon conventions

- **Toutes les icônes** : `i-lucide-*` (Lucide)
- **Étoiles de notation uniquement** : `i-heroicons-star-20-solid` (Heroicons) — le seul cas où Heroicons est utilisé, car Lucide n'a pas d'icône étoile pleine native

### Blog/project frontmatter schema

Required fields for blog and project markdown articles:
```yaml
title: string
description: string   # SEO meta (~160 chars)
image:
  src: /blog/filename.webp
  alt: string
category: string
publishedAt: YYYY-MM-DD
summary: string       # AI/LLM indexing snippet
```

### i18n routing

Most pages are French-only. Only the blog is bilingual. Pages disabled for English are listed in `nuxt.config.ts` under `i18n.pages`. The English blog route is `/en/blog/...`.

### Route rules

- `/blog/**` and `/projects/**` use SWR caching (3600s)
- Static assets use long-term cache headers
- Prerendering crawls from `/` and `/sitemap.xml`

### Cache dev Nuxt Content

Quand `content.config.ts` est modifié (nouveau champ, nouvelle collection), la base SQLite dev devient obsolète → erreur SQL au hot-reload. Fix :
```bash
rm -rf .nuxt node_modules/.cache/nuxt && npm run dev
```
