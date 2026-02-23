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
                <div class="max-w-2xl mx-auto">
                    <UTimeline v-if="page.timeline" :items="page.timeline.items" :default-value="0"
                        orientation="vertical" :reverse="true" />
                </div>
            </UPageSection>
            <UPageSection v-if="page.values" :headline="page.values.headline" :title="page.values.title"
                :description="page.values.description">
                <UPageGrid>
                    <UPageCard v-for="(feature, index) in page.values.features" :key="index" :title="feature.title"
                        :description="feature.description" :icon="feature.icon" :to="feature.to" variant="subtle"
                        spotlight spotlight-color="primary" />
                </UPageGrid>
            </UPageSection>
            <UPageSection v-if="page.contact">
                <UPageCTA :title="page.contact.title" :description="page.contact.description"
                    :links="page.contact.links" variant="soft" />
            </UPageSection>
        </UPageBody>
    </UContainer>
</template>
