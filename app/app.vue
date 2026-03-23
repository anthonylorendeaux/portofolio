<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt';

const route = useRoute()

useHead({
  htmlAttrs: { lang: 'fr' },
  link: computed(() => [
    { rel: 'canonical', href: `https://anthony-lorendeaux.com${route.path}` },
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
  ])
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


</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Analytics />
  </UApp>
</template>
