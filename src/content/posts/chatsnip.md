---
title: Export LLM conversations as snippets
date: 2025-05-05T00:00:00.000Z
slug: chatsnip
tags:
  - browser-extension
  - tools
  - ai-coding
stage: seedling
description: >-
  A browser extension that lets you export AI chat conversations as beautifully
  styled HTML snippets or well-formatted Markdown.
url: 'https://github.com/shreyas-makes/chatsnip'
---
I often have deep conversations with AI assistants like ChatGPT and Claude, and want to share these insights with colleagues or include them in blog posts. But copying raw text from these interfaces produces bland, unformatted content that loses the conversational flow. Existing screenshot tools didn't preserve the conversational format while allowing for text selection.

I've created ChatSnip, a browser extension that lets you export AI chat conversations as beautifully styled HTML snippets or well-formatted Markdown.

You can find the extension in the [Chrome Web Store](https://chrome.google.com/webstore/detail/chatsnip/placeholder) or check out the [GitHub repository](https://github.com/yourusername/chatsnip) for the source code. ChatSnip helps users:

- Export conversations from multiple AI models (ChatGPT-4o, Claude 3 Opus, Gemini 1.5 Pro, etc.)
- Save in HTML format for web embedding or Markdown for documentation
- Automatically extract conversations from supported AI chat websites
- Create consistently styled chat bubbles with proper attribution

The extension offers a simple interface with automatic page detection and custom model name support.

Example output (HTML):

```html
<div class="chat-container">
  <div class="user-message">
    <div class="avatar">You</div>
    <div class="message">Can you explain how transformers work in machine learning?</div>
  </div>
  <div class="assistant-message">
    <div class="avatar">Claude</div>
    <div class="message">Transformers are a type of neural network architecture that revolutionized NLP...</div>
  </div>
</div>
```

Installation via Chrome Web Store:

1. Navigate to the [ChatSnip extension page](https://chrome.google.com/webstore/detail/chatsnip/placeholder)
2. Click "Add to Chrome"
3. Confirm the installation when prompted

Or load it as an unpacked extension:

1. Clone the repository
2. Run `npm install` and `npm run build`
3. Load the extension in development mode

ChatSnip makes sharing AI conversations simple while preserving their context and formatting. 
