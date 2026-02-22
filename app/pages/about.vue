<script setup lang="ts">
const { data: page } = await useAsyncData('about', () => {
    return queryCollection('about').first()
})

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
    <UContainer v-if="page">
        <UPageHeader v-bind="page" />

        <UPageBody>
            <UPageSection v-if="page.about" :headline="page.about.headline" :title="page.about.title"
                :description="page.about.description" orientation="horizontal">
                <NuxtImg :src="page.about.image.src" :alt="page.about.image.alt" class="rounded-md" placeholder
                    loading="lazy" />
            </UPageSection>
            <UPageSection :headline="page.timeline.headline" :title="page.timeline.title"
                :description="page.timeline.description" v-if="page.timeline">
                <UTimeline v-if="page.timeline" :items="page.timeline.items" :default-value="0" orientation="horizontal"
                    :reverse="true" />
            </UPageSection>
            <UPageSection v-if="page.values" :headline="page.values.headline" :title="page.values.title"
                :description="page.values.description" :features="page.values.features" />
            <UPageSection v-if="page.contact">
                <UPageCTA :title="page.contact.title" :description="page.contact.description"
                    :links="page.contact.links" variant="soft" />
            </UPageSection>
        </UPageBody>
    </UContainer>
</template>
