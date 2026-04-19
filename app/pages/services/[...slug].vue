<script setup lang="ts">

const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
    return queryCollection('services_articles').path(route.path).first()
})

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page non trouvée', fatal: true })
}

const url = useRequestURL()

const title = page.value?.seo?.title || page.value.title
const description = page.value?.seo?.description || page.value.description

useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    twitterTitle: title,
    twitterDescription: description,
    ogUrl: url.href
})

useJsonLdBreadcrumb([
    { name: 'Accueil', path: '/' },
    { name: 'Services', path: '/services' },
    { name: page.value.title, path: route.path }
])

if (page.value?.faq?.items) {
    useJsonLdFaqPage(page.value.faq.items)
}

</script>

<template>
    <UContainer>
        <UPage v-if="page">
            <UPageHeader :title="page.title" :description="page.description" class="py-[50px]" />

            <UPageBody>

                <ContentRenderer v-if="page" :value="page" />


                <UPageCTA title="Prêt à lancer votre projet ?"
                    description="Discutons ensemble de vos besoins et de la meilleure solution pour votre activité. Devis gratuit sous 24h."
                    :links="[{ label: 'Discuter de votre projet', to: '/contact', color: 'primary', size: 'lg', icon: 'i-lucide-arrow-right' }]"
                    variant="soft" />
            </UPageBody>
        </UPage>
    </UContainer>
</template>
