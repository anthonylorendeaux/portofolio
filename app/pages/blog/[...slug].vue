<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()

const slugValue = computed(() => {
    return Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug;
})

const { data: post } = await useAsyncData(route.path, async () => {
    const collectionName = `blog_articles_${locale.value}` as 'blog_articles_en' | 'blog_articles_fr';
    const contentPath = `/blog/${locale.value}/${slugValue.value}`;

    console.log('[DEBUG SLUG]', 'route.path:', route.path, 'slug:', slugValue.value, 'contentPath:', contentPath);

    let content = await queryCollection(collectionName).path(contentPath).first();

    if (!content && locale.value !== 'fr') {
        const fallbackPath = `/blog/fr/${slugValue.value}`;
        content = await queryCollection('blog_articles_fr').path(fallbackPath).first();
    }

    // Explicitly update the path so SEO module maps correctly if it relies on this object locally
    if (content) {
        content.path = route.path;
    }

    return content;
});

if (!post.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, async () => {
    const collectionName = `blog_articles_${locale.value}` as 'blog_articles_en' | 'blog_articles_fr';
    const contentPath = `/blog/${locale.value}/${slugValue.value}`;

    let surroundData = await queryCollectionItemSurroundings(collectionName, contentPath);

    if (!surroundData && locale.value !== 'fr') {
        const fallbackPath = `/blog/fr/${slugValue.value}`;
        surroundData = await queryCollectionItemSurroundings('blog_articles_fr', fallbackPath);
    }
    return surroundData;
})

const title = post.value?.seo?.title || post.value?.title
const description = post.value?.seo?.description || post.value?.description

useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description
})

useSchemaOrg([
    defineArticle({
        headline: title,
        description: description,
        datePublished: post.value?.publishedAt ? new Date(post.value.publishedAt).toISOString() : undefined,
        image: post.value?.image?.src || undefined,
        author: {
            name: 'Anthony Lorendeaux',
            url: 'https://anthony-lorendeaux.com'
        }
    })
])
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
