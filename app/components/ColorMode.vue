<script setup>
const colorMode = useColorMode()

const isDark = computed({
    get() {
        return colorMode.value === 'dark'
    },
    set() {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
})
</script>

<template>
    <ClientOnly v-if="!colorMode?.forced">
        <UButton class="py-0" :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'" color="neutral" variant="link"
            @click="isDark = !isDark" aria-label="Switch theme" />
        <template #fallback>
            <div class="size-4" />
        </template>
    </ClientOnly>
</template>