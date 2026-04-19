---
title: AI git commits
description: >-
  I built a CLI tool that leverages OpenAI to automatically generate concise
  summaries of git commit changes. You can find the git-commit-summarizer npm
  package with installation instructions and usage...
date: 2023-07-01T00:00:00.000Z
slug: git-commit-summarizer
tags:
  - cli
  - openai
  - git
  - curiosities
  - rough-notes
stage: seedling
---
I built a CLI tool that leverages OpenAI to automatically generate concise summaries of git commit changes.

You can find the [git-commit-summarizer npm package](https://www.npmjs.com/package/git-commit-summarizer) with installation instructions and usage details. The package helps developers:

- Quickly understand what changed in complex commits
- Generate clear, human-readable summaries of code changes
- Save time when reviewing pull requests or browsing commit history
- Create better commit messages with AI-assisted summaries

This CLI tool uses the OpenAI API to analyze diffs and provide context-aware explanations of code changes across multiple files and commits.

Install it with:

```bash
npm install -g git-commit-summarizer
```

The tool was published 10 months ago (v1.0.0) and remains a useful utility for git workflows. 

UPDATE : I'm no longer using this tool for my git commits as this is now a native feature on most CLI apps such as Codex, Opencode, Claude etc (you just need to prompt it)
