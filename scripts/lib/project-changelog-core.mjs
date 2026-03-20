export function toTitleFromSlug(slug) {
  return slug
    .split(/[-_]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

export function cleanCommitMessage(message) {
  return message
    .split('\n')[0]
    .replace(/^(feat|fix|docs|chore|refactor|build|test|style|perf|ci)(\([^)]+\))?!?:\s*/i, '')
    .replace(/^release\s+/i, 'Release ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function sentenceCase(text) {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function dedupe(items) {
  return [...new Set(items.filter(Boolean))];
}

export function classifySignals(commits) {
  const text = commits.map((commit) => cleanCommitMessage(commit.commit.message).toLowerCase());
  const has = (patterns) => text.some((entry) => patterns.some((pattern) => pattern.test(entry)));

  return {
    docs: has([/\breadme\b/, /\bdocs?\b/, /\bdocumentation\b/, /\bonboarding\b/]),
    stability: has([/\bfix\b/, /\bfixed\b/, /\bworks\b/, /\bstable\b/, /\bpersist/, /\bbug\b/]),
    release: has([/\brelease\b/, /\bv\d+\.\d+\.\d+/, /\bship\b/, /\bpublish\b/]),
    cli: has([/\bcli\b/, /\bcommand\b/, /\bterminal\b/]),
    setup: has([/\bprepare\b/, /\bsetup\b/, /\bgithub\b/, /\binstall\b/, /\binitial\b/]),
    ux: has([/\bui\b/, /\bux\b/, /\bsearch\b/, /\bloading\b/, /\bpresets?\b/, /\bdiagnostic/]),
    cleanup: has([/\bremove\b/, /\bremoved\b/, /\bcleanup\b/, /\btidy\b/])
  };
}

export function summarizeCommit(message) {
  const cleaned = cleanCommitMessage(message);
  const lower = cleaned.toLowerCase();

  if (!cleaned || cleaned.length < 4) {
    return null;
  }

  if (/^(x|yes|ok|wip)$/i.test(cleaned) || /^merge\b/i.test(cleaned)) {
    return null;
  }

  if (/\bnew priors\b|\bupdated reame\b/.test(lower)) {
    return 'Refined the project framing and supporting documentation';
  }

  if (/\breadme\b|\bdocs?\b|\bdocumentation\b/.test(lower)) {
    return 'Clarified the README and setup guidance';
  }

  if (/\bpersist|\bfixed?\b|\bworks\b|\bstable\b|\bbug\b/.test(lower)) {
    return 'Stabilized core behaviour so the product is more reliable';
  }

  if (/\brelease\b|\bv\d+\.\d+\.\d+/.test(lower)) {
    return 'Packaged a clearer public release';
  }

  if (/\bcli\b|\bcommand\b|\bterminal\b/.test(lower)) {
    return 'Made the command-line workflow more usable';
  }

  if (/\bloading\b|\btarget\b|\bsearch\b|\bprecisely\b|\bpresets?\b|\bdiagnostic/.test(lower)) {
    return 'Smoothed the day-to-day user experience';
  }

  if (/\bprepare\b|\bgithub\b|\binstall\b/.test(lower)) {
    return 'Prepared the project for broader adoption';
  }

  if (/\bsubmodule\b|\bcleanup\b|\bremove\b|\bremoved\b/.test(lower)) {
    return 'Simplified the project structure to reduce maintenance overhead';
  }

  if (/\bskill sets?\b/.test(lower)) {
    return 'Expanded the set of built-in capabilities';
  }

  if (/\bupdated skill\b/.test(lower)) {
    return 'Clarified how the skill should be used';
  }

  if (/\bimproved ui\b/.test(lower)) {
    return 'Sharpened the working interface';
  }

  if (/\binitialis(ed|ed) repo\b|\binitialized repo\b/.test(lower)) {
    return 'Set up the repository foundation for future iteration';
  }

  if (/^updated? [a-z0-9-]+$/i.test(cleaned)) {
    return 'Refined the project internals';
  }

  if (/\binitial commit\b/.test(lower)) {
    return 'Laid down the first public version of the integration';
  }

  if (/\bv0\b|\bplan\b|\bshaping\b/.test(lower)) {
    return 'Sharpened the first product direction';
  }

  return sentenceCase(cleaned);
}

export function buildFocusBullets(commits) {
  return dedupe(commits.map((commit) => summarizeCommit(commit.commit.message))).slice(0, 3);
}

export function buildSummary(repo, commits) {
  const signals = classifySignals(commits);
  const repoName = toTitleFromSlug(repo.name);
  const description = repo.description?.trim();
  const subject = description ? description.charAt(0).toLowerCase() + description.slice(1) : 'the product';

  if (signals.cli && signals.release) {
    return `${repoName} had a packaging-and-operations fortnight. The work pushed ${subject} closer to something people can reliably install, run, and keep in their workflow without extra hand-holding.`;
  }

  if (signals.stability && signals.docs) {
    return `${repoName} had a tightening-the-screws fortnight. The commits stayed close to the core experience, with reliability work and clearer documentation moving in parallel so the tool feels more operational than fragile.`;
  }

  if (signals.ux && signals.setup) {
    return `${repoName} had an adoption-focused fortnight. The attention went into smoothing rough edges and reducing setup ambiguity, which is exactly the work that helps an interesting prototype become something repeatable.`;
  }

  if (signals.docs) {
    return `${repoName} had a documentation-heavy fortnight, but in the useful sense. The work makes ${subject} easier to approach, easier to understand, and less dependent on private context living in your head.`;
  }

  if (signals.cleanup) {
    return `${repoName} had an internal cleanup fortnight. It is the sort of structural work that does not look flashy in a screenshot, but usually pays off by making future iteration faster and less brittle.`;
  }

  return `${repoName} moved forward with a practical fortnight of product work. The changes were not ornamental; they were aimed at making ${subject} more usable, more legible, and easier to trust.`;
}

export function buildValueUnlocked(repo, commits) {
  const signals = classifySignals(commits);
  const values = [];

  if (signals.cli) values.push('It is easier to drop the tool into a real workflow instead of treating it like a one-off demo or side script.');
  if (signals.stability) values.push('The product becomes safer to rely on for actual work, which is usually the threshold between “interesting” and “worth keeping around.”');
  if (signals.docs) values.push('The onboarding tax comes down, so more of the product value is available without needing a tour from the builder.');
  if (signals.release || signals.setup) values.push('The project moves closer to public-adoption shape: clearer install paths, cleaner release boundaries, and less hidden context.');
  if (signals.ux) values.push('The interaction cost drops, which matters because semi-frequent tasks live or die on friction more than on feature count.');

  if (values.length === 0) {
    return 'The recent work looks aimed at keeping the product useful and legible, not just active for activity’s sake.';
  }

  return values[0];
}

export function buildUpdateHeadline(commits) {
  const signals = classifySignals(commits);

  if (signals.cli && signals.release) return 'From script to shippable tool';
  if (signals.stability && signals.docs) return 'Hardening the core experience';
  if (signals.ux && signals.setup) return 'Reducing friction and setup debt';
  if (signals.docs) return 'Making the project more legible';
  if (signals.cleanup) return 'Cleaning the foundation for the next wave';

  return 'Pushing the product forward';
}

export function createBiweeklyWindows(anchorDate, historyMonths = 3, periodDays = 14) {
  const end = new Date(anchorDate);
  const start = new Date(anchorDate);
  start.setMonth(start.getMonth() - historyMonths);

  const windows = [];
  let cursor = new Date(start);

  while (cursor < end) {
    const next = new Date(cursor);
    next.setDate(next.getDate() + periodDays);

    windows.push({
      periodStart: cursor.toISOString(),
      periodEnd: (next < end ? next : end).toISOString()
    });

    cursor = next;
  }

  return windows;
}

export function buildProjectUpdates(repo, commits, windows) {
  return windows
    .map((window) => {
      const windowCommits = commits.filter((commit) => {
        const commitDate = new Date(commit.commit.author.date).getTime();
        return commitDate >= new Date(window.periodStart).getTime() &&
          commitDate < new Date(window.periodEnd).getTime();
      });

      if (windowCommits.length === 0) return null;

      const sortedCommits = [...windowCommits].sort(
        (left, right) => new Date(right.commit.author.date).getTime() - new Date(left.commit.author.date).getTime()
      );

      return {
        periodStart: window.periodStart,
        periodEnd: window.periodEnd,
        periodLabel: `${formatDate(window.periodStart)} - ${formatDate(window.periodEnd)}`,
        latestCommitAt: sortedCommits[0].commit.author.date,
        commitCount: sortedCommits.length,
        headline: buildUpdateHeadline(sortedCommits),
        narrative: buildSummary(repo, sortedCommits),
        valueUnlocked: buildValueUnlocked(repo, sortedCommits),
        focusBullets: buildFocusBullets(sortedCommits),
        commitMessages: sortedCommits.map((commit) => cleanCommitMessage(commit.commit.message))
      };
    })
    .filter(Boolean)
    .reverse();
}

export function extractMatch(block, regex) {
  const match = block.match(regex);
  return match?.[1]?.trim() || null;
}

export function parseRepoHtml(html, username) {
  const sections = html.match(/<li class="col-12[\s\S]*?<\/li>/g) || [];

  return sections
    .map((section) => {
      const name = extractMatch(section, /href="\/[^/]+\/([^"/]+)" itemprop="name codeRepository"/);
      if (!name) return null;

      const description = extractMatch(section, /itemprop="description">\s*([\s\S]*?)\s*<\/p>/);
      const language = extractMatch(section, /itemprop="programmingLanguage">([^<]+)</);
      const starsText = extractMatch(section, /href="\/[^/]+\/[^/]+\/stargazers"[\s\S]*?<\/svg>\s*([\d,]+)/);
      const pushedAt = extractMatch(section, /<relative-time datetime="([^"]+)"/);

      return {
        name,
        full_name: `${username}/${name}`,
        html_url: `https://github.com/${username}/${name}`,
        homepage: null,
        description: description ? description.replace(/\s+/g, ' ') : '',
        language: language || 'Unknown',
        stargazers_count: Number((starsText || '0').replace(/,/g, '')),
        pushed_at: pushedAt,
        private: false,
        fork: /class="[^"]*\bfork\b/.test(section),
        archived: /archived/i.test(section),
        default_branch: null
      };
    })
    .filter(Boolean);
}

export function parseCommitFeed(xml) {
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];
  return entries.map(([, entry]) => ({
    commit: {
      author: {
        date: extractMatch(entry, /<updated>([^<]+)<\/updated>/)
      },
      message: extractMatch(entry, /<title>\s*([\s\S]*?)\s*<\/title>/)?.replace(/\s+/g, ' ') || ''
    }
  }));
}
