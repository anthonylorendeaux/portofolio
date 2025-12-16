<script setup lang="ts">
const types = ['All', 'Website', 'Application', 'Game'];
const selectedType = ref('All');

const key = computed(() => `projects-list-${selectedType.value}`);

const { data: page } = await useAsyncData('project', () => {
    return queryCollection('projects').first()
})

if (!page.value) throw createError({ statusCode: 404 })

useSeoMeta(page.value.seo || {})

if (page.value.ogImage) {
    defineOgImage(page.value.ogImage)
}

const { data: projects, refresh } = await useAsyncData(key, () => {
    const query = queryCollection('projects_articles')
        .select("title", "description", "image", "type", "slug", "date")
        .order('date', 'DESC')
        .limit(6);

    if (selectedType.value !== 'All') {
        query.where("type", "=", selectedType.value);
    }

    return query.all();
});

watch(selectedType, () => {
    refresh();
});
</script>

<template>
    <UContainer>
        <h2 class="text-xl sm:text-3xl font-bold text-left"> {{ page.title }} </h2>

        <div class="flex flex-wrap gap-2 sm:justify-center my-4">
            <UButton v-for="type in types" :key="type" :label="type"
                :color="selectedType === type ? 'primary' : 'neutral'" @click="selectedType = type" variant="soft"
                size="sm" />
        </div>

        <div class="flex flex-wrap justify-center gap-6">
            <Card v-for="(project, index) in projects" :key="index" :project="project"
                class="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)]" />
        </div>
    </UContainer>
</template>
