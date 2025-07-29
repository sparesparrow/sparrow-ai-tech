import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    repo_url: z.string().optional(),
    pubDate: z.date(),
  }),
});

export const collections = {
  projects,
};
