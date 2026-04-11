import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const scriptPath = fileURLToPath(import.meta.url);
const scriptDir = path.dirname(scriptPath);
const repoRoot = path.resolve(scriptDir, '..');

const args = process.argv.slice(2);
const getArg = (flag, fallback) => {
  const idx = args.indexOf(flag);
  return idx === -1 ? fallback : args[idx + 1];
};

const dryRun = args.includes('--dry-run');

const defaultSourceDir =
  process.env.OBSIDIAN_ESSAYS_DIR ??
  '/Users/shreyas/Desktop/Shreyas Files/Essays';
const defaultBookNotesDir =
  process.env.OBSIDIAN_BOOK_NOTES_DIR ??
  '/Users/shreyas/Desktop/Shreyas Files/Books/Book notes';
const defaultVaultDir =
  process.env.OBSIDIAN_VAULT_DIR ??
  path.dirname(defaultSourceDir);
const defaultAttachmentsDir =
  process.env.OBSIDIAN_ATTACHMENTS_DIR ??
  '/Users/shreyas/Desktop/Shreyas Files/Attachments';

const sourceDir = getArg(
  '--source',
  defaultSourceDir
);
const sourceAttachmentsDir = getArg(
  '--attachments',
  defaultAttachmentsDir
);
const sourceVaultDir = getArg(
  '--vault',
  defaultVaultDir
);
const sourceBookNotesDir = getArg(
  '--book-notes',
  defaultBookNotesDir
);
const destPostsDir = getArg(
  '--dest',
  path.join(repoRoot, 'src/content/posts')
);
const destAttachmentsDir = path.join(destPostsDir, 'Attachments');
const destBookNotesDir = path.join(destPostsDir, 'booknotes');
const destBookCoversDir = path.join(repoRoot, 'public/images/books');

const encodeFilename = (name) => encodeURIComponent(name).replace(/%2F/g, '/');
const attachmentExtensions = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.svg',
  '.avif',
  '.pdf',
  '.mp3',
  '.mp4',
  '.mov',
  '.wav',
  '.m4a',
]);

const parseEmbed = (raw) => {
  let target = raw;
  let alt = '';
  if (raw.includes('|')) {
    const parts = raw.split('|');
    target = parts.shift() ?? '';
    alt = parts.join('|');
  }
  if (target.includes('#')) {
    target = target.split('#')[0];
  }
  return { target: target.trim(), alt: alt.trim() };
};

const parseReference = (raw) => {
  const { target, alt } = parseEmbed(raw);
  const [filePart, subpathPart = ''] = target.split('#', 2);
  const subpath = subpathPart.trim();

  return {
    raw,
    alt,
    target,
    file: filePart.trim(),
    subpath,
    subpathType: subpath.startsWith('^') ? 'block' : (subpath ? 'heading' : null),
  };
};

const parseWikiTarget = (raw) => parseEmbed(raw).target;

const normalizeLookupKey = (value) => value.replace(/\\/g, '/').toLowerCase();
const slugify = (value) => value
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^\w-]+/g, '')
  .replace(/--+/g, '-');

