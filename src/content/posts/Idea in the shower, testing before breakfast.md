---
title: "Idea in the shower, testing before breakfast"
date: "2025-01-12T12:31:35.000Z"
slug: "idea-in-the-shower-testing-before-breakfast"
tags: [software, ai, rough-notes]
stage: "sprout"
---
Imagine having an idea in the shower and testing it before breakfast? It's highly plausible now as AI lets you prototype at the speed of thought. Currently, I use Claude Projects and Cursor to build what I call disposable apps: quick prototypes that prove a point (read more in [this essay about vibe coding]([[Vibe coding]])). The magic? No sunk costs. I can write 5,000 lines of code in ten minutes, test it, and throw it away if it doesn't work. This freedom to experiment has transformed how I solve problems.

Sharing the AI tools I'm currently using (dated 11 Jan, 2025). I have to 'explicitly' mention the timestamp as everything, everywhere might change soon, and that's a big caveat before I share this:

Prototyping
-----------

Personally, the biggest gain in my productivity has been in the realm of prototyping.

Especially the 'prototyping for dummies' types helping leverage english as a programming language.

I've been able to quickly generate disposable apps and interactions, that demonstrate a quick something. Previously to communicate the perceived benefit of that quick-something, I might have had to negotiate with the developers on the perceived cost, effort and marginal benefit. But now, I can get to the prototype even less than the time it takes to schedule a call and discuss requirements with the developers. And as there is no sunk cost, you automatically get into the mode where you can build more and more prototypes, and test them out. (To make things easier, separate the abstractions as much as possible, read more about [this approach in this essay]([[Conceptual Compression for LLMs]]))

Claude Projects has been quite helpful to build all these extraneous stuff that includes documentations, web UIs that do something (massage the JSONs, scrape some elements from a website etc), readily available CSS styles which can be prompted by saying 'make it look pretty...', unit tests, DevOps while dealing with Docker containers, Linux commands etc.

I also use [**Claude projects**](https://claude.ai/) as my therapist, my health coach, my DevOps engineer for my hobbyist apps deployed online, etc. Because of a shorter context window offered by Claude Projects, I usually split various components of an app into dozens of micro-services, and work with those micro-services using Claude Projects.

When I find myself wanting to get into the weeds, as I still consider myself as an 'mediocre developer', I do observe some anti-patterns of being a 'solution copier' instead of being a 'problem solver' with LLMs. The trick here is not to keep repeating 'just fix this' in loop, as and when you see a compilation error. I've noticed that **Claude/Cursor** might also make/break the fundamental logic, which is all the reason why we need to supervise its chain of thought accordingly.

![](/images/2025/01/image-10.png)

As for Cursor, I've been using it as my Local Development Assistant (as described in this guest post by Colin Mathews on the Lennys Newsletter). I've been running Cursor's assistant on the codebase locally using it primarily in three different ways — autocomplete, chat assistant and search.

**Autocomplete** — This makes me more productive by helping me do more of the grunt work of typing code. As I work primarily with React / Rails and Flutter code, I sometimes forget the syntax and I just ask AI to write the code in the appropriate syntax. I also find myself lazy to sprinkle comments wherever necessary in the code files, and AI does this well.

**Search your local codebase** — If I have a question about how the files are organised within the codebase, I ask the same, get answers, parse the details and perform the next steps. The benefit of asking questions locally on your codebase is that Cursor has all the context to give more fine tuned inputs (I could try digging Stack overflow, or ask Perplexity/GPT the same, but it would still fall into the same problem of not having enough context of my local codebase). Helps me solve the 'needle in the haystack' problem where I have no idea what the code is doing, and I can ask the entire codebase to get some answers.

**Chat-driven programming** — This is by far, the most difficult and I'm still learning here. The idea is to just use the AI chat to completely build your app without interacting with the files directly. As the outputs are non-deterministic, and the AI changes the output and behavior all the time, it's a lot of work to get it right.

Search and Research
-------------------

Semantic search has been a great blessing, and I use AI search liberally across multiple platforms. I use **Perplexity Pro** for latest-up-to-date information (especially market research, news related, stock insights etc), as this doesn't have the knowledge cutoff similar to the other tools such as GPT4, Cursor etc. Grok for uncensored, off-the-cuff internet information, Exa.ai for vibe/meaning based search.

I've also seen other product managers use [**Granola**](https://www.granola.ai/) to digest all their meetings and ask specific questions based on the meetings they've attended. I'm still yet to explore this.

Outputs and UI
--------------

The **Advanced Voice Mode** by OpenAI is quite nice that the conversations flow very naturally. Julian from Linear used it to talk out loud his thinking towards an essay, and it asked him various questions like a true thought partner:

**BetterDictation** for voice inputs have also been so good. I've been using BetterDictation in conjunction with Claude Projects to ask dumb questions fast, as the speed at which you can talk is faster than the speed at which you can write. Personally, it seems to be 5x faster than writing.

Apart from creating documents, better dictations, and better conversational assistance, I've also seen great outputs to create frontend.

Instead of making mockups in Figma, I go straight to [**Vercel's v0**](https://v0.dev/) and prompt my way through creating the entire landing page. More recently, I've also observed various startup studios doing the same, bypassing the conventional design system/wireframes/mockups/screens process on Figma, and jumping straight into building the page in its entirely purely through prompts.

To summarise:

Prototyping — Cursor, Claude 3.5 Sonnet (for Chat, Auto completion and codebase search/find), Claude Projects for micro-apps, v0.dev and Lovable for disposable NextJS apps with a 'quick' auth/database integration