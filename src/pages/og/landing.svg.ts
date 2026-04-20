import type { APIRoute } from 'astro';
import satori from 'satori';
import { clampText, createOgTemplate } from './template';
import { fetchImageAsDataUrl } from './image-data';
import { formatDate } from '../../utils/formatDate';
import { loadOgFonts } from './fonts';

export const GET: APIRoute = async ({ request }) => {
  try {
    const baseUrl = new URL(request.url).origin;
    const backgroundImageUrl = new URL('/images/og/serene-forest.jpg', baseUrl).toString();
    const backgroundDataUrl = await fetchImageAsDataUrl(backgroundImageUrl);
    const avatarUrl = new URL('/images/2024/12/shreyas-06-12-2024-at-15.16.44@2x_o.jpg', baseUrl).toString();
    const avatarDataUrl = await fetchImageAsDataUrl(avatarUrl);
    const fonts = await loadOgFonts(baseUrl);
    const formattedDate = formatDate(new Date());
    const title = 'Shreyas Prakash';
    const description = clampText(
      'Essays and experiments at the intersection of product, design, and technology.',
      200
    );

    let svg = '';

    try {
      svg = await satori(
        createOgTemplate({
          title,
          description,
          badge: 'WEBSITE / HOME',
          meta: [
            { label: 'Date', value: formattedDate },
            { label: 'Read', value: 'Homepage' },
            { label: 'Stage', value: 'Live' }
          ],
          backgroundImageUrl: backgroundDataUrl,
          align: 'left',
          avatarUrl: avatarDataUrl
        }) as any,
        {
          width: 1200,
          height: 630,
          fonts
        }
      );
    } catch (satoriError) {
      console.error('OG Landing: Satori generation failed:', satoriError);
      throw satoriError;
    }

    return new Response(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    });
  } catch (error) {
    console.error('OG Landing: Failed to generate OG image:', error);
    const fallbackSvg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="630" fill="#050707"/>
        <text x="100" y="220" font-family="Georgia, serif" font-size="64" font-weight="600" fill="#f8fafc">
          Shreyas Prakash
        </text>
        <text x="100" y="300" font-family="system-ui, sans-serif" font-size="26" fill="rgba(255,255,255,0.75)">
          Essays on product, design, and technology.
        </text>
        <text x="100" y="520" font-family="system-ui, sans-serif" font-size="18" fill="rgba(255,255,255,0.75)">
          shreyasprakash.com
        </text>
      </svg>
    `.trim();

    return new Response(fallbackSvg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }
};