const headingMatches = (line, heading) => {
  const match = line.match(/^(#{1,6})\s+(.*)$/);
  if (!match) {
    return false;
  }

  return match[2].trim().toLowerCase() === heading.trim().toLowerCase();
};

const extractHeadingSection = (content, heading) => {
  const lines = content.split(/\r?\n/);
  let startIndex = -1;
  let headingLevel = 0;

  for (const [index, line] of lines.entries()) {
    const match = line.match(/^(#{1,6})\s+(.*)$/);
    if (!match) {
      continue;
    }

    if (match[2].trim().toLowerCase() === heading.trim().toLowerCase()) {
      startIndex = index;
      headingLevel = match[1].length;
      break;
    }
  }

  if (startIndex === -1) {
    return null;
  }

  let endIndex = lines.length;
  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const match = lines[index].match(/^(#{1,6})\s+(.*)$/);
    if (match && match[1].length <= headingLevel) {
      endIndex = index;
      break;
    }
  }

  return lines.slice(startIndex, endIndex).join('\n').trim();
};

const extractBlockSection = (content, blockId) => {
  const lines = content.split(/\r?\n/);
  const needle = `^${blockId}`;
  const blockIndex = lines.findIndex((line) => line.includes(needle));

  if (blockIndex === -1) {
    return null;
  }

  let startIndex = blockIndex;
  while (startIndex > 0 && lines[startIndex - 1].trim() !== '') {
    startIndex -= 1;
  }

  let endIndex = blockIndex + 1;
  while (endIndex < lines.length && lines[endIndex].trim() !== '') {
    endIndex += 1;
  }

  return lines
    .slice(startIndex, endIndex)
    .join('\n')
    .replace(new RegExp(`\\s*\\^${blockId}\\s*$`, 'm'), '')
    .trim();
};

const extractEmbeddedContent = (content, reference) => {
  if (!reference.subpath) {
    return content.trim();
  }

  if (reference.subpathType === 'block') {
    return extractBlockSection(content, reference.subpath.slice(1));
  }

  return extractHeadingSection(content, reference.subpath);
};

const normalizeCover = (cover) => {
  if (typeof cover !== 'string') {
    return undefined;
  }

  const trimmed = cover.trim();
  if (!trimmed) {
    return undefined;
  }

  if (trimmed.startsWith('[[') && trimmed.endsWith(']]')) {
    return path.basename(parseWikiTarget(trimmed.slice(2, -2)));
  }

  return path.basename(trimmed);
};

const normalizeFrontmatter = (data) => {
  const normalized = { ...data };

  if (Array.isArray(normalized.author)) {
    normalized.author = normalized.author.join(', ');
  }

  if (normalized.cover !== undefined) {
    normalized.cover = normalizeCover(normalized.cover);
  }

  return normalized;
};

const getNoteMetadata = async (notePath, cache) => {
  const cacheKey = normalizeLookupKey(notePath);
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const raw = await fs.readFile(notePath, 'utf8');
  const parsed = matter(raw);
  const metadata = {
    data: normalizeFrontmatter(parsed.data),
    content: parsed.content,
  };

  cache.set(cacheKey, metadata);
  return metadata;
};

const getPublishedUrl = async (notePath, context) => {
  const normalizedPath = normalizeLookupKey(notePath);
  const essaysRoot = normalizeLookupKey(sourceDir);
  const bookNotesRoot = normalizeLookupKey(sourceBookNotesDir);
  const { data } = await getNoteMetadata(notePath, context.noteCache);
  const fallbackTitle = path.basename(notePath, '.md');
  const slug = (data.slug || slugify(data.title || fallbackTitle)).replace(/\//g, '-');

  if (normalizedPath === essaysRoot || normalizedPath.startsWith(`${essaysRoot}/`)) {
    return `/${slug}`;
  }

  if (normalizedPath === bookNotesRoot || normalizedPath.startsWith(`${bookNotesRoot}/`)) {
    return `/books/${slug}`;
  }

  return null;
};

const replaceWikiLinks = async (content, context) => {
  const pattern = /(?<!!)\[\[([^\]]+)\]\]/g;
  let result = '';
  let lastIndex = 0;

  for (const match of content.matchAll(pattern)) {
    const [fullMatch, raw] = match;
    result += content.slice(lastIndex, match.index);
    const reference = parseReference(raw);
    const linkText = reference.alt || reference.file || reference.target;
    const notePath = resolveNotePath(reference, context.vaultIndex);

    if (!notePath) {
      result += linkText;
      lastIndex = match.index + fullMatch.length;
      continue;
    }

    const url = await getPublishedUrl(notePath, context);
    if (!url) {
      result += linkText;
      lastIndex = match.index + fullMatch.length;
      continue;
    }

    if (reference.subpath && reference.subpathType === 'heading') {
      result += `[${linkText}](${url}#${slugify(reference.subpath)})`;
    } else {
      result += `[${linkText}](${url})`;
    }

    lastIndex = match.index + fullMatch.length;
  }

  result += content.slice(lastIndex);
  return result;
};

const ensureDir = async (dir) => {
  if (dryRun) {
    return;
  }
  await fs.mkdir(dir, { recursive: true });
};

const readDirFiles = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => entry.name);
};

const walkMarkdownFiles = async (dir, baseDir = dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walkMarkdownFiles(fullPath, baseDir));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(path.relative(baseDir, fullPath));
    }
  }

  return files;
};

