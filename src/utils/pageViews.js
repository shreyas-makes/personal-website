// Utility for tracking and retrieving page views
import { getApiUrl, isBrowser, getBaseUrl, siteConfig } from './config';

// Function to increment view count for a post
export async function incrementPageView(slug) {
  try {
    // Get the complete API URL using the config utility
    const apiUrl = getApiUrl(siteConfig.api.pageViews);
    
    // Call API to increment the view count in the backend
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug }),
    });
  } catch (error) {
    console.error('Failed to increment page view:', error);
  }
}

// Function to get popular posts
export async function getPopularPosts(limit = 5) {
  try {
    // Get the complete API URL using the config utility with parameters
    const apiUrl = getApiUrl(siteConfig.api.popularPosts, { limit: limit.toString() });
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error('Failed to fetch popular posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to get popular posts:', error);
    return [];
  }
} 