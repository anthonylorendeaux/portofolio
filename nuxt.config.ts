export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: [
        '/',
      ],
      crawlLinks: true,
      ignore: ['/_vercel']
    }
  },
  site: {
    url: 'https://anthony-lorendeaux.com',
    name: 'Anthony Lorendeaux - Développeur Freelance Nuxt/Vue.js',
    description: 'Sites web Nuxt/Vue.js qui convertissent • SEO-first • Devis gratuit 24h',
    defaultLocale: 'fr'
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
      // Désactiver les sourcemaps en production réduit drastiquement l'usage mémoire
      sourcemap: false
    }
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxt/content',
    'nuxt-studio',
    '@nuxt/fonts',
  ],
  fonts: {
    families: [
      { name: 'DM Sans', provider: 'google' }
    ]
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
