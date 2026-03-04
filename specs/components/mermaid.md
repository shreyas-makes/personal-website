# Mermaid Component

## 1. Metadata
- Name: Mermaid
- Category: Component
- Status: Active

## 2. Overview
Renders Mermaid diagrams and source toggle controls in post content.
Do not use for non-diagram code blocks.

## 3. Anatomy
- Diagram container
- SVG output
- Source toggle button
- Optional original source block

## 4. Tokens used
- `--color-bg-overlay`, `--color-text-secondary`, `--color-text-on-overlay`
- `--space-mermaid-*`, `--space-toggle-*`
- `--radius-sm`, `--radius-md`, `--z-overlay`
- `--motion-duration-fast`, `--motion-easing-standard`

## 5. Props/API
- Diagram code/content via markdown pipeline

## 6. States
- Default, hover toggle, expanded source, dark mode

## 7. Code example
```astro
<Mermaid />
```

## 8. Cross-references
- `specs/foundations/elevation.md`
- `specs/foundations/motion.md`
