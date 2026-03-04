# PostCard Component

## 1. Metadata
- Name: PostCard
- Category: Component
- Status: Active

## 2. Overview
Preview card for a single post in feeds/grids.
Do not use for full post rendering.

## 3. Anatomy
- Title
- Summary
- Meta row (date/tag/stage)

## 4. Tokens used
- `--font-size-*`, `--font-weight-*`
- `--color-text-*`
- `--space-*`

## 5. Props/API
- `post` (content entry)

## 6. States
- Default, hover title, focus-visible on link, dark mode

## 7. Code example
```astro
<PostCard post={post} />
```

## 8. Cross-references
- `specs/components/post-grid.md`
- `specs/components/growth-stage.md`
