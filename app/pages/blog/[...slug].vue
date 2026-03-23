<script setup lang="ts">
const route = useRoute()

const slugValue = computed(() => {
    return Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug;
})

const { data: post } = await useAsyncData(route.path, async () => {
    const contentPath = `/blog/${slugValue.value}`;
    const content = await queryCollection('blog_articles').path(contentPath).first();

    if (content) {
        content.path = route.path;
    }

    return content;
});

if (!post.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
    return queryCollectionItemSurroundings('blog_articles', `/blog/${slugValue.value}`);
})

const title = post.value?.seo?.title || post.value?.title
const description = post.value?.seo?.description || post.value?.description

useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
    ogImage: post.value?.image?.src ? `https://anthony-lorendeaux.com${post.value.image.src}` : 'https://anthony-lorendeaux.com/contact_head.png',
    ogImageAlt: post.value?.image?.alt || title,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterCard: 'summary_large_image',
    twitterImage: post.value?.image?.src ? `https://anthony-lorendeaux.com${post.value.image.src}` : 'https://anthony-lorendeaux.com/contact_head.png',
    articlePublishedTime: post.value?.publishedAt ? new Date(post.value.publishedAt).toISOString() : undefined,
    articleModifiedTime: post.value?.updatedAt ? new Date(post.value.updatedAt).toISOString() : (post.value?.publishedAt ? new Date(post.value.publishedAt).toISOString() : undefined),
    ogType: 'article',
    articleSection: post.value?.category,
    articleTag: post.value?.category ? [post.value.category] : undefined,
})
</script>

<template>
    <UContainer>
        <UPage v-if="post">
            <UPageHeader :title="post.title" />

            <UPageBody>
                <ContentRenderer v-if="post.body" :value="post" />

                <USeparator v-if="surround?.filter(Boolean).length" />

                <UContentSurround :surround="(surround as any)" />
            </UPageBody>

            <template v-if="post?.body?.toc?.links?.length" #right>
                <UContentToc :links="post.body.toc.links" title="Sur cette page" />
            </template>
        </UPage>
    </UContainer>
</template>
