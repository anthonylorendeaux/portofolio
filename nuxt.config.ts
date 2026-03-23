export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: [
        '/',
        '/sitemap.xml',
      ],
      crawlLinks: true,
      ignore: ['/_vercel']
    },
    compressPublicAssets: true
  },
  experimental: {
    payloadExtraction: true,
  },
  site: {
    url: 'https://anthony-lorendeaux.com',
    name: 'Anthony Lorendeaux - Développeur Freelance Nuxt/Vue.js Toulouse',
    description: 'Création de sites web ultra-rapides et applications web sur-mesure à Toulouse. Expert Nuxt 3 & Vue.js • Devis gratuit 24h',
    defaultLocale: 'fr',
    trailingSlash: false
  },
  robots: {
    groups: [
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot'],
        allow: ['/']
      },
      {
        userAgent: ['*'],
        allow: ['/'],
        disallow: ['/_vercel/']
      }
    ]
  },
  compatibilityDate: '2025-05-15',
  devServer: {
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3000
  },
  devtools: { enabled: true },
  vite: {
    build: {
      sourcemap: false
    }
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxt/content',
    '@nuxt/fonts',
  ],
  sitemap: {
    cacheMaxAgeSeconds: 3600,
    exclude: ['/legal/**']
  },
  routeRules: {
    '/blog/**': { swr: 3600 },
    '/projects/**': { swr: 3600 },
    '/assets/**': { headers: { 'cache-control': 's-maxage=31536000' } },
    '/legal/**': { robots: 'noindex, nofollow' },
  },
  fonts: {
    families: [
      { name: 'DM Sans', provider: 'google' },
    ]
  },
  css: ['~/assets/css/main.css']
})
