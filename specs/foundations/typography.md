# Typography Foundation

## Metadata
- Name: Typography
- Category: Foundation
- Status: Active

## Overview
Typography uses tokenized families, sizes, line heights, optical sizes, and weights.

## Anatomy
- Families: body, heading, UI, mono
- Sizes: body/prose/headings/table/UI
- Weights: body/heading/emphasis/UI/strong
- Line heights: body/prose/heading/compact

## Tokens used
- Families: `--font-body`, `--font-heading`, `--font-ui`, `--font-mono`
- Sizes: `--font-size-body`, `--font-size-prose`, `--font-size-h1`, `--font-size-h2`, `--font-size-h3`, `--font-size-table`, `--font-size-table-mobile`, `--font-size-ui-sm`, `--font-size-mono-sm`
- Weights: `--font-weight-body`, `--font-weight-heading`, `--font-weight-emphasis`, `--font-weight-ui`, `--font-weight-strong`
- Line heights: `--line-height-body`, `--line-height-prose`, `--line-height-heading`, `--line-height-compact`
- Optical sizing: `--font-opsz-body`, `--font-opsz-heading`

## Props/API
Not applicable.

## States
- Default: body/prose sizing from `:root`
- Mobile: body/prose/heading sizes overridden in `@media (max-width: 640px)`

## Code example
```css
.prose h2 {
  font-family: var(--font-heading);
  font-size: var(--font-size-h2);
  font-weight: var(--font-weight-heading);
}
```

## Cross-references
- `specs/tokens/token-reference.md`
- `specs/foundations/motion.md`
