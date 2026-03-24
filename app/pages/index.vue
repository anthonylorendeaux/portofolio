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

useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
})


</script>

<template>
    <UPage v-if="page">
        <div class="relative overflow-hidden">
            <LazyParticules :star-count="100" :size="{ min: 0.5, max: 1.5 }" />
            <UPageHero v-if="page.hero" :title="page.hero.title" :description="page.hero.description"
                headline="page.hero.badge" orientation="horizontal">
                <template #headline>
                    <UBadge size="md" color="neutral" variant="outline">
                        <span class="relative flex w-2 h-2 mr-2">
                            <span class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                                :class="page.hero.badge ? 'bg-success-400' : 'bg-error-400'"></span>
                            <span class="relative inline-flex w-2 h-2 rounded-full"
                                :class="page.hero.badge ? 'bg-success-400' : 'bg-error-400'"></span>
                        </span>
                        {{ page.hero.badge ? 'Available for work' : 'Working on a project' }}
                    </UBadge>
                </template>
                <template #links>
                    <div class="flex flex-col gap-5">
                        <div class="flex flex-wrap gap-3">
                            <UButton v-for="link in page.hero.links" :key="link.label" v-bind="link" />
                        </div>
                        <div v-if="page.hero.socialProof" class="flex items-center gap-3">
                            <UAvatarGroup size="sm" :max="4">
                                <UAvatar v-for="avatar in page.hero.socialProof.avatars" :key="avatar.src"
                                    :src="avatar.src" :alt="avatar.alt" />
                            </UAvatarGroup>
                            <div class="flex flex-col gap-0.5">
                                <span class="text-sm font-medium text-default">{{ page.hero.socialProof.text }}</span>
                                <div class="flex items-center gap-0.5">
                                    <UIcon v-for="i in page.hero.socialProof.rating" :key="i"
                                        name="i-heroicons-star-20-solid" class="size-4 text-amber-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <div class="hidden md:block w-full aspect-4/5 max-w-xs mx-auto">
                    <CanvasEffect />
                </div>
                <NuxtImg :src="page.hero.image.src" :alt="page.hero.image.alt" class="md:hidden" placeholder
                    :preload="{ fetchPriority: 'high' }" quality="85" format="webp" width="600" height="400" />
            </UPageHero>
        </div>
        <USeparator />
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
                        <UUser v-bind="testimonial.user" :avatar="{ alt: testimonial.user.name }" size="lg" />
                    </template>
                </UPageCard>
            </UPageColumns>
        </UPageSection>
        <div class="bg-elevated">
            <UPageSection v-if="page.about" :headline="page.about.headline" :title="page.about.title"
                :description="page.about.description" :links="page.about.links" orientation="horizontal"
                :reverse="true">
                <NuxtImg :src="page.about.image.src" :alt="page.about.image.alt" class="rounded-md" placeholder
                    loading="lazy" />
            </UPageSection>
        </div>
        <UPageSection v-if="page.services" :headline="page.services.headline" :title="page.services.title"
            :description="page.services.description" :features="page.services.features" />

        <UPageSection v-if="page.faq" :title="page.faq.title" :description="page.faq.description">
            <UAccordion :items="page.faq.items" />
        </UPageSection>

        <UPageSection v-if="page.contact">
            <UPageCTA :title="page.contact.title" :description="page.contact.description" :links="page.contact.links"
                variant="soft" />
        </UPageSection>
    </UPage>
</template>
