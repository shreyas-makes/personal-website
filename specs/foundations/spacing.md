# Spacing Foundation

## Metadata
- Name: Spacing
- Category: Foundation
- Status: Active

## Overview
Spacing uses a closed scale and semantic aliases. Margin/padding/gap values in CSS must come from `--space-*` variables.

## Anatomy
- Core scale: `--space-0` to `--space-500`
- Prose rhythm: `--space-prose-*`
- Table spacing: `--space-table-*`
- Mermaid utilities: `--space-mermaid-*`

## Tokens used
- Core: `--space-0`, `--space-25`, `--space-50`, `--space-75`, `--space-100`, `--space-150`, `--space-200`, `--space-250`, `--space-300`, `--space-350`, `--space-400`, `--space-500`
- Prose: `--space-prose-h1-top`, `--space-prose-h1-bottom`, `--space-prose-h2-top`, `--space-prose-h2-bottom`, `--space-prose-h3-top`, `--space-prose-h3-top-mobile`, `--space-prose-h3-bottom`, `--space-prose-paragraph-bottom`, `--space-prose-list-y`, `--space-prose-list-indent`, `--space-prose-list-item-indent`, `--space-prose-list-item-bottom`, `--space-prose-blockquote-pad-left`, `--space-prose-blockquote-pad-right`
- Table/UI: `--space-table-cell-y`, `--space-table-cell-x`, `--space-table-cell-mobile-y`, `--space-table-cell-mobile-x`, `--space-toggle-y`, `--space-toggle-x`, `--space-mermaid-y`, `--space-mermaid-container-y`, `--space-mermaid-code-top`

## Props/API
Not applicable.

## States
- Default: use core scale for layout
- Hover/active/focus/disabled/error: spacing remains unchanged unless component spec says otherwise

## Code example
```css
.card {
  padding: var(--space-200);
  margin-bottom: var(--space-300);
}
```

## Cross-references
- `specs/tokens/token-reference.md`
- `specs/foundations/typography.md`
