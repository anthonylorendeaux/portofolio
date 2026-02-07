<!-- components/content/HeroHome.vue -->
<script setup lang="ts">
interface HeroButton {
    label: string
    to: string
    icon?: string
    target?: string
    color?: "error" | "primary" | "secondary" | "success" | "info" | "warning" | "neutral"
    variant?: "solid" | "outline" | "soft" | "subtle" | "ghost" | "link"
}

defineProps<{
    title: string
    subtitle: string
    badge: boolean
    buttons: HeroButton[]
}>()
</script>

<template>
    <LazyHeroParticules />
    <UContainer class="flex items-center justify-center h-[60vh]">
        <div class="w-full h-full max-w-4xl flex flex-col items-center text-center gap-6">
            <UBadge size="md" color="neutral" variant="outline">
                <span class="relative flex w-2 h-2 mr-2">
                    <span class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                        :class="badge ? 'bg-success-400' : 'bg-error-400'"></span>
                    <span class="relative inline-flex w-2 h-2 rounded-full"
                        :class="badge ? 'bg-success-400' : 'bg-error-400'"></span>
                </span>
                {{ badge ? 'Available for work' : 'Working on a project' }}
            </UBadge>

            <h1 class="text-3xl sm:text-6xl font-bold">{{ title }}</h1>
            <h2 class="text-lg sm:text-3xl">{{ subtitle }}</h2>

            <div class="flex justify-center gap-2">
                <UButton v-for="(btn, i) in buttons" :key="i" size="xl" :to="btn.to" :color="btn.color || 'primary'"
                    :variant="btn.variant || 'solid'" :icon="btn.icon" :target="btn.target">
                    {{ btn.label }}
                </UButton>
            </div>
        </div>
    </UContainer>

</template>
