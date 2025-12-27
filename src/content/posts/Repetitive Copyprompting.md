---
title: Repetitive Copyprompting
description: "While designing health campaigns for Noora health's work in Indonesia and Bangladesh, I was overseeing the health communications strategy for pregnant and newly-delivered mothers. There were messages..."
date: 2024-11-15T16:07:35.000Z
slug: repetitive-copyprompting
tags:
  - writing
  - rough-notes
  - ai-coding
stage: seedling
---

While designing health campaigns for Noora health's work in Indonesia and Bangladesh, I was overseeing the health communications strategy for pregnant and newly-delivered mothers. There were messages in a specific format that needed to be rewritten in a more easy to digest Whatsapp format appealing to the people of Bangladesh. My usual default response to such tasks would be to open a tab on ChatGPT and get to promptcrafting until I was able to achieve the best output.

This was the prompt I'd used to do the same:

    
    Make effective health messaging for Whatsapp. Add emojis and make it lively. The total length should be less than 600 characters. Ensure that the opening sequence is a dialogue between Koli and Riya (this should not exceed two sentences in total). Amina is represented by 👩🏽 and Rosina is represented by 👧🏾. This dialogue based interaction is followed by the main message. 
    
    The main message starts with a heading followed by structured messages in the form of bullet points that are formatted without emojis. Clearly define the CTA of the message at the end of it in third person. Don't use hashtags within the message.
    
    

The only catch was that I was looking at close to 100+ messages which had to be rewritten. Manually copy-pasting each and every message one by one on ChatGPT proved to be a herculean task (the example below).

![](/images/2024/11/Screenshot-2024-11-15-at-4.04.47-PM.png)

I was looking at ways to automate ChatGPT tasks in a simpler fashion, and this is when I found the Google Sheets Plugin titled: [SheetGPT](https://sheetgpt.ai/) All I had to do was to do this for one of the cell values and extend that to all the entries.

    GPT("Make effective health messaging for Whatsapp. Add emojis and make it lively. The total length should be less than 600 characters.Ensure that the opening sequence is a dialogue between the Bulan (the compassionate parrot) and Cahya (the wise and joyful parrot). This should not exceed two sentences in total. Bulan is represented by 🧕🏼 and Cahya is represented by 🦜. This dialogue based interaction is followed by the main message. The main message starts with a heading followed by structured messages in the form of bullet points that are formatted without emojis. Clearly define the CTA of the message at the end of it in third person. Don't use hashtags within the message." & B2)
    
    

![](/images/2024/11/Pasted-image-20230729212949.png)

If I had to do this task, even with ChatGPT it would have taken me 45 minutes for roughly ~15 health topics. By using the SheetGPT add-on for Google sheets, I was able to bring it to ~2 minutes. [\[1\]](app://obsidian.md/index.html#fn-1-3b55b1f0c72ac271). Abraham Lincoln was quoted as saying "Give me six hours to chop down a tree and I will spend the first four sharpening the ax."

After having found the right prompt, all I had to do then was to feed it into SheetGPT and then use this as a modifier across all the 100+ messages. Curating the right prompt was equivalent to sharpening the axe. [\[2\]](app://obsidian.md/index.html#fn-2-3b55b1f0c72ac271) SheetGPT method was much more scalable and efficient for tasks which involved repetitive copyprompting.

* * *

1.  Although it might seem like the process took only 2 minutes, it took me almost 30 minutes to get to the right prompt. Promptcrafting did take more time. However, this process is much more scalable as I can quickly apply this formula even across new entries.
2.  Just came to know about this tool titled Harpa.ai on 29 Jul, 2023. (_HARPA AI | GPT Chrome Automation Copilot_, 2021). AI startups are being built for breakfast everyday. It's so so fast.