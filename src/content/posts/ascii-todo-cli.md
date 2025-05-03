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
It was a Sunday evening when I found myself staring at yet another productivity app on my screen. Too many buttons, notifications, and features I'd never use. I closed the browser tab with a sigh and opened my terminal instead. "There has to be a simpler way," I muttered.

As a designer transitioning into what I now call my "vibe-coder" phase, I've developed a particular appreciation for the elegant simplicity of command-line interfaces. Something about the monospaced font, the focused input, and the absence of distractions always felt right. Why couldn't my todo list feel the same way?

That night, I started coding. By morning, my ASCII-TODO-CLI was born—a simple command-line tool that would display my weekly tasks with visual flair but without the bloat.

The tool renders your weekly schedule with creative ASCII borders, transforming the mundane task list into something that feels both functional and delightfully retro:

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

What began as a Sunday night project to scratch my own itch has evolved into something I use daily. The features remained intentionally minimal but effective: weekly planning with visual day separators, progress indicators, a dead-simple interface for task entry, and persistent storage between sessions.

There's something satisfying about checking off a task and seeing that empty box transform into a completed mark—all within the familiar embrace of the command line.

If you share my appreciation for CLI elegance, you can find the [ascii-todo-cli npm package](https://www.npmjs.com/package/ascii-todo-cli) with installation instructions and usage examples. Install it globally with:

```bash
npm install -g ascii-todo-cli
```

Sometimes the best tools aren't the ones with the most features, but the ones that feel right to use. For me, that's a command line that turns task management into ASCII art.

