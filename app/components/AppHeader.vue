<script setup lang="ts">

const items = ref([
    [
        { label: 'Home', to: '/', },
        { label: 'About', to: '/about' },
        { label: 'Projects', to: '/projects' },
        { label: 'Contact', to: '/contact' }
    ],
    [
        {
            slot: 'color-mode'
        }
    ]
]);

const itemsMobile = ref([
    [
        { label: 'Home', to: '/', },
        { label: 'About', to: '/about' },
        { label: 'Projects', to: '/projects' },
        { label: 'Contact', to: '/contact' }
    ],
]); 
</script>

<!-- <template>
    <header
        class="sticky top-0 sm:top-2 z-10 flex justify-between items-center w-full backdrop-blur-sm sm:backdrop-blur-none">
        <div class="hidden sm:flex mx-auto">
            <UNavigationMenu :items="items"
                class="hidden mx-auto sm:flex px-4 rounded-full border border-(--ui-border-muted) shadow-lg shadow-neutral-950/5 bg-muted/80 backdrop-blur-sm"
                variant="link">
                <template #color-mode>
                    <ColorMode />
                </template>
            </UNavigationMenu>
        </div>
        <USlideover side="top" title="Navigation" class="sm:hidden flex justify-end p-3 z-10 backdrop-blur-sm">
            <UButton icon="i-lucide-menu" label="Open" color="neutral" variant="ghost" />
            <div class="sm:hidden">
                <ColorMode />
            </div>
            <template #body>
                <UNavigationMenu :items="itemsMobile" orientation="vertical" />
            </template>
        </USlideover>
    </header>
</template> -->
<template>
    <UHeader to="/">
        <template #title>
            <h1 class="text-primary"> AL </h1>
        </template>

        <UNavigationMenu :items="items" variant="link" />

        <template #right>
            <UColorModeButton />
        </template>

        <template #body>
            <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
        </template>
    </UHeader>
</template>