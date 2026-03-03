import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    tagline: z.string(),
    date: z.coerce.date(),
    status: z.enum(['active', 'paused', 'completed']),
    role: z.string(),
    stack: z.array(z.string()),
    tags: z.array(z.string()),
    links: z.array(
      z.object({
        label: z.string(),
        url: z.string().url()
      })
    ),
    featured: z.boolean(),
    highlights: z.array(z.string())
  })
});

export const collections = {
  projects
};
