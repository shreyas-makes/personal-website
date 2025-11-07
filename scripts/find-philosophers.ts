import path from 'node:path';
import fs from 'node:fs/promises';
import process from 'node:process';

import { globby } from 'globby';
import matter from 'gray-matter';
import slugify from 'slugify';

import type { CompiledPhilosopher } from '../src/utils/philosopherMatcher';
import { compilePhilosophers, countMatches } from '../src/utils/philosopherMatcher';

interface MentionedPost {
  title: string;
  id: string;
  slug: string;
  date: string | null;
  count: number;
}

interface PhilosopherSummary {
  philosopher: CompiledPhilosopher;
  totalMentions: number;
  posts: MentionedPost[];
}

const args = process.argv.slice(2);
const asJson = args.includes('--json');
const limitArg = args.find((arg) => arg.startsWith('--limit='));
const limit = limitArg ? Number.parseInt(limitArg.split('=')[1], 10) : null;

if (limit !== null && Number.isNaN(limit)) {
  console.error('Invalid value supplied for --limit. Provide a number, e.g., --limit=5');
  process.exit(1);
}

const POSTS_DIR = path.resolve(process.cwd(), 'src/content/posts');

const ensurePostsDirExists = async () => {
  try {
    const stats = await fs.stat(POSTS_DIR);
    if (!stats.isDirectory()) {
      throw new Error();
    }
  } catch {
    console.error(`Could not find posts directory at ${POSTS_DIR}`);
    process.exit(1);
  }
};

const getReadableTitle = (rawPath: string, frontmatterTitle?: string) => {
  if (frontmatterTitle) return frontmatterTitle;
  const base = path.basename(rawPath, path.extname(rawPath));
  return base.replace(/[-_]+/g, ' ');
};

const getPostSlug = (relativePath: string, frontmatterSlug?: string) => {
  if (frontmatterSlug) return frontmatterSlug;
  const withoutExtension = relativePath.replace(path.extname(relativePath), '');
  return slugify(withoutExtension, { lower: true, strict: true });
};

const createSummaryMap = () => {
  const compiled = compilePhilosophers();
  return new Map(
    compiled.map((philosopher) => [
      philosopher.slug,
      {
        philosopher,
        totalMentions: 0,
        posts: [] as MentionedPost[],
      },
    ])
  );
};

const collectMentions = async (): Promise<PhilosopherSummary[]> => {
  const files = await globby(['**/*.md'], {
    cwd: POSTS_DIR,
    absolute: true,
    dot: false,
  });

  const mentionMap = createSummaryMap();

  for (const filePath of files) {
    const raw = await fs.readFile(filePath, 'utf8');
    const { data, content } = matter(raw);

    if (data?.draft) continue;

    const relativePath = path.relative(POSTS_DIR, filePath);
    const searchableText = [
      data?.title ?? '',
      data?.summary ?? '',
      data?.description ?? '',
      content ?? '',
    ].join(' ');

    mentionMap.forEach((summary) => {
      const { philosopher } = summary;
      if (!philosopher.regex) return;

      const mentionCount = countMatches(searchableText, philosopher.regex);
      if (mentionCount === 0) return;

      summary.totalMentions += mentionCount;
      summary.posts.push({
        title: getReadableTitle(relativePath, data?.title),
        id: relativePath,
        slug: getPostSlug(relativePath, data?.slug),
        date: data?.date ? new Date(data.date).toISOString().split('T')[0] : null,
        count: mentionCount,
      });
    });
  }

  const summaries = Array.from(mentionMap.values()).filter(
    (summary) => summary.totalMentions > 0
  );

  summaries.forEach((summary) => {
    summary.posts.sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });
  });

  summaries.sort((a, b) => b.totalMentions - a.totalMentions);

  return limit ? summaries.slice(0, limit) : summaries;
};

const printAsText = (summaries: PhilosopherSummary[]) => {
  if (summaries.length === 0) {
    console.log('No philosopher mentions found across published posts.');
    return;
  }

  console.log(`Found ${summaries.length} philosophers with mentions:\n`);
  summaries.forEach((summary) => {
    console.log(`${summary.philosopher.name} — ${summary.totalMentions} mention(s)`);
    summary.posts.forEach((post) => {
      const dateFragment = post.date ? ` · ${post.date}` : '';
      console.log(
        `  • ${post.title}${dateFragment} (${post.count}) [${post.id.replace(/\\/g, '/')}]`
      );
    });
    console.log('');
  });
};

const run = async () => {
  await ensurePostsDirExists();
  const summaries = await collectMentions();

  if (asJson) {
    console.log(
      JSON.stringify(
        summaries.map((summary) => ({
          philosopher: (({ regex, ...rest }) => rest)(summary.philosopher),
          totalMentions: summary.totalMentions,
          posts: summary.posts,
        })),
        null,
        2
      )
    );
  } else {
    printAsText(summaries);
  }
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
