# AGENTS.md - Coding Agent Guidelines

## Project Overview

This is a Nuxt 4 portfolio website built with Vue 3, TypeScript, Nuxt UI 4, and Tailwind CSS 4. Content is managed via @nuxt/content with YAML/Markdown files.

## Build/Lint/Test Commands

```bash
# Development
pnpm dev                  # Start dev server (localhost:3000)
pnpm build                # Build for production
pnpm generate             # Static site generation
pnpm preview              # Preview production build
pnpm start                # Start production server

# Linting
pnpm exec eslint .        # Run ESLint
pnpm exec eslint . --fix  # Fix ESLint errors

# Type checking (Nuxt auto-generates types)
pnpm exec nuxi typecheck  # Type check the project
pnpm postinstall          # Regenerate .nuxt types
```

**Note:** No test framework is currently configured. If tests are needed, consider adding Vitest with `@nuxt/test-utils`.

## Project Structure

```
├── app/
│   ├── assets/css/main.css     # Global styles (Tailwind + Nuxt UI)
│   ├── app.vue                 # Root component
│   ├── app.config.ts           # App configuration (navigation, footer)
│   ├── components/             # Vue components
│   │   ├── AppHeader.vue       # Global header
│   │   ├── AppFooter.vue       # Global footer
│   │   └── content/            # Content components (for markdown)
│   ├── layouts/default.vue     # Default layout
│   └── pages/                  # File-based routing
├── content/                    # Nuxt Content files (YAML/Markdown)
│   ├── index.yml               # Homepage content
│   ├── projects/*.md           # Project articles
│   └── legal/*.md              # Legal pages
├── content.config.ts           # Content collection schemas (Zod)
├── nuxt.config.ts              # Nuxt configuration
└── eslint.config.mjs           # ESLint configuration
```

## Code Style Guidelines

### Imports

- **Use Nuxt auto-imports** - Do not import Vue composables (`ref`, `computed`, `onMounted`, etc.) or Nuxt composables (`useRoute`, `useAsyncData`, `navigateTo`, etc.)
- Only import from external packages that aren't auto-imported:
  ```vue
  <script setup lang="ts">
  // ✅ Correct - use auto-imports
  const route = useRoute()
  const { data } = await useAsyncData('key', () => queryCollection('index').first())

  // ✅ Correct - explicit import for non-auto-imported packages
  import { Analytics } from '@vercel/analytics/nuxt'
  </script>
  ```

### Vue Component Style

**Script block:**
```vue
<script setup lang="ts">
// 1. Imports (only non-auto-imported)
// 2. Composables and data fetching
// 3. Computed properties
// 4. Methods/functions
// 5. Lifecycle hooks
</script>
```

**Template block:**
- Place `<script setup>` first, then `<template>`
- Use self-closing tags for components without slots: `<UButton />`
- Multi-line props: break after opening tag, align props
  ```vue
  <UButton
    color="primary"
    variant="solid"
    label="Click me"
  />
  ```

### TypeScript

- Use `lang="ts"` in `<script setup>` blocks
- Prefer explicit types for complex objects
- Use Zod schemas in `content.config.ts` for content validation
- Avoid `any` - use `unknown` with type guards if needed

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `AppHeader.vue`, `CanvasEffect.vue` |
| Pages | kebab-case | `about.vue`, `projects/index.vue` |
| Dynamic routes | `[...slug].vue` | `projects/[...slug].vue` |
| Composables | camelCase with `use` prefix | `useAsyncData`, `useSeoMeta` |
| Variables | camelCase | `const pageData = ...` |
| Constants | UPPER_SNAKE_CASE | `const MAX_RETRIES = 3` |
| Content collections | snake_case | `projects_articles`, `blog_articles` |

### Error Handling

```vue
<script setup lang="ts">
const { data: page } = await useAsyncData('key', () => queryCollection('index').first())

// Always check for null and throw 404
if (!page.value) throw createError({ statusCode: 404 })
</script>
```

### Data Fetching Pattern

```vue
<script setup lang="ts">
const route = useRoute()

// Use route.path as key for page-specific data
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('index').path(route.path).first()
})

// Use descriptive keys for shared data
const { data: projects } = await useAsyncData('projects_articles', () =>
  queryCollection('projects_articles').order('publishedAt', 'DESC').all()
)
</script>
```

### SEO Pattern

```vue
<script setup lang="ts">
// After fetching page data
const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})
</script>
```

### Styling

- Use Tailwind CSS classes via Nuxt UI components
- Use `class` for custom Tailwind utilities
- Theme customization in `app/assets/css/main.css`:
  ```css
  @theme {
    --font-sans: 'DM Sans', sans-serif;
  }
  ```

### Nuxt UI Component Usage

- Use Nuxt UI components: `UButton`, `UPage`, `UContainer`, `UPageHero`, etc.
- Leverage component props for styling over custom CSS
- Use `v-if` guards for template sections with optional data

### Content Components

Content components (in `app/components/content/`) are used in Markdown files:
```vue
<script setup>
// Use defineProps array syntax for simplicity in content components
defineProps(['img'])
</script>
```

### Lazy Loading

- Use `Lazy` prefix for heavy components: `<LazyParticules />`
- Use `loading="lazy"` for images below the fold

### Git Commits

- Write clear, concise commit messages
- Reference issues when applicable
- Don't commit `.env` or sensitive files
