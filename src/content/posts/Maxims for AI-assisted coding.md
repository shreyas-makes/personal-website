---
title: Maxims for AI-assisted coding
date: 2025-04-30
slug: maxims-ai-assisted-coding-cursor
tags:
  - ai-coding
stage: seedling
---

I've been building various tiny apps, scripts, and projects with AI-assisted coding. 

I've developed maxims that have proven effective in 'taming the dragon'. 

These principles are framework-agnostic and can be applied across different projects:

- Run multiple instructions simultaneously by pressing `CMD + T`. If you're on the Pro plan and terminal commands are slowing you down, this parallel approach saves valuable time. Some developers even open Cursor for the same codebase in multiple windows to provide instructions in parallel.
- When you're new to an existing codebase, ask Cursor to create mermaid diagrams of the codebase and chat with it. [This helps you get familiar with the structure.](https://x.com/kregenrek/status/1889065839200174435) If you have a github repo which you want to understand, replace 'hub' with 'diagram' to get a mermaid visualisation.`
- Create AI-generated commits consistently to help retrace your steps if things go wrong. I've set up a keybinding to generate commit messages and commit all changes in one keystroke:

```
{
"key": "ctrl+enter",
"command": "runCommands",
"args": {
"commands": [
{
"command": "git.stageAll"
},
{
"command": "cursor.generateGitCommitMessage"
},
{
"command": "git.commitAll"
},
{
"command": "git.sync"
}
]
}
},
```

- Store Documentation Locally: Following Karpathy's advice, store relevant documentation and example code in a `.cursor/documentation` directory for quick reference. Helpful to store a variety of documents in this folder such as PRD, App flow documents, design system, user schema, styling document etc
- API integrations are often challenging with AI assistance due to hallucinations or outdated information. Use "@web" to fetch the most current documentation, then create dedicated markdown files for each API you're using. For services like Stripe, either include the Stripe MCP server in Cursor or add code snippets from the latest documentation.
- For simpler apps, focus on articulating your goals rather than providing precise instructions. This approach gives the AI room to suggest optimal solutions and frameworks it's confident in.
- Goal-Oriented Prompting: As one Reddit post wisely suggested:

```
Provide goals, not specific commands. 

Unless you can code, odds are you won't know the right instruction to give the agent. Give it a problem statement and outcomes. Then ask questions: > How would you make this? > What do you need from me? > What are your blind spots?
```

- According to Claude's whitepaper on agentic coding tools, positioning your most important goals at both the beginning and end of your prompts can be effective, as LLMs give more "attention" to these positions.
- Use models with larger context windows (like Gemini 2.5 Pro, o3) when starting a new codebase that needs comprehensive understanding. For smaller, well-defined tasks, Claude Sonnet 3.7 or Claude 3.5 Sonnet can be more efficient. 
- For frontend implementations, v0.dev produces high-quality React/Tailwind components. I've created an [npm library to convert these components for Rails projects]([[v0-rails]]).
- When words aren't enough to convey your design intent, use Frame0 for low-fidelity mockups or Figma for higher-fidelity ones. That said, I've found I rarely need Figma these days—clear verbal direction is often sufficient.
- Follow the Explore-Plan-Code Workflow: The TDD approach works best for side projects. Instead of jumping straight to code, have your AI assistant review the plan first, break it down into a prompt-plan.md file, and provide targeted instructions. Once the code generated for each section is done, run rigorous tests to check if everything is working as planned, move forward, only after successful completion of tests.
- Use .cursorignore to ignore files that need not be indexed such as `/dist` in JS projects etc. 
- Use `gitingest` to get all the relevant files (filtered by extension, directory), which you can then use to feed to ChatGPT and ask questions. 
- Keep the context short, the longer the context, the more hallucinations AI is prone to. Best to keep it to 10-15 conversation replies in the Cursor composer window. If you're still not landing there, open a new Cursor chat.
- Claude, Gemini 2.5 Pro etc can help create a clear plan in markdown. Keep asking clarifying questions, do socratic reasoning, and gradually improve the specs doc. Use multiple models to help overcome gaps (if any). In your chats, keep referring to the `@product-specs.md` created frequently.
- System prompt in "Rules for AI" in cursor settings:
	- Keep answers short and concise.
	- Don't be a sycophant and answer always in a agreeable manner, disagree if you think the reasoning is wrong.
	- Avoid unnecessary explanations.
	- Prioritize technical details over generic advice.
- Use [Context7](https://context7.com/), an MCP for referring to the latest docs
- [BrowserTools MCP](https://github.com/AgentDeskAI/browser-tools-mcp) can fully automate analysis of browser logs (no longer going to console, copy pasting logs into your chat)

