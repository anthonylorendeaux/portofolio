<template>
    <div class="min-h-screen flex flex-col">
        <Header />

        <main class="flex-grow flex items-start justify-center mt-4 sm:mt-20 px-4">
            <slot />
        </main>

        <Footer />
    </div>
</template>
