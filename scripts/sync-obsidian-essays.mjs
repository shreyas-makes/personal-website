import crypto from 'node:crypto';
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
const defaultStateFile = path.join(repoRoot, '.sync', 'obsidian-sync-state.json');

const sourceDir = getArg('--source', defaultSourceDir);
const sourceAttachmentsDir = getArg('--attachments', defaultAttachmentsDir);
const sourceVaultDir = getArg('--vault', defaultVaultDir);
const sourceBookNotesDir = getArg('--book-notes', defaultBookNotesDir);
const destPostsDir = getArg('--dest', path.join(repoRoot, 'src/content/posts'));
const stateFile = getArg('--state', defaultStateFile);
const destAttachmentsDir = path.join(destPostsDir, 'Attachments');
const destBookNotesDir = path.join(destPostsDir, 'booknotes');
const destPublicDir = path.join(repoRoot, 'public');
const destBookCoversDir = path.join(repoRoot, 'public/images/books');

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

const encodeFilename = (name) => encodeURIComponent(name).replace(/%2F/g, '/');
const decodeFilename = (name) => {
  try {
    return decodeURIComponent(name);
  } catch {
    return name;
  }
};

const hashContent = (value) => crypto.createHash('sha1').update(value).digest('hex');
const hashBuffer = (value) => crypto.createHash('sha1').update(value).digest('hex');
const normalizeLookupKey = (value) => value.replace(/\\/g, '/').toLowerCase();
const slugify = (value) => value
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^\w-]+/g, '')
  .replace(/--+/g, '-');

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

const cleanFrontmatterForVault = (data) => {
  const cleaned = {};

  for (const [key, value] of Object.entries(normalizeFrontmatter(data))) {
    if (value === null || value === undefined || value === '') {
      continue;
    }

    if (value instanceof Date) {
      cleaned[key] = value.toISOString().slice(0, 10);
      continue;
    }

    cleaned[key] = value;
  }

  return cleaned;
};

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

    if (headingMatches(line, heading)) {
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

const ensureDir = async (dir) => {
  if (dryRun) {
    return;
  }

  await fs.mkdir(dir, { recursive: true });
};

const pathExists = async (targetPath) => {
  const stats = await fs.stat(targetPath).catch(() => null);
  return Boolean(stats);
};

const readTextFile = async (filePath) => fs.readFile(filePath, 'utf8').catch(() => null);
const readBinaryFile = async (filePath) => fs.readFile(filePath).catch(() => null);

const listMarkdownFiles = async (dir) => {
  const exists = await pathExists(dir);
  if (!exists) {
    return [];
  }

  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => entry.name)
    .sort();
};

const listAssetFiles = async (dir) => {
  const exists = await pathExists(dir);
  if (!exists) {
    return [];
  }

  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter(
      (entry) => entry.isFile()
        && !entry.name.startsWith('.')
        && attachmentExtensions.has(path.extname(entry.name).toLowerCase())
    )
    .map((entry) => entry.name)
    .sort();
};

