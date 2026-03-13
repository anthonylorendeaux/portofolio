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
            <UColorModeButton />
        </template>

        <template #body>
            <UNavigationMenu :items="appConfig.navigation" orientation="vertical" class="-mx-2.5" />
        </template>
    </UHeader>
</template>