const buildVaultIndex = async (vaultDir) => {
  const markdownFiles = await walkMarkdownFiles(vaultDir);
  const byRelative = new Map();
  const byStem = new Map();
  const byName = new Map();

  for (const relativePath of markdownFiles) {
    const normalizedRelative = relativePath.replace(/\\/g, '/');
    const relativeStem = normalizedRelative.replace(/\.md$/i, '');
    const baseName = path.basename(relativeStem);
    const fullPath = path.join(vaultDir, relativePath);

    byRelative.set(normalizeLookupKey(normalizedRelative), fullPath);
    byStem.set(normalizeLookupKey(relativeStem), fullPath);

    const nameKey = normalizeLookupKey(baseName);
    if (!byName.has(nameKey)) {
      byName.set(nameKey, []);
    }
    byName.get(nameKey).push(fullPath);
  }

  return { byRelative, byStem, byName };
};

const resolveNotePath = (reference, vaultIndex) => {
  const normalizedFile = reference.file.replace(/\\/g, '/').trim();
  if (!normalizedFile) {
    return null;
  }

  const candidates = [];
  if (normalizedFile.endsWith('.md')) {
    candidates.push(normalizeLookupKey(normalizedFile));
  } else {
    candidates.push(normalizeLookupKey(`${normalizedFile}.md`));
  }

  for (const candidate of candidates) {
    if (vaultIndex.byRelative.has(candidate)) {
      return vaultIndex.byRelative.get(candidate);
    }
  }

  const stemKey = normalizeLookupKey(normalizedFile.replace(/\.md$/i, ''));
  if (vaultIndex.byStem.has(stemKey)) {
    return vaultIndex.byStem.get(stemKey);
  }

  const nameKey = normalizeLookupKey(path.basename(stemKey));
  const matches = vaultIndex.byName.get(nameKey);
  if (matches?.length) {
    return matches[0];
  }

  return null;
};

const isAttachmentReference = async (reference) => {
  const filename = path.basename(reference.file);
  const extension = path.extname(filename).toLowerCase();
  if (!filename || !attachmentExtensions.has(extension)) {
    return false;
  }

  const attachmentPath = path.join(sourceAttachmentsDir, filename);
  const stats = await fs.stat(attachmentPath).catch(() => null);
  return stats?.isFile() ?? false;
};

const renderAttachment = (reference, attachments) => {
  const filename = path.basename(reference.file);
  attachments.add(filename);
  const encoded = encodeFilename(filename);

  if (reference.alt) {
    return `![${reference.alt}](Attachments/${encoded})`;
  }

  return `![](Attachments/${encoded})`;
};

const flattenEmbeddedNote = async (reference, context) => {
  const notePath = resolveNotePath(reference, context.vaultIndex);
  if (!notePath) {
    return null;
  }

  const visitedKey = normalizeLookupKey(notePath);
  if (context.embedStack.has(visitedKey)) {
    return '';
  }

  context.embedStack.add(visitedKey);
  try {
    const raw = await fs.readFile(notePath, 'utf8');
    const parsed = matter(raw);
    const selectedContent = extractEmbeddedContent(parsed.content, reference);
    if (!selectedContent) {
      return '';
    }

    const withEmbeds = await replaceEmbeds(selectedContent, context);
    return (await replaceWikiLinks(withEmbeds, context)).trim();
  } finally {
    context.embedStack.delete(visitedKey);
  }
};

const replaceEmbeds = async (content, context) => {
  const pattern = /!\[\[([^\]]+)\]\]/g;
  let result = '';
  let lastIndex = 0;

  for (const match of content.matchAll(pattern)) {
    const [fullMatch, raw] = match;
    result += content.slice(lastIndex, match.index);
    const reference = parseReference(raw);

    if (await isAttachmentReference(reference)) {
      result += renderAttachment(reference, context.attachments);
    } else {
      const flattened = await flattenEmbeddedNote(reference, context);
      result += flattened ?? fullMatch;
    }

    lastIndex = match.index + fullMatch.length;
  }

  result += content.slice(lastIndex);
  return result;
};

const copyIfNewer = async (src, dest) => {
  const srcStat = await fs.stat(src);
  const destStat = await fs.stat(dest).catch(() => null);
  if (!destStat || srcStat.mtimeMs > destStat.mtimeMs + 1) {
    if (dryRun) {
      return 'copied';
    }
    await fs.copyFile(src, dest);
    return 'copied';
  }
  return 'skipped';
};

