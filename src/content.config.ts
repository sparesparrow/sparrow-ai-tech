import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({
    base: './src/content/projects',
    pattern: '**/*.{md,mdx}',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    repo_url: z.string().url().optional(),
    pubDate: z.coerce.date(),
  }),
});

export const collections = { projects };
