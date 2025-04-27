# MCP Server for Astro Blog

This document explains how to set up and use the Memory and Computation Protocol (MCP) server for your Astro blog, which enables AI-powered chat functionality to answer questions about your blog content.

## What is an MCP Server?

An MCP (Memory and Computation Protocol) server is an AI-powered system that enables natural language interactions with your blog content. It works by:

1. **Generating vector embeddings** of your blog posts
2. **Storing these embeddings** in a vector database
3. **Retrieving relevant content** when users ask questions
4. **Using an LLM (Large Language Model)** to generate a contextually aware response

The MCP server allows visitors to ask questions about your thoughts, opinions, and ideas based on your published writing, creating an interactive experience that complements your static blog content.

## Setup Guide

### Prerequisites

- Node.js (>=18.19.0)
- npm (>=9.6.7)
- An OpenAI API key

### Installation Steps

1. **Add the required dependencies**

   These are already included in your package.json:
   ```
   openai
   @langchain/openai
   langchain
   @langchain/community
   hnswlib-node
   marked
   ```

2. **Create an environment file**

   Create a `.env` file in the root directory:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

3. **Generate embeddings**

   Run the script to generate vector embeddings for your content:
   ```bash
   npm run generate-embeddings
   ```

   This will:
   - Extract content from your blog posts
   - Split the content into chunks
   - Generate vector embeddings using OpenAI's embedding model
   - Save the embeddings to a vector store in `data/vector-store`

4. **Deploy your site**

   The MCP server is now integrated and will be included when you build your site:
   ```bash
   npm run build
   ```

   When deploying to Cloudflare Pages, make sure to set your `OPENAI_API_KEY` as an environment variable in the Cloudflare dashboard.

### Quick Setup Script

For convenience, you can use the provided setup script:

```bash
chmod +x scripts/setup-mcp.sh
./scripts/setup-mcp.sh your_openai_api_key
```

## Using the MCP Chat Interface

After deployment, users can access the chat interface at `/chat`. The interface provides:

- A conversational UI for asking questions
- AI-generated responses based on your blog content
- Source references linking back to relevant blog posts

## Customization

### Persona Customization

You can customize the AI assistant's persona by editing the `SYSTEM_MESSAGE` in `src/pages/api/chat.js`. This message defines how the AI represents you and what tone it should use when responding.

### Chat Interface Customization

The chat interface is built with React in `src/components/Chat.jsx`. You can modify this file to change the appearance and behavior of the chat interface.

### Vector Store Configuration

Advanced users can adjust the vector store configuration in `scripts/generate-embeddings.mjs`:

- Adjust `chunkSize` and `chunkOverlap` to control how your content is split
- Change the embedding model by modifying the OpenAIEmbeddings instantiation
- Customize metadata extraction for better retrieval

## Troubleshooting

### API Key Issues

If you encounter errors related to the OpenAI API:
1. Check that your API key is correctly set in the `.env` file
2. Verify that the environment variable is correctly set in your deployment platform
3. Ensure your OpenAI account has sufficient quota

### Embedding Generation Issues

If embedding generation fails:
1. Check your internet connection
2. Ensure your OpenAI API key has access to the embedding model
3. Try adjusting the chunk size if you have very long content

### Chat Response Issues

If the chat gives poor responses:
1. Regenerate embeddings to include the latest content
2. Check that your content is being properly indexed
3. Adjust the system message to better represent your persona

## Resources

- [OpenAI Documentation](https://platform.openai.com/docs/introduction)
- [LangChain Documentation](https://js.langchain.com/docs/)
- [Astro Documentation](https://docs.astro.build/) 