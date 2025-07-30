import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    repo_url: z.string().optional(),
    pubDate: z.preprocess(val => new Date(val), z.date())
  }),
});

export const collections = {
  projects,
};
