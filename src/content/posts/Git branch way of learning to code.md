---
title: Git way of learning to code
date: 2025-02-14
slug: git-way-learning-to-code
tags:
  - rough-notes
  - ai-coding
stage: plant
---
My last year's resolution was to learn how to build on Rails. I taught myself the basics by following some courses, but nothing really stuck with me. I wasn’t building apps; I was getting into a tutorial rut. I needed a better way to learn, akin to being pushed into the river with a swimming instructor. 

So, I discovered the Founder/Hacker course, which provided more tactical insights into the actual process of building Rails apps. Most online courses polish the loose ends and make it look spotless, but Ryan Kulp didn’t want to do that. He wanted us to see through the mistakes he made as he built the app in a spontaneous manner. I enjoyed this approach so much and have been practicing Rails fundamentals ever since.

In a few months, the learning-to-code landscape has changed rapidly (dated. Mar, 2025). Nobody learns syntax anymore; you just start building things with a bare minimum understanding of the system. AI coding introduces new paradigms such as Model Control Programs (MCPs), Cursor rules, Project rules, and embedded documentation. I briefly got enamored with this process and felt that all my efforts to understand syntax and learn to write code might be futile. 

I was wrong, and now I believe it’s important to understand both ways of building apps—by writing code yourself and by leveraging AI to do the heavy lifting.

The problem with AI coding is that it's non-deterministic; you might not know when you will face errors. 

Sometimes it works, and sometimes it doesn’t, making it hard to predict when it breaks. As a learner, I wanted to figure out the strengths of both traditional coding and AI-assisted coding. Right now, everyone is excited about AI-assisted coding, but as a learner, I have a hunch that it won’t serve all our needs which made me explore both.

Learning Loop 1 — In my first attempt, I started watching building videos passively, similar to watching TV. It was very passive, and I forgot most of what I listened to. I had to rewatch various videos again and again, but it never stuck with me.

Learning Loop 2 — Realizing that coding videos are better learned by practicing directly, I started watching videos and then pausing them to try the concepts in my local environment. This worked fine for a while, until something broke. It was hard to rewind without using Git, and when I had a small gap in my learning and wanted to dive deep into the coding lectures, I didn’t quite know where to start.

Learning Loop 3 — Having learned the ability to do versioning with Git the hard way, I started making extensive Git commits based on what I changed while building the app. This allowed me to solve the cold start problem, especially when I had to start again after a long break. The Git commits helped me keep track of my progress.

Learning Loop 4 — With the latest AI coding paradigms evolving, I wanted to incorporate both approaches into my learning practice. I did this by using two specific branch names in Git. This was the methodology I followed for Git versioning:

#### Workflow for Both Approaches
1. **Create Separate Branches:**
   - For human updates: `git checkout -b human/feature-name`.
   - For AI agent updates: `git checkout -b ai-agent/feature-name`.

2. **Work Independently:**
   - Commit changes to the respective branches (`human/feature-name` or `ai-agent/feature-name`) as you develop or test.

3. **Merge Changes:**
   - Once both branches are ready, merge them back into the main branch (e.g., `main` or `dev`) or a shared feature branch.
   - Use `git merge` or create pull requests to review and resolve conflicts collaboratively.

I liked the improvement with the Git workflow as it helped demarcate the code written by humans and the code written by AI agents with Cursor. 

While building an app this way, I observed that it was relatively easier in some cases to write the code myself instead of relying on AI-assisted coding practices to reach my final outcome. In most other cases, the AI did a better job.
