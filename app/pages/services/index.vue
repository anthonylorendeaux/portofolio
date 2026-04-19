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

useJsonLdBreadcrumb([
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/services' }
])

if (page.value?.faq?.items) {
    useJsonLdFaqPage(page.value.faq.items)
}

const planButton = (plan: any) => ({
    label: plan.cta?.label || 'Choisir',
    to: plan.cta?.to || '/contact',
    color: 'primary' as const,
    size: 'lg' as const,
    block: true
})

const planFeatures = (plan: any) => {
    const features = []
    if (plan.forWho) features.push(`Pour: ${plan.forWho}`)
    if (plan.forWhy) features.push(plan.forWhy)
    if (plan.benefits) {
        plan.benefits.forEach((b: any) => features.push(`${b.label}: ${b.description}`))
    }
    return features
}
</script>

<template>
    <UPage v-if="page">
        <UContainer>
            <UPageHero v-if="page.hero" :headline="page.hero.headline" :title="page.hero.title"
                :description="page.hero.description" align="center">
                <template #links>
                    <div class="flex flex-wrap justify-center gap-3">
                        <UButton v-for="link in page.hero.links" :key="link.to" :label="link.label" :to="link.to"
                            :color="link.color" :size="link.size" :variant="link.variant" />
                    </div>
                </template>
            </UPageHero>

            <div v-if="page.hero?.proofs" class="flex flex-wrap justify-center gap-6 py-8">
                <div v-for="proof in page.hero.proofs" :key="proof.text"
                    class="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                    <UIcon :name="proof.icon || 'i-lucide-check'" class="w-4 h-4 text-primary" />
                    <span>{{ proof.text }}</span>
                </div>
            </div>
        </UContainer>

        <USeparator class="my-12" />

        <UContainer>
            <UPageSection v-if="page.pricing" :headline="page.pricing.headline" :title="page.pricing.title"
                :description="page.pricing.description" :id="page.pricing.anchor">
                <UPricingPlans>
                    <UPricingPlan v-for="plan in page.pricing.plans" :key="plan.title" :title="plan.title"
                        :description="plan.description" :price="plan.price" :badge="plan.badge?.label"
                        :features="planFeatures(plan)" :button="planButton(plan)" :highlight="plan.mostPopular"
                        :scale="plan.scale" />
                </UPricingPlans>
            </UPageSection>
        </UContainer>

        <USeparator class="my-12" />

        <UContainer>
            <UPageSection v-if="page.included" :headline="page.included.headline" :title="page.included.title"
                :description="page.included.description">
                <UPageGrid>
                    <UPageCard v-for="item in page.included.items" :key="item.title" :title="item.title"
                        :description="item.description" :icon="item.icon" variant="outline" />
                </UPageGrid>
            </UPageSection>
        </UContainer>

        <div class="bg-neutral-50 dark:bg-neutral-900/50 -mx-4 px-4 py-12">
            <UContainer>
                <UPageSection v-if="page.about" :headline="page.about.headline" :title="page.about.title"
                    :description="page.about.description">
                    <div class="grid sm:grid-cols-2 gap-8">
                        <UPageFeature v-for="item in page.about.items" :key="item.title" :title="item.title"
                            :description="item.description" :icon="item.icon" orientation="horizontal" />
                    </div>
                </UPageSection>
            </UContainer>
        </div>

        <USeparator class="my-12" />

        <UContainer>
            <UPageSection v-if="page.faq" :title="page.faq.title" :description="page.faq.description">
                <UAccordion :items="page.faq.items" />
            </UPageSection>
        </UContainer>

        <div class="py-12">
            <UContainer>
                <UPageCTA v-if="page.cta" :title="page.cta.title" :description="page.cta.description"
                    :links="page.cta.links" variant="soft" />
            </UContainer>
        </div>
    </UPage>
</template>