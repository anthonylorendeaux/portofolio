<script setup lang="ts">

const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
    return queryCollection('index').path(route.path).first()
})
const { data: projects } = await useAsyncData('projects_articles', () => queryCollection('projects_articles').order('publishedAt', 'DESC')
    .limit(3)
    .all())

if (!page.value) throw createError({ statusCode: 404 })

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

const img = useImage()

useHead({
    link: computed(() => {
        const links = []
        if (page.value?.hero?.image?.src) {
            links.push({ rel: 'preload', as: 'image' as const, href: img(page.value.hero.image.src, { format: 'webp', quality: 85, width: 600 }), fetchpriority: 'high' as const, media: '(max-width: 1023px)' })
        }
        const first = page.value?.hero?.screenshots?.[0]
        if (first) {
            links.push({ rel: 'preload', as: 'image' as const, href: img(first.src, { format: 'webp', quality: 80, width: 600 }), fetchpriority: 'high' as const, media: '(min-width: 1024px)' })
        }
        return links
    })
})

useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
})


useHead({
    script: computed(() => {
        const scripts = []
        if (page.value?.faq?.items?.length) {
            scripts.push({
                type: 'application/ld+json',
                innerHTML: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    mainEntity: page.value.faq.items.map((item: { label: string; content: string }) => ({
                        '@type': 'Question',
                        name: item.label,
                        acceptedAnswer: { '@type': 'Answer', text: item.content }
                    }))
                })
            })
        }
        scripts.push({
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'ProfessionalService',
                name: 'Anthony Lorendeaux - Développeur Freelance',
                url: 'https://anthony-lorendeaux.com',
                areaServed: [
                    { '@type': 'City', name: 'Toulouse' },
                    { '@type': 'Country', name: 'France' }
                ],
                priceRange: '€€',
                provider: { '@id': 'https://anthony-lorendeaux.com/#person' },
                aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '4.8',
                    reviewCount: '12',
                    bestRating: '5'
                }
            })
        })
        return scripts
    })
})


</script>

