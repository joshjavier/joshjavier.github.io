---
title: 'Newsletter sign-up form'
description: 'An accessible and keyboard-friendly sign-up form with JavaScript field validation'
demoURL: 'https://joshjavier.github.io/newsletter-signup-form/'
codeURL: 'https://github.com/joshjavier/newsletter-signup-form'
coverImage: '/assets/newsletter-signup-form-cover.jpg'
highlights:
  - Keyboard- and screenreader-friendly
  - Accessible form validation with JavaScript
  - Fully responsive design with only 3 media queries
  - Subtle CSS3 animations for improved UX
builtWith:
  - Semantic HTML5 markup
  - CSS custom properties
  - CSS Grid and Flexbox for the layout
  - Mobile-first workflow
  - Eleventy
  - Vanilla JavaScript
---

## Why I built this

I took this Frontend Mentor challenge to practice building a responsive and accessible form that is optimized for UX.

Web forms are often overlooked, but the're especially important for marketing sites and landing pages. If users can't figure out how to interact with form elements and submit it successfully, then a business can't get new customers or subscribers.

## Form validation

I incorporated three different types (or _moments_) of form validation:

### Instant validation

This happens when the user types something and leaves the field, either by pressing Tab or clicking on a different element. This type of validation is associated with the `blur` event.

<!-- afterward-validation.webm -->

### Afterward validation

This is when the user submits the form. As you have guessed, this is associated with the `submit` event. In this solution, the focus is shifted back to the email field if it didn't satisfy validation.

<!-- submit-validation.webm -->

### Submit validation

Lastly, when the user goes back to the field to correct a mistake, instant validation is triggered so that the error message/styling can be removed once the user inputs the correct format. This is associated with the `keyup` event, though I think the `input` event can be used as well.

<!-- instant-validation.webm -->

## To ARIA, or not to ARIA

The [first rule of ARIA use](https://www.w3.org/TR/using-aria/#firstrule) states:

> If you _can_ use a native HTML element or attribute with the semantics and behavior you require **already built in**, instead of re-purposing an element and adding an ARIA role, state or property to make it accessible, **then do so**.

In this context, since we're building a signup form, the email field is required for the form to submit successfully. Input elements have a `required` attribute which we can use&mdash;however, using `required` implies reliance on the browser's default form field validation, which we didn't use because it limits style and behavior customizations.

Also, the HTML5 `required` attribute is [not very friendly with assistive tech](https://adrianroselli.com/2019/02/avoid-default-field-validation.html). In this case, since we used JavaScript to implement the form validation logic, `aria-required` is the better choice.

## Other notes

- Creating [fluid custom properties](https://utopia.fyi/blog/fluid-custom-properties/) instead of simply copy-pasting the generated CSS on Utopia's calculators for implementing fluid type and scale.

- `::backdrop` doesn't accept CSS custom properties defined in `:root` because it "neither inherits from nor is inherited by any other elements" ([MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/::backdrop))

- There are only a few [allowed CSS `::marker` properties](https://web.dev/css-marker-pseudo-element/#allowed-css-marker-properties) that can be modified, so in this solution, I used `::before` to add the checkmark bullet icons.
