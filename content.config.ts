import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { asSitemapCollection } from '@nuxtjs/sitemap/content'

export default defineContentConfig({
    collections: {
        projects: defineCollection(
            asSitemapCollection({
                type: 'page',
                source: 'projects/*.md',

                schema: z.object({
                    date: z.string(),
                    title: z.string(),
                    description: z.string(),
                    type: z.string(),
                    image: z.string(),
                    slug: z.string()
                })
            }),
        )
    },
})
