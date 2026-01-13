<script setup lang="ts">
const { data: page } = await useAsyncData('contact', () => {
    return queryCollection('contact').first()
})

if (!page.value) throw createError({ statusCode: 404 })

useSeoMeta(page.value.seo || {})

if (page.value.ogImage) {
    defineOgImage(page.value.ogImage)
}
</script>

<template>
    <UContainer class="py-12" v-if="page">
        <h2 class="text-xl sm:text-3xl font-bold text-left mb-2">
            {{ page.title }}
        </h2>

        <div class="flex flex-col lg:flex-row justify-between items-start gap-8 h-3/5">
            <section class="lg:w-3/5 space-y-6">

                <p class="text-lg mb-8 text-justify whitespace-pre-line">
                    {{ page.intro }}
                </p>

                <div class="space-y-2 pt-6 sm:pt-14">
                    <p class="font-semibold">Email:</p>
                    <ULink :href="`mailto:${page.email}`" class="text-primary hover:underline">
                        {{ page.email }}
                    </ULink>

                    <p class="font-semibold mt-4">On the Internet:</p>
                    <div class="flex flex-wrap gap-4">
                        <ULink v-for="(social, index) in page.socials" :key="index" :to="social.to"
                            :target="social.target" class="hover:text-primary transition-colors">
                            {{ social.label }}
                        </ULink>
                    </div>
                </div>
            </section>

            <div class="lg:w-2/5 flex justify-center items-center">
                <ClientOnly>
                    <LazyCanvasEffect />
                    <template #fallback>
                        <div class="w-full h-64 bg-gray-100 animate-pulse rounded"></div>
                    </template>
                </ClientOnly>
            </div>
        </div>
    </UContainer>
</template>
