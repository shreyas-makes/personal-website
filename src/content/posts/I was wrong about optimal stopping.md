---
title: I was wrong about optimal stopping
date: 2025-04-07
slug: optimal-stopping
tags:
  - mathematics
  - rough-notes
stage: seedling
---
If you were tasked with a need to find the tallest mountain, and went searching in a far away land surrounded by a series of mountains, how would you finalise the tallest mountain, especially when you could still go farther, and find even more taller mountains (only if you explore even more). 

There are various ways to term this, some call it the travelling salesman problem, or the "secretary problem", or just as the "optimal stopping" problem, which attempts to come to a mathematical decision on when to actually stop in such explore versus exploit situations. 

I first saw this mentioned in the book, *Algorithms to Live By*, and was mesmerized by the practical applications of it, in everyday life. And for years, I thought the optimal stopping problem was all about the timeline. You go 37% of the way through the time period, and you make the big decision if you see a better option. Not too soon, not too late. 

But that was so wrong. It was not just "reject the first 37% of your time window, and then choose the next best". Mathematically, it's about the number of discrete options (aka decision counts), not time. 

If we were to extend this to hiring candidates:

- Wrong: “We’ll interview for 3 months, then decide.”
    
- Right: “We expect ~20 candidates. Reject the first 7–8, hire the next best one.”

For career moves:

- Wrong: “Switch jobs after the first 5 years.”
    
- Right: “Try ~10 career directions? Explore 3–4, then commit to the next clearly better one.”

For startups:

- Wrong: “Spend 1 year scanning ideas, then commit.”
    
- Right: “If I’ll vet ~25 ideas, benchmark the first 9, then jump on the next standout.”

The only catch here is that you will not be able to know the total **n** in advance. How might you be able to take a guess on the total number of job offers, partners, or startup ideas that you can have? It's based on this. But when you do have a very concrete value for (N), it becomes easy (eg. hiring rounds, apartment hunting etc)




