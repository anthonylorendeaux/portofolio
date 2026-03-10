---
title: "How to achieve 100/100 on Lighthouse with Nuxt 4"
description: "Discover my 'Pillar' type technical guide to mastering Core Web Vitals in 2026. Learn how to optimize LCP, INP and CLS with Nuxt 4."
image: 
    src: /blog/lighthouse.png
    alt: "Real screenshot of a Lighthouse score at 100/100"
category: "Frontend"
publishedAt: 2026-02-23
summary: "Technical guide to reaching 100/100 on Lighthouse with Nuxt 4, covering image optimization, hybrid rendering and performance on Vercel."
---

**Optimizing Nuxt 4 performance** is no longer optional in 2026. If you're wondering why your competitors are overtaking you on Google despite a more dated design, the answer often comes down to one word: **speed**.

A **Lighthouse score of 100/100** isn't just a badge. It's a higher conversion rate, lower customer acquisition costs, and a clear signal sent to Google, which is increasingly favoring real user experience.

In this article, I show you exactly the techniques I apply to every project to achieve this score of 100/100.

## The 3 Core Web Vitals metrics to master in 2026

Google has refined its requirements. We are no longer simply measuring the raw response time of the server (although the TTFB remains crucial). We measure the human perception of loading, broken down into three fundamental dimensions:

1.  **LCP (Largest Contentful Paint):** This is the stopwatch that stops when the largest element of your page (often the "Hero" image or the big H1 title) is visible. The rule is simple: **less than 2.5 seconds** to be "Good", but in reality, I systematically aim for **less than 1 second**.
2.  **INP (Interaction to Next Paint):** So long FID. INP measures the latency of the entire interface after a user action (a click, a tap). An interface that "freezes" for 300 milliseconds penalizes you. The objective: **less than 200ms**.
3.  **CLS (Cumulative Layout Shift):** There is nothing more frustrating than text that suddenly shifts because an ad banner or font has just loaded. CLS measures this visual instability. The score should be almost zero (**less than 0.1**).

To achieve 100/100 on these three metrics with a rich framework like Vue.js (which naturally embeds more JavaScript than a static page), you have to be methodical.

## LCP: Loading the essentials in less than a second

### 1. Aggressively preload critical content

The main enemy of LCP is the browser discovering late that it needs a large resource to display the top of the page.

To **improve LCP in Nuxt**, the native `@nuxt/image` component is my first reflex. It handles compression (WebP / AVIF) and generates optimal HTML code. But this is not enough for the 100/100 glass ceiling. You have to guide the browser.

```vue
<template>
  <NuxtImg 
    src="/hero-banner.jpg" 
    alt="SaaS solution banner"
    width="1200" 
    height="600" 
    format="webp" 
    loading="eager"
    fetchpriority="high"
    preload
  />
</template>
```

**Why it works:**
- `fetchpriority="high"` tells the browser to bypass the standard queue and download this file as an absolute emergency.
- `preload` inserts a tag into the `<head>` to start the download before the rendering engine even calculates the Layout.

### 2. The pitfall of custom fonts

LCP can be delayed if the browser waits for a heavy Google Fonts file before painting your H1. My recommendation: self-host your fonts with the `@nuxt/fonts` module. Nuxt will take care of preloading only the glyphs needed for SSR.

## INP & Nuxt SEO: Absolute fluidity

### Master component loading (LazyLoading)

The Vue.js framework is fantastic, but it's a double-edged sword. If you import all your complex components (modals, charts, third-party libraries) right on the home page, the final JavaScript file (the initial "chunk") will bloat. Parse and JavaScript Evaluation time will explode, destroying your INP.

The solution is at the core of the Nuxt 4 approach: dynamic imports. Only download a component if the user needs it.

Let's look at a modal containing a long contact form as an example.

**What NOT to do:**
```vue
<template>
  <div>
    <button @click="isOpen = true">Contact me</button>
    <ModalForm v-if="isOpen">
      <MySuperHeavyForm />
    </ModalForm>
  </div>
</template>
```
In the example above, the `MySuperHeavyForm` component code is downloaded and blocking, even if 90% of users never click the button.

**What to DO:**
```vue
<template>
  <div>
    <button @click="isOpen = true">Contact me</button>
    <LazyModalForm v-if="isOpen">
      <LazyMySuperHeavyForm />
    </LazyModalForm>
  </div>
</template>
```