<template>
    <UPage v-if="page">
        <div class="relative overflow-hidden">
            <ClientOnly>
                <LazyParticules :star-count="200" :size="{ min: 1, max: 3 }" />
            </ClientOnly>
            <UPageHero v-if="page.hero" :title="page.hero.title" :description="page.hero.description"
                orientation="horizontal">
                <template #headline>
                    <UBadge size="md" color="neutral" variant="outline">
                        <span class="relative flex w-2 h-2 mr-2">
                            <span class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                                :class="page.hero.badge ? 'bg-success-400' : 'bg-error-400'"></span>
                            <span class="relative inline-flex w-2 h-2 rounded-full"
                                :class="page.hero.badge ? 'bg-success-400' : 'bg-error-400'"></span>
                        </span>
                        {{ page.hero.badge ? 'Disponible pour un projet' : 'En mission' }}
                    </UBadge>
                </template>
                <template #links>
                    <div class="flex flex-col gap-6">
                        <div class="flex flex-wrap gap-3">
                            <UButton v-for="link in page.hero.links" :key="link.label" v-bind="link" size="lg" />
                        </div>
                        <div v-if="page.hero.socialProof" class="flex items-center gap-3">
                            <UAvatarGroup size="sm">
                                <UAvatar v-for="(avatar, i) in page.hero.socialProof.avatars" :key="i" :src="avatar.src"
                                    :alt="avatar.alt" />
                            </UAvatarGroup>
                            <div class="flex flex-col">
                                <div class="flex items-center gap-0.5">
                                    <UIcon v-for="n in page.hero.socialProof.rating" :key="n"
                                        name="i-heroicons-star-20-solid" class="w-4 h-4 text-warning-400" />
                                </div>
                                <span class="text-sm text-muted">{{ page.hero.socialProof.text }}</span>
                            </div>
                        </div>
                    </div>
                </template>
                <NuxtImg v-if="page.hero.image" :src="page.hero.image.src" :alt="page.hero.image.alt"
                    class="lg:hidden mx-auto rounded-xl" placeholder loading="eager" fetchpriority="high" quality="85"
                    format="webp" width="600" height="400" />
                <div v-if="page.hero.screenshots?.length"
                    class="hidden lg:flex items-center justify-center perspective-midrange">
                    <div class="w-full shadow-2xl rounded-xl overflow-hidden border border-default">
                        <div class="flex items-center gap-1.5 px-3 h-8 bg-muted shrink-0">
                            <span class="size-3 rounded-full bg-error-400/70" />
                            <span class="size-3 rounded-full bg-warning-400/70" />
                            <span class="size-3 rounded-full bg-success-400/70" />
                        </div>
                        <UCarousel :items="page.hero.screenshots" :loop="true"
                            :autoplay="{ delay: 3000, stopOnInteraction: false }" :arrows="false" :dots="false">
                            <template #default="{ item, index }">
                                <NuxtImg :src="item.src" :alt="item.alt" class="w-full aspect-video object-cover"
                                    width="600" height="338" format="webp" quality="80" :loading="'eager'"
                                    v-bind="index === 0 ? { fetchpriority: 'high' as const } : {}" />
                            </template>
                        </UCarousel>
                    </div>
                </div>
            </UPageHero>
        </div>
        <USeparator />
        <UPageSection v-if="page.services" :headline="page.services.headline" :title="page.services.title"
            :description="page.services.description" :features="page.services.features" :links="page.services.links" />

        <UPageSection v-if="page.projects" :title="page.projects.title" :description="page.projects.description"
            :headline="page.projects.headline">
            <UBlogPosts>
                <UBlogPost v-for="(project, index) in projects" :key="index" :to="project.path" :title="project.title"
                    :description="project.description" :image="{
                        src: project.image.src,
                        alt: project.image.alt,
                        width: 384,
                        height: 220,
                        sizes: '30vw',
                        format: 'webp',
                        quality: 80,
                        loading: 'lazy',
                    }" :date="new Date(project.publishedAt).toLocaleDateString('fr', {
                        year: 'numeric', month: 'short', day:
                            'numeric'
                    })" :badge="{ label: project.category, variant: 'solid' }" variant="outline" />
            </UBlogPosts>
        </UPageSection>
        <UPageSection v-if="page.testimonials" id="testimonials" :headline="page.testimonials.headline"
            :title="page.testimonials.title" :description="page.testimonials.description">
            <UPageColumns class="sm:columns-2 lg:columns-3 xl:columns-4">
                <UPageCard v-for="(testimonial, index) in page.testimonials.items" :key="index" variant="subtle"
                    :description="testimonial.quote"
                    :ui="{ description: 'before:content-[open-quote] after:content-[close-quote]' }">
                    <template #footer>
                        <div class="flex items-center justify-between w-full">
                            <UUser :name="testimonial.user.name" :description="testimonial.user.description" size="lg" />
                            <UButton icon="i-ri-fiverr-fill" to="https://www.fiverr.com/antho_lor" target="_blank"
                                size="xs" color="neutral" variant="ghost" aria-label="Voir sur Fiverr" />
                        </div>
                    </template>
                </UPageCard>
            </UPageColumns>
        </UPageSection>

        <UPageSection v-if="page.process" :headline="page.process.headline" :title="page.process.title"
            :description="page.process.description">
            <UTimeline :items="page.process.features.map((f, i) => ({ ...f, date: `Étape ${i + 1}` }))" color="primary"
                size="md" :default-value="page.process.features.length - 1" class="max-w-lg mx-auto" />
        </UPageSection>

        <div class="bg-elevated">
            <UPageSection v-if="page.about" :headline="page.about.headline" :title="page.about.title"
                :description="page.about.description" :links="page.about.links" orientation="horizontal"
                :reverse="true">
                <NuxtImg :src="page.about.image.src" :alt="page.about.image.alt" class="rounded-md" placeholder
                    loading="lazy" width="560" height="315" format="webp" quality="80" />
            </UPageSection>
        </div>

        <UPageSection v-if="page.faq" :title="page.faq.title" :description="page.faq.description">
            <UAccordion :items="page.faq.items" />
        </UPageSection>

        <UPageSection v-if="page.contact">
            <UPageCTA :title="page.contact.title" :description="page.contact.description" :links="page.contact.links"
                variant="soft" />
        </UPageSection>
    </UPage>
</template>
