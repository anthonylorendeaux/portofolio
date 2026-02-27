---
title: "Comment atteindre 100/100 sur Lighthouse avec Nuxt 4"
description: "Découvrez mon guide technique de type 'Pilier' pour maîtriser les Core Web Vitals en 2026. Apprenez à optimiser LCP, INP et CLS avec Nuxt 4."
image: 
    src: /blog/lighthouse.png
    alt: "Screenshot réel d'un Lighthouse à 100/100"
category: "Frontend"
publishedAt: 2026-02-23
summary: "Guide technique pour atteindre 100/100 sur Lighthouse avec Nuxt 4, couvrant l'optimisation des images, le rendu hybride et les performances sur Vercel."
---

L'**optimisation de la performance Nuxt 4** n'est plus optionnelle en 2026. Si vous vous demandez pourquoi vos concurrents vous dépassent sur Google malgré un design plus daté, la réponse tient souvent en un seul mot : **vitesse**.

Un score **Lighthouse à 100/100**, ce n'est pas juste un badge. C'est un taux de conversion plus élevé, des coûts d'acquisition client réduits, et un signal clair envoyé à Google qui privilégie de plus en plus l'expérience utilisateur réelle.

Dans cet article, je vous montre exactement les techniques que j'applique sur chaque projet pour atteindre ce score de 100/100.

## Les 3 métriques Core Web Vitals à maîtriser en 2026

Google a affiné ses exigences. On ne mesure plus simplement le temps de réponse brut du serveur (bien que le TTFB reste crucial). On mesure la perception humaine du chargement, découpée en trois dimensions fondamentales :

