---
title: How I build greenfield apps with AI-assisted coding
date: 2025-04-08
slug: greenfield-apps
tags:
  - ai-coding
  - llm
  - ruby-on-rails
stage: plant
---
Building apps with AI-assisted coding can be quite tricky if you start with a blank empty space. Previously I used to prompt the LLMs like a rookie by saying "fix this, add this, build this", and so on. And this is usually frowned upon in the developer circles, and it seems to be quite an irresponsible way to do AI-assisted programming. But "vibe coding" has so much more to offer to this world, in terms of speed and velocity, and it's important to not loose sight of the larger goal: to build the right things, and build things right. It's indeed a weird trajectory that programming has taken recently, and if this works out, why not embrace it?

Any app is only as good as our ability to carefully prompt them. This could make or break the vibe-coded app. I first came across [Harper Reed's blog](https://harper.blog/2025/02/16/my-llm-codegen-workflow-atm/) talking about his own LLM-aided coding workflow, I felt like sharing something similar based on what I've learnt. Harper goes through a lot more LLM assistants, but my advice here is specific to Cursor IDE:

## Prepping the boilerplate

To ease things up, and to not write all the code completely, I use the [speedrails open-source rails boilerplate](https://github.com/ryanckulp/speedrail) to build my SaaS app on top of this. It provides strong conventions for a production-ready Rails 8 app. This is TBH the only Rails boilerplate you would need to get started with most of the use cases.
## Idea Honing

This is where you have a natural conversation with the latest reasoning model to think the whole design of the app with you. You want the chat assistant to find gaps, poke holes, ask carefully considered questions which you might have not considered. 

The assistant is your "philosopher in residence".

```

Ask me one question at a time so we can develop a thorough, step-by-step spec for this idea. Each question should build on my previous answers, and our end goal is to have a detailed specification I can hand off to a developer.  

This developer who I am going to hand off to is more comfortable with an approach where the core logic is built first, and then once the function is achieved, you iteratievly build the scaffolding, backend infrastructure, and finally the frontend user experience.

Let's do this iteratively and dig into every relevant detail. Remember, only one question at a time.  
  
Here's the idea: (Idea)

```

Coming from a designer background, I'd previously attempted to follow frontend-first approach to building the application so that I could visualise the user experience better, but it failed badly when in one scenario, I built a perfect house, without the plumbing, electricity, and the ability to provide shelter. Form should ALWAYS follow function, and never the other way round. This was a trite passage, that i have reminded myself with, in multiple occasions, and with multiple vibe-coded apps breaking miserably when I inverted the sequence of form/function, I was humbled by the importance of this designerly quote.

At the end of the question-storm, you will end with a natural conclusion, you would now need to synthesize this chat thread into something more concrete. This is where you convert this into developer-ready specification.

```

Now that we've wrapped up the brainstorming process, can you compile our findings into a comprehensive, developer-ready specification? Include all relevant requirements, architecture choices, data handling details, error handling strategies, and a testing plan so a developer can immediately begin implementation.

```

Create a /docs folder in your project directory, and add this file created under `specs.md`

Once it creates this, I do another round of "poking holes" just to be sure.

```
Poke holes into this essay and find gaps wherever possible.
```

I also exhaust my Perplexity Deep research credits to make an extensive whitepaper based on the specs.md file.

I then carefully examine the tech architecture defaults, and prefer to pick the ones which are LLM-friendly (for instance, as of 9 Mar, 2025, Rails 7.2 is more LLM-friendly than Rails 8.1).

Once I'm confident with the `specs.md` file, I move on to the next stage.

## Planning

I prefer to test the specs at each stage of development, and to ensure that the tests pass as planned. Especially when non-coders (such as myself), have no idea if what's running is actually working or not, this is a great litmus test to progressively expand the scope of the app.

```

Draft a detailed, step-by-step blueprint for building this project. Then, once you have a solid plan, break it down into small, iterative chunks that build on each other. Look at these chunks and then go another round to break it into small steps. Review the results and make sure that the steps are small enough to be implemented safely with strong testing, but big enough to move the project forward. Iterate until you feel that the steps are right sized for this project. 

From here you should have the foundation to provide a series of prompts for a code-generation LLM that will implement each step in a test-driven manner. Prioritize best practices, incremental progress, and early testing, ensuring no big jumps in complexity at any stage. Make sure that each prompt builds on the previous prompts, and ends with wiring things together. 

There should be no hanging or orphaned code that isn't integrated into a previous step. Make sure and separate each prompt section. Use markdown. Each prompt should be tagged as text using code tags. The goal is to output prompts, but context, etc is important as well. 

@specs.md
```

It should output a prompt plan that you can execute with aider, cursor, etc. I like to save this as docs/ `prompt_plan.md` in the repo.

I then have it output a `todo.md` that can be checked off.

```prompt
Can you make a `todo.md` that I can use as a checklist? Be thorough.

After each phase, ensure that you also provide the reason as to why the scope of each phase was chosen and how it's stacked.
```

I do this to also understand why each phase is written in a specific way, and why the order was chosen as such.

As you continue to build the app, you can cross off items from the todo list as shown here in this example app:

```
# blogggg Implementation Checklist

## Phase 1: Core Infrastructure Setup

### Rails Foundation

- [x] Create new Rails 8.0.1 app with PostgreSQL

- [x] Configure modern components:

- [x] RSpec + FactoryBot

- [x] Database Cleaner

- [ ] Configure Hatchbox.io deployment:

- [x] Implement health check endpoint

- [x] Write infrastructure tests:
...
...
...
```

Now you have a robust plan and documentation that will help you execute and build your project. 

The workflow looks something like this

- Build the prompt-plan.md, specs.md and todo.md.
- Set up the boilerplate
- Set up git version control and keep pushing commits during important milestones
- Run code phase by phase based on the prompt-plan.md document.
- After each phase, run integration tests and ensure all of the pass successfully
- Once successful, move on to the next phase and continue

Now you have a robust plan and documentation that will help you execute and build your project. 

Surprising and scary.

