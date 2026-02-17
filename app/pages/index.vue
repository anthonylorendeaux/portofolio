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
    ogDescription: description
})

</script>

<template>
    <UPage v-if="page">
        <LazyParticules />
        <UPageHero v-if="page.hero" :title="page.hero.title" :description="page.hero.description"
            headline="page.hero.badge" :links="page.hero.links" orientation="horizontal">
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
            <NuxtImg src="/contact_head.png" />
        </UPageHero>
        <USeparator />
        <UPageSection v-if="page.projects" :title="page.projects.title" :description="page.projects.description"
            :headline="page.projects.headline">
            <UBlogPosts>
                <UBlogPost v-for="(project, index) in projects" :key="index" :to="project.path" :title="project.title"
                    :description="project.description" :image="project.image"
                    :date="new Date(project.publishedAt).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })"
                    :badge="{ label: project.type, variant: 'solid' }" variant="outline" />
            </UBlogPosts>
        </UPageSection>
        <UPageSection v-if="page.faq" :title="page.faq.title" :description="page.faq.description">
            <UAccordion :items="page.faq.items" />
        </UPageSection>
        <UPageSection v-if="page.contact">
            <UPageCTA :title="page.contact.title" :description="page.contact.description" :links="page.contact.links"
                variant="soft" />
        </UPageSection>
    </UPage>
</template>