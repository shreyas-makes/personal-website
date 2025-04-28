// This middleware runs before all functions
export async function onRequest(context) {
  // Extract request and env
  const { request, env, next } = context;
  
  // For all routes, continue without modification
  return next();
} 