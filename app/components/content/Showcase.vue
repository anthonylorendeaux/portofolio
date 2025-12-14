<script setup>
defineProps(['img'])
</script>

<template>
    <NuxtImg :src="img" class="w-full mt-10 border" alt="Project visual" placeholder />
</template>