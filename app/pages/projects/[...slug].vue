<script setup>
const route = useRoute()

const { data: post } = await useAsyncData(route.path, () =>
    queryCollection('projects_articles').path(route.path).first());

const title = post.value?.seo?.title || post.value?.title
const description = post.value?.seo?.description || post.value?.description

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
