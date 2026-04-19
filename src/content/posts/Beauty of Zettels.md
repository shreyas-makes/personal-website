---
title: Beauty of Zettels
description: >-
  I've tried various tools and systems for online writing, but nothing beats the
  power of Zettels.  What are they, really? You may ask. They come from the
  Zettelkasten method, developed by Niklas...
date: '2024-12-06'
slug: beauty-of-zettels
tags:
  - writing
stage: plant
---
I've tried various tools and systems for online writing, but nothing beats the power of Zettels. 

What are they, really? You may ask.

They come from the Zettelkasten method, developed by Niklas Luhmann, a German sociologist who was incredibly prolific. He wrote around 70 books and 400 peer-reviewed articles in 30 years. That's a lot of writing. How did he do it? He credits his Zettelkasten.

**Zettels are the best way to connect and preserve ideas.**

Zettelkasten means "box of paper cards" in German. But it's much more than that. It's a system where each card contains a single idea, and these cards are densely interconnected. As you add more cards and connections, patterns emerge across themes and categories. Your ideas stop being isolated and start talking to each other.

This interconnectedness leads to unexpected insights. 

[George Supreeth](https://www.google.com/search?q=george+supreeth&sourceid=chrome&ie=UTF-8), a design leader, found that his notes on rhizomes led him to Arthur Koestler's Holons, Herbert Simon's watchmakers, linguistic holonyms, and even a line from Yeats. That's the power of Zettels - they help you stumble upon connections you'd never have made otherwise. With the advent of semantic-search through LLMs, the whole process of arriving at newfound connections through your personal notes have become even more easier.

Zettels lead to "**Consilience**" — the idea that all knowledge should eventually interlock, producing a unified understanding of reality. Below is a network showing this unity, as measured by co-citations.

![[Attachments/images/2025/01/image-11.png]]

But this power has a downside. You can get lost in the maze of connections. Casual browsing of your notes can spark more ideas than you can handle. It's like having a superpower you can't fully control.

The real beauty of Zettels is that they're composable, like LEGO blocks. You can combine and recombine them to build complex structures of thought. Just as you can use LEGO to build anything from a simple house to an intricate spaceship, you can use Zettels to construct everything from a brief article to a comprehensive book.

In fact, Zettels are to writing what LEGO is to toys, or what compound interest is to finance. They're fundamental units that, when combined, yield results far greater than the sum of their parts. Stack your Zettels right, and you'll find yourself cooking up insights you never knew you had.

There's something magical about the tightly interwoven matrix of mental models that emerges from a well-maintained Zettelkasten. It's a unique reflection of your thought processes, a map of your intellectual territory. And like any good map, it not only shows you where you've been, but also points to unexplored areas ripe for discovery.

If you're serious about writing or thinking, you owe it to yourself to try the Zettelkasten method. The best way to start is simple: use Roam Research. Break your notes into atomic units called Zettels.

![[Attachments/images/2024/12/shreyas-06-12-2024-at-13.56.43@2x.jpg]]

![[Attachments/images/2024/12/shreyas-06-12-2024-at-13.57.11@2x.jpg]]

Literature notes are direct quotes or highlights from your sources. They're the raw material you're working with. In this example, I'd read two essays on Jhanas as a meditative experience which sparked an idea leading me to draft a Zettel around this.

Reference notes are your translation of what you read. Not a new interpretation, just how you understood it. It's like explaining it to yourself. This connects to Feynman's idea: if you can teach it, you've really learned it.

Fleeting notes are where you let your mind wander. You're trying to connect ideas, looking for unexpected links. It's all about associative thinking.

Each Zettel is like a tripod, standing on three legs: fleeting notes, literature notes, and reference notes.

![[Attachments/images/2024/12/image-3.png]]

The power of this system isn't in any one note. It's in the connections between notes. As you build more connections, you'll start to see patterns you never noticed before.

![[Attachments/images/2024/12/image-4.png]]

That's when the real insights happen. 

This is the template I use to draft my Zettels on my Obsidian vault:

```
---
id: <% tp.date.now("YYYYMMDDHHmm") %>
title: 
created: <% tp.date.now("YYYY-MM-DD") %>
tags: Zettel
source: 
---

# <% tp.file.title %>

## Idea
Write the core idea in your own words.
One idea only. If you use "and", split the note.

## Reference notes
- citations from the notes from which you have taken a reference 

## Literature notes
- these are direct notes taken without any reference, coming straight from your stream of consciousness on what you understood from the articles cited
## Why it matters
What changes if this idea is true?
Where does it apply?

## Connections
- Related: 
- Contrasts: 
- Builds on: 

## Evidence / Examples
Concrete example, anecdote, or reference.

## Open questions
- 

## Source note
Optional short reference or link to source note
```
