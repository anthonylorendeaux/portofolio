<script setup lang="ts">
const appConfig = useAppConfig();
</script>

<template>
    <UHeader to="/">
        <template #title>
            <h1 class="text-primary"> AL </h1>
        </template>

        <UNavigationMenu :items="appConfig.navigation" variant="link" />

        <template #right>
            <UColorModeButton />
        </template>

        <template #body>
            <UNavigationMenu :items="appConfig.navigation" orientation="vertical" class="-mx-2.5" />
        </template>
    </UHeader>
</template>