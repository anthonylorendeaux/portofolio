/**
 * Composable pour générer un schema ProfessionalService JSON-LD
 * Représente l'activité freelance d'Anthony
 * Schema global à ajouter dans app.vue
 */
export const useJsonLdProfessionalService = () => {
    const script = computed(() => {
        return {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'ProfessionalService',
                '@id': 'https://anthony-lorendeaux.com/#service',
                name: 'Anthony Lorendeaux - Développeur Web Freelance',
                url: 'https://anthony-lorendeaux.com',
                description:
                    'Services de création et refonte de sites web, développement d\'applications SaaS et intégration de paiements Stripe pour PME en France.',
                areaServed: [
                    {
                        '@type': 'City',
                        name: 'Toulouse',
                    },
                    {
                        '@type': 'Country',
                        name: 'France',
                    },
                ],
                priceRange: '€€',
                serviceType: [
                    'Création de site web',
                    'Refonte de site internet',
                    'Développement application SaaS',
                    'Intégration Stripe',
                ],
                provider: {
                    '@id': 'https://anthony-lorendeaux.com/#person',
                },
                aggregateRating: {
                    '@type': 'AggregateRating',
                    ratingValue: '4.8',
                    reviewCount: '12',
                    bestRating: '5',
                },
                hasOfferingType: ['Site vitrine', 'Site e-commerce', 'Application SaaS'],
            }),
        }
    })

    return script
}
