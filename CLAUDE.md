# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
- `blog_articles_fr` / `blog_articles_en` — sourced from `content/blog/{fr,en}/**/*.md`
- `projects_articles`, `services_articles` — wrapped with `asSeoCollection`
- `legal` — wrapped with `asSitemapCollection`

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
