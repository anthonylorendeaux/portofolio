import { defineCollection, defineContentConfig, property, z } from '@nuxt/content'
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

const createTimelineSchema = () => z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    icon: createIconString().nonempty(),
    date: z.coerce.date(),
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
                    socialProof: z.object({
                        text: z.string().nonempty(),
                        rating: z.number().min(1).max(5),
                        avatars: z.array(z.object({
                            src: createMediaString(),
                            alt: z.string().optional()
                        }))
                    }).optional(),
                    stats: z.array(z.object({
                        value: z.string().nonempty(),
                        label: z.string().nonempty()
                    })).optional(),
                    screenshots: z.array(z.object({
                        src: createMediaString(),
                        alt: z.string().optional()
                    })).optional(),
                }),
                projects: createBaseSectionSchema(),
                testimonials: createBaseSectionSchema().extend({
                    items: z.array(z.object({
                        quote: z.string().nonempty(),
                        user: z.object({
                            name: z.string().nonempty(),
                            description: z.string().nonempty(),
                            avatar: z.object({
                                src: createMediaString()
                            })
                        })
                    }))
                }).optional(),
                about: createBaseSectionSchema().extend({
                    links: z.array(createLinkSchema()),
                    image: createImageSchema()
                }),
                services: createBaseSectionSchema().extend({
                    features: z.array(createFeatureSchema()),
                    links: z.array(createLinkSchema()).optional(),
                }),
                process: createBaseSectionSchema().extend({
                    features: z.array(createFeatureSchema()),
                }).optional(),

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
                about: createBaseSectionSchema().extend({
                    image: createImageSchema()
                }),
                timeline: createBaseSectionSchema().extend({ items: z.array(createTimelineSchema()), }),
                values: createBaseSectionSchema().extend({
                    features: z.array(createFeatureSchema()),
                }),
                contact: createBaseSectionSchema().extend({
                    links: z.array(createButtonSchema())
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
                question: z.string().nonempty(),
                intro: z.string().nonempty(),
                socials: z.array(createButtonSchema())
            })
        }),

        projects_articles: defineCollection(
            asSitemapCollection({
                type: 'page',
                source: 'projects/*.md',
                schema: createBaseSchema().extend({
                    publishedAt: z.coerce.date(),
                    category: z.string().nonempty(),
                    image: createImageSchema(),
                    summary: z.string().nonempty().describe('AI snippet for LLM indexing')
                })
            })
        ),

        services_articles: defineCollection(
            asSitemapCollection({
                type: 'page',
                source: 'services/*.md',
                schema: createBaseSchema()
            })
        ),

        blog_articles: defineCollection(
            asSitemapCollection({
                type: 'page',
                source: 'blog/*.md',
                schema: createBaseSchema().extend({
                    category: z.string().nonempty(),
                    publishedAt: z.coerce.date(),
                    updatedAt: z.coerce.date().optional(),
                    image: createImageSchema(),
                    summary: z.string().nonempty().describe('AI snippet for LLM indexing')
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
