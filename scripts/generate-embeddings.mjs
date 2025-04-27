import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { OpenAIEmbeddings } from '@langchain/openai';
import { HNSWLib } from '@langchain/community/vectorstores/hnswlib';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { marked } from 'marked';
import { globby } from 'globby';
import matter from 'gray-matter';
import 'dotenv/config';

// Check for OpenAI API key
if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY environment variable is not set');
  process.exit(1);
}

const dataDirectory = join(process.cwd(), 'data');
const contentDirectory = join(process.cwd(), 'src/content');

// Ensure data directory exists
if (!existsSync(dataDirectory)) {
  mkdirSync(dataDirectory, { recursive: true });
}

async function extractContentFromMarkdown() {
  const postsDirectory = join(contentDirectory, 'posts');
  const mdFiles = await globby(['**/*.md', '**/*.mdx'], { cwd: postsDirectory });
  
  const allContent = [];
  
  for (const mdFile of mdFiles) {
    const fullPath = join(postsDirectory, mdFile);
    const fileContents = readFileSync(fullPath, 'utf8');
    
    // Parse frontmatter
    const { data, content } = matter(fileContents);
    
    // Skip drafts if draft flag is true
    if (data.draft === true) {
      continue;
    }
    
    // Convert markdown to plain text
    const plainText = marked.parse(content, { mangle: false, headerIds: false });
    const strippedText = plainText.replace(/<[^>]*>/g, ''); // Remove HTML tags
    
    allContent.push({
      id: mdFile,
      url: `/${mdFile.replace(/\.mdx?$/, '')}`,
      title: data.title || '',
      description: data.description || '',
      date: data.date ? new Date(data.date).toISOString() : '',
      tags: data.tags || [],
      content: strippedText,
    });
  }
  
  return allContent;
}

async function generateEmbeddings() {
  console.log('Extracting content from markdown files...');
  const posts = await extractContentFromMarkdown();
  
  console.log(`Processing ${posts.length} posts...`);
  
  // Prepare documents for embedding
  const documents = posts.map(post => {
    // Combine metadata with content for context
    const metadataString = `Title: ${post.title}\nDescription: ${post.description}\nURL: ${post.url}\nDate: ${post.date}\nTags: ${post.tags.join(', ')}\n\n`;
    
    return {
      pageContent: metadataString + post.content,
      metadata: {
        id: post.id,
        url: post.url,
        title: post.title,
        description: post.description,
        date: post.date,
        tags: post.tags,
      },
    };
  });
  
  // Split documents into chunks
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  
  const splitDocs = await textSplitter.splitDocuments(documents);
  console.log(`Split into ${splitDocs.length} chunks`);
  
  // Generate embeddings
  console.log('Generating embeddings...');
  const embeddings = new OpenAIEmbeddings();
  const vectorStore = await HNSWLib.fromDocuments(splitDocs, embeddings);
  
  // Save the vector store
  const directory = join(dataDirectory, 'vector-store');
  await vectorStore.save(directory);
  
  // Save metadata separately for quick access
  const metadata = posts.map(post => ({
    id: post.id,
    url: post.url,
    title: post.title,
    description: post.description,
    date: post.date,
    tags: post.tags,
  }));
  
  writeFileSync(
    join(dataDirectory, 'content-metadata.json'),
    JSON.stringify(metadata, null, 2)
  );
  
  console.log(`✅ Embeddings generated for ${posts.length} posts`);
  console.log(`Vector store saved to ${directory}`);
}

generateEmbeddings().catch(error => {
  console.error('Error generating embeddings:', error);
  process.exit(1);
}); 