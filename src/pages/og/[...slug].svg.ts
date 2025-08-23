import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
// import sharp from 'sharp'; // Commented out for now due to Cloudflare limitations
import { readFileSync } from 'fs';
import { join } from 'path';
import { calculateReadingTime } from '../../utils/readingTime';
import { formatDate } from '../../utils/formatDate';

// Create the OG image template component
function OGImageTemplate({ 
  title, 
  readingTime, 
  date, 
  stage,
  authorImage 
}: {
  title: string;
  readingTime: string;
  date: string;
  stage?: string;
  authorImage: string;
}) {
  // Map stage to emoji
  const stageEmoji = {
    seedling: '🌱',
    sprout: '🌿', 
    plant: '🌳'
  };

  return {
    type: 'div',
    props: {
      style: {
        height: '630px',
        width: '1200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        padding: '80px',
        fontFamily: 'Inter, system-ui, sans-serif',
        position: 'relative'
      },
      children: [
        // Header with author info
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px'
            },
            children: [
              // Author image
              {
                type: 'img',
                props: {
                  src: authorImage,
                  style: {
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    marginRight: '24px',
                    border: '3px solid #000'
                  }
                }
              },
              // Author name and site
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    flexDirection: 'column'
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontSize: '28px',
                          fontWeight: '600',
                          color: '#111827',
                          marginBottom: '4px'
                        },
                        children: 'Shreyas Prakash'
                      }
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontSize: '20px',
                          color: '#6B7280'
                        },
                        children: 'shreyas.blog'
                      }
                    }
                  ]
                }
              }
            ]
          }
        },
        
        // Main title
        {
          type: 'div',
          props: {
            style: {
              fontSize: title.length > 60 ? '48px' : title.length > 40 ? '56px' : '64px',
              fontWeight: '400',
              color: '#111827',
              lineHeight: '1.2',
              marginBottom: '40px',
              maxWidth: '1000px',
              wordWrap: 'break-word'
            },
            children: title
          }
        },

        // Footer with metadata
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: 'auto'
            },
            children: [
              // Left side - reading time and date
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '32px'
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontSize: '20px',
                          color: '#6B7280',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        },
                        children: [
                          '⏱️',
                          readingTime
                        ]
                      }
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontSize: '20px',
                          color: '#6B7280',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        },
                        children: [
                          '📅',
                          date
                        ]
                      }
                    }
                  ]
                }
              },

              // Right side - growth stage
              stage && {
                type: 'div',
                props: {
                  style: {
                    fontSize: '24px',
                    color: '#374151',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    backgroundColor: '#F9FAFB',
                    padding: '12px 24px',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB'
                  },
                  children: [
                    stageEmoji[stage as keyof typeof stageEmoji] || '🌱',
                    stage
                  ]
                }
              }
            ].filter(Boolean)
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
      return new Response('Slug is required', { status: 400 });
    }

    // Get the post data
    const posts = await getCollection('posts', ({ data }) => !data.draft);
    const post = posts.find(p => p.slug === slug);
    
    if (!post) {
      return new Response('Post not found', { status: 404 });
    }

    const readingTime = calculateReadingTime(post.body);
    const formattedDate = formatDate(post.data.date);
    
    // Author image URL - using your Gravatar
    const authorImageUrl = 'https://0.gravatar.com/avatar/991d6680b622c30f9c9e06b25ab884e4e6a18dd35deac1a61f7c9464e1a6d1c3?size=256';

    // Generate SVG using Satori
    const svg = await satori(
      OGImageTemplate({
        title: post.data.title,
        readingTime,
        date: formattedDate,
        stage: post.data.stage,
        authorImage: authorImageUrl
      }) as any,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: readFileSync(join(process.cwd(), 'node_modules/@fontsource/inter/files/inter-latin-400-normal.woff')),
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Inter',
            data: readFileSync(join(process.cwd(), 'node_modules/@fontsource/inter/files/inter-latin-600-normal.woff')),
            weight: 600,
            style: 'normal',
          },
        ],
      }
    );

    // Return SVG directly for now (Cloudflare has limitations with Sharp)
    // In production, you might want to use a different approach or pre-generate images
    return new Response(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Error generating image', { status: 500 });
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  
  return posts.map(post => ({
    params: { slug: post.slug },
  }));
};