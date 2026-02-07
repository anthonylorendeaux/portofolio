<script setup lang="ts">
const { data: page } = await useAsyncData('about', () => {
    return queryCollection('about').first()
})

if (!page.value) throw createError({ statusCode: 404 })

useSeoMeta(page.value.seo || {})

</script>

<template>
    <UContainer class="py-12" v-if="page">
        <h2 class="text-xl sm:text-3xl font-bold text-left mb-8">
            {{ page.title }}
        </h2>

        <div class="prose dark:prose-invert max-w-none mb-16 text-justify">
            <MDC :value="page.bio" tag="div" />
        </div>

        <TechStack v-if="page.techStack" :title="page.techStack.title" :description="page.techStack.description"
            :categories="page.techStack.categories" />
    </UContainer>
</template>
