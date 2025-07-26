import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  // Get all published posts, including rough-notes
  const posts = await getCollection('posts', ({ data }) => {
    return !data.draft; // Only filter out drafts, include rough-notes
  });
  
  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  return rss({
    title: 'Shreyas Prakash',
    description: 'Essays on design, product, and technology',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.summary || '',
      link: `/${post.slug}/`,
      // Include tags as categories for better RSS reader support
      customData: post.data.tags ? `<category>${post.data.tags.join('</category><category>')}</category>` : ''
    })),
    customData: `<language>en-us</language>`,
  });
} 