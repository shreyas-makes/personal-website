# AI Documentation Exporter

A VS Code extension that captures AI-assisted development sessions and exports them as readable markdown documentation. Perfect for understanding how applications are built iteratively through AI prompts and code changes.

## Features

- **Session Tracking**: Start and stop documentation sessions to capture your AI-assisted development process
- **Prompt Logging**: Manually add prompts or development requests to the session timeline
- **Automatic File Monitoring**: Tracks code changes across your workspace during active sessions
- **Smart Diff Generation**: Creates compact, readable diffs that show what changed without being overwhelming
- **Markdown Export**: Generates beautiful, blog-ready markdown documentation with:
  - Session overview and statistics
  - Table of contents
  - Chronological development timeline
  - Code diffs linked to prompts
  - File modification summary

## Installation

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run compile` to build the extension
4. Press `F5` to open a new Extension Development Host window
5. The extension will be loaded and ready to use

## Usage

### Starting a Session

1. Open the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
2. Run "AI Docs: Start AI Documentation Session"
3. The extension will begin tracking file changes automatically

### Adding Prompts

1. Use the Command Palette and run "AI Docs: Add Prompt to Documentation"
2. Enter your AI prompt or development request
3. The prompt will be timestamped and associated with subsequent code changes

### Viewing Your Session

1. Run "AI Docs: View Current Session" to see a live preview of your documentation
2. View prompts, file changes, and session statistics in a dedicated panel

### Exporting Documentation

1. Run "AI Docs: Export Documentation as Markdown"
2. Choose where to save your documentation file
3. The extension generates a comprehensive markdown document ready for sharing

### Ending a Session

1. Run "AI Docs: End AI Documentation Session"
2. File tracking stops and the session is ready for export

## Configuration

The extension provides several configuration options:

- `ai-docs.autoTrackChanges`: Automatically track file changes during sessions (default: true)
- `ai-docs.maxDiffLines`: Maximum number of lines to show in code diffs (default: 10)
- `ai-docs.exportFormat`: Export format for documentation (default: "markdown")

## Example Output

The generated markdown includes:

```markdown
# AI-Assisted Development Session

**Session Date:** 1/20/2025
**Duration:** 15m 32s
**Prompts:** 5
**File Changes:** 12

## Overview

This document captures an AI-assisted development session...

## Development Timeline

### 1. Create a VS Code extension for documentation

**Time:** 2:30:45 PM

**Request:**
> I want to create a VS Code extension that converts all the prompts...

**Code Changes:**

#### 🆕 `package.json`
\`\`\`diff
+++ (new file)
+{
+  "name": "ai-documentation-exporter",
+  "displayName": "AI Documentation Exporter",
...
\`\`\`
```

## File Types Tracked

The extension automatically tracks changes to common development files:

- JavaScript/TypeScript (`.js`, `.ts`, `.jsx`, `.tsx`)
- Web files (`.html`, `.css`, `.scss`, `.vue`, `.svelte`)
- Configuration files (`.json`, `.yaml`, `.yml`)
- Documentation (`.md`)
- And many more!

## Use Cases

- **Learning Documentation**: Show how features were built step by step
- **Code Reviews**: Provide context for why changes were made
- **Tutorials**: Create educational content from real development sessions
- **Project Handoffs**: Help new team members understand the development process
- **Personal Reference**: Keep track of your problem-solving approaches

## Development

### Building

```bash
npm install
npm run compile
```

### Testing

```bash
npm run watch  # Watch for changes during development
```

### Packaging

```bash
npm install -g @vscode/vsce
vsce package
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Feedback

Found a bug or have a feature request? Please open an issue on GitHub! 