/**
 * Composable pour générer un schema Person JSON-LD pour Anthony Lorendeaux
 * Schema global à ajouter dans app.vue
 */
export const useJsonLdPerson = () => {
    const script = computed(() => {
        return {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Person',
                '@id': 'https://anthony-lorendeaux.com/#person',
                name: 'Anthony Lorendeaux',
                jobTitle: 'Développeur Web Freelance',
                url: 'https://anthony-lorendeaux.com',
                image: 'https://anthony-lorendeaux.com/contact_head.png',
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Toulouse',
                    addressRegion: 'Occitanie',
                    addressCountry: 'FR',
                },
                email: 'anthony.lorendeaux19@gmail.com',
                sameAs: [
                    'https://github.com/anthonylorendeaux',
                    'https://linkedin.com/in/anthony-lorendeaux/',
                    'https://www.fiverr.com/antho_lor',
                ],
                knowsAbout: [
                    'Vue.js',
                    'Nuxt',
                    'React',
                    'Node.js',
                    'TypeScript',
                    'Tailwind CSS',
                    'Web Development',
                    'Full Stack Development',
                ],
            }),
        }
    })

    return script
}
