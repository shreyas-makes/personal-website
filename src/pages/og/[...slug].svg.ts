import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import { calculateReadingTime } from '../../utils/readingTime';
import { formatDate } from '../../utils/formatDate';

// Create the OG image template component
function OGImageTemplate({ 
  title, 
  readingTime, 
  date, 
  stage,
  authorImage,
  excerpt
}: {
  title: string;
  readingTime: string;
  date: string;
  stage?: string;
  authorImage: string;
  excerpt: string;
}) {
  return {
    type: 'div',
    props: {
      style: {
        height: '630px',
        width: '1200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#0f0f10',
        padding: '60px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        position: 'relative',
        background: 'linear-gradient(135deg, #0f0f10 0%, #1a1a1c 100%)'
      },
      children: [
        // Header with date
        {
          type: 'div',
          props: {
            style: {
              fontSize: '18px',
              color: '#888892',
              marginBottom: '40px',
              fontWeight: '400'
            },
            children: date
          }
        },
        
        // Main content area
        {
          type: 'div',
          props: {
            style: {
              flex: '1',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '32px'
            },
            children: [
              // Main title
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: title.length > 50 ? '48px' : title.length > 30 ? '56px' : '64px',
                    fontWeight: '700',
                    color: '#ffffff',
                    lineHeight: '1.1',
                    letterSpacing: '-0.02em',
                    maxWidth: '1000px'
                  },
                  children: title
                }
              },

              // Excerpt
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '24px',
                    color: '#a1a1aa',
                    lineHeight: '1.4',
                    maxWidth: '900px',
                    fontWeight: '400'
                  },
                  children: excerpt
                }
              }
            ]
          }
        },

        // Footer with metadata and site info
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '40px'
            },
            children: [
              // Left side - reading time
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '18px',
                    color: '#888892',
                    fontWeight: '500'
                  },
                  children: readingTime
                }
              },

              // Right side - site name
              {
                type: 'div',
                props: {
                  style: {
                    fontSize: '18px',
                    color: '#888892',
                    fontWeight: '500'
                  },
                  children: 'shreyas.blog'
                }
              }
            ]
          }
        }
      ]
    }
  };
}

export const GET: APIRoute = async ({ params }) => {
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
    
    // Author image URL - using your Gravatar
    const authorImageUrl = 'https://0.gravatar.com/avatar/991d6680b622c30f9c9e06b25ab884e4e6a18dd35deac1a61f7c9464e1a6d1c3?size=256';

    // Generate excerpt from post content
    const generateExcerpt = (content: string, maxLength: number = 150): string => {
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
      
      // Take first sentence or up to maxLength characters
      const sentences = cleanContent.split(/[.!?]+/);
      const firstSentence = sentences[0]?.trim();
      
      if (firstSentence && firstSentence.length <= maxLength) {
        return firstSentence;
      }
      
      // If first sentence is too long, truncate at word boundary
      if (cleanContent.length <= maxLength) {
        return cleanContent;
      }
      
      const truncated = cleanContent.substring(0, maxLength);
      const lastSpaceIndex = truncated.lastIndexOf(' ');
      
      return lastSpaceIndex > 0 
        ? truncated.substring(0, lastSpaceIndex) + '...'
        : truncated + '...';
    };

    const excerpt = generateExcerpt(post.body);

    console.log('OG Image: Preparing data for generation...');
    console.log('- Title:', post.data.title);
    console.log('- Reading time:', readingTime);
    console.log('- Date:', formattedDate);
    console.log('- Stage:', post.data.stage);
    console.log('- Author image URL:', authorImageUrl);
    console.log('- Excerpt:', excerpt);

    try {
      console.log('OG Image: Generating SVG with Satori...');
      // Generate SVG using Satori
      const svg = await satori(
        OGImageTemplate({
          title: post.data.title,
          readingTime,
          date: formattedDate,
          stage: post.data.stage,
          authorImage: authorImageUrl,
          excerpt
        }) as any,
        {
          width: 1200,
          height: 630,
          // No custom fonts - use system defaults for Cloudflare compatibility
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
    
    // Helper function to wrap text
    const wrapText = (text: string, maxLength: number = 40) => {
      const words = text.split(' ');
      const lines: string[] = [];
      let currentLine = '';
      
      words.forEach(word => {
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
        <!-- Background gradient -->
        <defs>
          <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0f0f10;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1a1a1c;stop-opacity:1" />
          </linearGradient>
        </defs>
        
        <rect width="1200" height="630" fill="url(#bg-gradient)"/>
        
        <!-- Date header -->
        <text x="60" y="110" font-family="system-ui, sans-serif" font-size="18" font-weight="400" fill="#888892">
          ${formattedDate}
        </text>
        
        <!-- Title section -->
        ${titleLines.map((line, index) => `
          <text x="60" y="${220 + (index * 70)}" font-family="system-ui, sans-serif" font-size="${titleLines.length === 1 ? '64' : '56'}" font-weight="700" fill="#ffffff" letter-spacing="-0.02em">
            ${line}
          </text>
        `).join('')}
        
        <!-- Excerpt section -->
        ${excerptLines.slice(0, 2).map((line, index) => `
          <text x="60" y="${350 + (index * 35)}" font-family="system-ui, sans-serif" font-size="24" font-weight="400" fill="#a1a1aa">
            ${line}
          </text>
        `).join('')}
        
        <!-- Footer section -->
        <text x="60" y="570" font-family="system-ui, sans-serif" font-size="18" font-weight="500" fill="#888892">
          ${readingTime}
        </text>
        <text x="1080" y="570" font-family="system-ui, sans-serif" font-size="18" font-weight="500" fill="#888892" text-anchor="end">
          shreyas.blog
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
          shreyas.blog
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