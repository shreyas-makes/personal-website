---
title: 'Publish Originally, Syndicate Elsewhere'
description: >-
  Writing for yourself on your personal website is the purest form of
  self-expression on the internet. It avoids any trappings from the algorithmic
  maze. And there are no digital echo chambers. It's...
date: '2025-01-16'
tags:
  - blogging
  - writing
  - digital-gardens
stage: sprout
---

Writing for yourself on your personal website is the purest form of self-expression on the internet. It avoids any trappings from the algorithmic maze. And there are no digital echo chambers. It's just you and your ideas in your own cozy little garden.

We're witnessing the renaissance of personal websites. As social platforms become increasingly unstable, more creators are rediscovering the power of digital sovereignty.

The only thing which I found broken (or missing) is a sense of participation between personal websites. It's inordinately difficult for bloggers to talk with each other without relying on social media as the bridge (more on 'bridges' later). You see us sharing blogpost links on platforms to increase the surface area of our ideas written.

I found myself on the receiving end of this strange paradox. I craved for the reach social media offered, but yet wanted the autonomy to own and maintain my own personal pin code on the internet, where I write (selfishly) for myself.

Last year I focussed less on the "distribution" of ideas, and put in efforts more to the actual "creation" of them. It was still an itch I couldn't scratch, until I was recently introduced to this concept of [**POSSE — Publish Own Sire, Syndicate Elsewhere**.](http://indieweb.org/POSSE) An [IndieWeb](https://indieweb.org/) solution to maintain your independence while participating in the larger internet discourse.

Calling POSSE, a concept might be too reductive. It's a movement in itself picking up steam with the rise of various IndieWeb sister-concepts and other ideologically inclined social media platforms that faciliateed this movement such as [Bluesky](https://bsky.app/), [Mastodon](https://mastodon.social/), Threads etc.

![[Attachments/images/2025/01/image-13.png]]

