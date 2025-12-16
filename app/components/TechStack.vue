<script setup lang="ts">
interface StackCategory {
    title: string
    description: string
    icon: string
    items: string[]
    class?: string
}

defineProps<{
    title: string
    description: string
    categories: StackCategory[]
}>()
</script>

<template>

    <div class="mb-8">
        <h3 class="text-2xl font-bold mb-2">{{ title }}</h3>
        <p class="text-dimmed">{{ description }}</p>
    </div>
    <UPageGrid>
        <UPageCard v-for="(cat, i) in categories" :key="i" :title="cat.title" spotlight spotlight-color="primary"
            :icon="cat.icon" :class="cat.class" variant="soft">
            <template #footer>
                <div class="flex flex-wrap gap-2 mt-auto pt-4">
                    <UBadge v-for="tech in cat.items" :key="tech" variant="soft" color="info" size="sm">
                        {{ tech }}
                    </UBadge>
                </div>
            </template>
        </UPageCard>
    </UPageGrid>
</template>
