import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    repo_url: z.string().url().optional(),
    pubDate: z.coerce.date(),
  }),
});

export const collections = { projects };
