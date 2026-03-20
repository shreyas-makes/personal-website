import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildFocusBullets,
  buildProjectUpdates,
  buildSummary,
  buildValueUnlocked,
  createBiweeklyWindows,
  parseCommitFeed,
  parseRepoHtml
} from './project-changelog-core.mjs';

test('parseRepoHtml extracts public repos with descriptions, stars, and timestamps', () => {
  const html = `
    <ul>
      <li class="col-12 d-flex flex-justify-between width-full tmp-py-4 border-bottom color-border-muted public source">
        <a href="/shreyas-makes/deslopify" itemprop="name codeRepository">deslopify</a>
        <p itemprop="description">Make the AI writing sound more humane</p>
        <span itemprop="programmingLanguage">Python</span>
        <a href="/shreyas-makes/deslopify/stargazers"><svg></svg>3</a>
        Updated <relative-time datetime="2026-03-15T09:29:58Z">Mar 15, 2026</relative-time>
      </li>
    </ul>
  `;

  const repos = parseRepoHtml(html, 'shreyas-makes');

  assert.equal(repos.length, 1);
  assert.deepEqual(repos[0], {
    name: 'deslopify',
    full_name: 'shreyas-makes/deslopify',
    html_url: 'https://github.com/shreyas-makes/deslopify',
    homepage: null,
    description: 'Make the AI writing sound more humane',
    language: 'Python',
    stargazers_count: 3,
    pushed_at: '2026-03-15T09:29:58Z',
    private: false,
    fork: false,
    archived: false,
    default_branch: null
  });
});

test('parseCommitFeed returns commit-like entries from a GitHub atom feed', () => {
  const xml = `
    <feed>
      <entry>
        <title>Release v0.2.0: CLI, diagnostics mode</title>
        <updated>2026-03-15T09:29:54Z</updated>
      </entry>
      <entry>
        <title>improved deslopify into a cli</title>
        <updated>2026-03-15T09:28:44Z</updated>
      </entry>
    </feed>
  `;

  const commits = parseCommitFeed(xml);

  assert.equal(commits.length, 2);
  assert.equal(commits[0].commit.message, 'Release v0.2.0: CLI, diagnostics mode');
  assert.equal(commits[1].commit.author.date, '2026-03-15T09:28:44Z');
});

test('summary helpers keep the copy high-level for semi-technical readers', () => {
  const repo = {
    name: 'deslopify',
    description: 'Make the AI writing sound more humane'
  };

  const commits = [
    { commit: { message: 'improved deslopify into a cli' } },
    { commit: { message: 'Release v0.2.0: CLI, diagnostics mode, presets, and protected-span filtering' } }
  ];

  assert.deepEqual(buildFocusBullets(commits), [
    'Made the command-line workflow more usable',
    'Packaged a clearer public release'
  ]);

  assert.equal(
    buildSummary(repo, commits),
    'Deslopify had a packaging-and-operations fortnight. The work pushed make the AI writing sound more humane closer to something people can reliably install, run, and keep in their workflow without extra hand-holding.'
  );

  assert.equal(
    buildValueUnlocked(repo, commits),
    'It is easier to drop the tool into a real workflow instead of treating it like a one-off demo or side script.'
  );
});

test('createBiweeklyWindows builds a rolling three-month set of fortnight windows', () => {
  const windows = createBiweeklyWindows(new Date('2026-03-20T12:00:00Z'), 3, 14);

  assert.equal(windows.length, 7);
  assert.equal(windows[0].periodStart, '2025-12-20T12:00:00.000Z');
  assert.equal(windows.at(-1).periodEnd, '2026-03-20T12:00:00.000Z');
});

test('buildProjectUpdates groups commit activity into fortnightly narrative updates', () => {
  const repo = {
    name: 'ghost-in-a-shell',
    full_name: 'shreyas-makes/ghost-in-a-shell',
    html_url: 'https://github.com/shreyas-makes/ghost-in-a-shell',
    homepage: null,
    description: 'Mac OS first, Ghostty-native workspace orchestrator',
    language: 'Rust',
    stargazers_count: 1
  };

  const commits = [
    { commit: { message: 'fixed ghostty persistence', author: { date: '2026-03-18T12:00:00Z' } } },
    { commit: { message: 'updated readme', author: { date: '2026-03-17T12:00:00Z' } } },
    { commit: { message: 'Prepare Thinking Cap for GitHub', author: { date: '2026-03-02T12:00:00Z' } } }
  ];

  const windows = createBiweeklyWindows(new Date('2026-03-20T12:00:00Z'), 3, 14);
  const updates = buildProjectUpdates(repo, commits, windows);

  assert.equal(updates.length, 2);
  assert.equal(updates[0].commitCount, 2);
  assert.match(updates[0].narrative, /reliability|operational|fragile/i);
  assert.equal(updates[1].periodLabel, '28 Feb 2026 - 14 Mar 2026');
});
