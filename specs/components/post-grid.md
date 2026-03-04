# PostGrid Component

## 1. Metadata
- Name: PostGrid
- Category: Component
- Status: Active

## 2. Overview
Responsive grid layout for post cards.
Do not use for ordered timeline lists.

## 3. Anatomy
- Grid wrapper
- Card item container

## 4. Tokens used
- `--color-bg-surface`, `--color-border-subtle`, `--color-border-strong`
- `--radius-lg`
- `--shadow-sm`, `--shadow-sm-strong`
- `--motion-duration-fast`, `--motion-easing-standard`

## 5. Props/API
- `posts` (array of entries)

## 6. States
- Default, hover-lift, dark mode

## 7. Code example
```astro
<PostGrid posts={posts} />
```

## 8. Cross-references
- `specs/components/post-card.md`
- `specs/foundations/elevation.md`
