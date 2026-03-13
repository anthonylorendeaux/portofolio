<script setup lang="ts">
const { data: page } = await useAsyncData('contact', () => {
    return queryCollection('contact').first()
})

if (!page.value) throw createError({ statusCode: 404 })

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
    ogImage: 'https://anthony-lorendeaux.com/contact_head.png',
    ogImageAlt: 'Contacter Anthony Lorendeaux - Développeur Nuxt/Vue.js Toulouse',
    twitterCard: 'summary_large_image',
    twitterImage: 'https://anthony-lorendeaux.com/contact_head.png',
})
</script>

<template>
    <UContainer v-if="page">
        <UPageHeader v-bind="page" />

        <UPageBody>
            <UPageSection :title="page.question" :description="page.intro" orientation="horizontal"
                :links="page.socials">
                <ClientOnly>
                    <LazyCanvasEffect />
                    <template #fallback>
                        <div class="w-full h-64 bg-gray-100 animate-pulse rounded"></div>
                    </template>
                </ClientOnly>
            </UPageSection>


        </UPageBody>
    </UContainer>
</template>