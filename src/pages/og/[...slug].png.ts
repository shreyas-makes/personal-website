import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { calculateReadingTime } from '../../utils/readingTime';
import { formatDate } from '../../utils/formatDate';
import { clampText } from './template';
import { buildOgHtml } from './html-template';

const buildConvertUrl = () => {
  const url = new URL('https://html2png.dev/api/convert');
  url.searchParams.set('width', '1200');
  url.searchParams.set('height', '630');
  url.searchParams.set('format', 'png');
  url.searchParams.set('deviceScaleFactor', '2');
  url.searchParams.set('persist', 'true');
  return url;
};

const resolveSiteUrl = (request: Request) => {
  const configured = new URL(import.meta.env.SITE || new URL(request.url).origin);
  return configured.toString().endsWith('/') ? configured.toString() : `${configured.toString()}/`;
};

const generateExcerpt = (content: string, maxLength: number = 280): string => {
  const cleanContent = content
    .replace(/---[\s\S]*?---/, '')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`(.*?)`/g, '$1')
    .replace(/\n{2,}/g, ' ')
    .replace(/\n/g, ' ')
    .trim();

  if (cleanContent.length <= maxLength) {
    return cleanContent + '...';
  }

  const truncated = cleanContent.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  return lastSpaceIndex > 0
    ? truncated.substring(0, lastSpaceIndex) + '...'
    : truncated + '...';
};

export const GET: APIRoute = async ({ params, request }) => {
  const { slug } = params;

  if (!slug) {
    return new Response('Slug is required', { status: 400 });
  }

  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return new Response('Post not found', { status: 404 });
  }

  const readingTime = calculateReadingTime(post.body);
  const formattedDate = formatDate(post.data.date) || 'Today';
  const siteUrl = resolveSiteUrl(request);
  const backgroundUrl = new URL('images/og/serene-forest.jpg', siteUrl).toString();
  const avatarUrl = new URL('images/og/avatar.png', siteUrl).toString();

  const rawDescription = post.data.description || post.data.summary || generateExcerpt(post.body);
  const excerpt = clampText(rawDescription || '', 200);

  const html = buildOgHtml({
    title: post.data.title,
    description: excerpt,
    badge: `Stage / ${post.data.stage ?? 'seedling'}`.toUpperCase(),
    meta: [
      { label: 'Date', value: formattedDate },
      { label: 'Read', value: readingTime },
      { label: 'Stage', value: post.data.stage ?? 'seedling' }
    ],
    backgroundUrl,
    avatarUrl
  });

  const apiUrl = buildConvertUrl();
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/html'
    },
    body: html
  });

  if (!response.ok) {
    const errorText = await response.text();
    return new Response(errorText, { status: response.status });
  }

  const data = await response.json();
  if (!data?.url) {
    return new Response('OG image generation failed', { status: 500 });
  }

  return Response.redirect(data.url, 302);
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('posts', ({ data }) => !data.draft);

  return posts.map(post => ({
    params: { slug: post.slug }
  }));
};
