// API endpoint to increment page views
// The data will be persisted server-side using a database

import { db } from '../../utils/database';

export async function post({ request }) {
  try {
    const { slug } = await request.json();
    
    if (!slug) {
      return new Response(JSON.stringify({ error: 'Slug is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Update view count in database
    // This is a simplified version - in production you'd use your actual database
    await db.pageViews.incrementView(slug);
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error incrementing view count:', error);
    
    return new Response(JSON.stringify({ error: 'Failed to increment view count' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 