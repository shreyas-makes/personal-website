---
title: Simple Personal Websites
date: 2025-03-14
slug: simple-astrojs-website
tags:
  - ai-coding
  - curiosities
stage: plant
---

I recently open-sourced my [astro-blog-ghost GitHub repository](https://github.com/shreyas-makes/astro-blog-ghost) - a modern blog template built with AstroJS and Ghost CMS integration. This project serves as an excellent starting point for developers looking to create a portfolio website with:

- 📦 Zero-client JavaScript by default (with opt-in hydration)
- 🚀 Built-in Ghost CMS integration for content management
- 🌓 Dark/light mode toggle with system preference detection
- 📱 Mobile-optimized responsive layouts
- 🎨 CSS custom properties for easy theming
- 🔍 SEO optimization with automatic sitemap generation
- 📄 MDX support for interactive components in posts

To create your own portfolio:
1. Clone the repository: `git clone https://github.com/shreyas-makes/astro-blog-ghost`
2. Install dependencies: `npm install`
3. Connect to Ghost CMS via `.env` file
4. Customize the `src/config.ts` with your personal details
5. Modify components in `src/components/` to match your style

Key customization points:
- Update color schemes in `src/styles/global.css`
- Add portfolio sections in `src/pages/`
- Create custom page layouts in `src/layouts/`
- Implement your preferred analytics in `src/components/scripts/`

The template supports:
✅ Blog posts with code syntax highlighting
✅ Project showcases with responsive images
✅ About page with Markdown/MDX content
✅ RSS feed generation
✅ Open Graph protocol implementation

Deploy to any static host (Vercel, Netlify, GitHub Pages) with built-in CI/CD pipelines. 

[Read this essay]([[How I blog blog with Obsidian, Cloudflare, AstroJS, Github]]) to know more about how I use Obsidian for publishing my blog posts on AstroJS.
