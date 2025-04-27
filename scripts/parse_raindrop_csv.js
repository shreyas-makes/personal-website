const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

// Read the new CSV file
const csvPath = path.join(__dirname, '../articlehighlights.csv');
const csvContent = fs.readFileSync(csvPath, 'utf8');

// Parse the CSV content
const records = parse(csvContent, {
  columns: true,
  skip_empty_lines: true
});

// Function to clean text - removes extra whitespace and HTML tags
const cleanText = (text) => {
  if (!text) return '';
  // Remove HTML tags
  const withoutHtml = text.replace(/<[^>]*>/g, '');
  // Replace multiple spaces with a single space
  return withoutHtml.replace(/\s+/g, ' ').trim();
};

// Convert Raindrop records to MediaItem format, focusing only on title and URL
const articleItems = records.map(record => {
  return {
    title: cleanText(record.title),
    rating: 8.5, // Default rating
    notes: "", // Empty notes field as requested
    type: 'Article',
    url: record.url
  };
});

// Create formatted output for articles.ts
const outputContent = `import { MediaItem } from './movies';

// Extended MediaItem type to include URL for articles
export interface ArticleItem extends MediaItem {
  url?: string;
}

export const articlesList: ArticleItem[] = ${JSON.stringify(articleItems, null, 2)};
`;

// Write the output to articles.ts
const outputPath = path.join(__dirname, '../src/data/articles.ts');
fs.writeFileSync(outputPath, outputContent);

console.log(`Processed ${articleItems.length} articles from articlehighlights.csv and wrote them to ${outputPath}`); 