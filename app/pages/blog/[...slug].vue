<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(route.path, () => queryCollection('blog').path(route.path).first())
if (!post.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
const { data: surround } = await useAsyncData(`${route.path}-surround`, () =>
    queryCollectionItemSurroundings('blog', route.path)
)

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
