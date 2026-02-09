<script lang="ts" setup>
defineProps(['project']);   
</script>
<template>
    <UCard variant="subtle"
        class="relative group h-[25vh] w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] overflow-hidden rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black">
        <NuxtImg :src="project.image" :alt="project.title"
            class="absolute inset-0 h-full w-full object-cover sm:grayscale group-hover:grayscale-0 group-focus-within:grayscale-0 transition duration-300"
            placeholder>
        </NuxtImg>

        <NuxtLink :to="project.path"
            class="absolute bottom-4 right-4 w-auto px-4 py-2 flex items-center space-x-2 rounded-md text-sm font-medium sm:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300">
            <UButton trailing-icon="i-lucide-arrow-right" size="md">See Project </UButton>
        </NuxtLink>
    </UCard>
</template>