<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt'

const route = useRoute()

// JSON-LD Schemas (global)
const personScript = useJsonLdPerson()
const serviceScript = useJsonLdProfessionalService()
const websiteScript = useJsonLdWebsite()

useHead({
  htmlAttrs: { lang: 'fr' },
  link: computed(() => [
    { rel: 'canonical', href: `https://anthony-lorendeaux.com${route.path}` },
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
  ]),
  script: computed(() => [personScript.value, serviceScript.value, websiteScript.value]),
})

useSeoMeta({
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


</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ClientOnly>
      <Analytics />
    </ClientOnly>
  </UApp>
</template>
