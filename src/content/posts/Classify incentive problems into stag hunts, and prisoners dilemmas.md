---
title: Classify incentive problems into stag hunts, and prisoners dilemmas
date: 2025-04-07
slug: stag-hunt-prisoners-dilemma
tags:
  - game-theory
  - product
stage: plant
---
In some product-related decisions, we deal especially with the problem of incentives. In a more crude way, we can treat incentive problems as either zero-sum games, or positive-sum games. I thought that was a great framing, and went on with my worldview, and my life, and my regular product-work, until I found a better framing, a better explanation!

I've dived into game theory more recently, and have absorbed some core ideas that help explain situations that deal with people-related incentives better:

(a) to look at every encounter as a game with upsides and downsides due to various actions. 

(b) to truly win the game, one minimises the downsides, and increases the upsides as much as possible. 

This is the crux of what I have understood, and have been highly influential in acting as a heuristic when it comes to decision making.

And the first thought-experiment which everyone encounters when they hear "game theory" is the prisoner's dilemma. As a recap, this is a situation where, two suspects are arrested and interrogated separately:

- If both stay silent (co-operate), they get 1 year each.
- If one betrays (defects) while the other stays silent, the betrayer goes free and silent one gets 10 years.
- If both betray, they get 5 years each.

|  | Cooperate (Silent) | Defect (Betray) |
| --- | --- | --- |
| Cooperate | 1y / 1y | 10y / 0y |
| Defect | 0y / 10y | 5y / 5y |

And if it's a single shot prisoner's dilemma (i.e it happens only once), then the best strategy would be to defect. This is assuming that (temptation to defect >> mutual cooperation >> mutual defection >> worst possible outcome).

Compare this in contrast with another scenario, that of a stag hunt: In this example, two hunters can:
- Cooperate to hunt a stag (big reward), but it requires both.
- Hunt hare alone (small reward), but guaranteed.

|  | Hunt Stag | Hunt Hare |
| --- | --- | --- |
| Hunt Stag | 4 / 4 | 0 / 3 |
| Hunt Hare | 3 / 0 | 3 / 3 |

So the best payoff would happen if both the hunters co-ordinate.

| Feature | Prisoner's Dilemma | Stag Hunt |
| --- | --- | --- |
| Type of game | Dilemma of **incentives** | Dilemma of **coordination** |
| Risk | Getting exploited by a defector | Being abandoned in cooperation |
| Dominant strategy | Defection | None (depends on expectations) |
| Equilibrium outcome | (Defect, Defect) | Either (Stag, Stag) or (Hare, Hare) |
| Cooperation motive | Must overcome **self-interest** | Must overcome **uncertainty/trust** |

Let's take an example of two tech startups planning to create a joint standard for "blockchain" ethics.

If we look at this in terms of prisoner's dilemma:

Each firm can cheat and ignore the standard regulatory framework set by the other. If one cheats (ignores the standard to move faster), and the other cooperates (develops together), the cheater wins market, and the cooperator loses. Both can cooperate, but there is a continued incentive to defect (and that remains).

In the same way, we can also look at it in terms of the stag hunt:

Both firms can either be aligned on a unified blockchain safety protocol (which might lead to a big win), or do their own thing (which is less risky, with smaller gain).

The stag hunt framing applies **if both parties benefit most from mutual cooperation**, but suffer **only minor losses if they act alone**. The prisoner's dilemma framing applies **if defection yields a significant individual advantage**, and mutual defection is **net worse** than cooperation.

So which is true? is it a stag's hunt or a prisoner's dilemma? Reality could be far more complex, and in this case, it could probably alternate between stag's hunt and prisoner's dilemma. And this could be based on, (a) number of players, more actors —> more defective incentives. (b) if one company has more compute/data, it can afford to defect.

A simple thumb rule to distinguish situations into either stag hunt, or prisoner dilemma:

**If defecting is always individually better, regardless of what the other person does, it's a prisoner's dilemma (closer to a zero sum game). If co-operating is best only if others also cooperate, it's a stag hunt (closer to a positive sum game).**





