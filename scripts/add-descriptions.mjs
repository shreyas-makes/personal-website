import fs from 'node:fs/promises';
import { globby } from 'globby';

const MAX_LENGTH = 200;

const generateExcerpt = (content) => {
  const cleanContent = content
    .replace(/---[\s\S]*?---/, '')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`(.*?)`/g, '$1')
    .replace(/\n{2,}/g, ' ')
    .replace(/\n/g, ' ')
    .trim();

  if (!cleanContent) return '';
  if (cleanContent.length <= MAX_LENGTH) return cleanContent;

  const truncated = cleanContent.substring(0, MAX_LENGTH);
  const lastSpaceIndex = truncated.lastIndexOf(' ');
  return lastSpaceIndex > 0
    ? `${truncated.substring(0, lastSpaceIndex)}...`
    : `${truncated}...`;
};

const files = await globby([
  'src/content/posts/**/*.md',
  '!**/Attachments/**'
]);

let updated = 0;

for (const filePath of files) {
  const raw = await fs.readFile(filePath, 'utf8');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) continue;

  const frontmatter = match[1];
  if (/^description:/m.test(frontmatter)) continue;

  const body = raw.slice(match[0].length);
  const description = generateExcerpt(body);
  if (!description) continue;

  const quotedDescription = JSON.stringify(description);
  const titleLineMatch = frontmatter.match(/^title:.*$/m);
  let newFrontmatter = frontmatter;

  if (titleLineMatch) {
    const insertIndex = frontmatter.indexOf(titleLineMatch[0]) + titleLineMatch[0].length;
    newFrontmatter =
      frontmatter.slice(0, insertIndex) +
      `\ndescription: ${quotedDescription}` +
      frontmatter.slice(insertIndex);
  } else {
    newFrontmatter = `${frontmatter}\ndescription: ${quotedDescription}`;
  }

  const updatedContent = raw.replace(match[0], `---\n${newFrontmatter}\n---\n`);
  await fs.writeFile(filePath, updatedContent, 'utf8');
  updated += 1;
}

console.log(`Added descriptions to ${updated} posts.`);
