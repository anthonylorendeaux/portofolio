<script setup lang="ts">
const { locale } = useI18n()

const { data: page } = await useAsyncData('blog', () => queryCollection('blog').first())
const { data: posts } = await useAsyncData(`blog_posts_${locale.value}`, async () => {
    const collectionName = `blog_articles_${locale.value}` as 'blog_articles_en' | 'blog_articles_fr';
    const articles = await queryCollection(collectionName).all();

    return articles.map(article => {
        const parts = article.path.split('/');
        const slug = parts[parts.length - 1];

        return {
            ...article,
            path: locale.value === 'fr' ? `/blog/${slug}` : `/${locale.value}/blog/${slug}`
        };
    });
}, { watch: [locale] })

if (!page.value) throw createError({ statusCode: 404 })

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
    twitterCard: 'summary_large_image',
})
</script>

<template>
    <UContainer>
        <UPageHeader v-bind="page" />

        <UPageBody>
            <UBlogPosts>
                <UBlogPost v-for="(post, index) in posts" :key="index" :to="post.path" :title="post.title"
                    :description="post.description" :image="post.image"
                    :date="new Date(post.publishedAt).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })"
                    :badge="{ label: post.category, variant: 'solid' }"
                    :orientation="index === 0 ? 'horizontal' : 'vertical'" :class="[index === 0 && 'col-span-full']"
                    variant="naked" :ui="{
                        description: 'line-clamp-2'
                    }" />
            </UBlogPosts>
        </UPageBody>
    </UContainer>
</template>