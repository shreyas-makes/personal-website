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

function isTooGeneric(message) {
  return /^(x|yes|ok|wip|updated?|added?|new|misc)$/i.test(message);
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

  if (isTooGeneric(cleaned) || /^merge\b/i.test(cleaned)) {
    return null;
  }

  if (/\bprivacy\b|\bdefaults?\b|\bcontrols?\b/.test(lower)) {
    return 'Added safer defaults and clearer controls for users';
  }

  if (/\bobsidian\b|\bvault\b|\bhook\b|\bcomet\b/.test(lower)) {
    return 'Improved content sync so publishing updates land more reliably';
  }

  if (/\bdesign token\b/.test(lower)) {
    return 'Improved visual consistency across the product';
  }

  if (/\btitles?\b/.test(lower)) {
    return 'Made labels and titles clearer to scan';
  }

  if (/\bllm\b|\bllms\b/.test(lower)) {
    return 'Made supporting resources and related paths easier to find';
  }

  if (/\bredesign\b|\blanding page\b|\bimproved ui\b|\binterface\b/.test(lower)) {
    return 'Refined the interface so the product feels clearer and more polished';
  }

  if (/\bfooter\b|\bbuttons?\b|\bicons?\b|\bnavigation\b/.test(lower)) {
    return 'Made key actions and supporting links easier to discover';
  }

  if (/\bautoplay\b|\bvideo\b/.test(lower)) {
    return 'Made the product story easier to grasp from the first screen';
  }

  if (/\bdefaults?\b/.test(lower)) {
    return 'Improved defaults so the product works better out of the box';
  }

  if (/\btransition(s)?\b|\bbreathing space\b|\bsilence-only\b|\bpause slider\b/.test(lower)) {
    return 'Improved editing controls so results feel smoother with less manual cleanup';
  }

  if (/\bchrome extension\b|\bauth\b/.test(lower)) {
    return 'Expanded the workflow so the product fits more naturally into real usage';
  }

  if (/\bspecs?\b|\bplan\b|\bshaping\b/.test(lower)) {
    return 'Clarified the product direction behind the next round of work';
  }

  if (/\blint\b|\btests?\b|\bpipeline\b|\bworkflow\b/.test(lower)) {
    return 'Strengthened quality checks so releases are safer to trust';
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

  if (signals.cli && signals.release) {
    return `${repoName} became easier to install, run, and keep in a real workflow. For users, that means less setup friction and a shorter path from trying the tool to depending on it.`;
  }

  if (signals.stability && signals.docs) {
    return `${repoName} got more reliable while also becoming easier to understand. Users should spend less time fighting rough edges and less time guessing how the product is supposed to work.`;
  }

  if (signals.ux && signals.setup) {
    return `${repoName} reduced setup friction and smoothed important interaction points. That makes the product easier to adopt for first-time users and less annoying for returning ones.`;
  }

  if (signals.docs) {
    return `${repoName} got clearer onboarding and explanation. People should be able to understand the value faster and get started without relying on private builder context.`;
  }

  if (signals.cleanup) {
    return `${repoName} simplified part of its foundation in ways that support a steadier product. Users may not see the change directly, but it reduces the odds of future work feeling brittle or inconsistent.`;
  }

  return `${repoName} moved in a practical direction that improves usability and trust. The recent work reads less like maintenance churn and more like sharpening the product people actually touch.`;
}

export function buildValueUnlocked(repo, commits) {
  const signals = classifySignals(commits);
  const values = [];

  if (signals.cli) values.push('People can try the tool faster and keep using it without turning setup into a side quest.');
  if (signals.stability) values.push('Users can trust the core flow more, which is what turns a neat demo into something worth depending on.');
  if (signals.docs) values.push('New users get to value faster because the product now asks for less guesswork up front.');
  if (signals.release || signals.setup) values.push('Adoption gets easier with clearer install paths, clearer defaults, and less hidden builder knowledge.');
  if (signals.ux) values.push('Common tasks take less effort, which matters more than feature count for tools people return to.');

  if (values.length === 0) {
    return 'The recent work looks aimed at making the product more useful in practice, not just more active on GitHub.';
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
