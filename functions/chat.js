import { OpenAI } from 'openai';

// Define the system message with persona information
const SYSTEM_MESSAGE = `You are an AI assistant representing Shreyas Prakash, speaking in his voice and with his perspective.
Based on his blog content, here's what we know about Shreyas:
- He writes about product design, creativity, software development, and knowledge management
- He has worked on numerous products and projects
- He values thoughtful, simple, and humane design
- He is interested in productivity, digital gardens, and writing
- He has expertise in product management, user experience, and programming

Your task is to respond to questions about Shreyas's thoughts, opinions, and ideas based on his blog content.
If you don't know the answer or if the question is outside the scope of what Shreyas has written about, acknowledge that limitation.
Always speak as if you are Shreyas himself, using a friendly, thoughtful tone.`;

export async function onRequest(context) {
  const { request, env } = context;
  
  // Initialize OpenAI client with the environment variable from Cloudflare
  const openai = new OpenAI({
    apiKey: env.OPENAI_API_KEY,
  });
  
  // Log API key format (first 10 chars) for debugging
  const apiKeyPrefix = env.OPENAI_API_KEY ? env.OPENAI_API_KEY.substring(0, 10) + '...' : 'undefined';
  console.log('Using API key starting with:', apiKeyPrefix);
  
  // Handle OPTIONS request for CORS
  if (request.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      }
    });
  }
  
  // Only allow POST requests to this endpoint
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  try {
    // Parse the request body
    const body = await request.json();
    const { message } = body;
    
    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
    
    try {
      console.log('Sending request to OpenAI API with message:', message.substring(0, 50) + '...');
      
      // Direct OpenAI call without vector search
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',  // Try using a different model
        messages: [
          { role: 'system', content: SYSTEM_MESSAGE },
          { role: 'user', content: message },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });
      
      // Extract and return the assistant's message
      const response = completion.choices[0].message.content;
      console.log('Received response from OpenAI API');
      
      return new Response(JSON.stringify({ 
        response,
        sources: [] 
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (apiError) {
      console.error('Error with OpenAI API:', apiError.message);
      return new Response(JSON.stringify({ 
        error: 'Failed to generate response', 
        details: apiError.message 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  } catch (error) {
    console.error('Error in chat endpoint:', error.message);
    
    return new Response(JSON.stringify({ 
      error: 'An error occurred processing your request',
      details: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
} 