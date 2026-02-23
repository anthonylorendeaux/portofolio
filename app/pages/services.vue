<script setup lang="ts">
const { data: page } = await useAsyncData('services', () => {
    return queryCollection('services').first()
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
            <UPageSection v-if="page.pricing" :headline="page.pricing.headline" :title="page.pricing.title"
                :description="page.pricing.description">
                <UPricingPlans v-if="page.pricing" :plans="page.pricing.plans" />
            </UPageSection>
            <UPageSection v-if="page.services" :headline="page.services.headline" :title="page.services.title"
                :description="page.services.description">
                <UPageGrid>
                    <UPageCard v-for="(feature, index) in page.services.features" :key="index" :title="feature.title"
                        :description="feature.description" :icon="feature.icon" variant="subtle" spotlight
                        spotlight-color="primary" />
                </UPageGrid>
            </UPageSection>
            <UPageSection v-if="page.faq" :title="page.faq.title" :description="page.faq.description">
                <UAccordion :items="page.faq.items" />
            </UPageSection>
        </UPageBody>
    </UContainer>
</template>
