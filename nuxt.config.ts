export default defineNuxtConfig({
  nitro: {
    preset: "cloudflare_pages",
    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    },
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml']
    },
    routeRules: {
      '/blog/**': { ssr: false, prerender: true },
      '/projects/**': { ssr: false, prerender: true }
    }
  },
  site: {
    url: 'https://anthony-lorendeaux.com',
    name: 'Anthony Lorendeaux - Développeur Fullstack Nuxt',
    description: 'Portfolio freelance Nuxt/Vue.js, SaaS et sites optimisés SEO à Toulouse.',
    defaultLocale: 'fr'
  },
  compatibilityDate: '2025-05-15',
  devServer: {
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3000
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxt/content',
    'nuxt-studio',
  ],
  css: ['~/assets/css/main.css'],
  studio: {
    repository: {
      provider: 'github',
      owner: 'anthonylorendeaux',
      repo: 'portofolio',
      branch: 'master'
    }
  }
})