import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

const docsCollection = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/docs' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        // Optional custom URL segment, for example: "guides/install".
        slug: z.string().optional(),
        icon: z.string().optional(),
        order: z.number().default(99),
    }),
});

export const collections = {
    docs: docsCollection,
};