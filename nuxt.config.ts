export default defineNuxtConfig({
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
  site: {
    url: 'https://anthony-lorendeaux.com',
    name: 'Portofolio - Anthony Lorendeaux',
    description: 'Welcome on my personal portofolio',
    defaultLocale: 'en',
  },
  studio: {
    repository: {
      provider: 'github',
      owner: 'anthonylorendeaux',
      repo: 'portofolio',
      branch: 'master'
    }
  },
  runtimeConfig: {
    // Privé (serveur seulement, injecté runtime Nitro/Netlify)
    studioGoogleClientId: process.env.STUDIO_GOOGLE_CLIENT_ID || process.env.NITRO_STUDIO_GOOGLE_CLIENT_ID,
    studioGoogleClientSecret: process.env.STUDIO_GOOGLE_CLIENT_SECRET || process.env.NITRO_STUDIO_GOOGLE_CLIENT_SECRET,
    studioGoogleModerators: process.env.STUDIO_GOOGLE_MODERATORS || process.env.NITRO_STUDIO_GOOGLE_MODERATORS,
    // Ajoute tous tes autres STUDIO_* privés ici
    // githubToken: process.env.STUDIO_GITHUB_TOKEN,

    public: {
      // Publiques (client-safe, si besoin)
    }
  },
})