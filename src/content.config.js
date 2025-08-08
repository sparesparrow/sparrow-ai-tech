import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    repository: z.string().url().optional(),
    technologies: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    pubDate: z.coerce.date().optional(),
  }),
});

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    author: z.string().default('Vojtěch Špaček'),
    slug: z.string().optional(),
  }),
});

export const collections = {
  projects,
  articles,
};
