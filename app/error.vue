<script setup lang="ts">
import type { NuxtError } from '#app';

defineProps<{
    error: NuxtError
}>()
</script>

<template>
    <UApp>
        <AppHeader />

        <UError :error="error" :clear="{ label: 'Retour à l\'accueil', color: 'primary', variant: 'solid' }"
            class="relative">
            <template #message>
                <div class="text-neutral-500 max-w-sm mx-auto mb-8">
                    {{ error.statusCode === 404
                        ? "Il semble que vous vous soyez aventuré dans une zone encore non développée."
                        : "Mon serveur semble avoir besoin d'une petite pause. Réessayez dans quelques instants."
                    }}
                </div>
                <Particules />
            </template>
        </UError>

        <AppFooter />
    </UApp>
</template>
