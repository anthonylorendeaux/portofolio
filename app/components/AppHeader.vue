<script setup lang="ts">
const appConfig = useAppConfig();
</script>

<template>
    <UHeader to="/">
        <template #title>
            <span class="text-primary font-bold tracking-tighter text-xl uppercase">AL</span>
        </template>

        <template #default>
            <UNavigationMenu :items="appConfig.navigation" variant="link" />
        </template>

        <template #right>
            <UButton :to="appConfig.header.cta.to" :icon="appConfig.header.cta.icon" color="primary" variant="solid"
                target="_blank" class="sm:hidden" />
            <UButton :label="appConfig.header.cta.label" :to="appConfig.header.cta.to" :icon="appConfig.header.cta.icon"
                color="primary" variant="solid" target="_blank" class="hidden sm:inline-flex" />
            <UColorModeButton />
        </template>

        <template #body>
            <UNavigationMenu :items="appConfig.navigation" orientation="vertical" class="-mx-2.5" />
        </template>
    </UHeader>
</template>