1.  **LCP (Largest Contentful Paint) :** C'est le chronomètre qui s'arrête lorsque le plus gros élément de votre page (souvent l'image "Hero" ou le gros titre H1) est visible. La règle est simple : **moins de 2.5 secondes** pour être "Bon", mais en réalité, je vise systématiquement **moins de 1 seconde**.
2.  **INP (Interaction to Next Paint) :** Fini le FID. L'INP mesure la latence de l'interface complète après une action utilisateur (un clic, un tapotement). Une interface qui "freeze" pendant 300 millisecondes vous pénalise. L'objectif : **moins de 200ms**.
3.  **CLS (Cumulative Layout Shift) :** Rien n'est plus frustrant qu'un texte qui décale d'un coup parce qu'une bannière publicitaire ou une police de caractères vient de charger. Le CLS mesure cette instabilité visuelle. Le score doit être quasi nul (**inférieur à 0.1**).

Pour atteindre un 100/100 sur ces trois métriques avec un framework riche comme Vue.js (qui embarque naturellement plus de JavaScript qu'une page statique), il faut être méthodique.

## LCP : Charger l'essentiel en moins d'une seconde

### 1. Précharger agressivement le contenu critique

Le principal ennemi du LCP, c'est le navigateur qui découvre tardivement qu'il a besoin d'une grosse ressource pour afficher le haut de la page.

Pour **améliorer le LCP sous Nuxt**, le composant natif `@nuxt/image` est mon premier réflexe. Il s'occupe de la compression (WebP / AVIF) et génère le code HTML optimal. Mais cela ne suffit pas pour le plafond de verre des 100/100. Il faut guider le navigateur.

```vue
<template>
  <NuxtImg 
    src="/hero-banner.jpg" 
    alt="Bannière de la solution SaaS"
    width="1200" 
    height="600" 
    format="webp" 
    loading="eager"
    fetchpriority="high"
    preload
  />
</template>
```

**Pourquoi ça marche ?**
- `fetchpriority="high"` dit au navigateur d'ignorer la file d'attente classique et de télécharger ce fichier en urgence absolue.
- `preload` insère une balise dans le `<head>` pour lancer le téléchargement avant même que le moteur de rendu ne calcule le Layout.

### 2. Le piège des polices de caractères personnalisées

Le LCP peut être retardé si le navigateur attend une grosse police Google Fonts avant de dessiner votre H1. Ma recommandation : auto-hébergez vos polices grâce au module `@nuxt/fonts`. Nuxt s'occupera de précharger uniquement les glyphes nécessaires au SSR.

## INP & Nuxt SEO : La fluidité absolue

### Maîtriser le chargement des composants (LazyLoading)

Le framework Vue.js est fantastique, mais c'est une arme à double tranchant. Si vous importez tous vos composants complexes (modales, graphiques, librairies tierces) dès la page d'accueil, le fichier JavaScript final (le "chunk" initial) va gonfler. Le temps de Parse et d'Évaluation JavaScript va exploser, détruisant votre INP.

La solution est au cœur de l'approche Nuxt 4 : les imports dynamiques. Ne téléchargez un composant que si l'utilisateur en a besoin.

Prenons l'exemple d'une modale contenant un long formulaire de contact.

**Ce qu'il ne faut PAS faire :**
```vue
<template>
  <div>
    <button @click="isOpen = true">Me contacter</button>
    <ModalFormulaire v-if="isOpen">
      <MonSuperFormulaireLourd />
    </ModalFormulaire>
  </div>
</template>
```
Dans l'exemple ci-dessus, le code du composant `MonSuperFormulaireLourd` est téléchargé et bloquant, même si 90% des utilisateurs ne cliqueront jamais sur le bouton.

**Ce qu'il FAUT faire :**
```vue
<template>
  <div>
    <button @click="isOpen = true">Me contacter</button>
    <LazyModalFormulaire v-if="isOpen">
      <LazyMonSuperFormulaireLourd />
    </LazyModalFormulaire>
  </div>
</template>
```

Le simple ajout du préfixe magique `Lazy` indique au compilateur Vite (utilisé par Nuxt) de découper ce composant dans un fichier JavaScript séparé, qui ne sera téléchargé *uniquement* que lorsque `isOpen` deviendra `true`. Résultat ? Un INP imbattable.

## CLS : Éradiquer les instabilités visuelles

Le Cumulative Layout Shift est souvent le plus difficile à débugger. Deux erreurs fréquentes provoquent des décalages visuels (surtout lors de la phase d'Hydratation).

### 1. Toujours réserver de l'espace

Lorsqu'un composant dépend de données chargées asynchronement (depuis une base de données par exemple), l'espace vide est une bombe à retardement pour le CLS.

L'astuce consiste à toujours anticiper la taille finale de l'élément pendant le chargement en utilisant des squelettes (Skeletons) CSS purs.

```vue
<template>
  <div class="h-64 mt-4 w-full">
    <!-- Réservation stricte de la hauteur avec un composant Squelette -->
    <SkeletonLoader class="w-full h-full" v-if="pending" />
    <CardArticle v-else class="h-full">
      <h3>{{ article.title }}</h3>
    </CardArticle>
  </div>
</template>
```

### 2. Le problème des Icônes

Un piège classique avec l'intégration d'icônes SVG en ligne ou via des modules comme `@nuxt/icon` : les icônes mettent parfois quelques millisecondes à se charger côté client. Si vous ne forcez pas les dimensions CSS de l'icône, le conteneur va tressauter de quelques pixels une fois l'icône affichée.

Prenez le réflexe de toujours fixer des largeurs fermes dans votre CSS (ici avec Tailwind) :
```vue
<!-- Mauvais -->
<Icon name="heroicons:light-bulb" />

<!-- Bon -->
<Icon name="heroicons:light-bulb" class="w-5 h-5 flex-shrink-0" />
```

## Le SSR Hybride et l'Edge sur Vercel

Toutes les optimisations front-end du monde ne sauveront pas un serveur lent au démarrage.

Rendre la page sur un serveur traditionnel en Node.js (un VPS à Paris, par exemple) ajoute de la latence. Si votre visiteur est à Tokyo ou à New York, il attendra que la donnée traverse l'océan.

C'est là que le combo **Nuxt 4 + Nitro + Vercel** change la donne. En déployant sur l'infrastructure Edge de Vercel, le code SSR de votre application est distribué sur des centaines de datacenters dans le monde. Votre site s'exécute à quelques kilomètres de votre utilisateur.

Voici la configuration redoutable (et obligatoire) que j'utilise dans `nuxt.config.ts` :

```typescript
export default defineNuxtConfig({
  nitro: {
    // Active le déploiement mondial sur Vercel Edge
    preset: 'vercel',
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },
  
  routeRules: {
    // Stale-While-Revalidate (SWR) : cache serveur intelligent
    '/blog/**': { swr: 3600 },
    // Cache statique brut pour les assets stricts
    '/assets/**': { headers: { 'cache-control': 's-maxage=31536000' } }
  }
})
```

La règle `swr: 3600` informe les serveurs Edge de Vercel : "Mets en cache cette page côté serveur pendant 1 heure. Si un utilisateur la demande, fournis-la instantanément (en quelques millisecondes). En coulisse, re-génère là de façon asynchrone si elle n'est plus à jour." 

Le visiteur ne subit jamais le temps de génération.

Pour en savoir plus sur les raisons profondes de ce choix technologique qui bouleverse le secteur, je vous invite à lire mon essai détaillé : [Pourquoi j'ai choisi Nuxt 4](/blog/pourquoi-nuxt).

## Le résultat : un 100/100 en production

Appliquer ces principes sur chaque projet donne des résultats concrets. Plus d'interface qui rame, plus de layout qui saute au chargement, plus de temps d'attente sur mobile.

Voici le résultat d'un audit de production récent : un Lighthouse à 100/100, sur PC comme sur mobile.

![Screenshot réel du 100/100 sur Lighthouse](/blog/lighthouse.png)

Atteindre ces métriques demande du soin, de la méthode et une bonne connaissance de l'écosystème Vue.js. C'est le standard que j'applique à chaque projet.

---

**Votre site est lent et vos conversions stagnent ?**  
Un audit performance peut révéler des gains rapides. Je peux analyser votre application et vous proposer un plan d'optimisation concret.  
[Demander un audit gratuit →](/contact)

