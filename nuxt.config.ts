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
})