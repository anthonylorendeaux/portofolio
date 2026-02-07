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
    routeRules: {
      // Priorité statiques /pdf/**
      '/pdf/**': {
        ssr: false,  // Bypass SSR → direct fichier
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      }
    },
    publicAssets: [
      {
        baseURL: '/pdf',
        dir: 'public/pdf',
        maxAge: 31536000  // 1 an cache
      }
    ]
  },
  routeRules: {
    '/blog/**': { ssr: false, prerender: true },
    '/pdf/**': {
      ssr: false
    }
  },
  site: {
    url: 'https://anthony-lorendeaux.com',
    name: 'Portofolio website of Anthony Lorendeaux'
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