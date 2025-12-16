<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
    <div class="w-full">
        <footer class="mx-10 mt-2 mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">

            <div>
                <ul class="flex space-x-4 items-center">
                    <li v-for="social in appConfig.footer.socials" :key="social.label">
                        <ULink :to="social.to" target="_blank" class="hover:text-primary transition-colors">
                            {{ social.label }}
                        </ULink>
                    </li>
                </ul>
            </div>

            <div class="text-center text-sm text-muted">
                {{ appConfig.footer.copyright }}
            </div>

        </footer>
    </div>
</template>
