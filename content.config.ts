import { defineCollection, defineContentConfig, property, z } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'
import { asSitemapCollection } from '@nuxtjs/sitemap/content'

const createBaseSchema = () => z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty()
})

const createBaseSectionSchema = () => z.object({
    headline: z.string(),
    title: z.string().nonempty(),
    description: z.string().nonempty()
})

const createIconString = () => property(z.string()).editor({
    input: 'icon',
    iconLibraries: ['lucide', 'simple-icons']
})

const createMediaString = () => property(z.string()).editor({ input: 'media' })

const createLinkSchema = () => z.object({
    label: z.string().nonempty(),
    to: z.string().nonempty(),
    icon: createIconString().optional(),
    size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
    trailing: z.boolean().optional(),
    target: z.string().optional(),
    color: z.enum(['primary', 'secondary', 'neutral', 'error', 'warning', 'success', 'info']).optional(),
    variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional()
})

const createButtonSchema = () => z.object({
    label: z.string().nonempty(),
    to: z.string().nonempty(),
    color: z.enum(["error", "primary", "secondary", "success", "info", "warning", "neutral"]).default('primary'),
    variant: z.enum(['solid', 'outline', 'ghost', 'link']).default('solid'),
    icon: createIconString().optional(),
    target: z.enum(['_blank', '_self']).default('_self')
})

const createImageSchema = () => z.object({
    src: createMediaString(),
    alt: z.string().optional(),
    loading: z.enum(['lazy', 'eager']).optional(),
    srcset: z.string().optional()
})

const createStackCategorySchema = () => z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    icon: createIconString().nonempty(),
    items: z.array(z.string().nonempty()),
    class: z.string().optional()
})

const createPricingPlanSchema = () => z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    price: z.string().nonempty(),
    features: z.array(z.string().nonempty()),
    button: createButtonSchema(),
    scale: z.boolean().default(false),
})

const createFeatureSchema = () => z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty().max(120),
    icon: createIconString().nonempty(),
    to: z.string(),
})


export default defineContentConfig({
    collections: {
        index: defineCollection({
            type: 'page',
            source: 'index.yml',
            schema: z.object({
                hero: createBaseSchema().extend({
                    badge: z.boolean(),
                    links: z.array(createLinkSchema()),
                    image: createImageSchema(),
                }),
                projects: createBaseSectionSchema(),
                about: createBaseSectionSchema().extend({
                    links: z.array(createLinkSchema()),
                    image: createImageSchema()
                }),
                services: createBaseSectionSchema().extend({
                    features: z.array(createFeatureSchema()),
                }),
                faq: createBaseSectionSchema().extend({
                    items: z.array(z.object({
                        label: z.string().nonempty(),
                        content: z.string().nonempty()
                    }))
                }),
                contact: createBaseSectionSchema().extend({
                    links: z.array(createButtonSchema())
                })
            })
        }),

        about: defineCollection({
            type: 'page',
            source: 'about.yml',
            schema: z.object({
                title: z.string().nonempty(),
                bio: z.string().nonempty(),
                techStack: createBaseSectionSchema().extend({
                    categories: z.array(createStackCategorySchema())
                })
            })
        }),

        services: defineCollection({
            type: 'page',
            source: 'services.yml',
            schema: createBaseSectionSchema().extend({
                pricing: createBaseSectionSchema().extend({ plans: z.array(createPricingPlanSchema()) }),
                services: createBaseSectionSchema().extend({
                    features: z.array(createFeatureSchema()),
                }),
                faq: createBaseSectionSchema().extend({
                    items: z.array(z.object({
                        label: z.string().nonempty(),
                        content: z.string().nonempty()
                    }))
                }),
            })
        }),

        projects: defineCollection({
            type: 'page',
            source: 'projects.yml',
            schema: createBaseSectionSchema()
        }),

        blog: defineCollection({
            type: 'page',
            source: 'blog.yml',
            schema: createBaseSectionSchema()
        }),

        contact: defineCollection({
            type: 'page',
            source: 'contact.yml',
            schema: createBaseSectionSchema().extend({
                intro: z.string().nonempty(),
                email: z.string().nonempty(),
                socials: z.array(createButtonSchema())
            })
        }),

        projects_articles: defineCollection(
            asSeoCollection({
                type: 'page',
                source: 'projects/*.md',
                schema: z.object({
                    publishedAt: z.string().nonempty(),
                    category: z.string().nonempty(),
                    image: createImageSchema(),
                })
            })
        ),

        blog_articles: defineCollection(
            asSeoCollection({
                type: 'page',
                source: 'blog/*.md',
                schema: z.object({
                    category: z.string().nonempty(),
                    publishedAt: z.date(),
                    image: createImageSchema()
                })
            })
        ),

        legal: defineCollection(
            asSitemapCollection({
                type: 'page',
                source: 'legal/*.md'
            })
        )
    }
})
