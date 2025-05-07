/**
 * Configuration utility for the blog
 * Handles environment-specific settings
 */

// Get the environment
const isDev = import.meta.env.DEV || false;
const isProd = import.meta.env.PROD || false;

// Site configuration
export const siteConfig = {
  // Base URL for the site - used for API requests
  baseUrl: isDev 
    ? 'http://localhost:4321' // Default Astro dev server
    : 'https://shreyasprakash.com', // Replace with your production URL
  
  // API endpoints
  api: {
    pageViews: '/api/pageViews',
    popularPosts: '/api/popularPosts',
    
  },
  
  // Site metadata
  title: 'Shreyas Prakash',
  description: 'Shreyas Prakash - Design and Technology',
};

/**
 * Get the full URL for an API endpoint
 * 
 * @param {string} endpoint - The API endpoint path
 * @param {Record<string, string>} params - Query parameters
 * @returns {string} The complete URL
 */
export function getApiUrl(endpoint, params = {}) {
  // Create URL with base
  const url = new URL(endpoint, siteConfig.baseUrl);
  
  // Add query parameters
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  
  return url.toString();
}

/**
 * Determines if we're in a browser environment
 * 
 * @returns {boolean} True if in browser, false if in server
 */
export function isBrowser() {
  return typeof window !== 'undefined';
}

/**
 * Get the base URL for the current environment
 * 
 * @returns {string} The base URL
 */
export function getBaseUrl() {
  if (isBrowser()) {
    return window.location.origin;
  }
  return siteConfig.baseUrl;
} 