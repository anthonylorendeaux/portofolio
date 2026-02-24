export default defineNuxtConfig({
  nitro: {
    // preset: "cloudflare_pages",
    // cloudflare: {
    //   deployConfig: true,
    //   nodeCompat: true
    // },
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml', '/blog', '/projects']
    },
  },
  site: {
    url: 'https://anthony-lorendeaux.com',
    name: 'Anthony Lorendeaux - Développeur Freelance Nuxt/Vue.js',
    description: 'Sites web Nuxt/Vue.js qui convertissent • SEO-first • Devis gratuit 24h',
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
