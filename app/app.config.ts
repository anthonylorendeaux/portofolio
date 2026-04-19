
let navigation = [
    { label: 'Accueil', to: '/' },
    { label: 'À propos', to: '/about' },
    { 
        label: 'Services', 
        to: '/services',
        description: 'Site vitrine, e-commerce ou SaaS',
        children: [
            { label: 'Site Vitrine', to: '/services/site-vitrine', description: 'À partir de 500€' },
            { label: 'Site E-commerce', to: '/services/site-e-commerce', description: 'À partir de 800€' },
            { label: 'Application SaaS', to: '/services/application-saas', description: 'À partir de 1200€' }
        ]
    },
    { label: 'Portfolio', to: '/projects' },
    { label: 'Blog', to: '/blog' },
    { label: 'Contact', to: '/contact' }
];

export default defineAppConfig({
    ui: {
        colors: {
            primary: 'blue',
            neutral: 'slate'
        },
        colorMode: 'light',
    },
    header: {
        cta: {
            label: 'Réserver un appel',
            to: 'https://calendly.com/anthony-lorendeaux19/30min',
            icon: 'i-lucide-calendar',
        }
    },
    navigation: navigation,
    footer: {
        columns: [
            {
                label: 'Pages',
                children: navigation
            },
            {
                label: 'Légal',
                children: [
                    {
                        label: 'Conditions Générales de Vente',
                        to: '/legal/cgv',
                    },
                    {
                        label: 'Mentions Légales',
                        to: '/legal/mentions',
                    },
                    {
                        label: 'Politique de Confidentialité',
                        to: '/legal/confidentialite',
                    }
                ]
            }
        ],
        copyright: `© Made in 2026, Copyright Anthony Lorendeaux.`,
        socials: [
            { icon: 'i-ri-github-fill', to: 'https://github.com/anthonylorendeaux' },
            { icon: 'i-ri-linkedin-fill', to: 'https://linkedin.com/in/anthony-lorendeaux/' },
            { icon: 'i-ri-fiverr-fill', to: 'https://www.fiverr.com/antho_lor' },
            { icon: 'i-lucide-mail', to: 'mailto:anthony.lorendeaux19@gmail.com' }
        ]
    }
})