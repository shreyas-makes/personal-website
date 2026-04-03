import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
const destPostsDir = getArg(
  '--dest',
  path.join(repoRoot, 'src/content/posts')
);
const destAttachmentsDir = path.join(destPostsDir, 'Attachments');

const encodeFilename = (name) => encodeURIComponent(name).replace(/%2F/g, '/');

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

const replaceEmbeds = (content, attachments) => {
  return content.replace(/!\[\[([^\]]+)\]\]/g, (match, raw) => {
    const { target, alt } = parseEmbed(raw);
    const filename = path.basename(target);
    if (!filename) {
      return match;
    }
    attachments.add(filename);
    const encoded = encodeFilename(filename);
    if (alt) {
      return `![${alt}](Attachments/${encoded})`;
    }
    return `![](Attachments/${encoded})`;
  });
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

const sync = async () => {
  const sourceStat = await fs.stat(sourceDir).catch(() => null);
  if (!sourceStat?.isDirectory()) {
    throw new Error(`Source directory not found at ${sourceDir}`);
  }

  await ensureDir(destPostsDir);
  await ensureDir(destAttachmentsDir);

  const files = await readDirFiles(sourceDir);
  let postsUpdated = 0;
  let postsSkipped = 0;
  let attachmentsCopied = 0;
  let attachmentsSkipped = 0;
  const missingAttachments = new Set();

  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(destPostsDir, file);
    const raw = await fs.readFile(sourcePath, 'utf8');
    const attachments = new Set();
    const updated = replaceEmbeds(raw, attachments);

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

    for (const attachment of attachments) {
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
  }

  const summary = [
    `Posts updated: ${postsUpdated}`,
    `Posts unchanged: ${postsSkipped}`,
    `Attachments copied: ${attachmentsCopied}`,
    `Attachments skipped: ${attachmentsSkipped}`,
  ];

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
