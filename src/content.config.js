import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    repository: z.string().optional(),
    technologies: z.array(z.string()).optional(),
  }),
});

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    pubDate: z.date().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  projects,
  articles,
};
