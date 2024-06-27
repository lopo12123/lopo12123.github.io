import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    type: 'content',
    schema: z.object({
        encrypted: z.boolean().default(false),
        encrypted_file_location: z.string().optional(),
        priority: z.number().default(0),
        title: z.string(),
        description: z.string(),
        category: z.string().optional(),
        publishDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
    }),
});

export const collections = { blog };
