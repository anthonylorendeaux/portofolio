export default defineNuxtConfig({
  nitro: {
    // Configuré pour le déploiement sur Netlify
    preset: 'netlify',
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
  image: {
    // Utilise le CDN d'images de Netlify en production pour optimiser les images
    provider: process.env.NODE_ENV === 'production' ? 'netlify' : 'ipx',
  },
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
