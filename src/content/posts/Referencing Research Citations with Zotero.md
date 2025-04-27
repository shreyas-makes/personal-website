---
title: Referencing Research Citations with Zotero
date: 2025-02-14
slug: raycast-plugin-zotero
tags:
  - prototypes
  - llm
stage: seedling
---

I've created an unofficial [Raycast plugin for Zotero](https://github.com/shreyas-makes/zotero-raycast) that makes reference management slightly easier. This plugin lets you:

- 🔍 Search your entire Zotero library in milliseconds
- 📑 Quick-insert citations into any Markdown editor with `[[Shortcut]]`
- 🎯 Filter by collections/tags with smart fuzzy matching
- 📋 Copy citations in APA/MLA/Chicago format instantly
- 🌓 Dark mode support that matches your system preferences

To install:

```bash
git clone https://github.com/shreyas-makes/zotero-raycast
cd zotero-raycast
npm install && npm run dev
```

Key features:
- Native integration with Zotero's SQLite database
- Instant search across 100k+ items
- Customizable keyboard shortcuts
- Auto-sync with Zotero's web API
- Local-first architecture (no cloud dependencies)

