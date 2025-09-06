Hey there! This is the blog template I built for my personal website. After getting tons of requests about how I made it, I decided to open-source it so others can use it too.

It's built with Astro and has all the features I wanted in a personal blog - clean design, fast performance, and some unique touches like content staging and a built-in reading tracker.

## Features

### What's in the box?

**Content stuff that actually works:**
- Regular blog posts, interviews, book reviews - all organized automatically
- A cool "growth stage" system (seedling → sprout → plant) for tracking how your ideas evolve
- Smart tagging that handles different content types
- Draft mode so you can hide posts you're still working on

**Design that doesn't suck:**
- Clean, minimal design that puts your writing first
- Dark mode (because obviously)
- Actually readable on phones
- Reading time calculation and word counter in the footer

**Technical bits:**
- Built with Astro 5 - it's stupidly fast
- Full-text search that works offline
- Images get optimized automatically
- TypeScript throughout (no more debugging in production)
- RSS feeds and proper SEO

## Getting Started

You'll need Node.js (18.19.0+) and npm (9.6.7+). Most recent Node installs should work fine.

```bash
git clone https://github.com/shreyas-makes/astro-blog-ghost.git my-blog
cd my-blog
npm install
npm run dev
```

Open `http://localhost:4321` and you should see the blog running with all my content. Don't worry, we'll clean that up in a sec.

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

## Project Structure

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

##  Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type check

## Deployment

This template is configured for **Cloudflare Pages** but works with any Astro-compatible host:

1. Build your site: `npm run build`
2. Deploy the `dist/` folder to your hosting provider

Popular options: Netlify, Vercel, GitHub Pages, Cloudflare Pages

## Customization

- **Styling**: Edit files in `src/css/` and `src/styles/`
- **Layout**: Modify `src/layouts/BaseLayout.astro` and `src/layouts/PostLayout.astro`
- **Components**: Customize components in `src/components/`
- **Pages**: Add new pages in `src/pages/`

## Making It Yours (Removing My Stuff)

Alright, so you've cloned the repo and now you're seeing all my blog posts and personal stuff. Here's how to clean house and make it your own:

### Step 1: Nuke my content

**Clean out all my blog posts:**
```bash
# Bye bye, my posts!
rm -rf src/content/posts/*.md
rm -rf src/content/posts/interviews/*
rm -rf src/content/posts/booknotes/*
rm -rf src/content/posts/Attachments/*
```

**Get rid of my photos:**
```bash
# My face is everywhere in these folders
rm -rf public/images/2024/
rm -rf public/images/2025/
rm -rf public/images/books/
mkdir -p public/images  # Keep the folder for your stuff
```

**Remove my reading lists and data:**
```bash
# I read too much, you probably have different taste
rm -f src/data/articles.ts
rm -f src/data/movies.ts
rm -f src/data/read-counts.json
```

**Clean up my random documentation:**
```bash
# These are just my personal notes
rm -f CLAUDE.md
rm -f DEPLOYMENT_CHECKLIST.md
rm -f OG_TESTING_GUIDE.md
rm -f PERSONALIZATION_FIX_SUMMARY.md
```

### Step 2: Make it yours

**First, fix the basic info in `package.json`:**
```json
{
  "name": "your-blog-name",
  "author": "Your Name", 
  "description": "Your awesome blog",
  "repository": {
    "type": "git",
    "url": "your-repo-url"
  }
}
```

**Update the site config in `src/utils/config.js`:**
```javascript
export const siteConfig = {
  baseUrl: 'https://your-domain.com',
  title: 'Your Name',
  description: 'Whatever you want to say about yourself',
};
```

**Change the site URL in `astro.config.mjs`:**
```javascript
export default defineConfig({
  site: 'https://your-domain.com',
  // ... rest stays the same
});
```

**Most importantly, update the header:**
Open `src/components/Header.astro` and replace "Shreyas Prakash" with your name (it appears on lines 45 and 166). While you're there, you might want to adjust the navigation links to match what you actually want to write about.

### Step 3: Write your first post

Create a file in `src/content/posts/` (call it whatever you want, ending in `.md`):

```markdown
---
title: "Hey, I made a blog!"
date: 2024-01-01
tags: ["meta"]
summary: "First post on my new blog"
stage: "seedling"  # This is optional - tracks how "mature" your ideas are
draft: false
---

# Hey, I made a blog!

I just set up this blog using Shreyas's template. Pretty neat, right?

Still figuring out what I want to write about, but this is a start.
```

**About content types:**
- Regular posts go in `src/content/posts/`
- If you want to do interviews, put them in `src/content/posts/interviews/`
- Book reviews go in `src/content/posts/booknotes/` (add `rating: 8` for a 1-10 scale)
- Tag posts with `["projects"]` if you want them on your work page

**Where to put images:**
I organize mine by year/month (`public/images/2024/01/`), but do whatever makes sense to you.

### Optional tweaks

**Don't need interviews or book reviews?**
You can delete `src/pages/interviews.astro` and `src/pages/books.astro` if you're not planning to use those features. Just remember to remove the nav links from the header too.

**Want to change the homepage?**
Edit `src/pages/index.astro` to your heart's content. Maybe you want a different intro, different post layout, whatever.

### Lazy person's cleanup script

If you want to nuke everything at once, save this as `cleanup.sh` and run it:

```bash
#!/bin/bash
echo "🧹 Removing Shreyas's stuff..."

rm -rf src/content/posts/*.md
rm -rf src/content/posts/interviews/*
rm -rf src/content/posts/booknotes/*
rm -rf src/content/posts/Attachments/*
rm -rf public/images/2024/
rm -rf public/images/2025/
rm -rf public/images/books/
rm -f src/data/articles.ts
rm -f src/data/movies.ts
rm -f src/data/read-counts.json
rm -f CLAUDE.md DEPLOYMENT_CHECKLIST.md OG_TESTING_GUIDE.md PERSONALIZATION_FIX_SUMMARY.md

echo "✅ Done! Now update package.json, config files, and write your first post."
```

### Quick checklist

- [ ] Run the cleanup commands (or script)
- [ ] Update package.json with your info
- [ ] Change the site config and astro.config.mjs
- [ ] Replace my name in Header.astro
- [ ] Write your first post
- [ ] Test with `npm run dev`
- [ ] Deploy somewhere (Netlify, Vercel, Cloudflare Pages all work)

That's it! You should have a working blog that's actually yours now.

---

That's pretty much it! If you run into issues or have questions, feel free to open an issue. And if you end up using this template for your blog, I'd love to see what you build with it.
