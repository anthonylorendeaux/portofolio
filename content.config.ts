import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { asSitemapCollection } from '@nuxtjs/sitemap/content'

const createBaseSchema = () => z.object({
    title: z.string(),
    description: z.string()
})

const createButtonSchema = () => z.object({
    label: z.string(),
    to: z.string(),
    color: z.enum(["error", "primary", "secondary", "success", "info", "warning", "neutral"]).default('primary'),
    variant: z.enum(['solid', 'outline', 'ghost', 'link']).default('solid'),
    icon: z.string().optional(),
    target: z.enum(['_blank', '_self']).default('_self')
})

const createStackCategorySchema = () => z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string(),
    items: z.array(z.string()),
    class: z.string().optional()
})


export default defineContentConfig({
    collections: {
        index: defineCollection(
            asSitemapCollection({
                type: 'page',
                source: 'index.yml',
                schema: z.object({
                    hero: z.object({
                        badge: z.string(),
                        title: z.string(),
                        subtitle: z.string(),
                        links: z.array(createButtonSchema())
                    }),
                })
            })
        ),

        about: defineCollection(
            asSitemapCollection({
                type: 'page',
                source: 'about.yml',
                schema: z.object({
                    title: z.string(),
                    bio: z.string(),

                    techStack: z.object({
                        title: z.string(),
                        description: z.string(),
                        categories: z.array(createStackCategorySchema())
                    })
                })
            })
        ),

        contact: defineCollection(
            asSitemapCollection({
                type: 'page',
                source: 'contact.yml',
                schema: createBaseSchema().extend({
                    intro: z.string(),
                    email: z.string(),
                    socials: z.array(createButtonSchema())
                })
            })
        ),

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
