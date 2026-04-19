---
title: Weekly TODO List on CLI
description: >-
  As a designer transitioning into what I now call my "vibe-coder" phase, I've
  developed a particular appreciation for the elegant simplicity of command-line
  interfaces. Something about the monospaced...
date: 2025-01-05T00:00:00.000Z
slug: ascii-todo-cli
tags:
  - cli
  - productivity
  - rough-notes
stage: seedling
---
As a designer transitioning into what I now call my "vibe-coder" phase, I've developed a particular appreciation for the elegant simplicity of command-line interfaces. Something about the monospaced font, the focused input, and the absence of distractions always felt right. Why couldn't my todo list feel the same way?

ASCII-TODO-CLI—a simple command-line tool that would display my weekly tasks with visual flair but without the bloat. The tool renders your weekly schedule with creative ASCII borders, transforming the mundane task list into something that feels both functional and delightfully retro:

```
┌─────────── Monday ───────────┐
│ ☐ Finish project proposal    │
│ ☑ Reply to client emails     │
└───────────────────────────────┘
            ...
┌─────────── Friday ───────────┐
│ ☐ Team retrospective         │
│ ☐ Plan next sprint           │
└───────────────────────────────┘
```

What began as a Sunday night project to scratch my own itch has evolved into something I use regularly. 

The features remained intentionally minimal but effective: weekly planning with visual day separators, progress indicators, a dead-simple interface for task entry, and persistent storage between sessions.

There's something satisfying about checking off a task and seeing that empty box transform into a completed mark within the CLI,

If you share my appreciation for CLI elegance, you can find the [ascii-todo-cli npm package](https://www.npmjs.com/package/ascii-todo-cli) with installation instructions and usage examples. Install it globally with:

```bash
npm install -g ascii-todo-cli
```

Sometimes the best tools aren't the ones with the most features, but the ones that feel right to use. I quite like it.