Source: [Zach's video on POSSE](https://www.youtube.com/watch?v=X3SrZuH00GQ&t=835s)

So I wanted to stretch this idea as much as possible and figured out a solution to ditch the platform dependent comments (Ghost comments) for a more platform agnostic webmentions that gathered mentions of your blogpost across the internet, and into your blog (automagically) using the Brid.gy protocol.

I am not internet-famous, and don't really have much of internet mentions. This is a rudimentary hello-world demo of me, mentioning my own post on Mastodon 😂

![[Attachments/images/2025/01/image-12.png]]

![[Attachments/images/2025/01/Screenshot-2025-01-16-at-7.39.16-PM.png]]

This is my final implementation of Webmentions. As you can see here, I tried heading to Mastodon and commenting on a blog from this site on their platform.

Jokes aside, on a more tactical front, I will show you how you could implement Webmentions to your own Ghost blog.

The rest of the blog goes into the nitty-gritty on how to set this up:

Let's start by telling the internet that your site CAN receive webmentions.

Add these lines to your Ghost header via Custom Injection. Your site needs to know how to display these inter-website conversations. We'll add specialized CSS to your site header that handles everything from avatar displays to comment threading. This creates a clean, professional look that rivals any social media platform. I was inspired by [Maggie Appleton](https://maggieappleton.com/)'s webmentions on her site, and I quickly hacked together a prototype using [Claude Projects](https://claude.ai/):  

![[Attachments/images/2025/01/Screenshot-2025-01-16-at-7.52.52-PM.png]]

Webmentions implemented on Maggie Appleton's site

Add these lines to the Ghost header as well via Custom Injection. This includes setting up [indieweb authorisation](https://github.com/shreyas-makes/claude-reiro-ghost), webmentions as well as webmention related styles:

    <link rel="microsub" href="https://aperture.p3k.io/microsub/1003">
    <link rel="authorization_endpoint" href="https://indieauth.com/auth">
    <link rel="token_endpoint" href="https://tokens.indieauth.com/token">
    <link rel="me" href="https://github.com/[github-profile]">
    
    <link rel="webmention" href="https://webmention.io/www.[website-name].com/webmention">
    <link rel="pingback" href="https://webmention.io/[website-name].com/[code]">
    
    <!-- <link rel="webmention" href="https://webmention.io/[website-name].com/webmention">
    <link rel="pingback" href="https://webmention.io/[website-name].com/[code]"> -->
    
    
    <style>
      /* Container */
    .wm-container {
        background: var(--color-four);
        border-radius: var(--border-radius);
        box-shadow: 0 4px 12px var(--opacity-four);
        padding: 2.5rem;
        margin: 4rem 0 6rem;
    }
    
    /* Header */
    .wm-header {
        font-family: var(--font-family-one);
        font-size: 2.8rem;
        font-weight: var(--font-weight-one-bold);
        color: var(--color-font-one);
        margin-bottom: 2rem;
    }
    
    /* Likes and Retweets Section */
    .wm-avatar-grid {
        display: flex;
        align-items: center;
        padding-bottom: 2rem;
        margin-bottom: 2rem;
        border-bottom: var(--border) var(--color-border-one);
    }
    
    .wm-avatar-grid .wm-avatar-link {
        width: 40px;
        height: 40px;
        margin-right: -10px;
        position: relative;
        z-index: 1;
    }
    
    .wm-avatar-grid .wm-avatar-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px solid var(--color-four);
        object-fit: cover;
    }
    
    .wm-reactions-count {
        font-size: 1.6rem;
        color: var(--color-font-one);
        margin-left: 1.5rem;
    }
    
    /* Comments Section */
    .wm-mention-item {
        display: grid;
        grid-template-columns: 40px 1fr;
        gap: 15px;
        padding: 20px 0;
        border-bottom: var(--border) var(--color-border-one);
    }
    
    .wm-mention-item:last-child {
        border-bottom: none;
    }
    
    /* Author Image */
    .wm-author-img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
    }
    
    /* Content Container */
    .wm-mention-content-wrapper {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    /* Author Name */
    .wm-author-name {
        font-size: 1.6rem;
        font-weight: var(--font-weight-three-bold);
        color: var(--color-font-one);
        text-decoration: underline;
    }
    
    /* Content */
    .wm-mention-content {
        font-size: 1.6rem;
        color: var(--color-font-one);
        line-height: 1.5;
    }
    
    /* Source and Date Line */
    .wm-mention-source-line {
        font-size: 1.6rem;
        color: var(--color-font-two);
    }
    
    .wm-mention-source {
        color: var(--ghost-accent-color);
        text-decoration: underline;
    }
    
    .wm-mention-metadata {
      font-size: 1.6rem;
    }
      
    </style>
    <script src="/assets/js/webmention.js" async></script>
    
    

### Remove Ghost comments

Modify your `post.hbs` template to replace native comments with webmentions:

    <div class="post-content">
        {{#if access}}
            {{content}}
            {{^is "page"}}
                {{>posts/share}}
                <div id="webmentions"></div>
            {{/is}}
        {{else}}
            {{#if html}}
                <div class="members-cta-teaser">
                    {{{html}}}
                </div>
            {{/if}}
            {{>members/cta}}
        {{/if}}
    </div>

### Install Webmention Handler

Create `webmention.js` in your `assets/js` directory. Also update fetchWebmentions function to handle www and non-www URLs:

    class WebmentionHandler {
      constructor(targetSelector = '#webmentions') {
          this.targetSelector = targetSelector;
          this.container = null;
          this.cache = new Map();
          this.initialized = false;
      }
    
      init() {
          if (this.initialized) return;
          
          // Wait for DOM to be ready
          if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', () => this.setup());
          } else {
              this.setup();
          }
          
          this.initialized = true;
      }
    
      setup() {
          this.container = document.querySelector(this.targetSelector);
          if (!this.container) {
              console.log('Webmention container not found');
              return;
          }
    
          // Show loading state
          this.container.innerHTML = '<div class="wm-loading">Loading mentions...</div>';
          
          const pageUrl = window.location.href.replace(/#.*$/, '');
          console.log('Fetching webmentions for:', pageUrl);
          
          this.fetchWebmentions(pageUrl)
              .then(mentions => this.renderWebmentions(mentions))
              .catch(error => this.handleError(error));
      }
    
      async fetchWebmentions(targetUrl) {
            // Check cache first
            if (this.cache.has(targetUrl)) {
                return this.cache.get(targetUrl);
            }
    
            try {
                // Create both www and non-www versions of the URL
                const url = new URL(targetUrl);
                let targets = [];
                
                // If URL has www, add non-www version
                if (url.hostname.startsWith('www.')) {
                    targets.push(targetUrl);
                    targets.push(targetUrl.replace('www.', ''));
                } else {
                    // If URL doesn't have www, add www version
                    targets.push(targetUrl);
                    targets.push(targetUrl.replace('://', '://www.'));
                }
    
                // Create the endpoint URL with both targets
                const endpoint = 'https://webmention.io/api/mentions.jf2?' + 
                    targets.map(t => 'target[]=' + encodeURIComponent(t)).join('&');
                    
                console.log('Fetching from endpoint:', endpoint);
    
                const response = await fetch(endpoint);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('Received webmentions:', data);
    
                // Cache both URL versions
                targets.forEach(t => this.cache.set(t, data));
                
                return data;
            } catch (error) {
                console.error('Error fetching webmentions:', error);
                throw error;
            }
        }
    
      renderWebmentions(data) {
        if (!this.container) return;
    
        if (!data.children || data.children.length === 0) {
            this.container.innerHTML = '<div class="wm-empty">No mentions yet</div>';
            return;
        }
    
        // Group by type
        const reactions = data.children.filter(m => 
            ['like-of', 'repost-of', 'bookmark-of'].includes(m['wm-property'])
        );
        const mentions = data.children.filter(m => 
            ['mention-of', 'in-reply-to'].includes(m['wm-property'])
        );
    
        let html = '<div class="wm-container">';
    
        // Render header and reactions grid
        html += `
            <h3 class="wm-header">Mentions around the web</h3>
            <div class="wm-avatar-grid">
                ${reactions.map(reaction => this.renderAvatar(reaction)).join('')}
                <span class="wm-reactions-count">${reactions.length} Likes and Retweets</span>
            </div>
        `;
    
        // Render mentions/comments with show more functionality
        if (mentions.length > 0) {
            html += `
                <div class="wm-mentions-list">
                    ${mentions.map(mention => this.renderMention(mention)).join('')}
                </div>
                ${mentions.length > 4 ? 
                    `<button class="wm-show-more">Show ${mentions.length - 4} more</button>` : 
                    ''
                }
            `;
        }
    
        html += '</div>';
        this.container.innerHTML = html;
    
        // Add show more functionality
        const showMoreBtn = this.container.querySelector('.wm-show-more');
        if (showMoreBtn) {
            showMoreBtn.addEventListener('click', () => {
                this.container.querySelector('.wm-mentions-list').classList.add('wm-show-all');
                showMoreBtn.style.display = 'none';
            });
        }
      }
    
    
      renderAvatar(reaction) {
          const author = reaction.author || {};
          const defaultAvatar = 'https://webmention.io/avatar/default.svg';
          
          return `
              <a href="${reaction.url}" 
                 class="wm-avatar-link" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 title="${author.name || 'Someone'} ${this.getReactionText(reaction['wm-property'])}">
                  <img src="${author.photo || defaultAvatar}"
                       alt="${author.name || 'Anonymous'}"
                       loading="lazy"
                       class="wm-avatar-img"
                       onerror="this.src='${defaultAvatar}'">
              </a>
          `;
      }
    
      renderMention(mention) {
        const author = mention.author || {};
        const date = new Date(mention.published || mention['wm-received'])
            .toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
    
        return `
            <div class="wm-mention-item">
                <img src="${author.photo || 'https://webmention.io/avatar/default.svg'}"
                     alt="${author.name || 'Anonymous'}"
                     loading="lazy"
                     class="wm-author-img">
                
                <div class="wm-mention-content-wrapper">
                    <div class="wm-mention-header">
                        <a href="${author.url || mention.url}" 
                           class="wm-author-name" 
                           target="_blank" 
                           rel="noopener noreferrer">
                            ${author.name || 'Anonymous'}
                        </a>
                        <span class="wm-mention-metadata">
                            ${this.getMentionType(mention['wm-property'])} on
                            <a href="${mention.url}" 
                               class="wm-mention-source" 
                               target="_blank" 
                               rel="noopener noreferrer">
                                ${this.getSourceName(mention.url)}
                            </a>
                            — ${date}
                        </span>
                    </div>
                    ${mention.content?.text ? `
                        <div class="wm-mention-content">
                            ${this.formatContent(mention.content.text)}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
      }
    
    
      getReactionText(type) {
          const texts = {
              'like-of': 'liked this',
              'repost-of': 'reposted this',
              'bookmark-of': 'bookmarked this'
          };
          return texts[type] || 'reacted to this';
      }
    
      getMentionType(type) {
          const types = {
              'mention-of': 'mentioned',
              'in-reply-to': 'replied to'
          };
          return types[type] || 'mentioned';
      }
    
      getSourceName(url) {
          try {
              const hostname = new URL(url).hostname.replace('www.', '');
              // Get first part of domain and capitalize it
              return hostname.split('.')[0].charAt(0).toUpperCase() + hostname.split('.')[0].slice(1);
          } catch (e) {
              return 'Link';
          }
      }
    
      formatContent(text) {
          // Escape HTML
          const escaped = text.replace(/[&<>"']/g, char => ({
              '&': '&amp;',
              '<': '&lt;',
              '>': '&gt;',
              '"': '&quot;',
              "'": '&#39;'
          }[char]));
    
          // Truncate if too long
          const maxLength = 280;
          if (escaped.length > maxLength) {
              return escaped.substring(0, maxLength) + '...';
          }
    
          return escaped;
      }
    
      handleError(error) {
          if (!this.container) return;
          console.error('Webmention error:', error);
          this.container.innerHTML = '<div class="wm-error">Error loading mentions</div>';
      }
    }
    
    // Initialize webmentions
    const webmentions = new WebmentionHandler();
    webmentions.init();
    

### Configure Brid.gy Integration

Here's the challenge: When you write a blog post, the conversations about it scatter across the internet like dandelion seeds in the wind. Someone shares it on Mastodon, another person discusses it on Bluesky, while others might reference it in their own blog posts.

This is where Brid.gy bridges the gap. When someone interacts with your syndicated content – whether through likes, reposts, or thoughtful replies – Brid.gy performs a crucial translation:

1.  It captures these interactions from social platforms
2.  Transforms them into standardized webmentions
3.  Sends them back to your blog via webmention.io

The magic happens in this translation layer. A Mastodon boost becomes a webmention your blog understands. A Bluesky reply transforms into a comment that appears below your original post. This creates a **unified conversation** where your blog becomes the central hub of discussion, not just the starting point.


Brid.gy's real power lies in its **bidirectional syndication**:

    Your Blog Post → Brid.gy → Mastodon, Reddit, Bluesky etc
    Mastodon, Reddit, Bluesky etc → Brid.gy → Webmentions → Your Blog

#### Mastodon Setup

1.  Go to brid.gy
2.  Navigate to Mastodon section
3.  Input your Mastodon instance URL
4.  Authenticate your account
5.  Enable backfeeding
6.  Save your Micropub token


#### Bluesky Setup

1.  On brid.gy, locate Bluesky section
2.  Click "Get token"
3.  Enter your Bluesky handle
4.  Enable publishing and response tracking
5.  Store Micropub token securely

### Testing Your Implementation

1.  Publish a new blog post
2.  Share it on connected social platforms
3.  Verify webmentions appear on your post
4.  Check console for any errors
5.  Verify URL handling works for both www and non-www variants

And that's it. By implementing webmentions on your Ghost blog, you're not just adding a feature - you're joining a movement toward a more open, interconnected web.

> The web was never meant to be a collection of isolated platforms. Your digital homestead awaits.

Update: This was implemented for my previous version of my web page which was on Ghost. Now that I’ve written the new site on Astro JS, I would still have to rewrite this implementation for my new home.
