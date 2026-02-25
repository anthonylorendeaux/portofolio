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
  author: 'Anthony Lorendeaux'
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
