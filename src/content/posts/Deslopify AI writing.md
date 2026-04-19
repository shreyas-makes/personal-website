---
title: Deslopify AI writing
date: 2026-01-12T00:00:00.000Z
stage: seedling
tags:
  - rough-notes
---
I recently launched a skill that can be used to deslopify AI content of any form. I built it to remove AI tells from writing so it reads more human, without erasing the author behind it. I found it a bit weird to build this skill, as I was using AI to make it anti-AI, all I can say now is that this is more of an art experiment to see how much AI can strip itself out of any AI-ness in its words and essay outputs.

[I published the repo here. ](https://github.com/shreyas-makes/deslopify/tree/main)

I wanted this to work on real articles, not just a paragraph as a prompt. I also wanted to ensure structure gets preserved. Headings, lists, tables, links, and code blocks stay where they are; the copy inside them is what changes.

My second decision was the constraint source. I tied the skill to Wikipedia's "[Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)" page because it is updated frequently and reflects current consensus. The workflow assumes a fresh fetch at invocation time and uses a local fallback list of the wikipedia article if the network is not available.

From there, the workflow is simple:

- Refresh the AI-tells reference.
- Open the target file and keep formatting intact.
- Rewrite sentence-by-sentence, removing tells and formulaic patterns.
- Validate against the current list and iterate until the tells are gone.
- Output clean copy only, no scoring or commentary.

I also wanted to cut throat-clearing openers. Wanted to avoid binary "Not X. But Y." constructions. Vary sentence length and do not end every paragraph with a punchline. State things directly. Skip rhetorical questions. The goal was not to just sound "clever," it is to sound like a person who knows what they mean.

Another constraint mattered: no new voice. The skill should not invent humor, urgency, or brand tone that was not already there. It keeps meaning, intent, and rhythm while removing the tells.

In practice, Deslopify behaves like a careful editor. It does not add new ideas. It trims, rephrases, and rebalances. The result is copy that reads clean and human while preserving structure.

To use Deslopify, open your Codex / Opencode / Claude Code CLI pointing to a certain folder, and reference the .md file you want to modify:

1) Invoke it on a file:
`deslopify article.md`

2) Or paste text directly:
`deslopify "your draft here"`

3) It preserves structure and returns clean copy only.

4) It refreshes the Wikipedia tells list when network access is available, otherwise uses cached or fallback lists.

I tried initially for a simple paragraph: this was related to an excerpt on global warming, and I wanted to see how it generated an output deslopified

Original (excerpt):

```
Global warming represents one of the most pressing challenges facing humanity today. This phenomenon refers to the long-term increase in Earth's average surface temperature, primarily caused by human activities that release greenhouse gases into the atmosphere..."
```

Deslopified output:

```
Global warming is one of the most urgent challenges we face. It refers to the long-term rise in Earth's average surface temperature, driven largely by human activity that releases greenhouse gases into the atmosphere. Since the late 1800s, the planet has warmed by about 1.1 degrees Celsius, with most of that increase happening in recent decades. Burning fossil fuels, deforestation, and industrial agriculture have raised levels of carbon dioxide, methane, and nitrous oxide. These gases trap heat that would otherwise escape into space, warming the climate system.

The effects are already visible and will intensify without major intervention. Ice caps and glaciers are melting faster, pushing sea levels higher and threatening coastal cities and island nations. Weather patterns are becoming more extreme, with stronger hurricanes, longer droughts, larger wildfires, and heavier floods. Ocean warming is bleaching coral reefs and disrupting marine ecosystems that millions rely on for food and income. Farming faces pressure as growing seasons shift, water scarcity spreads, and yields become less reliable. The burden falls hardest on poorer countries and vulnerable communities that did the least to cause the problem.

Addressing global warming requires coordinated action at every level. Shifting from fossil fuels to renewable energy like solar and wind is essential, along with energy efficiency and protecting forests that absorb carbon. Agreements like the Paris Agreement matter, but implementation is difficult amid competing economic and political interests. Wealthier nations carry added responsibility to cut emissions and fund sustainable development in countries with fewer resources. Innovation, from carbon capture to climate-smart agriculture, helps, but it must be matched by systemic policy and economic change.

The scale is daunting, but there are reasons for hope. Renewable energy costs have dropped sharply, making clean power more competitive. Public concern has risen, especially among younger generations pushing for action. Cities, businesses, and regional governments are adopting ambitious climate policies even when national efforts lag. The transition to a sustainable economy can also bring innovation, jobs, cleaner air, and better health. The choices made in the coming years will shape what kind of world we leave behind.
```


The result was still premium-mediocre at best, mainly because the topic was also not so spiky and individuated. I could also observe that there is no granulated texture to the writing output, it lacks the personhood and soul that's something which only humans can replicate (something like the voice of Voldemorts Diary in the Harry Potter series). This skill doesn’t let you emulate “liveness” as that’s something which cannot be defined, and yet it exists. Christopher Alexander talks about this quality at length in the book, Timeless way of building, where he explains the fuzziness in defining a “great” building, it could be defined in so many ways such as being alive, beautiful, perfect etc, but yet there is no single word that could encapsulate it all. Christopher Alexander explains his personal definition struggle as the struggle to break down the difference between what is as is, and what it ought to be. That change becomes only evident when we experience something which is in the state of "ought to be", when we know some thing is in this state, we can say that it is already in the state, but it's hard to pin it down with definitions. 

And as far as the deslopify skill goes, if you don’t have a formal definition of the rules, it becomes difficult to truly make writing human. But it does remove the usual trite cliches which AI generated writing is commonly used to. So that's at least like one step lesser to remove all the dirty laundry from the writing.
