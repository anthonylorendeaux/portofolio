<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('projects', () => queryCollection('projects').first())
const { data: posts } = await useAsyncData('projects_articles', () => queryCollection('projects_articles').all())

if (!page.value) throw createError({ statusCode: 404 })

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
        <UPageHeader v-bind="page" />

        <UPageBody>
            <UBlogPosts orientation="vertical">
                <UBlogPost v-for="(post, index) in posts" :key="index" :to="post.path" :title="post.title"
                    :description="post.description" :image="post.image"
                    :date="new Date(post.publishedAt).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })"
                    :badge="{ label: post.category, variant: 'soft', color: 'primary' }" orientation="horizontal"
                    variant="soft" />
            </UBlogPosts>
        </UPageBody>
    </UContainer>
</template>