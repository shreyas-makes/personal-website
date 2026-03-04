# Books Component

## 1. Metadata
- Name: Books
- Category: Component
- Status: Active

## 2. Overview
Interactive bookshelf rendering for books page.
Do not use for static list rendering.

## 3. Anatomy
- Shelf row
- Spine/card item
- Selected book state

## 4. Tokens used
- `--color-bg-body`, `--color-bg-overlay`, `--color-text-primary`
- `--space-*`, `--radius-*`, `--shadow-*`

## 5. Props/API
- `books` data array
- Internal selected index state

## 6. States
- Default, selected, hover, dark mode

## 7. Code example
```astro
<Books client:load books={books} />
```

## 8. Cross-references
- `specs/components/post-grid.md`
- `specs/foundations/color.md`
