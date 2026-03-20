import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import {
  buildProjectUpdates,
  cleanCommitMessage,
  createBiweeklyWindows,
  formatDate,
  toTitleFromSlug
} from './lib/project-changelog-core.mjs';

const username = process.env.GITHUB_CHANGELOG_USER || 'shreyas-makes';
const periodDays = Number(process.env.GITHUB_CHANGELOG_WINDOW_DAYS || 14);
const historyMonths = Number(process.env.GITHUB_CHANGELOG_HISTORY_MONTHS || 3);
const minimumStars = Number(process.env.GITHUB_CHANGELOG_MIN_STARS || 1);
const outputPath = path.resolve('src/data/project-changelog.json');
const generatedAt = new Date();
const cutoffDate = new Date(generatedAt);
cutoffDate.setMonth(cutoffDate.getMonth() - historyMonths);
const windows = createBiweeklyWindows(generatedAt, historyMonths, periodDays);

function resolveGitHubToken() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN.trim();

  try {
    return execFileSync('gh', ['auth', 'token'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim();
  } catch {
    throw new Error(
      'No authenticated GitHub token available. Set GITHUB_TOKEN or login with `gh auth login`.'
    );
  }
}

const repoHeaders = {
  'User-Agent': 'astro-blog-ghost-changelog',
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${resolveGitHubToken()}`
};

async function fetchGitHub(url) {
  const response = await fetch(url, { headers: repoHeaders });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`GitHub request failed (${response.status}) for ${url}\n${body}`);
  }
  return response.json();
}

async function fetchRepos() {
  const repos = await fetchGitHub(`https://api.github.com/user/repos?per_page=100&sort=pushed&affiliation=owner`);
  return repos
    .filter((repo) => repo.owner?.login === username)
    .filter((repo) => !repo.private && !repo.fork && !repo.archived && repo.stargazers_count >= minimumStars)
    .sort((left, right) => new Date(right.pushed_at).getTime() - new Date(left.pushed_at).getTime());
}

async function fetchCommits(repo) {
  const commits = await fetchGitHub(
    `https://api.github.com/repos/${repo.full_name}/commits?since=${encodeURIComponent(cutoffDate.toISOString())}&per_page=10`
  );

  return commits.filter((commit) => {
    const authorDate = commit?.commit?.author?.date;
    return authorDate && new Date(authorDate).getTime() >= cutoffDate.getTime();
  });
}

async function generate() {
  const repos = await fetchRepos();
  const projects = [];

  for (const repo of repos) {
    const commits = await fetchCommits(repo);
    if (commits.length === 0) continue;

    const updates = buildProjectUpdates(repo, commits, windows);
    if (updates.length === 0) continue;

    projects.push({
      name: toTitleFromSlug(repo.name),
      repository: repo.name,
      fullName: repo.full_name,
      url: repo.html_url,
      homepage: repo.homepage || null,
      description: repo.description || '',
      language: repo.language || 'Unknown',
      stars: repo.stargazers_count,
      commitCount: commits.length,
      pushedAt: repo.pushed_at,
      latestCommitAt: updates[0]?.latestCommitAt || commits[0]?.commit?.author?.date || repo.pushed_at,
      updateCount: updates.length,
      updates,
      commitMessages: commits.map((commit) => cleanCommitMessage(commit.commit.message))
    });
  }

  const payload = {
    generatedAt: generatedAt.toISOString(),
    username,
    windowDays: periodDays,
    historyMonths,
    cutoffDate: cutoffDate.toISOString(),
    coverageLabel: `${formatDate(cutoffDate.toISOString())} - ${formatDate(generatedAt.toISOString())}`,
    periods: windows.map((window) => ({
      periodStart: window.periodStart,
      periodEnd: window.periodEnd,
      periodLabel: `${formatDate(window.periodStart)} - ${formatDate(window.periodEnd)}`
    })),
    projectCount: projects.length,
    projects
  };

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`Updated ${path.relative(process.cwd(), outputPath)} with ${projects.length} active project entries.`);
}

generate().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
