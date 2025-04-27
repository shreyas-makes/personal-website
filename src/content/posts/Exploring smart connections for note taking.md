---
title: "Exploring \"smart connections\" for note taking"
date: "2024-12-02T09:13:43.000Z"
slug: "exploring-smart-connections-for-note-taking"
tags: [knowledge, writing]
stage: "plant"
---

Not starting with a blank slate has been a great productivity boost in my writing. I wrote 50K words in 2024. And I can safely say that these 50K words have been written in a well thought manner, instead of an AI generated word salad.

All this, because I've been exploring this neat little plugin called as [Smart Connections on Obsidian.](https://www.google.com/search?q=smart+connections+obsidian+plugin&sourceid=chrome&ie=UTF-8) It is a tool, and I wouldn't be naive enough to say that tools don't matter. This tool allows for two main affordances:

*   The ability to ask questions and find answers sourced from your own documents.
*   The ability to make 'smart connections' across documents.

The strongest reason why this obscure plugin has changed my life is because of the ability to make semantic search possible.

Why does it matter, and why should we care? Let's deep dive into this.

Previously if I have to write an article about a 'dog', I search for the keyword 'dog' across all my notes and then find relevant ones. Absorb information from what I've written, and then copy paste snippets into the original doc, remixing and rehashing wherever necessary. However, this method fails to recognise that I might have written articles not just about the keyword 'dog', but also it's close cousins.

![](/images/2024/12/image-1.png)

There might be an article on pets which I might draw some inspiration from. It might even be an article on 'pet parenting', or 'pet food', or 'dog walking', 'pet walking'. A standard keyword search might not provide me these results. And this leads to them getting deeply buried in the existing pile of notes.

This is where semantic search helps. So what's the key difference between semantic search and keyword search?

![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fdhivelabs%2Fjr92quntJr.png?alt=media&token=0201e450-c158-4038-849d-46446ded90e4)

Source: Claude website

Let's say we search in our note-taking app — 'Where is the world cup'. It pulls in notes based on this query. Some of these top queries include:

*   The world cup is in Qatar.
*   The sky is blue.
*   The bear lives in the woods.
*   An apple is a fruit.

The reason why this was prioritised this way was because the responses have the following number of words in common with the query. The world cup is in Qatar. (4 words in common) The sky is blue. (2 words in common) The bear lives in the woods. (2 words in common) An apple is a fruit. (1 word in common)

Based on this, the winning response is "The world cup is in Qatar". However, we're not always lucky. Let's say we have this search result — 'Where in the world is my cup of coffee?'. This response has five words in common with the search query — 'Where is the world cup'. And it would rank first. Although they are not semantically connected.

Semantic search is helpful to find the nearest neighbours.

![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fdhivelabs%2F_7MpUXhBUY.png?alt=media&token=fe74b222-6781-441f-be96-d0aefcae1c8d)

Why should I care about semantic search when it comes to note taking? With the rise of LLMs and vector based search, it becomes easier and easier for us to find similar documents and pieces of text. We dont have to type in the exact keyword while searching through documents. We just need to be close enough. And the semantic search would do it's magic and find all the close cousins. You eliminate the cold start problem of writing with a blank slate.

![](https://firebasestorage.googleapis.com/v0/b/firescript-577a2.appspot.com/o/imgs%2Fapp%2Fdhivelabs%2FsubWkfNS5Q.png?alt=media&token=a96ef449-e234-4ad4-ad28-d64af6b4b0dc)

Even for writing this article, as you could see on the right side, I am able to find notes intelligently connected to my current piece.

For example, as I'm writing about 'smart connections' in general, it is able to connect this with a tweet by Connected Papers, and a relevant book of interest which talks about the same — The Goldilocks Map. It's even giving me a confidence level of correlation.

![](/images/2024/12/shreyas-17-10-2023-at-10.18.04@2x.png)

The note suggested has 79% similarity with the note I'm writing.

![](https://pbs.twimg.com/media/E3yU11-WYAgCx5w.jpg)

Another use of this plugin is the ability to ask questions based on your internal knowledge (you wouldn't be able to google this, as this is based on all your personal notes, key insights, wisdom you've gained).  
  
You might have already used some of those GPT based PDF chat services. It's the same, except that this works on all your private notes. For instance:

![](/images/2024/12/shreyas-17-10-2023-at-10.24.59@2x.png)

Notes serve as a source of inspiration and material to build upon, helping jumpstart the writing process. This is how I design my writing environment. With a fertile ground of ideas previously explored.

You could [download the plugin here](https://github.com/brianpetro/obsidian-smart-connections)! (And yes, I'm not being paid for this)