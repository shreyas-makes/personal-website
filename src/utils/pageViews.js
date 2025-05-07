// Utility for tracking and retrieving page views

// Function to increment view count for a post
export async function incrementPageView(slug) {
  try {
    // Call API to increment the view count in the backend
    await fetch('/api/pageViews', {
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
    const response = await fetch('/api/popularPosts?limit=' + limit);
    if (!response.ok) {
      throw new Error('Failed to fetch popular posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to get popular posts:', error);
    return [];
  }
} 