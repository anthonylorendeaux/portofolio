<script setup lang="ts">
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
    return queryCollection('pages').path(route.path).first()
})

if (!page.value) throw createError({ statusCode: 404 })

useSeoMeta(page.value.seo)

definePageMeta({
    layout: 'hero-centered'
})
</script>

<template>
    <UContainer>
        <ContentRenderer :value="page" />
    </UContainer>
</template>
