Refresh the public changelog at `/changelog` from live GitHub activity instead of relying on the git pre-commit hook.

What this command should do:

1. Run `npm run changelog:update`.
   - The generator already pulls active public repos from `shreyas-makes` via GitHub.
   - It excludes private, forked, and archived repos and keeps the route focused on recently pushed work.
   - Authentication should come from `GITHUB_TOKEN` or `gh auth token`.

2. Review the generated output in `src/data/project-changelog.json`.
   - Keep the copy user-centered.
   - Prefer value delivered, reduced friction, reliability, onboarding, and trust.
   - Avoid builder-centric phrasing like "refactor", "internals", "cleanup", or raw commit-message paraphrases unless they clearly matter to users.

3. If the generated writing is too implementation-heavy, improve the heuristics in `scripts/lib/project-changelog-core.mjs` and regenerate.

4. Make sure `src/pages/changelog.astro` presents the updates as a reader-facing product changelog, not a developer activity log.

5. Run verification:
   - `npm run test:changelog`
   - `npm run check`
   - `npm run token:audit` if `src/pages/changelog.astro` changed

6. Summarize:
   - which projects were included
   - what changed in the route copy
   - any repos or updates that still need manual judgment
