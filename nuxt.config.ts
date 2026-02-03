export default defineNuxtConfig({
  nitro: {
    preset: "cloudflare_pages",
    cloudflare: {
      deployConfig: true,
      nodeCompat: true
    },
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
  routeRules: {
    '/blog/**': { prerender: true },
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
    '@nuxt/content',
    'nuxt-studio',
    '@nuxtjs/sitemap'
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