<script setup lang="ts">
const { data: page } = await useAsyncData('blog', () => queryCollection('blog').first())
const { data: posts } = await useAsyncData('blog_posts', () => queryCollection('blog_articles').all())

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
            <UBlogPosts>
                <UBlogPost v-for="(post, index) in posts" :key="index" :to="post.path" :title="post.title"
                    :description="post.description" :image="post.image"
                    :date="new Date(post.publishedAt).toLocaleDateString('fr', { year: 'numeric', month: 'short', day: 'numeric' })"
                    :badge="{ label: post.category, variant: 'solid' }"
                    :orientation="index === 0 ? 'horizontal' : 'vertical'" :class="[index === 0 && 'col-span-full']"
                    variant="naked" :ui="{
                        description: 'line-clamp-2'
                    }" />
            </UBlogPosts>
        </UPageBody>
    </UContainer>
</template>