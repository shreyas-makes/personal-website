# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based blog and personal website for Shreyas Prakash. Despite the "ghost" in the repository name, this is **not** a Ghost CMS integration - it's a custom-built static site using Astro with server-side rendering capabilities.

## Key Architecture

### Content Management
- **Content Source**: Markdown files in `src/content/posts/` - no external CMS
- **Content Schema**: Defined in `src/content/config.ts` with Zod validation
- **Post Types**: Regular posts, projects, books, rough-notes with different layouts
- **Special Post Properties**: `stage` (seedling/sprout/plant), `tags`, `draft`, `rating` (for books)

### Core Technologies
- **Framework**: Astro 5.3.0 with SSR (`output: 'server'`)
- **Styling**: TailwindCSS with custom CSS
- **Deployment**: Cloudflare Pages (see `astro.config.mjs`)
- **Search**: Client-side search with React components
- **React Integration**: Limited to specific components (`Search.tsx`, `SearchButton.tsx`, `Books.tsx`)

### Build System
- **Package Manager**: npm (Node.js >=18.19.0, npm >=9.6.7)
- **Build Optimization**: Vite with custom chunk splitting and Terser minification
- **Image Processing**: Astro's compile service for image optimization

## Common Development Commands

```bash
# Development server
npm run dev
# or
npm start

# Production build
npm run build

# Preview production build
npm run preview

# Type checking
npm run check

# Fix frontmatter (custom script)
npm run fix-frontmatter
```

## Content Workflow

### Adding New Posts
1. Create markdown file in `src/content/posts/`
2. Required frontmatter: `title`, `date`, `tags` (array)
3. Optional: `slug`, `draft`, `summary`, `stage`, `rating`, `cover`
4. Slug auto-generated from title if not provided

### Tag System
- **Special Tags**: 
  - `projects` → redirects to special project layout
  - `books` → redirects to `/books` page  
  - `rough-notes` → personal notes, excluded from main feeds
- **Tag Pages**: Auto-generated at `/tags/[tag]` with post filtering
- **Tag Display**: Shows top 20 tags by frequency on homepage

### Page Types & Routing
- **Homepage**: `src/pages/index.astro` - main blog feed
- **Post Pages**: `src/pages/posts/[...slug].astro` - individual posts
- **Tag Pages**: `src/pages/tags/[tag].astro` - posts by tag
- **Books**: `src/pages/books.astro` - special book showcase
- **Lists**: `src/pages/lists.astro` - curated lists

## Key Files & Directories

### Core Configuration
- `astro.config.mjs` - Astro config with Cloudflare adapter
- `src/content/config.ts` - Content schema and validation
- `tailwind.config.cjs` - TailwindCSS configuration
- `src/utils/config.js` - Environment-specific settings

### Layouts & Components
- `src/layouts/BaseLayout.astro` - Main layout wrapper
- `src/layouts/PostLayout.astro` - Individual post layout  
- `src/components/` - Reusable components (Header, Footer, Search, etc.)

### Utilities
- `src/utils/readingTime.ts` - Calculate post reading time
- `src/utils/excerptUtils.js` - Generate post excerpts
- `src/utils/slugify.js` - URL slug generation
- `src/utils/dateUtils.ts` - Date formatting utilities

### Scripts
- `scripts/fix-frontmatter.mjs` - Fix frontmatter formatting issues

## Development Notes

### Content Collection System
- Uses Astro's type-safe content collections
- Automatic slug generation with conflict handling
- Post filtering by draft status and special tags
- Growth stage tracking (`seedling` → `sprout` → `plant`)

### Performance Optimizations
- Image optimization with `_o` suffix system for multiple sizes
- CSS and JS chunking for optimal loading
- Static generation where possible with selective SSR

### Search Functionality
- Client-side search using React components
- Search state managed with Nanostores
- Full-text search across post content and metadata

### Special Features
- Newsletter integration (SimpleNewsletterForm component)
- Book rating system (1-10 scale)
- Reading time calculation
- Tag-based content organization
- Growth stage visualization for content maturity

## Testing & Quality

Always run type checking after making changes:
```bash
npm run check
```

For content changes, use the frontmatter fix script if needed:
```bash
npm run fix-frontmatter
```
