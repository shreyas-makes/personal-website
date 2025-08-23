---
title: Copy, Paste and Cite
date: 2025-02-14
slug: copy-paste-and-cite
tags:
  - curiosities
  - ai-coding
stage: seedling
---

Managing academic references often creates an unwelcome interruption in the natural flow of writing and research. This friction became particularly noticeable during long stretches of paper writing, where the context switching between composition and citation management kept breaking concentration. The ideal scenario would let references appear when needed without leaving the writing environment.

After several frustrating experiences of lost focus while hunting for citations, I shipped this Raycast plugin for Zotero began taking shape. The concept was straightforward: make reference management fade into the background while still providing immediate access to a scholarly library when needed.

Most reference tools required too many clicks, loaded too slowly, or demanded constant switching between applications. The plugin needed to solve these problems by searching through an entire Zotero library instantly, inserting citations into any Markdown document with minimal disruption, and providing properly formatted references in standard academic styles without requiring a separate formatting step. And Raycast was the ideal interface to copy, paste and cite.

For fellow researchers interested in trying this approach:

```bash
git clone https://github.com/shreyas-makes/zotero-raycast
cd zotero-raycast
npm install && npm run dev
```

From a technical perspective, the development focused on creating something that feels immediate and responsive. 

This meant direct integration with Zotero's local SQLite database rather than waiting for network requests, ensuring performance remains consistent even with libraries containing tens of thousands of items, allowing for personalized keyboard shortcuts, maintaining synchronization with Zotero's web API when online, and prioritizing a local-first design that works reliably without network connectivity.