const syncDirectory = async ({
  sourceDir,
  destDir,
  required = false,
  syncBookCovers = false,
  vaultIndex,
}) => {
  const sourceStat = await fs.stat(sourceDir).catch(() => null);
  if (!sourceStat?.isDirectory()) {
    if (required) {
      throw new Error(`Source directory not found at ${sourceDir}`);
    }

    return {
      skipped: true,
      postsUpdated: 0,
      postsSkipped: 0,
      attachmentsCopied: 0,
      attachmentsSkipped: 0,
      coversCopied: 0,
      coversSkipped: 0,
      missingAttachments: new Set(),
    };
  }

  await ensureDir(destDir);
  await ensureDir(destAttachmentsDir);

  if (syncBookCovers) {
    await ensureDir(destBookCoversDir);
  }

  const files = await readDirFiles(sourceDir);
  let postsUpdated = 0;
  let postsSkipped = 0;
  let attachmentsCopied = 0;
  let attachmentsSkipped = 0;
  let coversCopied = 0;
  let coversSkipped = 0;
  const missingAttachments = new Set();

  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destDir, file);
    const raw = await fs.readFile(sourcePath, 'utf8');
    const parsed = matter(raw);
    const normalizedData = normalizeFrontmatter(parsed.data);
    const context = {
      attachments: new Set(),
      embedStack: new Set([normalizeLookupKey(sourcePath)]),
      noteCache: new Map(),
      vaultIndex,
    };
    const withEmbeds = await replaceEmbeds(parsed.content, context);
    const updatedContent = await replaceWikiLinks(withEmbeds, context);
    const updated = matter.stringify(updatedContent, normalizedData);

    let shouldWrite = true;
    const existing = await fs.readFile(destPath, 'utf8').catch(() => null);
    if (existing !== null && existing === updated) {
      shouldWrite = false;
    }

    if (shouldWrite) {
      if (!dryRun) {
        await fs.writeFile(destPath, updated);
      }
      postsUpdated += 1;
    } else {
      postsSkipped += 1;
    }

    for (const attachment of context.attachments) {
      const srcAttachmentPath = path.join(sourceAttachmentsDir, attachment);
      const destAttachmentPath = path.join(destAttachmentsDir, attachment);
      try {
        const result = await copyIfNewer(srcAttachmentPath, destAttachmentPath);
        if (result === 'copied') {
          attachmentsCopied += 1;
        } else {
          attachmentsSkipped += 1;
        }
      } catch (error) {
        missingAttachments.add(attachment);
      }
    }

    if (syncBookCovers && normalizedData.cover) {
      const srcCoverPath = path.join(sourceAttachmentsDir, normalizedData.cover);
      const destCoverPath = path.join(destBookCoversDir, normalizedData.cover);

      try {
        const result = await copyIfNewer(srcCoverPath, destCoverPath);
        if (result === 'copied') {
          coversCopied += 1;
        } else {
          coversSkipped += 1;
        }
      } catch (error) {
        missingAttachments.add(normalizedData.cover);
      }
    }
  }

  return {
    skipped: false,
    postsUpdated,
    postsSkipped,
    attachmentsCopied,
    attachmentsSkipped,
    coversCopied,
    coversSkipped,
    missingAttachments,
  };
};

const sync = async () => {
  const vaultIndex = await buildVaultIndex(sourceVaultDir);
  const essayResults = await syncDirectory({
    sourceDir,
    destDir: destPostsDir,
    required: true,
    vaultIndex,
  });
  const bookResults = await syncDirectory({
    sourceDir: sourceBookNotesDir,
    destDir: destBookNotesDir,
    syncBookCovers: true,
    vaultIndex,
  });

  const missingAttachments = new Set([
    ...essayResults.missingAttachments,
    ...bookResults.missingAttachments,
  ]);

  const summary = [
    `Posts updated: ${essayResults.postsUpdated}`,
    `Posts unchanged: ${essayResults.postsSkipped}`,
    `Book notes updated: ${bookResults.postsUpdated}`,
    `Book notes unchanged: ${bookResults.postsSkipped}`,
    `Attachments copied: ${essayResults.attachmentsCopied + bookResults.attachmentsCopied}`,
    `Attachments skipped: ${essayResults.attachmentsSkipped + bookResults.attachmentsSkipped}`,
    `Book covers copied: ${bookResults.coversCopied}`,
    `Book covers skipped: ${bookResults.coversSkipped}`,
  ];

  if (bookResults.skipped) {
    summary.push(`Book notes skipped: source directory not found at ${sourceBookNotesDir}`);
  }

  if (missingAttachments.size > 0) {
    summary.push(
      `Missing attachments: ${Array.from(missingAttachments).join(', ')}`
    );
  }

  console.log(summary.join('\n'));
};

sync().catch((error) => {
  console.error('Sync failed:', error.message);
  process.exit(1);
});
