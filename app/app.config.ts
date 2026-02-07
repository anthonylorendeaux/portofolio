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
                    { label: 'Portfolio', to: '/portfolio' },
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
                    /*                     {
                                            label: 'Mentions Légales',
                                            to: '/legal/mentions',
                                        },
                                        {
                                            label: 'Politique de Confidentialité',
                                            to: '/legal/confidentialite',
                                        } */
                ]
            }
        ],
        copyright: `© Made in 2026, Copyright Anthony Lorendeaux.`,
        socials: [
            { label: 'Github', to: 'https://github.com/anthonylorendeaux' },
            { label: 'Linkedin', to: 'https://linkedin.com/in/anthony-lorendeaux/' },
            { label: 'Fiverr', to: 'https://www.fiverr.com/antho_lor' },
            { label: 'Mail', to: 'mailto:anthony.lorendeaux@icloud.com' }
        ]
    }
})