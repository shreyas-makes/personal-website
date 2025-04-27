const fs = require('fs');

fs.readFile('./data/backfile.json', 'utf8', (err, data) => {
  if (err) throw err;
  const backup = JSON.parse(data);
  processBackup(backup);
});

function processBackup(backup) {
  const posts = backup.db[0].data.posts;
  for (let post of posts) {
    // Skip draft posts
    if (post.status !== 'published') continue;

    if (!post.html || typeof post.html !== 'string') {
        console.warn(`Skipping post "${post.title}" (ID: ${post.id}) - No HTML content`);
        continue;
    }
    const markdown = convertHtmlToMarkdown(post.html);
    const metadata = {
      title: post.title,
      slug: post.slug || slugify(post.title),
      date: new Date(post.published_at).toISOString(),
      tags: Array.isArray(post.tags) 
        ? post.tags.map(t => t.name).filter(t => t !== 'hash-rough-notes') 
        : []
    };
    saveAsMarkdownFile(post.title, markdown, metadata);
  }
}

const TurndownService = require('turndown');
const turndown = new TurndownService();

function convertHtmlToMarkdown(html) {
  try {
    return turndown.turndown(html);
  } catch (error) {
    console.error(`Conversion failed for HTML content: ${html?.substring(0, 50)}...`);
    return ''; // Return empty string for failed conversions
  }
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')  // Replace spaces with hyphens
    .replace(/[\/?…]+/g, '-')  // Replace forward slashes, question marks, and ellipses with hyphens
    .replace(/-+/g, '-')  // Replace multiple hyphens with a single hyphen
    .replace(/[^a-z0-9-]/g, '');  // Remove any remaining characters that are not alphanumeric or hyphens
}

function replaceGhostUrlPlaceholders(str) {
  // Replace Ghost URL placeholders with public asset paths.
  return str
    .replace(/__GHOST_URL__\/content\/images/g, '/images')
    .replace(/__GHOST_URL__\/content\/media/g, '/media')
    .replace(/\/content\/images/g, '/images')
    .replace(/\/content\/media/g, '/media');
}

function saveAsMarkdownFile(title, markdown, metadata) {
  const fileName = `${slugify(metadata.date.split('T')[0])}-${slugify(metadata.slug)}.md`;

  // Process the markdown content to replace all __GHOST_URL__ placeholders
  const processedMarkdown = replaceGhostUrlPlaceholders(markdown);

  // Build frontmatter without including the raw markdown
  const frontmatter = [
    '---',
    `title: "${metadata.title.replace(/"/g, '\\"')}"`,
    `date: "${metadata.date}"`,
    `slug: "${metadata.slug}"`,
    `tags: ${JSON.stringify(metadata.tags)}`,
    '---',
    ''
  ].join('\n');

  // Combine the frontmatter with the processed markdown content
  const fileContent = [frontmatter, processedMarkdown].join('\n');

  fs.writeFileSync(
    `./src/content/posts/${fileName}`, 
    fileContent, 
    { encoding: 'utf8' }
  );
}