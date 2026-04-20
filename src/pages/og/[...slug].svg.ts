import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import { calculateReadingTime } from '../../utils/readingTime';
import { formatDate } from '../../utils/formatDate';
import { clampText, createOgTemplate } from './template';
import { fetchImageAsDataUrl } from './image-data';
import { loadOgFonts } from './fonts';

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const { slug } = params;
    
    if (!slug) {
      console.error('OG Image: No slug provided');
      return new Response('Slug is required', { status: 400 });
    }

    // Get the post data
    console.log('OG Image: Looking for post with slug:', slug);
    const posts = await getCollection('posts', ({ data }) => !data.draft);
    const post = posts.find(p => p.slug === slug);
    
    if (!post) {
      console.error('OG Image: Post not found for slug:', slug);
      console.log('Available slugs:', posts.map(p => p.slug).slice(0, 5));
      return new Response('Post not found', { status: 404 });
    }
    
    console.log('OG Image: Found post:', post.data.title);

    const readingTime = calculateReadingTime(post.body);
    const formattedDate = formatDate(post.data.date);
    const baseUrl = new URL(request.url).origin;
    const backgroundImageUrl = new URL('/images/og/serene-forest.jpg', baseUrl).toString();
    const backgroundDataUrl = await fetchImageAsDataUrl(backgroundImageUrl);
    const avatarUrl = new URL('/favicon.png', baseUrl).toString();
    const avatarDataUrl = await fetchImageAsDataUrl(avatarUrl);
    const fonts = await loadOgFonts(baseUrl);

    // Generate excerpt from post content
    const generateExcerpt = (content: string, maxLength: number = 280): string => {
      // Remove markdown formatting and HTML
      const cleanContent = content
        .replace(/---[\s\S]*?---/, '') // Remove frontmatter
        .replace(/#{1,6}\s+/g, '') // Remove headings
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
        .replace(/\*(.*?)\*/g, '$1') // Remove italic
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links
        .replace(/```[\s\S]*?```/g, '') // Remove code blocks
        .replace(/`(.*?)`/g, '$1') // Remove inline code
        .replace(/\n{2,}/g, ' ') // Replace multiple newlines with space
        .replace(/\n/g, ' ') // Replace single newlines with space
        .trim();
      
      // Always truncate to maxLength with ellipsis for consistent formatting
      if (cleanContent.length <= maxLength) {
        return cleanContent + '...';
      }
      
      const truncated = cleanContent.substring(0, maxLength);
      const lastSpaceIndex = truncated.lastIndexOf(' ');
      
      return lastSpaceIndex > 0 
        ? truncated.substring(0, lastSpaceIndex) + '...'
        : truncated + '...';
    };

    const rawDescription = post.data.description || post.data.summary || generateExcerpt(post.body);
    const excerpt = clampText(rawDescription, 200);

    console.log('OG Image: Preparing modern design generation...');
    console.log('- Title:', post.data.title);
    console.log('- Reading time:', readingTime);
    console.log('- Date:', formattedDate);
    console.log('- Stage:', post.data.stage);
    console.log('- Excerpt:', excerpt);

    try {
      console.log('OG Image: Generating SVG with Satori...');
      // Generate SVG using Satori
      const svg = await satori(
        createOgTemplate({
          title: post.data.title,
          description: excerpt,
          badge: `Stage / ${post.data.stage ?? 'seedling'}`.toUpperCase(),
          meta: [
            { label: 'Date', value: formattedDate },
            { label: 'Read', value: readingTime },
            { label: 'Stage', value: post.data.stage ?? 'seedling' }
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
      
      console.log('OG Image: Satori SVG generated successfully, length:', svg.length);
      
      return new Response(svg, {
        status: 200,
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
      
    } catch (satoriError) {
      console.error('OG Image: Satori generation failed:', satoriError);
      console.log('OG Image: Falling back to manual SVG generation');
    }

    // If Satori fails, create a modern personalized SVG manually
    console.log('OG Image: Creating modern fallback SVG...');
    
    // Helper function to wrap text with better mobile handling
    const wrapText = (text: string, maxLength: number = 40) => {
      const words = text.split(' ');
      const lines: string[] = [];
      let currentLine = '';
      
      words.forEach(word => {
        // Handle long words by truncating them
        if (word.length > maxLength) {
          word = word.substring(0, maxLength - 3) + '...';
        }
        
        if ((currentLine + word).length > maxLength) {
          if (currentLine) lines.push(currentLine.trim());
          currentLine = word + ' ';
        } else {
          currentLine += word + ' ';
        }
      });
      
      if (currentLine) lines.push(currentLine.trim());
      return lines.slice(0, 2); // Max 2 lines for title
    };
    
    const titleLines = wrapText(post.data.title, 35);
    const excerptLines = wrapText(excerpt, 50);
    
    const personalizedSvg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <!-- Background image -->
        <defs>
          <linearGradient id="overlay" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:rgba(3,6,5,0.2)" />
            <stop offset="55%" style="stop-color:rgba(4,7,6,0.55)" />
            <stop offset="100%" style="stop-color:rgba(2,4,3,0.85)" />
          </linearGradient>
          <clipPath id="avatar-clip">
            <circle cx="980" cy="320" r="72" />
          </clipPath>
        </defs>
        
        <image href="${backgroundDataUrl}" width="1200" height="630" preserveAspectRatio="xMidYMid slice" />
        <rect width="1200" height="630" fill="url(#overlay)"/>

        <!-- Avatar -->
        <image href="${avatarDataUrl}" x="908" y="248" width="144" height="144" clip-path="url(#avatar-clip)" />
        <circle cx="980" cy="320" r="78" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2" />
        
        <!-- Date header -->
        <text x="120" y="120" font-family="system-ui, sans-serif" font-size="18" font-weight="400" fill="rgba(255,255,255,0.75)">
          ${formattedDate}
        </text>
        
        <!-- Title section -->
        ${titleLines.map((line, index) => `
          <text x="120" y="${210 + (index * 65)}" font-family="Georgia, serif" font-size="${titleLines.length === 1 ? '60' : '52'}" font-weight="600" fill="#f8fafc" letter-spacing="-0.02em">
            ${line}
          </text>
        `).join('')}
        
        <!-- Excerpt section -->
        ${excerptLines.slice(0, 2).map((line, index) => `
          <text x="120" y="${350 + (index * 32)}" font-family="system-ui, sans-serif" font-size="22" font-weight="400" fill="rgba(255,255,255,0.78)">
            ${line}
          </text>
        `).join('')}
        
        <!-- Footer section -->
        <text x="120" y="570" font-family="system-ui, sans-serif" font-size="18" font-weight="500" fill="rgba(255,255,255,0.8)">
          ${readingTime}
        </text>
        <text x="240" y="570" font-family="system-ui, sans-serif" font-size="18" font-weight="500" fill="#444449">
          •
        </text>
        <text x="260" y="570" font-family="system-ui, sans-serif" font-size="18" font-weight="500" fill="rgba(255,255,255,0.8)">
          shreyasprakash.com
        </text>
      </svg>
    `.trim();

    console.log('OG Image: Personalized fallback SVG created');
    
    return new Response(personalizedSvg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error generating OG image:', error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace');
    
    // Return a simple fallback SVG instead of an error
    const fallbackSvg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <rect width="1200" height="630" fill="#ffffff"/>
        <text x="100" y="200" font-family="system-ui, sans-serif" font-size="48" font-weight="bold" fill="#111827">
          Shreyas Prakash
        </text>
        <text x="100" y="300" font-family="system-ui, sans-serif" font-size="32" fill="#6B7280">
          Blog Post
        </text>
        <text x="100" y="450" font-family="system-ui, sans-serif" font-size="24" fill="#9CA3AF">
          shreyasprakash.com
        </text>
      </svg>
    `;
    
    return new Response(fallbackSvg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600', // Shorter cache for fallback
      },
    });
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  
  return posts.map(post => ({
    params: { slug: post.slug },
  }));
};
