# Token Reference

Master map for `src/styles/tokens.css`.

## Metadata
- Name: Token Reference
- Category: Tokens
- Status: Active

## Overview
Layer model:
1. Layer 1: `--ds-*` primitives and dark-mode overrides
2. Layer 2: semantic aliases consumed by components
3. Layer 3: component CSS in `src/styles/global.css` only uses Layer 2

## Anatomy
- Color aliases
- Spacing aliases
- Typography aliases
- Radius/elevation/z-index/motion aliases

## Tokens used
### Color aliases
- `--color-bg-body` -> `var(--ds-color-bg-body, #ffffff)` -> App/page background
- `--color-bg-surface` -> `var(--ds-color-bg-surface, #f8f9fa)` -> Table header/surface blocks
- `--color-bg-muted` -> `var(--ds-color-bg-muted, #f9fafb)` -> Zebra row backgrounds
- `--color-bg-hover` -> `var(--ds-color-bg-hover, #f3f4f6)` -> Hover backgrounds
- `--color-bg-overlay` -> `var(--ds-color-bg-overlay, rgba(0, 0, 0, 0.1))` -> Overlay toggle backgrounds
- `--color-text-primary` -> `var(--ds-color-text-primary, #000000)` -> Default text
- `--color-text-secondary` -> `var(--ds-color-text-secondary, #666666)` -> Secondary text
- `--color-text-muted` -> `var(--ds-color-text-muted, #9ca3af)` -> Muted text
- `--color-text-on-overlay` -> `var(--ds-color-text-on-overlay, #dddddd)` -> Text on dark overlays
- `--color-border-default` -> `var(--ds-color-border-default, #e2e8f0)` -> Input/border defaults
- `--color-border-subtle` -> `var(--ds-color-border-subtle, #e5e7eb)` -> Light separators
- `--color-border-strong` -> `var(--ds-color-border-strong, #374151)` -> Dark separators
- `--color-action-primary` -> `var(--ds-color-action-primary, #2563eb)` -> Primary action
- `--color-action-primary-hover` -> `var(--ds-color-action-primary-hover, #1d4ed8)` -> Primary hover
- `--color-table-text` -> `var(--ds-color-table-text, #111827)` -> Table text
- `--color-text-hover` -> `var(--color-text-primary)` -> Generic hover text

### Spacing aliases
- `--space-0`, `--space-25`, `--space-50`, `--space-75`, `--space-100`, `--space-150`, `--space-200`, `--space-250`, `--space-300`, `--space-350`, `--space-400`, `--space-500`
- `--space-prose-h1-top`, `--space-prose-h1-bottom`, `--space-prose-h2-top`, `--space-prose-h2-bottom`, `--space-prose-h3-top`, `--space-prose-h3-top-mobile`, `--space-prose-h3-bottom`
- `--space-prose-paragraph-bottom`, `--space-prose-list-y`, `--space-prose-list-indent`, `--space-prose-list-item-indent`, `--space-prose-list-item-bottom`
- `--space-prose-blockquote-pad-left`, `--space-prose-blockquote-pad-right`
- `--space-table-cell-y`, `--space-table-cell-x`, `--space-table-cell-mobile-y`, `--space-table-cell-mobile-x`
- `--space-mermaid-y`, `--space-mermaid-container-y`, `--space-mermaid-code-top`
- `--space-toggle-y`, `--space-toggle-x`

### Typography aliases
- Families: `--font-body`, `--font-heading`, `--font-ui`, `--font-mono`
- Sizes: `--font-size-body`, `--font-size-prose`, `--font-size-h1`, `--font-size-h2`, `--font-size-h3`, `--font-size-table`, `--font-size-table-mobile`, `--font-size-ui-sm`, `--font-size-mono-sm`
- Weights: `--font-weight-body`, `--font-weight-heading`, `--font-weight-emphasis`, `--font-weight-ui`, `--font-weight-strong`
- Line heights: `--line-height-body`, `--line-height-prose`, `--line-height-heading`, `--line-height-compact`
- Optical size: `--font-opsz-body`, `--font-opsz-heading`

### Shape/elevation/layer/motion aliases
- Radius: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-pill`
- Elevation: `--shadow-sm`, `--shadow-sm-strong`
- Z-index: `--z-overlay`
- Motion: `--motion-duration-fast`, `--motion-easing-standard`

## Props/API
Not applicable.

## States
- Default: alias resolves to `:root` primitives
- Dark mode: alias resolves to `:root.dark` primitive overrides
- Mobile: body/prose/heading aliases resolve to media-query primitive overrides

## Code example
```css
.mermaid-source-toggle {
  background: var(--color-bg-overlay);
  color: var(--color-text-secondary);
  padding: var(--space-toggle-y) var(--space-toggle-x);
  border-radius: var(--radius-sm);
  transition: opacity var(--motion-duration-fast) var(--motion-easing-standard);
}
```

## Cross-references
- `specs/foundations/color.md`
- `specs/foundations/spacing.md`
- `specs/foundations/typography.md`
- `specs/foundations/radius.md`
- `specs/foundations/elevation.md`
- `specs/foundations/motion.md`
