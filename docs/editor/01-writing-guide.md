# Content Editing Guide

This guide explains how to add and modify site content. All content is managed via **YAML** files (pages) and **Markdown** (articles) within this folder.

Validation schemas are defined in [`content.config.ts`](../../content.config.ts).

---

## Add a Blog Post

Create a file `content/blog/my-post.md`:

```yaml
---
title: "Post Title"
description: "Short description for SEO (max ~160 characters)"
image:
    src: /blog/my-image.webp
    alt: "Image description"
category: "Frontend"
publishedAt: 2026-03-08
summary: "Summary for AI / LLM indexing (1-2 sentences)"
---

Markdown content of the post...
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Displayed title + SEO |
| `description` | string | ✅ | Meta description |
| `image.src` | string | ✅ | Image path (`public/blog/` folder) |
| `image.alt` | string | — | Alternative text |
| `category` | string | ✅ | Category (e.g.: Frontend, Security) |
| `publishedAt` | date | ✅ | Publication date (`YYYY-MM-DD` format) |
| `summary` | string | ✅ | AI summary / LLM snippet |

---

## Add a Project

Create a file `content/projects/my-project.md`:

```yaml
---
title: "Project Name"
description: "Short description of the project"
image:
    src: "/projects/my-project.png"
    alt: "Project screenshot"
category: "Showcase Website"
publishedAt: 2026-01-15
summary: "Project summary for AI indexing"
---

Markdown content of the project...
```

The fields are identical to the blog. The image must be in `public/projects/`.

---

## Add a Service

Create a file `content/services/my-service.md`:

```yaml
---
title: "Service Name"
description: "SEO description of the service"
---

# Service Title

Markdown content describing the service...
```

Only `title` and `description` are required in the frontmatter.

---

## Built-in Markdown Components

These Vue components (in `app/components/content/`) can be used directly within the Markdown files:

### `<Showcase>`

Displays a full-width image.

```md
:showcase{img="/projects/capture.png"}
```

### `<ArticleHeader>`

Header with title + external link.

```md
::article-header{url="https://example.com"}
Project Title

#description
Short description here.
::
```

### `<Infos>`

Metadata bar (price, duration, stack).

```md
::infos
#price
1200€

#duration
3 weeks

#technos
Nuxt 3, Stripe, Tailwind
::
```

---

## Modify Static Pages

The home, about, services, contact, and blog pages are driven by YAML files at the root of `content/`:

| File | Page |
|------|------|
| `index.yml` | Home (hero, projects, about, services, FAQ, CTA) |
| `about.yml` | About (presentation, timeline, values, CTA) |
| `services.yml` | Services (list, pricing, FAQ) |
| `contact.yml` | Contact (intro, social networks) |
| `blog.yml` | Blog page header |
| `projects.yml` | Portfolio page header |
