# GrowthStage Component

## 1. Metadata
- Name: GrowthStage
- Category: Component
- Status: Active

## 2. Overview
Displays content maturity stage badges (`seedling`, `sprout`, `plant`).
Do not use for unrelated status systems.

## 3. Anatomy
- Container badge
- Stage label
- Optional icon

## 4. Tokens used
- `--color-text-secondary`, `--color-border-subtle`
- `--space-*`, `--radius-pill`
- `--font-size-*`

## 5. Props/API
- `stage` value from frontmatter

## 6. States
- Default, dark mode

## 7. Code example
```astro
<GrowthStage stage={post.data.stage} />
```

## 8. Cross-references
- `specs/components/post-card.md`
