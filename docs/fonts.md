# Font System Guide

This project uses a centralized typography system so font changes are predictable and low-risk.

## Current decisions

1. Primary text font: `Elstob` (variable font)
2. Fallback stack: `Verdana, Geneva, sans-serif`
3. Monospace font: `JetBrains Mono` (code and technical UI)
4. Scope: entire site (body text, prose, header/footer chrome, list pages, books, interviews, work)

## Source of truth

1. Global font-face + font tokens: `src/styles/global.css`
2. Tailwind font family defaults: `tailwind.config.cjs`
3. Header/footer sizing behavior: `src/components/Header.astro`, `src/components/Footer.astro`
4. Newsletter UI sizing: `src/components/NewsletterFormWithHeaders.astro`

## Variable font usage (Elstob)

Configured in `src/styles/global.css`:

- `@font-face` for normal + italic with weight range `100 900`
- `font-optical-sizing: auto`
- `font-variation-settings` by role

Current axis defaults:

- Body/prose: `wght 410`, `opsz 18`
- Headings: `wght 520`, `opsz 36`
- Strong text: `wght 560`

These are controlled through tokens:

- `--font-weight-body`
- `--font-weight-heading`
- `--font-opsz-body`
- `--font-opsz-heading`

## Global size scale

In `src/styles/global.css`:

- Desktop body: `21px / 34px`
- Desktop prose: `24px / 36px`
- Mobile body: `18px / 29px`
- Mobile prose: `20px / 32px`

Tokens:

- `--font-size-body`, `--line-height-body`
- `--font-size-prose`, `--line-height-prose`

## Replacement playbook (Elstob -> New Font)

If you replace Elstob later, do these in order:

1. Replace font files in `public/fonts/` (or update file paths)
2. Update `@font-face` in `src/styles/global.css`
3. Keep fallback stack unless you intentionally change it
4. If new font is variable:
   - keep weight range and axes
   - retune `--font-weight-*` and `--font-opsz-*`
5. If new font is not variable:
   - set fixed `font-weight`
   - remove/disable `font-variation-settings` axes that are unsupported
6. Confirm Tailwind defaults in `tailwind.config.cjs`
7. Verify visual consistency on:
   - `/`
   - `/<post-slug>`
   - `/work`
   - `/interviews`
   - `/books`
   - `/books/<slug>`

## Design intent

1. Reading-first serif experience
2. Strong continuity between prose and navigation chrome
3. Footer intentionally smaller than primary reading text
4. Keep-reading section slightly smaller than body prose, but clearly readable

## Notes for future agents

- Do not reintroduce small hardcoded `15px`/`14px` page-level overrides.
- Prefer tokenized sizing in `src/styles/global.css`.
- If a surface looks too small, check for utility classes like `text-sm`, `text-xs`, or `prose-sm`.
- Font decisions should be updated in this file whenever typography changes.
