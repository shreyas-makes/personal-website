---
title: How to estimate with uncertainty
date: 2025-04-28
slug: estimate-with-uncertainty
tags:
  - probability
  - rough-notes
stage: seedling
---
I had a recent wish to walk 100,000 steps in a day. I wanted to do some paper napkin math if this was realistic or not. 

To calculate the total distance covered by walking 100,000 steps, if I multiply the number of steps by the average stride length, which is about ~2.2 feet per step. This results in a total of 220,000 feet walked. To convert this distance into miles, we divide 220,000 feet by the number of feet in a mile, which is ~5,280. This calculation gives us approximately 41.67 miles. Finally, to determine how long it would take to walk this distance at an average speed of ~3 miles per hour, we divide 41.67 miles by 3, resulting in roughly ~13.9 hours of walking.

The problem is that we didn't have strict absolute numbers for each of these variables. The average stride length, average speed of walking etc. all had ranges to it. And I don't imagine myself walking exactly 3 miles an hour for the whole period, so this was definitely not a realistic case.

What I was more interested to know was a realistic case of the upper and lower limits.

To get an approximate, I used this mini-tool I found recently on Hacker news: [The Unsure Calculator.](https://filiph.github.io/unsure/)

![[Screenshot 2025-04-27 at 4.02.17 PM.png]]

The UI allows you to enter ranges, and not just fixed values. And that sounded just right, I could just enter the ranges for each of the inputs, and arrive the total range for the amount of hours it would take to walk 100,000 steps.

But what is the formula to which I need to add this range? For this, I used ChatGPT to find the right mathematical equation. So instead of asking _“How long will it take to walk 100,000 steps?”_—which falsely implies a singular truth—I ask a better question:

> _“How long might it take, across a realistic range of walking speeds?”_

The formula I used was:

(100,000⋅0.671000)⋅(10∼1560)\left( \frac{100{,}000 \cdot 0.67}{1000} \right) \cdot \left( \frac{10 \sim 15}{60} \right)(1000100,000⋅0.67​)⋅(6010∼15​)

Here’s how I broke it down:

- **100,000 steps**, each about **0.67 meters** (my stride length)
    
- Walking pace between **10 to 15 minutes per kilometer** (a reasonable range for long-distance walking)
    
- Final result: total time in **hours**
    

Instead of outputting a false precision like _13.87 hours_, the calculator gave me a **range: 11–17 hours**, visualized as a histogram. It gave me not just an answer, but a landscape.

The power of this approach lies in how it reframes feasibility. The range showed me that:

- **11 hours** is the floor: optimal conditions, minimal breaks, fast pace
    
- **17 hours** is the ceiling: tired legs, more breaks, slower pace

My reading of this range:

- Plan hydration, meals, and breaks around the upper end
    
- Aim to beat the midpoint (~14 hours)
    
- Avoid panic if I slip into the slower range

I found this technique quite helpful, and would like to use a similar approach for other such situations. This kind of range-based thinking was more effective in my decision making process.