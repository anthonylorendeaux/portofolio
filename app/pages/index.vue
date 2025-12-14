<script setup>
definePageMeta({
    layout: 'hero-centered'
})
</script>

<template>
    <div>
        <LazyHeroParticules />
        <UContainer class="flex items-center justify-center">
            <div class="w-full h-full max-w-4xl flex flex-col items-center text-center gap-6">
                <UBadge size="md" color="neutral" variant="outline">
                    <span class="relative flex w-2 h-2">
                        <span
                            class="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--ui-color-success-400) opacity-75"></span>
                        <span class="relative inline-flex w-2 h-2 rounded-full bg-(--ui-color-success-400)"></span>
                    </span>
                    Available for work
                </UBadge>
                <h1 class="text-3xl sm:text-6xl font-bold">Hey, I'm Anthony Lorendeaux</h1>
                <h2 class="text-lg sm:text-3xl">A software engineer, based in Toulouse, France 🇫🇷</h2>
                <div class="flex justify-center gap-2">
                    <UButton color="primary" size="xl" to="/contact">
                        Let's work together
                    </UButton>
                    <UButton color="neutral" size="xl"
                        to="https://groovy-sheep-ad9.notion.site/Online-Resume-20e1166d4c68806b848ae466ad244e33?pvs=74">
                        My Resume
                    </UButton>
                </div>
            </div>
        </UContainer>
    </div>
</template>
