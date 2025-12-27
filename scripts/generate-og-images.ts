import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import satori from 'satori';
import sharp from 'sharp';
import { globby } from 'globby';
import { calculateReadingTime } from '../src/utils/readingTime';
import { formatDate } from '../src/utils/formatDate';
import { slugify } from '../src/utils/slugify';
import { clampText, createOgTemplate } from '../src/pages/og/template';

type PostFrontmatter = {
  title?: string;
  date?: string | Date;
  slug?: string;
  draft?: boolean;
  description?: string;
  summary?: string;
  stage?: string;
};

const toDataUrl = (buffer: Buffer, mimeType: string) =>
  `data:${mimeType};base64,${buffer.toString('base64')}`;

const loadFont = async (filePath: string, weight: number) => {
  const data = await fs.readFile(filePath);
  return {
    name: 'Inter',
    data,
    weight,
    style: 'normal' as const
  };
};

const loadFonts = async () => {
  const fontDir = path.resolve('public/images/og/fonts');
  return Promise.all([
    loadFont(path.join(fontDir, 'inter-400.woff'), 400),
    loadFont(path.join(fontDir, 'inter-600.woff'), 600),
    loadFont(path.join(fontDir, 'inter-700.woff'), 700)
  ]);
};

const generateExcerpt = (content: string, maxLength: number = 280): string => {
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

  if (cleanContent.length <= maxLength) {
    return cleanContent + '...';
  }

  const truncated = cleanContent.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  return lastSpaceIndex > 0
    ? truncated.substring(0, lastSpaceIndex) + '...'
    : truncated + '...';
};

const writePng = async (svg: string, outputPath: string) => {
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, png);
};

const main = async () => {
  const fonts = await loadFonts();
  const backgroundPath = path.resolve('public/images/og/serene-forest.jpg');
  const avatarPath = path.resolve('public/images/og/avatar.png');
  const backgroundDataUrl = toDataUrl(await fs.readFile(backgroundPath), 'image/jpeg');
  const avatarDataUrl = toDataUrl(await fs.readFile(avatarPath), 'image/png');

  const postFiles = await globby(['src/content/posts/**/*.md', '!**/Attachments/**']);

  for (const filePath of postFiles) {
    const raw = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(raw);
    const frontmatter = data as PostFrontmatter;

    if (frontmatter.draft) continue;
    if (!frontmatter.title) continue;

    const slug = frontmatter.slug || slugify(frontmatter.title);
    const readingTime = calculateReadingTime(content);
    const formattedDate = formatDate(frontmatter.date ?? new Date()) || 'Today';
    const safeTitle = frontmatter.title.trim();
    const rawDescription =
      frontmatter.description || frontmatter.summary || generateExcerpt(content) || '';
    const excerpt = clampText(rawDescription, 200);

    try {
      const svg = await satori(
        createOgTemplate({
          title: safeTitle,
          description: excerpt,
          badge: `Stage / ${frontmatter.stage ?? 'seedling'}`.toUpperCase(),
          meta: [
            { label: 'Date', value: formattedDate },
            { label: 'Read', value: readingTime },
            { label: 'Stage', value: frontmatter.stage ?? 'seedling' }
          ],
          backgroundImageUrl: backgroundDataUrl,
          align: 'left',
          avatarUrl: avatarDataUrl
        }) as any,
        {
          width: 1200,
          height: 630,
          fonts
        }
      );

      const outputPath = path.resolve('public/og-images', `${slug}.png`);
      await writePng(svg, outputPath);
      console.log(`Generated ${outputPath}`);
    } catch (error) {
      console.error(`Failed to generate OG for ${filePath}:`, error);
    }
  }

  const landingSvg = await satori(
    createOgTemplate({
      title: 'Shreyas Prakash',
      description: clampText(
        'Essays and experiments at the intersection of product, design, and technology.',
        200
      ),
      badge: 'WEBSITE / HOME',
      meta: [
        { label: 'Date', value: formatDate(new Date()) },
        { label: 'Read', value: 'Homepage' },
        { label: 'Stage', value: 'Live' }
      ],
      backgroundImageUrl: backgroundDataUrl,
      align: 'left',
      avatarUrl: avatarDataUrl
    }) as any,
    {
      width: 1200,
      height: 630,
      fonts
    }
  );

  await writePng(landingSvg, path.resolve('public/og-images/landing.png'));
  console.log('Generated public/og-images/landing.png');
};

main().catch(error => {
  console.error('Failed to generate OG images:', error);
  process.exit(1);
});
