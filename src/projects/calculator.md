---
title: 'Calculator'
description: 'A cute, retro-themed calculator with full keyboard support. No frameworks, just vanilla JavaScript and good ol’ HTML and CSS.'
demoURL: 'https://joshjavier.github.io/calculator/'
codeURL: 'https://github.com/joshjavier/calculator'
coverImage: '/assets/calculator-cover.jpg'
highlights:
  - Perform basic maths (&plus; &minus; &times; &divide;)
  - |
    Clear number on display with <kbd>CE</kbd> (Cancel Entry), or clear entire calculation with <kbd>C</kbd> (Clear)
  - Keyboard-friendly ⌨️
builtWith:
  - HTML and CSS
  - Vanilla JavaScript
  - Mobile-first workflow
---

## Why I built this

This project is part of the [Foundations Course](https://www.theodinproject.com/paths/foundations/courses/foundations) in [The Odin Project](https://www.theodinproject.com/), one of the many online courses I took in my self-learning journey.

The goal is to apply everything we've learned about HTML, CSS, and JavaScript into a functional app. Hence no frameworks were used, only vanilla JS 🍦

## Designing the calculator

I wanted my calculator to look unique, so I started by creating a mockup. To keep it simple I used Google Slides for my first iteration, but it turned out to be too blocky for my taste...

![calculator-mockup-v1.jpg](/assets/calculator-mockup-v1.jpg)

After getting some feedback from my girlfriend, I worked on a second iteration. I got inspired by the retro colors and unusual keypad layout of the [Texas Instruments TI-150](http://www.datamath.org/BASIC/DATAMATH/ti-150.htm), so I tried to combine that with the simplicity of mini pocket calculators to achieve a better design.

I also switched to Figma, so I got to learn a bit about making reusable components like buttons and the calculator display.

![A look at my artboard showing the evolution of the design](/assets/calculator-design-evolution.png)

## Implementing the markup and logic

Since I got stuck for a while on the design phase, I "cheated" a little bit and skimmed [Kevin Powell's video on building a calculator](https://www.youtube.com/watch?v=EuwzyB_FQNs) - but only the HTML/CSS part! I got an overview of how to structure the markup, as well as the accessibility issues to consider while working on this project, such as:

- tab order for keyboard users
- whether to set the `cursor: pointer` on button hover

For the logic, I did some research on the [internal workings of the calculator](https://en.wikipedia.org/wiki/Calculator#Internal_workings), which ultimately inspired my JavaScript implementation. I used a `register` object to hold the state of the app, which gets updated as the user presses different buttons.

```js
let register = {
  a: 0,
  b: 0,
  operator: null,
  answer: 0,
  flag: null, // controls whether display will be cleared
}
```

This data structure also makes it easy to emulate the standard behavior of calculators where operations are evaluated one at a time. For example, if I press `4 + 5` and then press `+` instead of `=`, the operation is evaluated, displaying `9`. I can chain operations, so if I press `11 + 32 / 2 =` I get `26`.

<!-- calculator-demo.webm -->

One of my biggest takeaways for this project is learning how numbers are represented in JavaScript, and how to address this quirk.

Because JavaScript stores numbers as double-precision floating point numbers, operations with decimal numbers give inaccurate results:

```js
0.1 + 0.2 // returns 0.30000000000000004
```

For this small project, I opted for a simple solution by using `toPrecision()` method to _minimize_ this effect. But for larger projects, I might consider importing a library such as [big.js](https://github.com/MikeMcl/big.js/) to solve arithmetic issues properly.
