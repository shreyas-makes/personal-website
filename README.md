# Astro Blog Template

A clean, modern blog template built with Astro. Perfect for developers, writers, and creators who want a fast, SEO-optimized blog with minimal setup.

## ✨ Features

### 📝 Content & Organization
- **Multiple Content Types**: Regular blog posts, interviews, book notes, and project showcases
- **Dedicated Interview Section**: Special layout for interview content with interviewee extraction
- **Book Notes & Reviews**: Built-in rating system (1-10) and dedicated book showcase page
- **Curated Lists**: Organized content lists and collections
- **Tag-Based Organization**: Smart tag system with special handling for projects, books, and rough-notes
- **Content Staging**: Growth stages (seedling → sprout → plant) for evolving ideas
- **Draft Management**: Hide work-in-progress posts until ready

### 🎨 Design & UX  
- **Minimalist & Clean**: Content-first design philosophy
- **Dark Mode**: Seamless light/dark theme switching
- **Responsive**: Perfect on mobile, tablet, and desktop
- **Reading Experience**: Optimized typography and spacing
- **Word Counter**: Footer displays total words written across all posts
- **Reading Time**: Automatic reading time calculation for each post

### 🔧 Technical Features
- **Lightning Fast**: Built with Astro 5 for optimal performance
- **SEO Optimized**: Built-in sitemap, RSS feeds, and meta tags
- **Full-Text Search**: Client-side search with React components
- **Image Optimization**: Automatic responsive image generation
- **TypeScript**: Full type safety throughout the codebase
- **Modern Stack**: Astro + TailwindCSS + React for interactive components

## 🚀 Getting Started

### Prerequisites

- Node.js 18.19.0+
- npm 9.6.7+

### 1. Clone the Template

```bash
git clone https://github.com/shreyas-makes/astro-blog-ghost.git my-blog
cd my-blog
npm install
```

### 2. Start Development

```bash
npm run dev
```

Visit `http://localhost:4321` to see your blog!

### 3. Customize Your Blog

**Update site configuration** in `astro.config.mjs`:
```javascript
export default defineConfig({
  site: 'https://yourblog.com',
  // ... rest of config
});
```

**Update site metadata** in `src/utils/config.js`:
```javascript
export const SITE_CONFIG = {
  title: "Your Blog Name",
  description: "Your blog description",
  author: "Your Name",
  url: "https://yourblog.com"
};
```

**Update package.json**:
- Change the `name` and `description`
- Update the `repository.url` if publishing to GitHub

### 4. Add Your Content

**Create blog posts** in `src/content/posts/`:
```markdown
---
title: "Your First Post"
date: 2024-01-01
tags: ["getting-started"]
summary: "Welcome to your new blog!"
stage: "seedling" # Optional: seedling, sprout, or plant
draft: false # Optional: hide while working
---

# Your First Post

Write your content here...
```

**Special content types:**
- **Interviews**: Create in `src/content/posts/interviews/` - automatically organized by year
- **Book Notes**: Create in `src/content/posts/booknotes/` with `rating: 8` (1-10 scale)
- **Projects**: Add `tags: ["projects"]` to showcase on your work page
- **Lists**: Curated collections appear on the dedicated lists page

**Organize images** in `public/images/` (recommended structure: `year/month/`)

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── content/        # Your blog posts (markdown)
│   └── posts/
│       ├── interviews/    # Interview content
│       ├── booknotes/     # Book reviews and notes
│       └── *.md          # Regular blog posts
├── layouts/        # Page templates
├── pages/          # Routes and special pages
│   ├── index.astro       # Homepage with blog feed
│   ├── books.astro       # Book showcase page
│   ├── interviews.astro  # Interview archive
│   ├── lists.astro       # Curated lists
│   └── work.astro        # Project showcase
├── utils/          # Helper functions (reading time, excerpts)
└── css/           # Global styles
```

## 🛠️ Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type check

## 🚀 Deployment

This template is configured for **Cloudflare Pages** but works with any Astro-compatible host:

1. Build your site: `npm run build`
2. Deploy the `dist/` folder to your hosting provider

Popular options: Netlify, Vercel, GitHub Pages, Cloudflare Pages

## 🎨 Customization

- **Styling**: Edit files in `src/css/` and `src/styles/`
- **Layout**: Modify `src/layouts/BaseLayout.astro` and `src/layouts/PostLayout.astro`
- **Components**: Customize components in `src/components/`
- **Pages**: Add new pages in `src/pages/`

## 📄 License

MIT License - feel free to use this template for your own projects!



