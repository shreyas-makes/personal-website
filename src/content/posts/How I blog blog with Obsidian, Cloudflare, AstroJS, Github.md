---
title: How I blog with Obsidian, Cloudflare, AstroJS, Github
description: "I’ve been refining my writing and publishing workflow to the point where it feels effortless. It combines Obsidian for writing, AstroJS for building the site, and Cloudflare Pages for deployment. ..."
date: 2025-04-25
slug: blog-obsidian-astrojs
tags:
  - writing
  - ai-coding
  - rough-notes
stage: seedling
---
I’ve been refining my writing and publishing workflow to the point where it feels effortless. It combines Obsidian for writing, AstroJS for building the site, and Cloudflare Pages for deployment. 

Everything now lives locally, in plain text, structured neatly for both creative flow and technical control. And this is partly inspired by Kepano's adherence to the local, plain-text format:

> _File over app_ is a philosophy: if you want to create digital artifacts that last, they must be files you can control, in formats that are easy to retrieve and read. Use tools that give you this freedom.
> 
> _File over app_ is an appeal to tool makers: accept that all software is ephemeral, and give people ownership over their data.

In Obsidian, I maintain a 'Blog Post Template' that includes the necessary frontmatter for new posts. When I’m ready to start a new piece, I simply create a new note using this template. It creates template fields like title, date, draft status, and tags, so I can immediately get to the act of writing without fiddling with metadata. 

Having a clean, consistent structure at the top of every post means the AstroJS build process later has exactly what it needs, and I don’t have to think about it while I'm writing.

The vault is connected to the Astro project through simple symlinks. One symlink pulls in the `posts` folder from `src/content/posts/`, where all blog posts live. Another brings in the `images` folder from `public/images/`. This way, I can edit blog posts and manage associated images directly from inside Obsidian. Embedded image paths, like `/images/2025/01/image-11.png`, render correctly in both Obsidian preview and the deployed site without any extra steps. 

These are the settings I've used on my Obsidian vault:

```
New link format: Shortest path when possible
Use Wikilinks: yes
Attachment folder path: /images (The folder where assets on AstroJS are stored)
```

There’s a deliberate separation of concerns between my writing environment and my site development environment. 

When I’m inside Obsidian, I’m purely focused on the act of writing: clarifying ideas, connecting thoughts, refining phrasing. I’m not thinking about fonts, layouts, or site performance. It’s just me and the words. When I switch over to the AstroJS codebase, my mindset changes. 

There, I’m thinking as a designer and developer, tuning the user experience for readers: improving typography, tweaking the reading flow, optimizing load times, adding small details that make the site more welcoming.

This boundary between writing and publishing helps me preserve the integrity of both processes. Writing doesn’t get bogged down in technical details, and development isn’t clouded by the emotional weight of drafting and editing. Each activity gets the attention it deserves.

When a post feels ready, I simply change the `draft: true` field in the frontmatter to `draft: false`, commit the change to Git, and push. Cloudflare Pages picks up the update automatically, builds the Astro site, and deploys the changes live, often within a minute. There’s no CMS dashboard to log into, no series of export and import steps, no drag-and-drop interfaces to wrangle. The entire flow reduces publishing to its essence: write, commit, publish.

This system rewards momentum. It stays out of the way. It feels honest and durable, like something that could last decades without needing to change. Most importantly, it keeps the act of writing at the center of the process.