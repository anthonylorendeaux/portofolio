<template>
    <div class="min-h-screen flex flex-col">
        <AppHeader />

        <main class="flex-grow flex items-center justify-center mt-4 sm:mt-20 px-4">
            <slot />
        </main>

        <AppFooter />
    </div>
</template>
