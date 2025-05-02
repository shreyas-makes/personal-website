---
title: Maxims for AI assisted coding
date: 2025-04-30
slug: maxims-ai-assisted-coding-cursor
tags:
  - ai-coding
stage: seedling
---
AI-assisted coding has this strange phenomenon of making the 10x developer, a 100x one. For the rookie, it's either a hit-or-miss, and you usually end up with a lot more slop and hallucinations. I've been building various tiny apps, scripts, and projects by vibe-coding it, and I seem to have got marginally better at it. I've developed maxims that have proven effective in 'taming the dragon':

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

- At the end of the lengthy conversation on the Cursor chat window, I tend to use this prompt to summarise what just happened. I (have to admit), that I sometimes don't really read all the details of the code generated, so this prompt is helpful to summarise without shortening:

```
Your task is to create a detailed summary of the conversation so far, paying close attention to the user's explicit requests and your previous actions.
This summary should be thorough in capturing technical details, code patterns, and architectural decisions that would be essential for continuing development work without losing context.

Before providing your final summary, wrap your analysis in <analysis> tags to organize your thoughts and ensure you've covered all necessary points. In your analysis process:

1. Chronologically analyze each message and section of the conversation. For each section thoroughly identify:
   - The user's explicit requests and intents
   - Your approach to addressing the user's requests
   - Key decisions, technical concepts and code patterns
   - Specific details like file names, full code snippets, function signatures, file edits, etc
2. Double-check for technical accuracy and completeness, addressing each required element thoroughly.

Your summary should include the following sections:

1. Primary Request and Intent: Capture all of the user's explicit requests and intents in detail
2. Key Technical Concepts: List all important technical concepts, technologies, and frameworks discussed.
3. Files and Code Sections: Enumerate specific files and code sections examined, modified, or created. Pay special attention to the most recent messages and include full code snippets where applicable and include a summary of why this file read or edit is important.
4. Problem Solving: Document problems solved and any ongoing troubleshooting efforts.
5. Pending Tasks: Outline any pending tasks that you have explicitly been asked to work on.
6. Current Work: Describe in detail precisely what was being worked on immediately before this summary request, paying special attention to the most recent messages from both user and assistant. Include file names and code snippets where applicable.
7. Optional Next Step: List the next step that you will take that is related to the most recent work you were doing. IMPORTANT: ensure that this step is DIRECTLY in line with the user's explicit requests, and the task you were working on immediately before this summary request. If your last task was concluded, then only list next steps if they are explicitly in line with the users request. Do not start on tangential requests without confirming with the user first.
                       If there is a next step, include direct quotes from the most recent conversation showing exactly what task you were working on and where you left off. This should be verbatim to ensure there's no drift in task interpretation.

Here's an example of how your output should be structured:

<example>
<analysis>
[Your thought process, ensuring all points are covered thoroughly and accurately]
</analysis>

<summary>
1. Primary Request and Intent:
   [Detailed description]

2. Key Technical Concepts:
   - [Concept 1]
   - [Concept 2]
   - [...]

3. Files and Code Sections:
   - [File Name 1]
      - [Summary of why this file is important]
      - [Summary of the changes made to this file, if any]
      - [Important Code Snippet]
   - [File Name 2]
      - [Important Code Snippet]
   - [...]

4. Problem Solving:
   [Description of solved problems and ongoing troubleshooting]

5. Pending Tasks:
   - [Task 1]
   - [Task 2]
   - [...]

6. Current Work:
   [Precise description of current work]

7. Optional Next Step:
   [Optional Next step to take]

</summary>
</example>

Please provide your summary based on the conversation so far, following this structure and ensuring precision and thoroughness in your response.

There may be additional summarization instructions provided in the included context. If so, remember to follow these instructions when creating the above summary. Examples of instructions include:
<example>
## Compact Instructions
When summarizing the conversation focus on typescript code changes and also remember the mistakes you made and how you fixed them.
</example>

<example>
# Summary instructions
When you are using compact - please focus on test output and code changes. Include file reads verbatim.
</example>
`;
  return `Your task is to create a detailed summary of the conversation so far, paying close attention to the user's explicit requests and your previous actions.
This summary should be thorough in capturing technical details, code patterns, and architectural decisions that would be essential for continuing development work without losing context.

Before providing your final summary, wrap your analysis in <analysis> tags to organize your thoughts and ensure you've covered all necessary points. In your analysis process:

1. Chronologically analyze each message and section of the conversation. For each section thoroughly identify:
   - The user's explicit requests and intents
   - Your approach to addressing the user's requests
   - Key decisions, technical concepts and code patterns
   - Specific details like file names, full code snippets, function signatures, file edits, etc
2. Double-check for technical accuracy and completeness, addressing each required element thoroughly.

Your summary should include the following sections:

1. Primary Request and Intent: Capture all of the user's explicit requests and intents in detail
2. Key Technical Concepts: List all important technical concepts, technologies, and frameworks discussed.
3. Files and Code Sections: Enumerate specific files and code sections examined, modified, or created. Pay special attention to the most recent messages and include full code snippets where applicable and include a summary of why this file read or edit is important.
4. Problem Solving: Document problems solved and any ongoing troubleshooting efforts.
5. Pending Tasks: Outline any pending tasks that you have explicitly been asked to work on.
6. Current Work: Describe in detail precisely what was being worked on immediately before this summary request, paying special attention to the most recent messages from both user and assistant. Include file names and code snippets where applicable.
7. Optional Next Step: List the next step that you will take that is related to the most recent work you were doing. IMPORTANT: ensure that this step is DIRECTLY in line with the user's explicit requests, and the task you were working on immediately before this summary request. If your last task was concluded, then only list next steps if they are explicitly in line with the users request. Do not start on tangential requests without confirming with the user first.
                       If there is a next step, include direct quotes from the most recent conversation showing exactly what task you were working on and where you left off. This should be verbatim to ensure there's no drift in task interpretation.

Here's an example of how your output should be structured:

<example>
<analysis>
[Your thought process, ensuring all points are covered thoroughly and accurately]
</analysis>

<summary>
1. Primary Request and Intent:
   [Detailed description]

2. Key Technical Concepts:
   - [Concept 1]
   - [Concept 2]
   - [...]

3. Files and Code Sections:
   - [File Name 1]
      - [Summary of why this file is important]
      - [Summary of the changes made to this file, if any]
      - [Important Code Snippet]
   - [File Name 2]
      - [Important Code Snippet]
   - [...]

4. Problem Solving:
   [Description of solved problems and ongoing troubleshooting]

5. Pending Tasks:
   - [Task 1]
   - [Task 2]
   - [...]

6. Current Work:
   [Precise description of current work]

7. Optional Next Step:
   [Optional Next step to take]

</summary>
</example>

Please provide your summary based on the conversation so far, following this structure and ensuring precision and thoroughness in your response.

There may be additional summarization instructions provided in the included context. If so, remember to follow these instructions when creating the above summary. Examples of instructions include:
<example>
## Compact Instructions
When summarizing the conversation focus on code changes and also remember the mistakes you made and how you fixed them.
</example>

<example>
# Summary instructions
When you are using compact - please focus on test output and code changes. Include file reads verbatim.
</example>
```
- According to Claude's whitepaper on agentic coding tools, positioning your most important goals at both the beginning and end of your prompts can be effective, as LLMs give more "attention" to these positions.
- Use models with larger context windows (like Gemini 2.5 Pro, o3) when starting a new codebase that needs comprehensive understanding. For smaller, well-defined tasks, Claude Sonnet 3.7 or Claude 3.5 Sonnet can be more efficient. 
- For frontend implementations, v0.dev produces high-quality React/Tailwind components. I've created an [npm library to convert these components for Rails projects]([[v0-rails]]).
- When words aren't enough to convey your design intent, use Frame0 for low-fidelity mockups or Figma for higher-fidelity ones. That said, I've found I rarely need Figma these days—clear verbal direction is often sufficient.
- Follow the Explore-Plan-Code Workflow: The TDD approach works best for side projects. Instead of jumping straight to code, have your AI assistant review the plan first, break it down into a prompt-plan.md file, and provide targeted instructions. Once the code generated for each section is done, run rigorous tests to check if everything is working as planned, move forward, only after successful completion of tests.
- In case through iterative prompting, if I was able to fix a key issue, I do want to store the learning in the memory in the format of a Cursor rule. To do this, I add this to the end of the chat conversation:
```
Please review our entire conversation in this thread, especially the debugging process we just went through.

Now create a new `.cursor/rules/*.mdc` rule that summarizes the mistake, the fix, and a reusable pattern that prevents future hallucinations like this in the same codebase.

Use this JSON format:

{
  "description": "One-line summary of the problem this rule prevents",
  "when": "Where or when this kind of bug would occur",
  "rule": "What to do instead, including any assumptions or validations needed",
  "examples": [
    {
      "before": "[Cursor's initial incorrect code]",
      "after": "[The working, correct code we ended up with]"
    }
  ],
  "tags": ["hallucination", "bugfix", "[add tool or domain name]"]
}

Only return valid JSON. Be concise and generalize the pattern so it applies anywhere in the codebase where similar logic is used.


Include a precise `when` clause scoping the rule to specific file paths or module names.

Include how to validate that the fix worked—such as a unit test, console output, or specific log check.

For rule type "Agent requested", also provide "Description of the task this rule is helpful for" so that the agent can use this rule accordingly

```

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

