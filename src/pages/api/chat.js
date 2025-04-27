import { OpenAI } from 'openai';
import { HNSWLib } from '@langchain/community/vectorstores/hnswlib';
import { OpenAIEmbeddings } from '@langchain/openai';
import { join } from 'path';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY,
});

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

export const prerender = false;

export async function GET({ request }) {
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST({ request }) {
  try {
    // Parse the request body
    const body = await request.json();
    const { message } = body;
    
    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    // Load the vector store
    const vectorStorePath = join(process.cwd(), 'data', 'vector-store');
    const embeddings = new OpenAIEmbeddings();
    const vectorStore = await HNSWLib.load(vectorStorePath, embeddings);
    
    // Search for relevant content
    const results = await vectorStore.similaritySearch(message, 5);
    
    // Prepare context from relevant documents
    const context = results.map(doc => {
      const { pageContent, metadata } = doc;
      return `
Title: ${metadata.title}
URL: ${metadata.url}
Content: ${pageContent}
      `;
    }).join('\n\n');
    
    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: SYSTEM_MESSAGE },
      { role: 'system', content: `Here is relevant content from Shreyas's blog to help with your response:\n\n${context}` },
      { role: 'user', content: message },
    ];
    
    // Generate a response
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
    });
    
    // Extract and return the assistant's message
    const response = completion.choices[0].message.content;
    
    return new Response(JSON.stringify({ 
      response, 
      sources: results.map(doc => ({
        title: doc.metadata.title,
        url: doc.metadata.url
      })) 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    
    return new Response(JSON.stringify({ error: 'An error occurred processing your request' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 