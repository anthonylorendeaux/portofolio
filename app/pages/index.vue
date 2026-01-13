<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
    return queryCollection('index').path(route.path).first()
})

if (!page.value) throw createError({ statusCode: 404 })

useSeoMeta({
    title: () => page.value?.title || 'Default Title',
    description: () => page.value?.description || '',
    ...((page.value?.seo as any) || {})
})


if (page.value.ogImage) {
    defineOgImage(page.value.ogImage)
}

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
