<template>
    <UContainer>
        <h2 class="text-xl sm:text-3xl font-bold text-left mb-2">Contact.</h2>
        <div class="flex flex-col lg:flex-row justify-between items-start gap-8 h-3/5">
            <section class="lg:w-3/5 space-y-6">
                <p class="text-lg mb-8 text-justify">
                    You are seeking for a well-structured website that not only looks great but is also fast,
                    responsive,
                    and easy
                    to maintain on your own?
                    I specialize in crafting modern web experiences using robust technologies like Nuxt, Strapi, and
                    Tailwind
                    CSS.
                    Whether you're a business, a creative, or just someone with a bold idea — let’s build something that
                    reflects your vision and performs at scale.
                    Feel free to reach out and let’s talk about how we can bring your project to life.
                </p>
                <div class="space-y-2 pt-6 sm:pt-14">
                    <p class="font-semibold">Email:</p>
                    <ULink href="mailto:anthony.lorendeaux19@gmail.com" as="button">
                        anthony.lorendeaux19@gmail.com
                    </ULink>

                    <p class="font-semibold mt-4">On the Internet:</p>
                    <div class="flex flex-wrap gap-4">
                        <ULink to="https://linkedin.com/in/anthony-lorendeaux/" target="_blank" as="button">
                            LinkedIn
                        </ULink>
                        <ULink to="https://linkedin.com/in/anthony-lorendeaux/" target="_blank" as="button">
                            Fiverr
                        </ULink>
                        <ULink to="https://github.com/anthonylorendeaux" target="_blank" as="button">
                            GitHub
                        </ULink>
                    </div>
                </div>
            </section>

            <div class="lg:w-2/5 flex justify-center items-center">
                <CanvasEffect />
            </div>
        </div>
    </UContainer>
</template>
