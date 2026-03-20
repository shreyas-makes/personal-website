import fs from 'node:fs/promises';
import path from 'node:path';

const sourcePath = path.resolve('.githooks/pre-commit');
const targetPath = path.resolve('.git/hooks/pre-commit');

async function install() {
  try {
    await fs.access(path.resolve('.git'));
  } catch {
    console.log('Skipping hook install because .git is not available.');
    return;
  }

  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.copyFile(sourcePath, targetPath);
  await fs.chmod(targetPath, 0o755);
  console.log('Installed .githooks/pre-commit -> .git/hooks/pre-commit');
}

install().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
