# Elevation Foundation

## Metadata
- Name: Elevation
- Category: Foundation
- Status: Active

## Overview
Use shadow tokens for depth. Components should not define raw `box-shadow` values.

## Anatomy
- Base soft elevation
- Stronger dark-surface elevation

## Tokens used
- `--shadow-sm`
- `--shadow-sm-strong`

## Props/API
Not applicable.

## States
- Default: `--shadow-sm`
- Dark mode: `--shadow-sm-strong`

## Code example
```css
.table-container {
  box-shadow: var(--shadow-sm);
}
.dark .table-container {
  box-shadow: var(--shadow-sm-strong);
}
```

## Cross-references
- `specs/tokens/token-reference.md`
- `specs/components/mermaid.md`
