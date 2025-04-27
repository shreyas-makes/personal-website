import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = './src/content/posts';

// Read all markdown files in the posts directory
const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.md'));

files.forEach(file => {
  const filePath = path.join(POSTS_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  try {
    // Parse the frontmatter
    const { data, content: markdown } = matter(content);
    
    // Improve date handling to validate ISO format with better error handling
    const parseDate = (dateString) => {
      try {
        const date = new Date(dateString);
        return !isNaN(date.getTime()) ? date.toISOString() : new Date().toISOString();
      } catch (e) {
        return new Date().toISOString();
      }
    };

    // Build frontmatter with all original fields plus fixed ones
    const frontmatter = {
      title: data.title || path.basename(file, '.md').replace(/\d{4}-\d{2}-\d{2}-/, '').replace(/-/g, ' '),
      date: parseDate(data.date),
      slug: data.slug || path.basename(file, '.md'),
      tags: Array.isArray(data.tags) ? data.tags : [],
      // Preserve other fields if they exist
      ...(data.draft !== undefined ? { draft: data.draft } : {}),
      ...(data.summary ? { summary: data.summary } : {}),
      ...(data.stage ? { stage: data.stage } : {}),
      ...(data.image ? { image: data.image } : {}),
      ...(data.cover ? { cover: data.cover } : {}),
      ...(data.isbn ? { isbn: data.isbn } : {}),
      ...(data.rating ? { rating: data.rating } : {}),
      ...(data.author ? { author: data.author } : {})
    };

    // Create new file content with fixed frontmatter
    // Build YAML more systematically to include all fields
    const frontmatterLines = ['---'];
    
    // Add each property to the frontmatter
    Object.entries(frontmatter).forEach(([key, value]) => {
      if (key === 'tags') {
        frontmatterLines.push(`tags: ${JSON.stringify(value)}`);
      } else if (key === 'title') {
        frontmatterLines.push(`title: "${String(value).replace(/"/g, '\\"')}"`);
      } else if (typeof value === 'string' && value.includes('\n')) {
        // Handle multi-line strings with proper YAML formatting
        frontmatterLines.push(`${key}: |`);
        value.split('\n').forEach(line => {
          frontmatterLines.push(`  ${line}`);
        });
      } else if (value !== undefined) {
        frontmatterLines.push(`${key}: ${JSON.stringify(value)}`);
      }
    });
    
    frontmatterLines.push('---');
    frontmatterLines.push('');
    frontmatterLines.push(markdown.trim());
    
    const newContent = frontmatterLines.join('\n');

    // Write the fixed content back to the file
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Fixed frontmatter in ${file}`);
  } catch (error) {
    console.error(`Error processing ${file}:`, error);
  }
}); 