---
title: Essay Quality Ranker
date: 2025-05-07
slug: editnext
tags:
  - obsidian
  - plugin
  - ai
  - writing
  - curiosities
stage: seedling
description: An CLI script that ranks your markdown files based on how much editing they need.
---
Ever found yourself with dozens of draft essays in Obsidian but no clear idea which ones need the most editing work? I did, and that's why I built EditNext - an AI-powered plugin that ranks your markdown files based on how much editing they need.

The EditNext plugin uses LLMs and linguistic analysis to evaluate your drafts, providing a prioritized list of which documents deserve your attention first. It's like having an editorial assistant that helps you focus your efforts where they'll have the most impact.

You can find the [EditNext plugin for Obsidian](https://github.com/shreyas-makes/editnext-plugin) for installation instructions and detailed usage. This tool helps writers:

- Identify which drafts need the most work
- Understand specific weaknesses in each document
- Track improvement as you edit documents
- Save time by focusing on high-priority edits
- Leverage AI insights without leaving Obsidian

The plugin analyzes your documents using a combination of AI evaluation, grammar checking, and readability metrics to generate a comprehensive editing priority score.

Example output:

```
📊 EditNext Analysis Results:
┌─────────────────────────┬──────────────┬─────────────┬────────────────┬───────────────┬───────────────────────────────────┐
│ Document                │ Editing Score │ LLM Score   │ Grammar Score  │ Readability   │ Notes                             │
├─────────────────────────┼──────────────┼─────────────┼────────────────┼───────────────┼───────────────────────────────────┤
│ draft-essay-1.md        │ 87           │ 92          │ 76             │ 64            │ Needs structural work, unclear    │
│                         │              │             │                │               │ thesis, many grammar issues       │
├─────────────────────────┼──────────────┼─────────────┼────────────────┼───────────────┼───────────────────────────────────┤
│ almost-there.md         │ 42           │ 35          │ 58             │ 42            │ Minor flow issues, a few awkward  │
│                         │              │             │                │               │ transitions                       │
├─────────────────────────┼──────────────┼─────────────┼────────────────┼───────────────┼───────────────────────────────────┤
│ ready-to-publish.md     │ 18           │ 12          │ 22             │ 31            │ Polished, minor proofreading      │
│                         │              │             │                │               │ needed                            │
└─────────────────────────┴──────────────┴─────────────┴────────────────┴───────────────┴───────────────────────────────────┘
```

Install it from Obsidian's Community Plugins:

1. Open Obsidian Settings → Community plugins
2. Disable Safe mode if needed
3. Search for "EditNext Ranker" and click Install
4. Enable the plugin and enter your OpenAI API key in settings

If you're serious about improving your writing, this plugin offers a systematic approach to tackling your editing backlog. It's especially useful for managing digital gardens, notes collections, or any large set of drafts. 