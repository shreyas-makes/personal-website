// This middleware runs before all functions
export async function onRequest(context) {
  // Extract request and env
  const { request, env, next } = context;
  
  // Add CORS headers for API routes
  if (request.url.includes('/chat')) {
    const response = await next();
    
    // Clone the response and add CORS headers
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Access-Control-Allow-Origin', '*');
    newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return newResponse;
  }
  
  // For non-API routes, continue without modification
  return next();
} 