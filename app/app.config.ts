export default defineAppConfig({
    ui: {
        colors: {
            primary: 'blue',
            neutral: 'zinc'
        },
        colorMode: 'light',
    },
    footer: {
        copyright: `© Made in 2026, Copyright Anthony Lorendeaux.`,
        socials: [
            { label: 'Github', to: 'https://github.com/anthonylorendeaux' },
            { label: 'Linkedin', to: 'https://linkedin.com/in/anthony-lorendeaux/' },
            { label: 'Fiverr', to: 'https://www.fiverr.com/antho_lor' },
            { label: 'Mail', to: 'mailto:anthony.lorendeaux@icloud.com' }
        ]
    }
})