<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface Star {
    x: number
    y: number
    size: number
}

const props = withDefaults(defineProps<{
    starCount?: number
    color?: string
    speed?: 'slow' | 'normal' | 'fast'
    size?: { min: number, max: number }
}>(), {
    starCount: 300,
    color: 'var(--ui-primary)',
    speed: 'normal',
    size: () => ({ min: 1, max: 3 })
})

// Détecter si mobile pour réduire le nombre d'étoiles
const isMobile = ref(false)

onMounted(() => {
    isMobile.value = typeof window !== 'undefined' && window.innerWidth < 768
})

// Nombre d'étoiles réduit sur mobile (80 au lieu de 300)
const effectiveStarCount = computed(() => isMobile.value ? 80 : props.starCount)

const generateStars = (count: number): Star[] => {
    return Array.from({ length: count }, () => ({
        x: Math.random() * 2000,
        y: Math.random() * 2000,
        size: Math.random() * (props.size.max - props.size.min) + props.size.min
    }))
}

const speedMap = {
    slow: { duration: 200, opacity: 0.5, ratio: 0.3 },
    normal: { duration: 150, opacity: 0.75, ratio: 0.3 },
    fast: { duration: 100, opacity: 1, ratio: 0.4 }
}

const generateStarLayers = (count: number) => ({
    slow: generateStars(Math.floor(count * speedMap.slow.ratio)),
    normal: generateStars(Math.floor(count * speedMap.normal.ratio)),
    fast: generateStars(Math.floor(count * speedMap.fast.ratio))
})

// Utiliser effectiveStarCount au lieu de props.starCount
const stars = useState('stars', () => generateStarLayers(effectiveStarCount.value))

// Régénérer les étoiles quand effectiveStarCount change (ex: après détection mobile dans onMounted)
watch(effectiveStarCount, (count) => {
    stars.value = generateStarLayers(count)
})

const starLayers = computed(() => [
    { stars: stars.value.fast, ...speedMap.fast },
    { stars: stars.value.normal, ...speedMap.normal },
    { stars: stars.value.slow, ...speedMap.slow }
])
</script>

<template>
    <div class="absolute inset-0 pointer-events-none overflow-hidden z-[-1]">
        <div v-for="(layer, index) in starLayers" :key="index" class="star-layer" :style="{
            '--star-duration': `${layer.duration}s`,
            '--star-opacity': layer.opacity,
            '--star-color': props.color
        }">
            <div v-for="(star, starIndex) in layer.stars" :key="starIndex" class="star absolute rounded-full" :style="{
                left: `${star.x}px`,
                top: `${star.y}px`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                backgroundColor: 'var(--star-color)',
                opacity: 'var(--star-opacity)'
            }" />
        </div>
    </div>
</template>

<style scoped>
.star-layer {
    animation: risingStarsAnimation linear infinite;
    animation-duration: var(--star-duration);
    will-change: transform;
}

.star {
    pointer-events: none;
}

@keyframes risingStarsAnimation {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(-2000px);
    }
}
</style>
