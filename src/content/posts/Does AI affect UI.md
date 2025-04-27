---
title: "How does AI affect UI?"
date: "2024-08-12T08:56:23.000Z"
slug: "conversational-ai-design-patterns"
tags: [design, software]
stage: "sprout" 
---

Intended Audience — For conversational UI designers in healthcare industry curious about various UI affordances/design patterns in vogue right now

Our online conversations have been increasingly life-like, but yet life-less at the same time. The UI of apps have become more conversational and chat-like in nature. Not just apps, even websites have their own chat-like interfaces on the side. And all of them face the peril of being infested by bot-like avatars.

As [Maggie Appleton](https://maggieappleton.com/) points this out, we have more keyword-stuffing "content creators", and more algorithmically manipulated junk.

<blockquote class="quoteback" darkmode="" data-title="Dark Forest" data-author="Maggie Appleton" cite="https://maggieappleton.com/ai-dark-forest">
<div><span>It's like a dark forest that seems eerily devoid of human life – all the living creatures are hidden beneath the ground or up in trees. If they reveal themselves, they risk being attacked by automated predators.</span></div><div><br></div><div><span>Humans who want to engage in informal, unoptimised, personal interactions have to hide in closed spaces like invite-only Slack channels, Discord groups, email newsletters, small-scale blogs, and digital gardens. Or make themselves illegible and algorithmically incoherent in public venues.</span></div>
<footer>Maggie Appleton<cite> <a href="https://maggieappleton.com/ai-dark-forest">https://maggieappleton.com/ai-dark-forest</a></cite></footer>
</blockquote><script note="" src="https://cdn.jsdelivr.net/gh/Blogger-Peer-Review/quotebacks@1/quoteback.js"></script>

Bots are not necessary bad or evil, per se. It's just that the conversations enacted by them often feel soulless. Now, there have been instances where chatbot conversations have been more and more life-like.

![](/images/2024/08/shreyas-12-08-2024-at-09.54.43@2x.jpg)

Character-AI, an AI virtual chatbot service has had several reports of users getting addicted to the virtual bots, even choosing to engage with them over their partners

In this environment, it's interesting to see the design patterns adopted by the industry as we continue to use AI for conversations. Here are some design patterns that have caught my attention:

### Offering preset texts

![](/images/2024/08/image-1.png)

Screenshots from Wysa

The app offers pre-populated short answer suggestions, and suggested options for larger, more informational outputs with minimum user input required. Offering such pre-set text helps direct conversations and limit chances of breaking the conversational flow.

#### Overcoming gender-bias in voice agents

There is a disproportionate use of feminine names and voices when it comes to voice assistants.

<blockquote class="quoteback" darkmode="" data-title="Built In" data-author="Ellen " cite="https://builtin.com/artificial-intelligence/ai-voice-assistant-bias#:~:text=The%20Gender%20Bias%20Problem%20in,gender%20stereotypes%20this%20decision%20perpetuates">
<div><span>Over the last decade or so, the creators of popular AI voice assistants like Siri, Alexa and Google Assistant have come under fire for their disproportionate use of feminine names and voices, and the harmful gender stereotypes this decision perpetuates. Smart devices with feminine voices have been shown to reinforce commonly held gender biases that women are subservient and tolerant of poor treatment, and can be fertile ground for unchecked verbal abuse and sexual harassment.</span></div>
<footer>Ellen <cite> <a href="https://builtin.com/artificial-intelligence/ai-voice-assistant-bias#:~:text=The%20Gender%20Bias%20Problem%20in,gender%20stereotypes%20this%20decision%20perpetuates">https://builtin.com/artificial-intelligence/ai-voice-assistant-bias#:~:text=The%20Gender%20Bias%20Problem%20in,gender%20stereotypes%20this%20decision%20perpetuates</a></cite></footer>
</blockquote><script note="" src="https://cdn.jsdelivr.net/gh/Blogger-Peer-Review/quotebacks@1/quoteback.js"></script>

Recently came across the Genderless voice initiative, that aims to reduce this gender disparity.

> Q is a genderless voice assistant which is able to generate voice which is gender neutral. It would not only reflect diversity of our world, but also reduce the gender bias.

Q, Genderless Voice Assistant

#### Pre-answer, Post-answer

While chatbots continue to answer questions, it's important to think about the entire journey of a question. What happens before a question is answered? What happens after a question is answered?

![](/images/2024/08/image-9.png)

In the above example, Perplexity AI continues to provide cues for digging deeper into the rabbit hole, by providing suggested questions which the user can ask after having answered the question. This helps create a flywheel effect for the user curious about exploring a topic.

#### Handoff human

When AI related conversational threads don't go in the expected direction, and if it crosses a certain threshold of steering, the AI directs the conversation to a human expert to take it forward.

![](/images/2024/08/image-2.png)

Screenshot from KLM app

In this case, the airline chatbot (KLM) allows the user to switch to direct human interaction when it is unable to complete the task as requested.

Obviously prioritising a hand-off to human agents reduces the efficiencies that automation brings to business processes. But there will always be categories of complex issues that fall outside of an AI's capabilities, which human agents are better able to solve. Beyond complexity, where a relationship requires empathy, passion, emotion, or another form of authentic human connection, simulating this via AI is still a greater challenge than simply employing human agents to make that connection with the user.

#### Reducing the thickness of the 'technical wall'

In healthcare chatbots, most of the answers are quite dense. They might sound as if they've been extracted from the first paragraph of a relevant wikipedia article.

Conversational AI agents are trying their best to speak as a friend, and not use dense prose.

The first generation of conversational AI agents were trained in _la langue_, and not _la parole_. We see more instances of these agents using the colloquial common tongue, and making themselves sound more human.

![](/images/2024/08/image-3.png)

A friend helps you by telling you what they understand by it. This is the language used by AI for helping humans understand and comprehend better

#### Sidetracks and maintracks

![](/images/2024/08/image-5.png)

Chatbots usually have an objective. Whenever users slightly get off-track or derailed, it's important to get them back into the core 'job-to-be-done'. Why did they come here for? What purpose does this chatbot solve? In the above example, you can see how the agent brings them back to the key function when the user asks multiple topics on different threads.

#### Avoiding dead ends

It's important to also design keeping continuity in mind. When we ask the chatbot a question which it doesn't have an answer to, and it replies with an 'I don't know...'. It just ends there in an awkward manner, and there is higher friction to restart the conversation again.

Most people will just give up when chatbots or assistants say something similar to “I’m sorry, I’m still learning”, “I’m not sure I can help with that”.

It is in these situations that the user and the business need the conversation to keep going. Here’s how you do it.

![](/images/2024/08/image-6.png)

As you can see here, the conversation extends despite the chatbot not having an answer to the user's immediate question. More starter text is provided to overcome the friction.

#### Conversational implicature

When users ask a question, what is said, and what is implied might be two different things. It's important for the chatbot to get the complete context before answering such questions.

If we have a medical topic being shared, and there is an immediate question asked, then the ai should pull in both the previous answer as well as the question to understand the implied question (hidden between the lines)

It is common knowledge that we humans don’t always mean what we say, or say what we mean. We use metaphors or form sentences in the context of other events. For another human being, it’s a natural thing to process this sort of conversations. Of course we “know” what the other person wants. We don’t need people to use a specific set of words.

This is called as conversational implicature.

We see this a lot in customer service. Customers who call about a broken internet connection complain about the same problem in a different way. “I’m not able to get online” and, “I think my internet is broken” is both indicative of “a problem” and the problem is “lack of internet”. This is why you need to write alternate queries for the same piece of information.

![](/images/2024/08/image-7.png)

Thinking about **what they mean**, **why they said it** and **what they actually said** can help you give a holistic user experience.

#### Citations for trust

Citations help users verify that the referenced material is relevant and valid. This way users don't cede control over the accuracy of their content to the AI's search engine.

The adoption of RAG (Retrieval Augmented Generation) has helped dramatically improve the AI's response by getting really good at the needle-in-the-haystack problem.

![](/images/2024/08/image-8.png)

Now, instead of simply summarizing a topic or a [primary source](https://www.shapeof.ai/patterns/references), AI can collect information from multiple sources and aggregate it into a single response. Citations help users trace the information contained in a response back to its original material.

And there is more to the list!

![](/images/2024/08/image-10.png)

Table of the nine GenAI-Enhanced Design Patterns

These are the nine broad design patterns that have proliferated in the AI landscape over the past year.