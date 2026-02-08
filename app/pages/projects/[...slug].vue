<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`projects-${slug}`, () => {
    return queryCollection('projects_articles').path(`/projects/${slug}`).first()
})

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description
})
</script>

<template>
    <UContainer>
        <ContentRenderer :value="post" />
    </UContainer>
</template>
