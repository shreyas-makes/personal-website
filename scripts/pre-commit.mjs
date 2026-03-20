import { spawnSync } from 'node:child_process';

function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: false
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

if (process.env.SKIP_OPEN_SOURCE_CHANGELOG === '1') {
  console.log('Skipping project changelog refresh because SKIP_OPEN_SOURCE_CHANGELOG=1.');
}

console.log('Running Obsidian sync...');
run('npm', ['run', '-s', 'sync:obsidian']);

if (process.env.SKIP_OPEN_SOURCE_CHANGELOG !== '1') {
  console.log('Refreshing project changelog...');
  run('npm', ['run', '-s', 'changelog:update']);
}

run('git', ['add', '-A', 'src/content/posts', 'src/content/posts/Attachments', 'src/data/project-changelog.json']);
