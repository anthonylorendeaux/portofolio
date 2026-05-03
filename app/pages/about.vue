<script setup lang="ts">
const { data: page } = await useAsyncData('about', () => {
  return queryCollection('about').first()
})

if (!page.value) throw createError({ statusCode: 404 })

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: 'https://anthony-lorendeaux.com/tlse.jpg',
  ogImageAlt: 'Anthony Lorendeaux - Développeur freelance Nuxt/Vue.js à Toulouse',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://anthony-lorendeaux.com/tlse.jpg',
})

useJsonLdBreadcrumb([
  { name: 'Accueil', path: '/' },
  { name: 'À propos', path: '/about' }
])
</script>

<template>
  <UContainer v-if="page">
    <UPageHeader v-bind="page" />

    <UPageBody>
      <!-- 1. HERO -->
      <UPageSection v-if="page.about" :headline="page.about.headline" :title="page.about.title"
        :description="page.about.description" orientation="horizontal">
        <NuxtImg :src="page.about.image.src" :alt="page.about.image.alt" class="rounded-md" placeholder
          loading="lazy" />
      </UPageSection>

      <!-- 2. TIMELINE -->
      <UPageSection :headline="page.timeline.headline" :title="page.timeline.title"
        :description="page.timeline.description" v-if="page.timeline">
        <div class="max-w-2xl mx-auto">
          <UTimeline v-if="page.timeline" :items="page.timeline.items" :default-value="0" orientation="vertical"
            :reverse="true" />
        </div>
      </UPageSection>



      <UPageSection v-if="page.certifications" :headline="page.certifications.headline"
        :title="page.certifications.title" :description="page.certifications.description">
        <UPageGrid>
          <UPageCard v-for="(cert, index) in page.certifications.items" :key="index" :title="cert.title"
            :description="cert.description" :icon="cert.icon" variant="subtle" spotlight />
        </UPageGrid>
      </UPageSection>


      <!-- 4. COVERAGE -->
      <UPageSection v-if="page.coverage" :headline="page.coverage.headline" :title="page.coverage.title"
        :description="page.coverage.description" :features="page.coverage.items" orientation="horizontal">
        <div class="rounded-2xl bg-elevated p-6 border border-default">
          <NuxtImg src="/france_map.svg" alt="Carte de France - Zone d'intervention" class="w-full h-auto"
            loading="lazy" />
          <p class="mt-4 text-center text-sm text-muted">Intervention sur toute la France</p>
        </div>
      </UPageSection>

      <!-- 5. VALUES: Cards Nuxt UI -->
      <div class="bg-elevated" v-if="page.values">
        <UPageSection :headline="page.values.headline" :title="page.values.title"
          :description="page.values.description">
          <UPageGrid>
            <UPageCard v-for="(feature, index) in page.values.features" :key="index" :title="feature.title"
              :description="feature.description" :icon="feature.icon" :to="feature.to" variant="subtle" spotlight />
          </UPageGrid>
        </UPageSection>
      </div>

      <!-- 6. CTA -->
      <UPageSection v-if="page.contact">
        <UPageCTA :title="page.contact.title" :description="page.contact.description" :links="page.contact.links"
          variant="outline" />
      </UPageSection>
    </UPageBody>
  </UContainer>
</template>
