---
title: We have been scammed by the Gaussian distribution club
description: "Taleb insists that we've been scammed by the Gaussian distribution club.  The gaussian distribution has become so ubiquitous in our daily jargons, oru day-to-day decisions even.  >\"We have been duped..."
date: 2025-04-08
slug: levy-stable-gaussian
tags:
  - mathematics
  - systems-thinking
  - rough-notes
  - decision-making
  - probability
stage: seedling
---
Taleb insists that we've been scammed by the Gaussian distribution club. 

The gaussian distribution has become so ubiquitous in our daily jargons, oru day-to-day decisions even. 

>*"We have been duped by the bell curve. Mandelbrot was the first to rigorously prove that markets are not Gaussian."* – Taleb


As most real-world phenomena: especially complex, human-involved systems are not well-behaved in any sense : **Gaussian distributions are the exception, not the rule.** 

My world view has also changed after reading Nassim Taleb's Fooled by Randomness book, and I'll form my opinion here in this essay as to why it's so:

Most of the non-deterministic random events can be classified as either a thin-tail, or a fat-tailed in nature. 

If we take the example of the average height of human population, it's a thin-tailed event, especially since there is a strict upper bound (ceiling) to what the tallest person could be. There are also no complex interdynamic feedback loops that reinforce each other, and therefore, it's possible to estimate with certain confidence, what the "average height" could be. It can certainly (NEVER) be the equivalent of Burj Khalifa no matter what edge case we might consider for modelling this distribution.

Mandelbrot builds on this idea, and explains that most natural phenomena dont follow such normalised thin-tail gaussian distributions. Instead, they exhibit more "wild randomness". Mandelbrot's early work was on cotton price fluctuations, and how he demonstrated this to be incongruous with the Gaussian models.

And it's not just with financial markets, you could see it all over: wealth distributions, book sales, war, Fukushima, pandemics — places where a single data point (a Black swan), can completely disrupt the average. And to model real-world risks more accurately, Taleb insists we follow Mandelbrot's Lévy-stable distributions which better explain real-world risks. What is a Lévy-stable distribution?

Example:

- If 10,000 people each lose $1, that’s $10,000.
- If **one** person loses **$10 million**, that single event overwhelms the rest.

In these examples, there are volatile clusters, price changes in market are more "jumpy", large changes are more frequent. And are therefore, fat-tailed. And in such systems, it becomes pointless to even do a forecast, as they have infinite variance.

And as a result, it leads to a form of epistemic humility, where you don't use confidence intervals, don't use standard deviation, don't even do probabilistic forecasts. You could throw all the standard deviation math you learnt in school textbooks and put it into the dustbin.

And instead of them, you focus on other aspects of risk-management: what is the maximum loss you can absorb? any non-linear payoffs? any hedging strategies? you might also do more "stress testing" to understand the jumpiness, rather than pointless scenario modelling. 

Once we acknowledge that we're living in a levy-stable world, and not a gaussian world, our decisions change. For example, when it comes to portfolios, in the gaussian world, we might want to diversity across many uncorrelated assets, expecting that some of them might pick up well. But in a Levy-stable world, we acknowledge that market crashes can be 100x more likely than predicted (it's the rule, not the exception). And therefore, you might switch to a format of the barbell strategy: where 90% in ultra-safe assets (gold, cash, farmland), and 10% in high-risk, volatile, high-optional assets (eg. startup equity, crypto, etc).

Similarly, if we look at insurance, in the gaussian world, an insurance company might expect to sell lots of policies assuming claims average out. But in a Levy-stable world, you **acknowledge** that one freak event (COVID, Fukushima, 9/11) can wipe out 10 years of profits. The compound tail risk is huge. So in the Levy-stable world, you are spending more time thinking about **stress-testing**, where you try to limit the maximum exposure to a single catastrophic event. This thinking, even applies to national-infrastructure, cybersecurity etc, where most of the resource allocation goes towards risk-minimisation around the most frequent issues (eg. threats circulated in newspapers, small outages, recent scandals etc), but there could be breaches which are from the **unknown unknowns**.

Levy-stable world acknowledges us to simulate catastrophic scenarios, not just the average-case scenarios.

| Domain           | Gaussian Approach                            | Lévy-Stable (Fat-Tailed) Approach                    |
| ---------------- | -------------------------------------------- | ---------------------------------------------------- |
| Investing        | Diversify, maximize Sharpe ratio             | Barbell strategy, seek asymmetry                     |
| Entrepreneurship | Plan, forecast ROI                           | Small bets, high asymmetry, fail fast                |
| Infrastructure   | Mean-time-to-failure modeling                | Design for rare catastrophic failure                 |
| Career           | Steady ladder climbing                       | Seek optionality, build many convex exposures        |
| Risk modeling    | Use standard deviation, confidence intervals | Use stress testing, max drawdown, convex payoff maps |
