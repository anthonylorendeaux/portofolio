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
        userAgent: ['*', 'GPTBot', 'ChatGPT-User', 'PerplexityBot', 'Claude-Web', 'ClaudeBot'],
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
    '@nuxtjs/seo',
    '@nuxt/content',
    '@nuxt/fonts',
    'nuxt-schema-org',],
  sitemap: {
    cacheMaxAgeSeconds: 3600,
    strictNuxtContentPaths: true
  },
  seo: {
    fallbackTitle: false,
  },
  routeRules: {
    // Stale-While-Revalidate (SWR) : cache serveur intelligent
    '/blog/**': { swr: 3600 },
    '/projects/**': { swr: 3600 },
    // Cache statique pour les assets
    '/assets/**': { headers: { 'cache-control': 's-maxage=31536000' } }
  },
  $production: {
    modules: [
      '@nuxt/ui',
      '@nuxt/image',
      '@nuxtjs/seo',
      '@nuxt/content',
      '@nuxt/fonts',
    ]
  },
  fonts: {
    families: [
      { name: 'DM Sans', provider: 'google' }
    ]
  },
  css: ['~/assets/css/main.css']
})
