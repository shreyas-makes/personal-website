# Astro Blog Template

A modern, minimalistic blog built with Astro, featuring a clean design, excellent performance, and developer-friendly architecture. This template is perfect for writers, developers, and creators who want a fast, SEO-optimized blog with minimal maintenance.

## ✨ Features

- **Fast & Lightweight**: Built with Astro for optimal performance
- **Modern Design**: Clean, responsive design with dark mode support
- **SEO Optimized**: Built-in sitemap, RSS feeds, and meta tags
- **Content Management**: Easy markdown-based content management
- **Search Functionality**: Full-text search across all posts
- **Image Optimization**: Automatic image optimization and responsive images
- **Newsletter Integration**: ConvertKit integration for email newsletters
- **Analytics Ready**: Page view tracking and popular posts
- **Book Reviews**: Dedicated section for book notes and reviews
- **Tag System**: Organized content with tag-based navigation

## 🚀 Quick Start

### Prerequisites

- Node.js 18.19.0 or higher
- npm 9.6.7 or higher

### Installation

1. **Fork or clone this repository**
   ```bash
   git clone https://github.com/shreyas-makes/astro-blog-ghost.git
   cd astro-blog-ghost
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:4321` to see your blog!

## 📝 Configuration

### Basic Setup

1. **Update site configuration** in `astro.config.mjs`:
   ```javascript
   const LIVE_URL = "https://yourdomain.com";
   export default defineConfig({
     site: 'https://yourdomain.com',
     // ... rest of config
   });
   ```

2. **Update package.json**:
   - Change the `name` field
   - Update the `repository.url`
   - Modify the `description` if needed

3. **Update site metadata** in `src/utils/config.js`:
   ```javascript
   export const SITE_CONFIG = {
     title: "Your Name",
     description: "Your blog description",
     author: "Your Name",
     // ... other config
   };
   ```

### Content Structure

- **Blog Posts**: Add markdown files to `src/content/posts/`
- **Book Notes**: Add book reviews to `src/content/posts/booknotes/`
- **Images**: Store images in `public/images/` with year/month folders
- **Data**: Add custom data in `src/data/`

### Customization

- **Styling**: Modify `src/css/` files for custom styles
- **Layouts**: Edit `src/layouts/` for page structure changes
- **Components**: Customize `src/components/` for reusable elements
- **Pages**: Add new pages in `src/pages/`

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run check` - Type check your code
- `npm run fix-frontmatter` - Fix frontmatter in markdown files

### Project Structure

```
src/
├── components/     # Reusable UI components
├── content/        # Blog posts and content
├── css/           # Global styles
├── data/          # Static data and metadata
├── layouts/       # Page layouts
├── pages/         # Astro pages and routes
├── store/         # State management
├── styles/        # Additional styles
└── utils/         # Utility functions
```

### Key Technologies

- **Astro** - Static site generator
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React** - Interactive components
- **Markdown** - Content authoring

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Test your changes**
   ```bash
   npm run build
   npm run preview
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Contribution Guidelines

- Follow the existing code style and conventions
- Add tests for new features when possible
- Update documentation for any new features
- Ensure all builds pass before submitting PRs
- Be respectful and constructive in discussions

### Areas for Contribution

- **Bug fixes** - Report and fix issues
- **Feature requests** - Suggest and implement new features
- **Documentation** - Improve README, comments, and guides
- **Performance** - Optimize build times and runtime performance
- **Accessibility** - Improve accessibility features
- **Design** - Enhance UI/UX components

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Fonts from [Fontsource](https://fontsource.org/)

---

<div align="center">

[![Website](https://img.shields.io/badge/shreyasprakash.com-000000?style=flat-square&logoColor=white)](https://www.shreyasprakash.com)
[![Twitter](https://img.shields.io/badge/@shreyasmakes-000000?style=flat-square&logoColor=white)](https://twitter.com/shreyasmakes)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-000000?style=flat-square&logoColor=white)](https://linkedin.com/in/shreyasprakash)

</div>

---



<div align="center">

<a href="https://github.com/shreyas-makes/astro-blog-ghost">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=shreyas-makes&repo=astro-blog-ghost&theme=transparent&hide_border=true&bg_color=ffffff&title_color=000000&text_color=000000"/>
</a>
<a href="https://github.com/shreyas-makes/writing.humans">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=shreyas-makes&repo=writing.humans&theme=transparent&hide_border=true&bg_color=ffffff&title_color=000000&text_color=000000"/>
</a>
<a href="https://github.com/shreyas-makes/chesscoach">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=shreyas-makes&repo=chesscoach&theme=transparent&hide_border=true&bg_color=ffffff&title_color=000000&text_color=000000"/>
</a>
<a href="https://github.com/shreyas-makes/candor-teams">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=shreyas-makes&repo=candor-teams&theme=transparent&hide_border=true&bg_color=ffffff&title_color=000000&text_color=000000"/>
</a>
<a href="https://github.com/shreyas-makes/magic-window">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=shreyas-makes&repo=magic-window&theme=transparent&hide_border=true&bg_color=ffffff&title_color=000000&text_color=000000"/>
</a>
<a href="https://github.com/shreyas-makes/v0_rails">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=shreyas-makes&repo=v0_rails&theme=transparent&hide_border=true&bg_color=ffffff&title_color=000000&text_color=000000"/>
</a>
<a href="https://github.com/shreyas-makes/jhanas-club">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=shreyas-makes&repo=jhanas-club&theme=transparent&hide_border=true&bg_color=ffffff&title_color=000000&text_color=000000"/>
</a>
<a href="https://github.com/shreyas-makes/zotero-raycast">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=shreyas-makes&repo=zotero-raycast&theme=transparent&hide_border=true&bg_color=ffffff&title_color=000000&text_color=000000"/>
</a>
<a href="https://github.com/shreyas-makes/founders_digest">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=shreyas-makes&repo=founders_digest&theme=transparent&hide_border=true&bg_color=ffffff&title_color=000000&text_color=000000"/>
</a>

</div>



