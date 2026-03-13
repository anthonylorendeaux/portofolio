<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt';

useHead({
  htmlAttrs: { lang: 'fr' },
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' }
  ]
})

useSeoMeta({
  titleTemplate: '%s | Anthony Lorendeaux',
  ogSiteName: 'Anthony Lorendeaux',
  author: 'Anthony Lorendeaux',
  ogType: 'website',
  ogLocale: 'fr_FR',
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
