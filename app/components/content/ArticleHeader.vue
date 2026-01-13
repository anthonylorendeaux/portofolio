<script setup>
defineProps(['url'])
</script>

<template>
    <section>
        <div class="inline-flex justify-between w-full items-center">
            <h1 class="text-3xl font-bold text-left">
                <slot />
            </h1>
            <div class="flex items-center gap-2">
                <UButton :to="url" trailing-icon="i-lucide-external-link" target="_blank" variant="soft"> Link
                </UButton>
            </div>
        </div>
        <div class="mt-2 text-justify">
            <slot name="description" />
        </div>
    </section>
</template>