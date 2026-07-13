import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const collections = {
  projects: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
    schema: z.object({
      title: z.string(),
      summary: z.string(),
      tech: z.array(z.string()),
      kind: z.enum(['case-study', 'oss']),
      repo: z.string().url().optional(),
      order: z.number(),
    }),
  }),
};
