# Writer on Pencils

A heavily engineered, yet minimalistic blog theme for Astro. Perfect for writers, developers, and creators who want a clean, fast, and SEO-optimized blog.

![Writer on Pencils Theme](public/images/theme-preview.jpg)

## Features
- **Minimalistic Design**: Focus on content with a clean and simple layout
- **Responsive Layout**: Optimized for all devices, ensuring a seamless reading experience
- **SEO Optimized**: Built-in SEO features to help your blog rank better in search engines
- **Dark Mode Support**: Automatic dark mode based on user preferences
- **Syntax Highlighting**: Beautiful code blocks with Prism.js integration
- **RSS Feed**: Automatically generated RSS feed for your blog
- **Sitemap**: Automatically generated sitemap for better search engine indexing
- **Multiple Content Types**: Support for regular posts, rough notes, video essays, and book notes
- **Newsletter Integration**: Built-in ConvertKit newsletter subscription form
- **Performance Optimized**: Blazing-fast page loads with optimized assets
- **Accessibility Focused**: WCAG-compliant design principles built-in

## Prerequisites
- Node.js (>=18.19.0)
- npm (>=9.6.7)

## Quick Start

1. **Extract the ZIP file** to your desired location

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **View your site** at `http://localhost:4321`

5. **Build for production:**
```bash
npm run build
```

6. **Preview the production build:**
```bash
npm run preview
```

## Project Structure

```
writer-on-pencils/
├── public/                 # Static assets
│   ├── fonts/              # Custom fonts
│   └── images/             # Images
│       ├── books/          # Book cover images
│       └── posts/          # Blog post images
├── src/
│   ├── components/         # Reusable UI components
│   ├── config/             # Site configuration
│   │   ├── blog/           # Blog posts (Markdown)
│   │   └── config.ts       # Content collection schema
│   ├── layouts/            # Page layouts
│   ├── pages/              # Astro pages
│   ├── styles/             # Global styles
│   └── utils/              # Utility functions
├── astro.config.mjs        # Astro configuration
├── package.json            # Dependencies
└── tailwind.config.js      # Tailwind CSS configuration
```

## Creating Content

### Blog Posts

Create Markdown files in the `src/content/blog/` directory with the following frontmatter:

```markdown
---
title: "My Blog Post Title"
date: 2024-01-01
tags: ["design", "technology"]
summary: "Optional summary of the post for meta description"
image: "/images/posts/featured-image.jpg"  # Optional featured image
draft: false  # Set to true to exclude from production build
---

Your blog post content here. Supports **Markdown** formatting.
```

### Content Types

#### Regular Posts
Regular posts appear in the main blog feed. Example frontmatter:

```markdown
---
title: "My Comprehensive Guide"
date: 2024-01-01
tags: ["design", "technology"]
summary: "A detailed guide to designing with Figma"
image: "/images/posts/featured-image.jpg"
draft: false
---
```

#### Rough Notes
Short-form content that appears in the "Rough Notes" section:

```markdown
---
title: "Quick Thought on Design Systems"
date: 2024-01-01
tags: ["rough-notes", "design"]
draft: false
---
```

#### Video Essays
Posts that feature video content:

```markdown
---
title: "My Video Analysis"
date: 2024-01-01
tags: ["video-essays", "film"]
video_url: "https://youtube.com/embed/XXXXXXXXXXXX"
draft: false
---
```

#### Book Notes
Book reviews and notes that appear on the `/books` page:

```markdown
---
title: "Book Title"
date: 2024-01-01
author: "Book Author"
rating: 8  # Rating out of 10
summary: "Brief summary of the book"
cover: "/images/books/book-cover.jpg"
tags: ["books", "non-fiction"]
draft: false
---

Your book notes content here...
```

### Pages

Add new pages as `.astro` files in the `src/pages/` directory:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Page Title | Shreyas Prakash">
  <main class="max-w-3xl mx-auto px-4 py-8">
    <h1>My Custom Page</h1>
    <p>Page content goes here</p>
  </main>
</BaseLayout>
```

## Writing with Obsidian

You can use [Obsidian](https://obsidian.md/) to write and manage your blog posts, leveraging its powerful Markdown editor and knowledge management features.

### Setting Up Obsidian

1. **Download and install** [Obsidian](https://obsidian.md/download)
2. **Create or open a vault** pointing to your blog's root directory
3. **Configure folder notes** to match Astro's content structure

### Obsidian Configuration

1. **Set the content folder**: 
   - Go to Settings → Files & Links
   - Set "Default location for new notes" to "In the folder specified below"
   - Enter the path: `src/content/blog`

2. **Enable properties**:
   - Go to Settings → Editor → Properties
   - Toggle "Show properties" and "Show properties in document" to ON

### Content Templates

Create template files in Obsidian to make writing new content easier:

#### Regular Post Template

```markdown
---
title: "Post Title"
date: {{date:YYYY-MM-DD}}
tags: 
  - tag1
  - tag2
summary: "A brief summary of the post"
image: "/images/posts/image-filename.jpg"
draft: true
---

# {{title}}

Your content here...
```

#### Book Notes Template

```markdown
---
title: "Book Title"
date: {{date:YYYY-MM-DD}}
author: "Author Name"
rating: 7
summary: "Brief summary of the book"
cover: "/images/books/cover-filename.jpg"
tags: 
  - books
  - other-tags
draft: true
---

# {{title}}

## Summary

Brief summary here...

## Key Takeaways

- Point 1
- Point 2
- Point 3

## Quotes

> "Notable quote from the book"

## Detailed Notes

