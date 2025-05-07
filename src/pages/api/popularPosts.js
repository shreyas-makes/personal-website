// API endpoint to get popular posts based on view counts
// Returns posts sorted by view count

import { db } from '../../utils/database';
import { getCollection } from 'astro:content';

export async function get({ url }) {
  try {
    const limit = parseInt(url.searchParams.get('limit') || '5', 10);
    
    // Get page view data from database
    // This is a simplified version - in production you'd use your actual database
    const viewData = await db.pageViews.getTopViewed(limit);
    
    // Get full post data for each slug
    const allPosts = await getCollection('posts', ({ data }) => !data.draft);
    
    // Match posts with view data and sort by view count
    const popularPosts = viewData
      .map(({ slug, views }) => {
        const post = allPosts.find(post => post.slug === slug);
        return post ? { ...post, views } : null;
      })
      .filter(Boolean)
      .slice(0, limit);
    
    return new Response(JSON.stringify(popularPosts), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error retrieving popular posts:', error);
    
    return new Response(JSON.stringify({ error: 'Failed to retrieve popular posts' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 