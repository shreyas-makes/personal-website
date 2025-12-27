import { getCollection } from 'astro:content';
import { OGImageRoute } from 'astro-og-canvas';
import { calculateReadingTime } from '../../utils/readingTime';
import { formatDate } from '../../utils/formatDate';

export const prerender = true;

const posts = await getCollection('posts', ({ data }) => !data.draft);

const pages = Object.fromEntries(
  posts.map(post => [
    post.slug,
    {
      title: post.data.title,
      description: post.data.description || post.data.summary || '',
      date: formatDate(post.data.date) || 'Today',
      readingTime: calculateReadingTime(post.body),
      stage: post.data.stage ?? 'seedling'
    }
  ])
);

pages.landing = {
  title: 'Shreyas Prakash',
  description: 'Essays and experiments at the intersection of product, design, and technology.',
  date: formatDate(new Date()) || 'Today',
  readingTime: 'Homepage',
  stage: 'Live'
};

export const { getStaticPaths, GET } = OGImageRoute({
  param: 'slug',
  pages,
  getSlug: (path) => path,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    bgImage: {
      path: './public/images/og/serene-forest.jpg',
      fit: 'cover'
    },
    logo: {
      path: './public/images/og/avatar.png',
      size: [140]
    },
    padding: 72,
    font: {
      title: {
        size: 68,
        lineHeight: 1.05,
        weight: 'Bold',
        families: ['Inter']
      },
      description: {
        size: 28,
        lineHeight: 1.4,
        weight: 'Normal',
        families: ['Inter']
      }
    },
    fonts: [
      './public/images/og/fonts/inter-400.woff',
      './public/images/og/fonts/inter-700.woff'
    ],
    border: {
      color: [255, 255, 255],
      width: 0
    }
  })
});
