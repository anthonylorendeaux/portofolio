<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt';

const route = useRoute()

useHead({
  htmlAttrs: { lang: 'fr' },
  link: computed(() => [
    { rel: 'canonical', href: `https://anthony-lorendeaux.com${route.path}` },
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'preconnect', href: 'https://i.pravatar.cc' }
  ]),
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            '@id': 'https://anthony-lorendeaux.com/#person',
            name: 'Anthony Lorendeaux',
            jobTitle: 'Développeur Freelance Nuxt/Vue.js',
            url: 'https://anthony-lorendeaux.com',
            image: 'https://anthony-lorendeaux.com/contact_head.png',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Toulouse',
              addressRegion: 'Occitanie',
              addressCountry: 'FR'
            },
            sameAs: [
              'https://github.com/anthonylorendeaux',
              'https://linkedin.com/in/anthony-lorendeaux/',
              'https://www.fiverr.com/antho_lor'
            ]
          },
          {
            '@type': 'WebSite',
            '@id': 'https://anthony-lorendeaux.com/#website',
            url: 'https://anthony-lorendeaux.com',
            name: 'Anthony Lorendeaux',
            publisher: { '@id': 'https://anthony-lorendeaux.com/#person' },
            inLanguage: 'fr-FR'
          }
        ]
      })
    }
  ]
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
