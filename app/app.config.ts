export default defineAppConfig({
    ui: {
        colors: {
            primary: 'blue',
            neutral: 'zinc'
        },
        colorMode: 'light',
    },
    footer: {
        columns: [
            {
                label: 'Pages',
                children: [
                    { label: 'Accueil', to: '/' },
                    { label: 'À propos', to: '/about' },
                    { label: 'Portfolio', to: '/projects' },
                    { label: 'Blog', to: '/blog' },
                    { label: 'Contact', to: '/contact' }
                ]
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
            { icon: 'i-lucide-mail', to: 'mailto:anthony.lorendeaux@icloud.com' }
        ]
    }
})