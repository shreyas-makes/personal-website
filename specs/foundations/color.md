# Color Foundation

## Metadata
- Name: Color
- Category: Foundation
- Status: Active

## Overview
Use semantic color aliases from `src/styles/tokens.css`. Components never use raw hex/rgb values.

## Anatomy
- Background: `--color-bg-*`
- Text: `--color-text-*`
- Borders: `--color-border-*`
- Interactive: `--color-action-*`

## Tokens used
- `--color-bg-body`
- `--color-bg-surface`
- `--color-bg-muted`
- `--color-bg-hover`
- `--color-bg-overlay`
- `--color-text-primary`
- `--color-text-secondary`
- `--color-text-muted`
- `--color-text-on-overlay`
- `--color-border-default`
- `--color-border-subtle`
- `--color-border-strong`
- `--color-action-primary`
- `--color-action-primary-hover`
- `--color-table-text`

## Props/API
Not applicable.

## States
- Default: light theme token values from `:root`
- Dark: overrides from `:root.dark`
- Hover: use `--color-bg-hover` and `--color-action-primary-hover`
- Focus: inherited from component-level focus styles
- Disabled: use text/border muted variants where needed
- Error: define future `--color-feedback-error-*` aliases before use

## Code example
```css
.button {
  background: var(--color-action-primary);
  color: var(--color-bg-body);
}
.button:hover {
  background: var(--color-action-primary-hover);
}
```

## Cross-references
- `specs/tokens/token-reference.md`
- `specs/foundations/spacing.md`
