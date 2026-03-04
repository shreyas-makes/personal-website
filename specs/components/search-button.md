# SearchButton Component

## 1. Metadata
- Name: SearchButton
- Category: Component
- Status: Active

## 2. Overview
Button that opens the search modal.
Do not use for global navigation actions unrelated to search.

## 3. Anatomy
- Icon
- Label (optional)

## 4. Tokens used
- `--color-text-secondary`, `--color-bg-hover`
- `--space-*`, `--radius-pill`
- `--motion-duration-fast`, `--motion-easing-standard`

## 5. Props/API
- Click handler provided by parent context

## 6. States
- Default, hover, focus-visible, active, dark mode

## 7. Code example
```astro
<SearchButton />
```

## 8. Cross-references
- `specs/components/search.md`
- `specs/components/header.md`
