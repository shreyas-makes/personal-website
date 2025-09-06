import { defineCollection, z } from 'astro:content';
import { slugify } from '../utils/slugify';

const dateSchema = z.coerce.date();

const blogSchema = z.object({
  title: z.string(),
  date: dateSchema,
  slug: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().optional().default(false),
  author: z.string().optional(),
  rating: z.number().min(1).max(10).optional(),
  summary: z.string().optional(),
  description: z.string().optional(),
  cover: z.string().optional(),
  isbn: z.string().optional(),
  image: z.string().optional(),
  stage: z.enum(['seedling', 'sprout', 'plant']).optional().default('seedling'),
}).transform(data => ({
  ...data,
  slug: data.slug || slugify(data.title).replace(/\//g, '-'),
  stage: data.stage || 'seedling'
})).refine(data => !!data.title, {
  message: "Title is required for all posts"
});

export const collections = {
  posts: defineCollection({
    schema: blogSchema,
    slug: (entry) => entry.data.slug || slugify(entry.data.title).replace(/\//g, '-'),
  })
}; 