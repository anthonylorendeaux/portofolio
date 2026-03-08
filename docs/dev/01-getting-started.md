# Developer Guide: Installation & Architecture

Welcome to the Nuxt 4 portfolio project. This guide will help you with the technical onboarding of the project.

## 🛠️ Main Tech Stack

- **Framework**: Nuxt 4 (Vue.js 3, Vite, Nitro)
- **UI & Styling**: Nuxt UI (based on Tailwind CSS). Token configuration (`primary`, `neutral`) is managed in `app/app.config.ts`.
- **Content**: Nuxt Content with full MDC (Markdown Components) support.
- **Package Manager**: npm.

## 🚀 Local Setup

1. Clone the project and install dependencies:
   ```bash
   npm install
   ```

2. Environment Variables:
   Copy the example file to create your local configuration:
   ```bash
   cp .env.example .env
   ```
   *Note: If you need to test the Nuxt Studio integration locally, make sure you have the appropriate `NUXT_STUDIO_TOKENS` from your team dashboard.*

3. Start the development server (http://localhost:3000):
   ```bash
   npm run dev
   ```

## 🏗️ Project Architecture

- `/app/`: Core of the application (Pages, Layouts, Plugins).
- `/app/components/`: Global Vue components.
- `/app/components/content/`: "MDC" components injected into Markdown (accessible via `::component-name`).
- `/content/`: Static database. Contains articles (`.md`) and page data (`.yml`).
- `/server/`: Server-side APIs and Nitro middlewares.
