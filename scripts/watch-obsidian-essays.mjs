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

const sourceDir = getArg(
  '--source',
  '/Users/shreyas/Desktop/Projects/Shreyas Personal/Essays'
);
const attachmentsDir = getArg(
  '--attachments',
  '/Users/shreyas/Desktop/Projects/Shreyas Personal/Attachments'
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
  console.log(`Attachments: ${attachmentsDir}`);

  watchDir(sourceDir);
  watchDir(attachmentsDir);

  runSync();
}