const walkMarkdownFiles = async (dir, baseDir = dir) => {
  const exists = await pathExists(dir);
  if (!exists) {
    return [];
  }

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
  const relativePath = reference.file
    .replace(/\\/g, '/')
    .replace(/^\.\//, '')
    .replace(/^Attachments\//, '')
    .trim();

  attachments.add(relativePath);
  const encoded = encodeFilename(relativePath);

  if (relativePath.startsWith('images/')) {
    if (reference.alt) {
      return `![${reference.alt}](/${encoded})`;
    }

    return `![](/${encoded})`;
  }

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

const renderObsidianNoteForRepo = async (notePath, vaultIndex) => {
  const raw = await fs.readFile(notePath, 'utf8');
  const parsed = matter(raw);
  const normalizedData = normalizeFrontmatter(parsed.data);
  const context = {
    attachments: new Set(),
    embedStack: new Set([normalizeLookupKey(notePath)]),
    noteCache: new Map(),
    vaultIndex,
  };
  const withEmbeds = await replaceEmbeds(parsed.content, context);
  const updatedContent = await replaceWikiLinks(withEmbeds, context);

  return {
    rendered: matter.stringify(updatedContent, normalizedData),
    attachments: context.attachments,
    cover: normalizedData.cover,
  };
};

const collectRepoAttachmentRefs = (content) => {
  const attachments = new Set();
  const pattern = /!?\[[^\]]*\]\((?:\.\/)?Attachments\/([^)#?]+)(?:#[^)]+)?(?:\?[^)]*)?\)/g;

  for (const match of content.matchAll(pattern)) {
    attachments.add(decodeFilename(match[1]));
  }

  return attachments;
};

const collectRepoPublishedImageRefs = (content) => {
  const attachments = new Set();
  const pattern = /!?\[[^\]]*\]\((\/images\/[^)#?]+)(?:#[^)]+)?(?:\?[^)]*)?\)/g;

  for (const match of content.matchAll(pattern)) {
    attachments.add(decodeFilename(match[1].replace(/^\//, '')));
  }

  return attachments;
};

const restoreAttachmentLinksForVault = (content) => {
  const imagePattern = /!\[([^\]]*)\]\((?:\.\/)?Attachments\/([^)#?]+)(?:#[^)]+)?(?:\?[^)]*)?\)/g;
  const linkPattern = /(?<!!)\[([^\]]+)\]\((?:\.\/)?Attachments\/([^)#?]+)(?:#[^)]+)?(?:\?[^)]*)?\)/g;

  const withEmbeds = content.replace(imagePattern, (_, alt, filename) => {
    const decoded = decodeFilename(filename);
    return alt ? `![[${decoded}|${alt}]]` : `![[${decoded}]]`;
  });

  return withEmbeds.replace(linkPattern, (_, text, filename) => {
    const decoded = decodeFilename(filename);
    return text ? `[[${decoded}|${text}]]` : `[[${decoded}]]`;
  });
};

const restorePublishedImageLinksForVault = (content) => {
  const imagePattern = /!\[([^\]]*)\]\((\/images\/[^)#?]+)(?:#[^)]+)?(?:\?[^)]*)?\)/g;
  const linkPattern = /(?<!!)\[([^\]]+)\]\((\/images\/[^)#?]+)(?:#[^)]+)?(?:\?[^)]*)?\)/g;

  const withEmbeds = content.replace(imagePattern, (_, alt, imagePath) => {
    const decoded = decodeFilename(imagePath.replace(/^\//, ''));
    return alt ? `![[Attachments/${decoded}|${alt}]]` : `![[Attachments/${decoded}]]`;
  });

  return withEmbeds.replace(linkPattern, (_, text, imagePath) => {
    const decoded = decodeFilename(imagePath.replace(/^\//, ''));
    return text ? `[[Attachments/${decoded}|${text}]]` : `[[Attachments/${decoded}]]`;
  });
};

const renderRepoNoteForVault = async (notePath) => {
  const raw = await fs.readFile(notePath, 'utf8');
  const parsed = matter(raw);
  const attachments = new Set([
    ...collectRepoAttachmentRefs(parsed.content),
    ...collectRepoPublishedImageRefs(parsed.content),
  ]);
  const restoredContent = restorePublishedImageLinksForVault(
    restoreAttachmentLinksForVault(parsed.content)
  );
  const cleanedData = cleanFrontmatterForVault(parsed.data);

  return {
    rendered: matter.stringify(restoredContent, cleanedData),
    attachments,
    cover: cleanedData.cover,
  };
};

const defaultState = () => ({
  version: 1,
  essays: {},
  bookNotes: {},
  attachments: {},
  bookCovers: {},
  publishedImages: {},
});

const loadState = async () => {
  const raw = await readTextFile(stateFile);
  if (!raw) {
    return defaultState();
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      ...defaultState(),
      ...parsed,
      essays: parsed.essays ?? {},
      bookNotes: parsed.bookNotes ?? {},
      attachments: parsed.attachments ?? {},
      bookCovers: parsed.bookCovers ?? {},
      publishedImages: parsed.publishedImages ?? {},
    };
  } catch {
    return defaultState();
  }
};

const saveState = async (state) => {
  if (dryRun) {
    return;
  }

  await ensureDir(path.dirname(stateFile));
  await fs.writeFile(stateFile, `${JSON.stringify(state, null, 2)}\n`);
};

const writeTextIfChanged = async (filePath, nextContent, existingContent) => {
  if (existingContent === nextContent) {
    return false;
  }

  if (!dryRun) {
    await fs.writeFile(filePath, nextContent);
  }

  return true;
};

const writeBufferIfChanged = async (filePath, nextBuffer, existingBuffer) => {
  if (existingBuffer && Buffer.compare(existingBuffer, nextBuffer) === 0) {
    return false;
  }

  if (!dryRun) {
    await fs.copyFile(nextBuffer.sourcePath, filePath);
  }

  return true;
};

const deleteIfExists = async (filePath) => {
  const exists = await pathExists(filePath);
  if (!exists) {
    return false;
  }

  if (!dryRun) {
    await fs.unlink(filePath);
  }

  return true;
};

const syncMarkdownCollection = async ({
  label,
  stateKey,
  obsidianDir,
  repoDir,
  vaultIndex,
  state,
}) => {
  const obsidianFiles = await listMarkdownFiles(obsidianDir);
  const repoFiles = await listMarkdownFiles(repoDir);
  const previous = state[stateKey] ?? {};
  const nextState = {};
  const names = new Set([...obsidianFiles, ...repoFiles, ...Object.keys(previous)]);
  const summary = {
    toRepo: 0,
    toVault: 0,
    deletedFromRepo: 0,
    deletedFromVault: 0,
    unchanged: 0,
    conflicts: 0,
  };

  for (const name of Array.from(names).sort()) {
    const obsidianPath = path.join(obsidianDir, name);
    const repoPath = path.join(repoDir, name);
    const obsidianRaw = await readTextFile(obsidianPath);
    const repoRaw = await readTextFile(repoPath);
    const obsidianExists = obsidianRaw !== null;
    const repoExists = repoRaw !== null;

    if (!obsidianExists && !repoExists) {
      continue;
    }

    const previousEntry = previous[name];
    const obsidianHash = obsidianExists ? hashContent(obsidianRaw) : null;
    const repoHash = repoExists ? hashContent(repoRaw) : null;
    let renderedForVault = null;

    let action = 'none';
    if (obsidianExists && repoExists) {
      if (!previousEntry) {
        action = 'to-repo';
      } else {
        const obsidianChanged = previousEntry.obsidianHash !== obsidianHash;
        const repoChanged = previousEntry.repoHash !== repoHash;

        if (obsidianChanged && repoChanged) {
          action = 'to-repo';
          summary.conflicts += 1;
        } else if (obsidianChanged) {
          action = 'to-repo';
        } else if (repoChanged) {
          action = 'to-vault';
        }
      }
    } else if (obsidianExists) {
      if (!previousEntry) {
        action = 'to-repo';
      } else if (previousEntry.obsidianHash === null) {
        action = 'to-repo';
      } else {
        action = 'delete-repo';
      }
    } else if (repoExists) {
      if (!previousEntry) {
        action = 'to-vault';
      } else if (previousEntry.repoHash === null) {
        action = 'to-vault';
      } else {
        action = 'delete-vault';
      }
    }

    if (action === 'none' && obsidianExists && repoExists) {
      renderedForVault = await renderRepoNoteForVault(repoPath);
      if (renderedForVault.rendered !== obsidianRaw) {
        action = 'to-vault';
      }
    }

    if (action === 'to-repo') {
      await ensureDir(repoDir);
      const { rendered } = await renderObsidianNoteForRepo(obsidianPath, vaultIndex);
      const wrote = await writeTextIfChanged(repoPath, rendered, repoRaw);
      nextState[name] = {
        obsidianHash,
        repoHash: hashContent(rendered),
      };
      if (wrote) {
        summary.toRepo += 1;
      } else {
        summary.unchanged += 1;
      }
      continue;
    }

    if (action === 'to-vault') {
      await ensureDir(obsidianDir);
      const { rendered } = renderedForVault ?? await renderRepoNoteForVault(repoPath);
      const wrote = await writeTextIfChanged(obsidianPath, rendered, obsidianRaw);
      nextState[name] = {
        obsidianHash: hashContent(rendered),
        repoHash,
      };
      if (wrote) {
        summary.toVault += 1;
      } else {
        summary.unchanged += 1;
      }
      continue;
    }

    if (action === 'delete-repo') {
      const deleted = await deleteIfExists(repoPath);
      nextState[name] = {
        obsidianHash,
        repoHash: null,
      };
      if (deleted) {
        summary.deletedFromRepo += 1;
      } else {
        summary.unchanged += 1;
      }
      continue;
    }

    if (action === 'delete-vault') {
      const deleted = await deleteIfExists(obsidianPath);
      nextState[name] = {
        obsidianHash: null,
        repoHash,
      };
      if (deleted) {
        summary.deletedFromVault += 1;
      } else {
        summary.unchanged += 1;
      }
      continue;
    }

    nextState[name] = {
      obsidianHash,
      repoHash,
    };
    summary.unchanged += 1;
  }

  return { label, summary, nextState };
};

const syncAssetCollection = async ({
  label,
  stateKey,
  obsidianDir,
  repoDir,
  state,
  names,
}) => {
  const desiredNames = names ? new Set(names) : null;
  const previous = state[stateKey] ?? {};
  const obsidianFiles = names ?? await listAssetFiles(obsidianDir);
  const repoFiles = await listAssetFiles(repoDir);
  const nextState = {};
  const allNames = new Set([
    ...(names ?? []),
    ...obsidianFiles,
    ...repoFiles,
    ...Object.keys(previous),
  ]);
  const summary = {
    toRepo: 0,
    toVault: 0,
    deletedFromRepo: 0,
    deletedFromVault: 0,
    unchanged: 0,
    conflicts: 0,
  };

  for (const name of Array.from(allNames).sort()) {
    const shouldSync = !desiredNames || desiredNames.has(name);
    const obsidianPath = path.join(obsidianDir, name);
    const repoPath = path.join(repoDir, name);
    const repoRaw = await readBinaryFile(repoPath);
    if (!shouldSync) {
      if (repoRaw !== null) {
        const deleted = await deleteIfExists(repoPath);
        if (deleted) {
          summary.deletedFromRepo += 1;
        } else {
          summary.unchanged += 1;
        }
      }
      continue;
    }

    const obsidianRaw = await readBinaryFile(obsidianPath);
    const obsidianExists = obsidianRaw !== null;
    const repoExists = repoRaw !== null;

    if (!obsidianExists && !repoExists) {
      continue;
    }

    const previousEntry = previous[name];
    const obsidianHash = obsidianExists ? hashBuffer(obsidianRaw) : null;
    const repoHash = repoExists ? hashBuffer(repoRaw) : null;

    let action = 'none';
    if (obsidianExists && repoExists) {
      if (!previousEntry) {
        action = 'to-repo';
      } else {
        const obsidianChanged = previousEntry.obsidianHash !== obsidianHash;
        const repoChanged = previousEntry.repoHash !== repoHash;

        if (obsidianChanged && repoChanged) {
          action = 'to-repo';
          summary.conflicts += 1;
        } else if (obsidianChanged) {
          action = 'to-repo';
        } else if (repoChanged) {
          action = 'to-vault';
        }
      }
    } else if (obsidianExists) {
      if (!previousEntry) {
        action = 'to-repo';
      } else if (previousEntry.obsidianHash === null) {
        action = 'to-repo';
      } else {
        action = 'delete-repo';
      }
    } else if (repoExists) {
      if (!previousEntry) {
        action = 'to-vault';
      } else if (previousEntry.repoHash === null) {
        action = 'to-vault';
      } else {
        action = 'delete-vault';
      }
    }

    if (action === 'to-repo') {
      await ensureDir(path.dirname(repoPath));
      const nextBuffer = Object.assign(obsidianRaw, { sourcePath: obsidianPath });
      const wrote = await writeBufferIfChanged(repoPath, nextBuffer, repoRaw);
      nextState[name] = {
        obsidianHash,
        repoHash: obsidianHash,
      };
      if (wrote) {
        summary.toRepo += 1;
      } else {
        summary.unchanged += 1;
      }
      continue;
    }

    if (action === 'to-vault') {
      await ensureDir(path.dirname(obsidianPath));
      const nextBuffer = Object.assign(repoRaw, { sourcePath: repoPath });
      const wrote = await writeBufferIfChanged(obsidianPath, nextBuffer, obsidianRaw);
      nextState[name] = {
        obsidianHash: repoHash,
        repoHash,
      };
      if (wrote) {
        summary.toVault += 1;
      } else {
        summary.unchanged += 1;
      }
      continue;
    }

    if (action === 'delete-repo') {
      const deleted = await deleteIfExists(repoPath);
      nextState[name] = {
        obsidianHash,
        repoHash: null,
      };
      if (deleted) {
        summary.deletedFromRepo += 1;
      } else {
        summary.unchanged += 1;
      }
      continue;
    }

    if (action === 'delete-vault') {
      const deleted = await deleteIfExists(obsidianPath);
      nextState[name] = {
        obsidianHash: null,
        repoHash,
      };
      if (deleted) {
        summary.deletedFromVault += 1;
      } else {
        summary.unchanged += 1;
      }
      continue;
    }

    nextState[name] = {
      obsidianHash,
      repoHash,
    };
    summary.unchanged += 1;
  }

  return { label, summary, nextState };
};

const collectReferencedCovers = async (directories) => {
  const covers = new Set();

  for (const dir of directories) {
    for (const file of await listMarkdownFiles(dir)) {
      const raw = await readTextFile(path.join(dir, file));
      if (!raw) {
        continue;
      }

      const parsed = matter(raw);
      const normalizedData = normalizeFrontmatter(parsed.data);
      if (normalizedData.cover) {
        covers.add(normalizedData.cover);
      }
    }
  }

  return Array.from(covers).sort();
};

const collectReferencedPublishedImages = async (directories) => {
  const images = new Set();

  for (const dir of directories) {
    for (const file of await listMarkdownFiles(dir)) {
      const raw = await readTextFile(path.join(dir, file));
      if (!raw) {
        continue;
      }

      for (const image of collectRepoPublishedImageRefs(raw)) {
        images.add(image);
      }
    }
  }

  return Array.from(images).sort();
};

const collectReferencedAttachments = async (directories) => {
  const attachments = new Set();

  for (const dir of directories) {
    for (const file of await listMarkdownFiles(dir)) {
      const raw = await readTextFile(path.join(dir, file));
      if (!raw) {
        continue;
      }

      for (const attachment of collectRepoAttachmentRefs(raw)) {
        attachments.add(attachment);
      }
    }
  }

  return Array.from(attachments).sort();
};

const sync = async () => {
  const state = await loadState();
  const vaultIndex = await buildVaultIndex(sourceVaultDir);

  const essays = await syncMarkdownCollection({
    label: 'Essays',
    stateKey: 'essays',
    obsidianDir: sourceDir,
    repoDir: destPostsDir,
    vaultIndex,
    state,
  });

  const bookNotes = await syncMarkdownCollection({
    label: 'Book notes',
    stateKey: 'bookNotes',
    obsidianDir: sourceBookNotesDir,
    repoDir: destBookNotesDir,
    vaultIndex,
    state,
  });

  const attachmentNames = await collectReferencedAttachments([destPostsDir, destBookNotesDir]);
  const attachments = await syncAssetCollection({
    label: 'Attachments',
    stateKey: 'attachments',
    obsidianDir: sourceAttachmentsDir,
    repoDir: destAttachmentsDir,
    state,
    names: attachmentNames,
  });

  const coverNames = await collectReferencedCovers([sourceBookNotesDir, destBookNotesDir]);
  const bookCovers = await syncAssetCollection({
    label: 'Book covers',
    stateKey: 'bookCovers',
    obsidianDir: sourceAttachmentsDir,
    repoDir: destBookCoversDir,
    state,
    names: coverNames,
  });

  const publishedImageNames = await collectReferencedPublishedImages([destPostsDir, destBookNotesDir]);
  const publishedImages = await syncAssetCollection({
    label: 'Published images',
    stateKey: 'publishedImages',
    obsidianDir: sourceAttachmentsDir,
    repoDir: destPublicDir,
    state,
    names: publishedImageNames,
  });

  const nextState = {
    version: 1,
    essays: essays.nextState,
    bookNotes: bookNotes.nextState,
    attachments: attachments.nextState,
    bookCovers: bookCovers.nextState,
    publishedImages: publishedImages.nextState,
  };

  await saveState(nextState);

  const sections = [essays, bookNotes, attachments, bookCovers, publishedImages];
  const summary = [];

  for (const section of sections) {
    summary.push(`${section.label} -> repo: ${section.summary.toRepo}`);
    summary.push(`${section.label} -> vault: ${section.summary.toVault}`);
    summary.push(`${section.label} deleted from repo: ${section.summary.deletedFromRepo}`);
    summary.push(`${section.label} deleted from vault: ${section.summary.deletedFromVault}`);
    summary.push(`${section.label} unchanged: ${section.summary.unchanged}`);
    summary.push(`${section.label} conflicts resolved in favor of Obsidian: ${section.summary.conflicts}`);
  }

  if (dryRun) {
    summary.push('Dry run: no files were written');
  }

  console.log(summary.join('\n'));
};

sync().catch((error) => {
  console.error('Sync failed:', error.message);
  process.exit(1);
});
