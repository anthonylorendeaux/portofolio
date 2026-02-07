<script setup lang="ts">

const appConfig = useAppConfig();

</script>

<template>
    <USeparator icon="i-lucide-link" class="h-px" />
    <UFooter :ui="{ top: 'border-b border-default' }">
        <template #top>
            <UContainer>
                <UFooterColumns :columns="appConfig.footer.columns">
                    <template #right>
                        <UFormField name="email" label="Souscrire à ma newsletter" size="lg">
                            <UInput type="email" class="w-full">
                                <template #trailing>
                                    <UButton type="submit" size="xs" color="neutral" label="Souscrire" />
                                </template>
                            </UInput>
                        </UFormField>
                    </template>
                </UFooterColumns>
            </UContainer>
        </template>
        <template #right>
            <UNavigationMenu :items="appConfig.footer.socials" variant="link" />
        </template>
        <template #left>
            {{ appConfig.footer.copyright }}
        </template>
    </UFooter>
</template>
