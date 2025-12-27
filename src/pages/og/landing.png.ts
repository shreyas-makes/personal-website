import type { APIRoute } from 'astro';
import { buildOgHtml } from './html-template';
import { formatDate } from '../../utils/formatDate';

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

export const GET: APIRoute = async ({ request }) => {
  const siteUrl = resolveSiteUrl(request);
  const backgroundUrl = new URL('images/og/serene-forest.jpg', siteUrl).toString();
  const avatarUrl = new URL('images/og/avatar.png', siteUrl).toString();
  const formattedDate = formatDate(new Date()) || 'Today';

  const html = buildOgHtml({
    title: 'Shreyas Prakash',
    description: 'Essays and experiments at the intersection of product, design, and technology.',
    badge: 'WEBSITE / HOME',
    meta: [
      { label: 'Date', value: formattedDate },
      { label: 'Read', value: 'Homepage' },
      { label: 'Stage', value: 'Live' }
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
