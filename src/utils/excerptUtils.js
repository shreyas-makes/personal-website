/**
 * Generates a clean, consistent excerpt from post content
 * @param {string} body - The full markdown content
 * @param {number} length - Desired excerpt length (default: 400 characters)
 * @returns {string} Formatted excerpt
 */
export function generateExcerpt(body, length = 400) {
  // Clean the body text of markdown formatting and embeds
  const cleanText = body
    .split('\n')
    .filter(line => {
      // Filter out image references, code blocks, blockquotes, and HTML tags
      return line.trim() && 
             !line.startsWith('#') && 
             !line.startsWith('![') && 
             !line.startsWith('```') && 
             !line.startsWith('<div') && 
             !line.startsWith('<iframe') && 
             !line.startsWith('<blockquote');
    })
    .join(' ')
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove image markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Replace links with just text
    .replace(/<\/?[^>]+(>|$)/g, '') // Remove HTML tags
    .replace(/[*_`]/g, '') // Remove markdown formatting
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
  
  // Return a consistent length excerpt
  return cleanText.slice(0, length).replace(/\s+\S*$/, '...'); 
} 