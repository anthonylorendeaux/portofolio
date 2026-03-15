<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt';

const { locale } = useI18n()

useHead({
  htmlAttrs: { lang: locale },
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
  ]
})

useSeoMeta({
  titleTemplate: '%s | Anthony Lorendeaux',
  ogSiteName: 'Anthony Lorendeaux',
  author: 'Anthony Lorendeaux',
  ogType: 'website',
  ogLocale: computed(() => locale.value === 'en' ? 'en_US' : 'fr_FR'),
  ogImage: 'https://anthony-lorendeaux.com/contact_head.png',
  ogImageAlt: 'Anthony Lorendeaux - Développeur Freelance Nuxt/Vue.js Toulouse',
  ogImageWidth: '1200',
  ogImageHeight: '630',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://anthony-lorendeaux.com/contact_head.png',
  twitterImageAlt: 'Anthony Lorendeaux - Développeur Freelance Nuxt/Vue.js Toulouse',
});

useSchemaOrg([
  definePerson({
    name: 'Anthony Lorendeaux',
    image: '/favicon.png',
    sameAs: [
      'https://github.com/anthonylorendeaux',
      'https://linkedin.com/in/anthony-lorendeaux/',
      'https://www.fiverr.com/antho_lor'
    ],
    jobTitle: 'Développeur Freelance Nuxt/Vue.js',
    worksFor: {
      name: 'Freelance'
    },
    knowsAbout: ['Nuxt.js', 'Vue.js', 'TypeScript', 'SEO', 'Tailwind CSS', 'Cloudflare'],
    description: 'Ingénieur logiciel spécialisé dans le développement d\'applications web performantes et optimisées pour le SEO avec Nuxt 4.'
  }),
  defineWebSite({
    name: 'Anthony Lorendeaux - Portfolio',
  }),
  defineLocalBusiness({
    name: 'Anthony Lorendeaux — Développeur Freelance',
    address: { addressLocality: 'Toulouse', addressCountry: 'FR' },
    areaServed: ['Toulouse', 'France'],
    priceRange: '€€'
  })
])

</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Analytics />
  </UApp>
</template>
