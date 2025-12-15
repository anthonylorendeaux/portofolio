<!-- components/content/HeroHome.vue -->
<script setup lang="ts">
interface HeroButton {
    label: string
    to: string
    icon?: string
    target?: string
}

defineProps<{
    title: string
    subtitle: string
    badge: string
    primary: HeroButton
    secondary: HeroButton
}>()
</script>

<template>

    <LazyHeroParticules />
    <UContainer class="flex items-center justify-center">
        <div class="w-full h-full max-w-4xl flex flex-col items-center text-center gap-6">
            <!-- Badge avec animation -->
            <UBadge size="md" color="neutral" variant="outline">
                <span class="relative flex w-2 h-2 mr-2">
                    <span
                        class="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--ui-color-success-400) opacity-75"></span>
                    <span class="relative inline-flex w-2 h-2 rounded-full bg-(--ui-color-success-400)"></span>
                </span>
                {{ badge }}
            </UBadge>

            <!-- Titres dynamiques -->
            <h1 class="text-3xl sm:text-6xl font-bold">{{ title }}</h1>
            <h2 class="text-lg sm:text-3xl">{{ subtitle }}</h2>

            <!-- Boutons dynamiques -->
            <div class="flex justify-center gap-2">
                <UButton color="primary" size="xl" :to="primary.to">
                    {{ primary.label }}
                </UButton>
                <UButton color="neutral" size="xl" :to="secondary.to">
                    {{ secondary.label }}
                </UButton>
            </div>
        </div>
    </UContainer>

</template>
