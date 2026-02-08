<script setup lang="ts">

useHead({
  htmlAttrs: { lang: 'fr' },
  link: [
    { rel: 'icon', type: 'image/png', href: '/favicon.png' }
  ]
})

useSeoMeta({
  titleTemplate: '%s | Anthony Lorendeaux',
  ogSiteName: 'Anthony Lorendeaux'
});

</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
