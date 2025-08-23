---
title: Conceptual Compression for LLMs
date: 2024-12-07T17:48:08.000Z
slug: conceptual-compression-for-llms
tags:
  - ai-coding
stage: sprout
---
Imagine you're building a house. You could break down the act of building into various steps: first comes the foundation, then the framing, then the roofing, and the plumbing, and the wiring, and so on.

Or you could try to do it all at once, ordering a jumble of materials and hoping they somehow come together into a structure. When I instructed Claude/Cursor to build an app, I did something similar by jumbling it up. I dumped a vague request into the LLMs and hoped for the best. "Build me an app that does X."

Unsurprisingly, the results are often disappointing. It's like asking an architect to design your dream home without giving any specifics. You'll get something, but probably not what you wanted.

The smarter way is to break the problem down into modules. Front-end, back-end, data model. Then break those down further. It's the programming equivalent of "divide and conquer." You're not just throwing the whole problem at the AI and crossing your fingers. You're guiding it step by step.

By doing it this way, it was:

1.  Easier to verify each piece is correct.
2.  Iterate on individual components.
3.  Also mapping out well on how we naturally think about problems.

In essence, you're applying the principle of encapsulation to your interaction with AI. Encapsulation is one of those ideas that keeps coming up in computer science because it's so powerful. It's about hiding complexity and exposing only what's necessary.

When you encapsulate the building blocks, and give instructions step by step to AI, you're doing the same thing. You're creating conceptual compression.

When I think about encapsulation, I think about DHH and his vision centered around compressing complexity in the developer experience through Ruby on Rails. He wants to make it easier for full-stack developers to see and keep the entire _problem space/idea maze_ in their head. The brain still has a budget, and simplification helps optimize the _limited monkey brains_.

You're saying, "Don't worry about the whole system right now. Just focus on this specific part." It's like the difference between asking someone to build a car versus asking them to design a transmission. The second task is much more manageable.

Even Descartes spoke about something similar:

1.  Accept only what's clear and distinct.
2.  Break problems into smaller parts.
3.  Solve the simplest problems first.
4.  Be thorough and comprehensive.

You're breaking the problem down and tackling the simplest parts first. When you're dealing with a complex system, it's easy to get overwhelmed by all the moving parts. It's like putting blinders on a horse - sometimes, limiting your field of view can help you move forward more effectively.

I have now started to routinely adopt the encapsulation approach in my codebase. Instead of one-shot prompting the AI, I now write down a Product Requirements Document. Spending 80% of the time "architecting the code" by actually writing the PRD for what you'd want to build, focussing on all possible functionalities that you can think of, and write them down in a .md file, and then adding this to the codebase for the LLMs to ingest.

The impact of this approach compounds over time. It's like adjusting the course of an airplane by a few degrees at takeoff. At first, the change seems negligible. But over a long journey, it can mean the difference between landing in New York and Washington D.C.

You can catch hallucinations earlier, and build better software that matches your vision.

So next time you're tempted to ask an AI to "build an app," resist the urge. Break it down. Encapsulate. Your future self will thank you.