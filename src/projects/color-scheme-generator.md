---
title: 'Color Scheme Generator'
description: 'A simple, responsive color scheme generator powered by The Color API.'
demoURL: 'https://joshjavier.github.io/color-scheme-generator/'
codeURL: 'https://github.com/joshjavier/color-scheme-generator'
coverImage: '/assets/color-scheme-generator-desktop.png'
highlights:
  - Generate a palette of 5 colors based on 8 different color schemes
  - Keyboard-friendly
  - 1-click copy to clipboard
builtWith:
  - HTML and CSS Flexbox
  - Vanilla JavaScript
  - ES6 Fetch and Async/Await
  - Mobile-First Workflow
---

## Why I built this

This unguided project is part of the [Scrimba Frontend Developer Career Path](https://scrimba.com/learn/frontend), which I finished in November 2022.

The goal is to build a simple app that makes use of an API. In this case, we're using [The Color API](https://www.thecolorapi.com/) to fetch color schemes based on a seed color.

Here are the project requirements:

- Choose "seed color" with an `<input type="color" />`
- Choose color scheme mode in a `<select>` box
- Clicking button makes request to [The Color API](https://www.thecolorapi.com/) to get a color scheme
- Display the scheme colors and hex values on the page
- Stretch goal: click hex values to copy the clipboard

color-scheme-generator-preview.gif

## Project notes

I really enjoyed the process of solving roadblocks I encountered while working on this project.

In simple projects like this, I like setting the body to `min-height: 100vh` to prevent having an awkward white space at the bottom. However, I learned that using `height: 100%` on an element has no effect if the parent only has `min-height` but no `height`. It took me a bit of time and playing around with the CSS to grok this concept, and I'm glad I understand it a little better now.

In terms of accessibility, I wanted to make the app more accessible to keyboard users and allow them to tab between color strips. At first my color names were `p` tags, but I converted them into `button` tags so they have native tab-order _and_ are semantically interactive (i.e., users can interact with them through mouse clicks, which will copy the color hex code to the clipboard).

On the JavaScript side, I initially implemented the "copy to clipboard" function with the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard), but learned that it sometimes fails when the browser doesn't have access to the clipboard. So as a fallback, I implemented the old-school way of copying to clipboard, which uses `document.execCommand("copy")`. It's already [deprecated](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand), but there's no decent alternative yet, so...

Lastly, I tried to apply progressive enhancement while writing the CSS. In particular, thinking about how browsers that don't support newer CSS features can still provide users with a close enough experience.

## Resources

- [Cards](https://inclusive-components.design/cards/) - This is a gift that keeps on giving. Whenever I find myself creating some sort of card element, I'd always refer to this article for best practices. The pseudo-content trick and progressive enhancement concepts greatly influenced my implementation for the card strips on this project.
