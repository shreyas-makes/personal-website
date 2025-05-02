---
title: Weekly TODO List on CLI
date: 2025-01-05
slug: ascii-todo-cli
tags:
  - cli
  - productivity
  - ascii-art
  - curiosities
stage: seedling
---
I built a command line tool as a simple TODO list. I've always enjoyed the elegance of the CLI for various purposes, and have sometimes preferred doing tasks directly on CLI instead of resorting to any GUI for these needs.

In my recent hobbyist avatar transitioning to become more of a "vibe-coder" from my earlier designer adventures, I've quite enjoyed using code, as well as interfaces that are more appealing to use code.

You can find the [ascii-todo-cli npm package](https://www.npmjs.com/package/ascii-todo-cli) with installation instructions and usage examples. The tool features:

- Weekly task planning with visual day separators
- ASCII art decorations and progress indicators
- Simple command-line interface for quick task entry
- Persistent storage of tasks between sessions
- Visual completion indicators and prioritization

The application renders your weekly tasks with creative ASCII borders and visual elements to make task management more engaging.

Example view:

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

Install it globally with:

```bash
npm install -g ascii-todo-cli
```

