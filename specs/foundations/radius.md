# Radius Foundation

## Metadata
- Name: Radius
- Category: Foundation
- Status: Active

## Overview
Corner rounding is controlled through radius aliases only.

## Anatomy
- Small radius for small controls
- Medium radius for inline code containers
- Large radius for cards/tables
- Pill radius for capsules/buttons

## Tokens used
- `--radius-sm`
- `--radius-md`
- `--radius-lg`
- `--radius-pill`

## Props/API
Not applicable.

## States
- Default/hover/active/focus/disabled/error: no radius changes by default

## Code example
```css
.badge {
  border-radius: var(--radius-pill);
}
```

## Cross-references
- `specs/tokens/token-reference.md`
- `specs/components/post-grid.md`