Your detailed notes here...
```

#### Growth Stage Template

```markdown
---
title: "Growing Idea Title"
date: {{date:YYYY-MM-DD}}
stage: "seedling"
tags:
  - tag1
  - tag2
draft: true
---

# {{title}}

Your growing idea here...
```

### Recommended Obsidian Plugins

These community plugins enhance your blogging workflow:

1. **Templater** - Advanced templating with dynamic variables
2. **Calendar** - Visual calendar for planning posts
3. **Dataview** - Query and filter your blog content
4. **Publish** - Export and publish directly (Pro users)
5. **Frontmatter Tag Suggest** - Auto-suggests tags from existing posts

### Obsidian Workflow Tips

1. **Tag management**:
   - Create a hierarchy of tags with `/` (e.g., `tech/javascript`)
   - Use consistent tags across posts

2. **Image workflow**:
   - Save images to `public/images/posts/` or `public/images/books/`
   - Link images using absolute paths: `![Alt text](/images/posts/image.jpg)`

3. **Content states**:
   - Use the `draft: true` property for works in progress
   - Use the `stage` property to indicate maturity level

4. **Content organization**:
   - Create folders within `src/content/blog/` for different content categories
   - Use Obsidian's linking feature (`[[]]`) to create connections between posts

5. **Publishing workflow**:
   - Write with `draft: true`
   - When ready to publish, change to `draft: false`
   - Run `npm run build` to see your changes live

### Synchronization

If you're working across multiple devices:

1. **Git-based workflow**:
   - Use Git to sync your Obsidian vault and blog source
   - Commit and push changes when ready

2. **Obsidian Sync** (paid feature):
   - Sync your vault across devices
   - Keep your blog repository separate and update from Obsidian

## Customization

### Site Configuration

Edit `src/config/site.ts` to update:

```typescript
export default {
  title: "Your Site Name",
  description: "Your site description",
  url: "https://yourdomain.com",
  author: "Your Name",
  email: "your.email@example.com",
  social: {
    twitter: "yourhandle",
    github: "yourusername",
    linkedin: "yourprofile"
  },
  nav: [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "Books", url: "/books" }
  ]
}
```

### Newsletter Integration with ConvertKit

1. Sign up for a [ConvertKit](https://convertkit.com) account
2. Navigate to your Forms in ConvertKit dashboard
3. Create a new form or use an existing one
4. Get your form ID from the "Share" tab
5. Update the ID in your newsletter components:

```astro
// src/components/SimpleNewsletterForm.astro
---
// Replace with your ConvertKit form ID
const FORM_ID = 'YOUR_CONVERTKIT_FORM_ID';
---
```

Also update the form ID in your site configuration:

```typescript
// src/config/site.ts
export const CONVERTKIT_FORM_ID = 'your-form-id-here';
```

### Styling

#### Tailwind CSS

Modify `tailwind.config.js` to adjust colors, typography, and other theme settings:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          // Add your custom color palette
        }
      },
      typography: {
        DEFAULT: {
          css: {
            // Customize typography
          }
        }
      }
    }
  }
}
```

#### Global Styles

Edit global styles in `src/styles/global.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Custom base styles */
}

@layer components {
  /* Custom component styles */
}
```

### Components

All UI components are in `src/components/`. Common ones you might want to customize:
- `Header.astro` - Site navigation and logo
- `Footer.astro` - Site footer with links
- `NewsletterForm.astro` - Newsletter signup form
- `PostCard.astro` - Blog post preview card

### Advanced Customization

#### Custom Fonts

1. Add font files to `public/fonts/`
2. Update `tailwind.config.js` with your font:

```javascript
fontFamily: {
  sans: ['YourFont', 'sans-serif'],
  serif: ['YourSerifFont', 'serif'],
}
```

3. Add font-face declarations in `src/styles/global.css`

#### Custom Page Templates

Create new layouts in `src/layouts/` directory:

```astro
---
// src/layouts/CustomLayout.astro
import BaseLayout from './BaseLayout.astro';

const { title, description } = Astro.props;
---

<BaseLayout title={title} description={description}>
  <main class="custom-layout">
    <slot />
  </main>
</BaseLayout>
```

## Advanced Features

### Growth Stage Indicators

Add a "digital garden" style maturity indicator to your posts:

```markdown
---
title: "My Growing Idea"
date: 2024-01-01
stage: "seedling"  # Options: "seedling", "sprout", or "plant"
---
```

This will display an icon indicating the maturity of the post:
- 🌱 Seedling: Freshly planted ideas that need more exploring
- 🌿 Sprout: Has a good foundation. More growth is expected
- 🪴 Plant: (Fairly) established essays that get a minor pruning now and then

### Image Optimization

Images are automatically optimized at build time. For best results:

1. Use `.jpg`, `.png`, or `.webp` formats
2. Place blog post images in `public/images/posts/`
3. Place book cover images in `public/images/books/`
4. Reference images using absolute paths from the root:
   ```markdown
   ![Alt text](/images/posts/my-image.jpg)
   ```

## Deployment

### Build for Production

```bash
npm run build
```

This generates a static site in the `dist/` directory.

### Deploy to Hosting Platforms

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

#### GitHub Pages
Update your `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/your-repo-name',
});
```

## License

MIT License - See LICENSE file for details

## Support

For support, please refer to the documentation included in the `docs` folder or reach out via [your-support-channel].

## Author

Shreyas

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

🚀 **Ready to deploy?** 
Check out the deployment guides for:
- [Vercel](https://docs.astro.build/en/guides/deploy/vercel/)
- [Netlify](https://docs.astro.build/en/guides/deploy/netlify/)
- [Cloudflare Pages](https://docs.astro.build/en/guides/deploy/cloudflare/)