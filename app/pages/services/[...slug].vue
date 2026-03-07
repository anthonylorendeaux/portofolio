<script setup lang="ts">

const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
    return queryCollection('services_articles').path(route.path).first()
})

if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page non trouvée', fatal: true })
}

const url = useRequestURL()

useSeoMeta({
    title: page.value.title,
    description: page.value.description,
    ogTitle: page.value.title,
    ogDescription: page.value.description,
    twitterTitle: page.value.title,
    twitterDescription: page.value.description,
    ogUrl: url.href
})

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
