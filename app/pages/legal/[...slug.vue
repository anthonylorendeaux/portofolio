<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryCollection('legal').path(route.path).first())
if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}
</script>

<template>
    <UContainer>
        <UPage v-if="page">

            <ContentRenderer v-if="page.body" :value="page" />

            <template v-if="page?.body?.toc?.links?.length" #right>
                <UContentToc :links="page.body.toc.links" title="Sur cette page" />
            </template>
        </UPage>
    </UContainer>
</template>
