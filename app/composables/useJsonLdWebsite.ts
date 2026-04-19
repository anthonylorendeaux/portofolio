/**
 * Composable pour générer un schema WebSite JSON-LD
 * Contient les informations du site et son searchAction
 * Schema global à ajouter dans app.vue
 */
export const useJsonLdWebsite = () => {
  const script = computed(() => {
    return {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': 'https://anthony-lorendeaux.com/#website',
        url: 'https://anthony-lorendeaux.com',
        name: 'Anthony Lorendeaux - Développeur Freelance Nuxt/Vue.js',
        description:
          'Création de sites web ultra-rapides et applications web sur-mesure à Toulouse. Expert Nuxt 4 & Vue.js • Devis gratuit 24h',
        publisher: {
          '@id': 'https://anthony-lorendeaux.com/#person',
        },
        inLanguage: 'fr-FR',
      }),
    }
  })

  return script
}
