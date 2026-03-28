# Motion Foundation

## Metadata
- Name: Motion
- Category: Foundation
- Status: Active

## Overview
Motion is constrained to tokenized durations and easing.

## Anatomy
- Duration token for quick UI changes
- Standard easing token for UI transitions

## Tokens used
- `--motion-duration-fast`
- `--motion-easing-standard`

## Props/API
Not applicable.

## States
- Hover/active/focus: use motion tokens for transition timing
- Disabled/error: keep motion minimal unless component spec requires animation

## Code example
```css
.toggle {
  transition: opacity var(--motion-duration-fast) var(--motion-easing-standard);
}
```

## Cross-references
- `specs/tokens/token-reference.md`
