import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const scriptPath = fileURLToPath(import.meta.url);
const scriptDir = path.dirname(scriptPath);
const syncScript = path.join(scriptDir, 'sync-obsidian-essays.mjs');

const args = process.argv.slice(2);
const getArg = (flag, fallback) => {
  const idx = args.indexOf(flag);
  return idx === -1 ? fallback : args[idx + 1];
};

const runOnce = args.includes('--once');

const defaultSourceDir =
  process.env.OBSIDIAN_ESSAYS_DIR ??
  '/Users/shreyas/Desktop/Shreyas Files/Essays';
const defaultBookNotesDir =
  process.env.OBSIDIAN_BOOK_NOTES_DIR ??
  '/Users/shreyas/Desktop/Shreyas Files/Books/Book notes';
const defaultAttachmentsDir =
  process.env.OBSIDIAN_ATTACHMENTS_DIR ??
  '/Users/shreyas/Desktop/Shreyas Files/Attachments';

const sourceDir = getArg(
  '--source',
  defaultSourceDir
);
const attachmentsDir = getArg(
  '--attachments',
  defaultAttachmentsDir
);
const bookNotesDir = getArg(
  '--book-notes',
  defaultBookNotesDir
);

let debounceTimer = null;
let running = false;
let rerun = false;

const runSync = () => {
  if (running) {
    rerun = true;
    return;
  }
  running = true;
  const child = spawn('node', [syncScript, ...args], { stdio: 'inherit' });
  child.on('close', () => {
    running = false;
    if (rerun) {
      rerun = false;
      scheduleSync();
    }
  });
};

const scheduleSync = () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  debounceTimer = setTimeout(runSync, 300);
};

const watchDir = (dir) => {
  try {
    return fs.watch(dir, { recursive: true }, scheduleSync);
  } catch (error) {
    return fs.watch(dir, scheduleSync);
  }
};

if (runOnce) {
  runSync();
} else {
  console.log('Watching for Obsidian changes...');
  console.log(`Essays: ${sourceDir}`);
  console.log(`Book notes: ${bookNotesDir}`);
  console.log(`Attachments: ${attachmentsDir}`);

  if (fs.existsSync(sourceDir)) {
    watchDir(sourceDir);
  } else {
    console.log(`Skipping essays watch: directory not found at ${sourceDir}`);
  }

  if (fs.existsSync(attachmentsDir)) {
    watchDir(attachmentsDir);
  } else {
    console.log(`Skipping attachments watch: directory not found at ${attachmentsDir}`);
  }

  if (fs.existsSync(bookNotesDir)) {
    watchDir(bookNotesDir);
  } else {
    console.log(`Skipping book notes watch: directory not found at ${bookNotesDir}`);
  }

  runSync();
}
