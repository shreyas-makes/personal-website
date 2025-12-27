---
title: Directory Structure Visualizer
description: "I wanted an easy way in which I could visualise any directory that i'm navigating on the CLI. Yes, you did have standard npm packages such as \"tree\" for example, but those were not very helpful for..."
date: 2023-07-01
slug: dftree
tags:
  - cli
  - node
  - filesystem
  - curiosities
stage: seedling
---
I wanted an easy way in which I could visualise any directory that i'm navigating on the CLI. Yes, you did have standard npm packages such as "tree" for example, but those were not very helpful for me to understand the overall size of the files. I wanted a more "detailed" tree that could help me gauge how the codebase looks like.

For this reason, I created this package — dftree. This generates more visual UX-friendly representations of directory structures using Unicode box-drawing characters.

You can find the [dftree npm package](https://www.npmjs.com/package/dftree) for installation instructions and usage details. This utility helps developers:

- Visualize complex folder structures in the terminal
- Generate directory trees for documentation
- Explore project organization with customizable output
- Export directory structure as text files or for console display

The tool uses a depth-first traversal algorithm to generate the tree visualization with proper indentation and branch characters.

Example output:

```
📂 project-root
├── 📂 src
│   ├── 📂 components
│   │   ├── 📄 Button.jsx
│   │   └── 📄 Card.jsx
│   ├── 📂 utils
│   │   └── 📄 helpers.js
│   └── 📄 index.js
├── 📄 README.md
└── 📄 package.json
```

Install it globally with:

```bash
npm install -g dftree
```

This package is a handy utility for visualizing project structures. 