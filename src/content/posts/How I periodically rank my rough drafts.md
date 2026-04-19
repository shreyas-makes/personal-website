---
title: How I periodically rank my rough drafts
date: 2025-05-07T00:00:00.000Z
slug: editnext
tags:
  - obsidian
  - plugin
  - writing
  - ai-coding
stage: seedling
description: >-
  An CLI script that ranks your markdown files based on how much editing they
  need.
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

| File                                                                                         | Score | LLM | Grammar | Readability | Notes                                                                                                                           |
| -------------------------------------------------------------------------------------------- | ----- | --- | ------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [Virtual bookshelves.md](/virtual-bookshelf)                                                                   | 46.8  | 40  | 56.2    | 57.9        | The draft lacks a clear conclusion and could benefit from a more cohesive structure.                                            |
| [How I blog blog with Obsidian, Cloudflare, AstroJS, Github.md](/blog-obsidian-astrojs)                            | 50.2  | 40  | 100.0   | 31.1        | The draft is generally well-structured but could benefit from clearer transitions between sections.                             |
| [Conceptual Compression for LLMs.md](/conceptual-compression-for-llms)                                                       | 51.0  | 70  | 32.2    | 12.9        | The draft lacks a clear thesis and cohesive flow, making it difficult for readers to follow the main argument.                  |
| [chatsnip.md](/chatsnip)                                                                              | 51.0  | 30  | 100.0   | 65.1        | The draft is generally clear but could benefit from more detailed explanations of features and user benefits.                   |
| [Weekly TODO List on CLI](/ascii-todo-cli)                                                                        | 54.7  | 40  | 100.0   | 53.6        | The draft lacks a clear introduction and conclusion, making it feel somewhat disjointed.                                        |
| posts/Essay Quality Ranker                                                               | 54.8  | 40  | 100.0   | 53.8        | The draft is generally clear but could benefit from improved organization and more detailed examples.                           |


Install it from Obsidian's Community Plugins:

1. Open Obsidian Settings → Community plugins
2. Disable Safe mode if needed
3. Search for "EditNext Ranker" and click Install
4. Enable the plugin and enter your OpenAI API key in settings

If you're serious about improving your writing, this plugin offers a systematic approach to tackling your editing backlog. It's especially useful for managing digital gardens, notes collections, or any large set of drafts. 