The simple addition of the magic `Lazy` prefix tells the Vite compiler (used by Nuxt) to split this component into a separate JavaScript file, which will *only* be downloaded when `isOpen` becomes `true`. The result? An unbeatable INP.

## CLS: Eradicating visual instabilities

Cumulative Layout Shift is often the hardest to debug. Two common errors cause visual shifts (especially during the Hydration phase).

### 1. Always reserve space

When a component relies on asynchronously loaded data (from a database for example), the empty space is a ticking time bomb for CLS.

The trick is to always anticipate the final size of the element during loading by using pure CSS skeletons.

```vue
<template>
  <div class="h-64 mt-4 w-full">
    <!-- Strict height reservation with a Skeleton component -->
    <SkeletonLoader class="w-full h-full" v-if="pending" />
    <CardArticle v-else class="h-full">
      <h3>{{ article.title }}</h3>
    </CardArticle>
  </div>
</template>
```

### 2. The icon problem

A classic pitfall when embedding inline SVG icons or via modules like `@nuxt/icon`: icons sometimes take a few milliseconds to load on the client side. If you don't force the CSS dimensions of the icon, the container will judder by a few pixels once the icon appears.

Make it a habit to always set firm widths in your CSS (here with Tailwind):
```vue
<!-- Bad -->
<Icon name="heroicons:light-bulb" />

<!-- Good -->
<Icon name="heroicons:light-bulb" class="w-5 h-5 flex-shrink-0" />
```

### 3. Disable heavy effects on mobile

Canvas animations, particles, and dramatic visual effects that work perfectly on the desktop can turn your site into a freezing slideshow on mobile. Mobile CPU devices lack laptop processing power, and your INP suffers directly.

The solution: targeted detection that disables these effects when they cannot perform appropriately.

```vue
<script setup>
onMounted(() => {
  // Detect mobile context
  const isMobile = window.innerWidth < 768
  
  // Respect user accessibility preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  if (isMobile || prefersReducedMotion) {
    // Stop expensive animations
    return
  }
  
  // Initialize canvas effect...
})
</script>
```

For particle systems (like Animated Stars or confetti), I take it a step further: I drastically reduce the number of elements on mobile. 300 stars on desktop, 80 on mobile. The human eye can't tell the difference, but the GPU does.

This optimization can yield **10 to 20 points of Lighthouse score** on mobile devices.

## Hybrid SSR and the Edge on Vercel

All the frontend optimizations in the world won't save a slowly booting server.

Rendering your page on a traditional Node.js server (a VPS in Paris, for example) adds latency. If your visitor is in Tokyo or New York, they will wait for data to cross the ocean.

This is where the **Nuxt 4 + Nitro + Vercel** combo changes everything. By deploying to Vercel's Edge infrastructure, your app's SSR code is distributed across hundreds of data centers globally. Your website runs a few miles away from your user.

Here is the formidable (and mandatory) setup I use in `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  nitro: {
    // Enable global deployment on Vercel Edge
    preset: 'vercel',
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },
  
  routeRules: {
    // Stale-While-Revalidate (SWR): intelligent server caching
    '/blog/**': { swr: 3600 },
    // Raw static cache for strict assets
    '/assets/**': { headers: { 'cache-control': 's-maxage=31536000' } }
  }
})
```

The `swr: 3600` rule informs the Vercel Edge servers: "Cache this page server-side for 1 hour. If a user requests it, deliver it instantly (in milliseconds). Under the hood, asynchronously regenerate it if it is outdated." 

The visitor never suffers the generation time.

To find out more about the profound reasons for this technological decision disrupting the industry, read my detailed essay: [Why I chose Nuxt 4](/en/blog/why-nuxt).

## The result: 100/100 in production

Applying these principles to every project yields concrete results. No more lagging interfaces, no layout shifts during loading, no waiting time on mobile.

Here is the result of a recent production audit: 100/100 Lighthouse score on both PC and mobile.

![Real screenshot of 100/100 on Lighthouse](/blog/lighthouse.png)

Achieving these metrics requires care, method, and a solid knowledge of the Vue.js ecosystem. It is the standard I apply to every project.

---

**Is your site slow and conversion stagnating?**  
A performance audit can identify quick wins. I can analyze your application and propose a practical optimization plan.  
[Request a free audit →](/contact)
