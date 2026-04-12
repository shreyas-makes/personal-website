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

console.log('Running Obsidian sync...');
run('npm', ['run', '-s', 'sync:obsidian']);
run('git', ['add', '-A', 'src/content/posts', 'src/content/posts/Attachments', 'public/images']);
