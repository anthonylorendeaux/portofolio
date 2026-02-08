<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
    return queryCollection('index').path(route.path).first()
})

if (!page.value) throw createError({ statusCode: 404 })

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description
})

definePageMeta({
    layout: 'hero-centered'
})
</script>

<template>
    <UPage v-if="page">
        <Hero v-if="page.hero" :title="page.hero.title" :subtitle="page.hero.subtitle" :badge="page.hero.badge"
            :buttons="page.hero.links" />
    </UPage>
</template>
