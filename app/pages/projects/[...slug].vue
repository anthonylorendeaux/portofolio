<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`projects-${slug}`, () => {
    return queryCollection('projects_articles').path(`/projects/${slug}`).first()
})
</script>

<template>
    <UContainer>
        <ContentRenderer :value="post" />
    </UContainer>
</template>
