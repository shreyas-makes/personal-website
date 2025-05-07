// Database utility for handling data storage and retrieval
// This is a simplified mock version - in production, you would connect to a real database

// In-memory storage for development/testing
let pageViewsStore = {};

// Database interface
export const db = {
  pageViews: {
    // Increment view count for a post
    async incrementView(slug) {
      if (!pageViewsStore[slug]) {
        pageViewsStore[slug] = 0;
      }
      pageViewsStore[slug]++;
      
      // In production, you would save this to a persistent database
      console.log(`View count for ${slug}: ${pageViewsStore[slug]}`);
      
      return pageViewsStore[slug];
    },
    
    // Get total view count for a post
    async getViewCount(slug) {
      return pageViewsStore[slug] || 0;
    },
    
    // Get top viewed posts
    async getTopViewed(limit = 5) {
      // Convert to array and sort by view count
      const entries = Object.entries(pageViewsStore).map(([slug, views]) => ({ slug, views }));
      const sorted = entries.sort((a, b) => b.views - a.views);
      
      return sorted.slice(0, limit);
    }
  }
};

// For a production application, you would replace this with:
// - A database connection (MongoDB, PostgreSQL, etc.)
// - Cloud-based analytics (Firebase, Supabase, etc.)
// - Or a dedicated analytics service (Plausible, Google Analytics, etc.) 