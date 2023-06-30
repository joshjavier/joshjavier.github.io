---
title: 'Quizzical'
description: 'A simple trivia quiz app built with React that fetches random questions from the Open Trivia Database API.'
demoURL: 'https://quizzical12.netlify.app/'
codeURL: 'https://github.com/joshjavier/quizzical-app'
coverImage: '/assets/quizzical-cover.jpg'
highlights:
  - Get a random set of 5 questions with shuffled choices
  - Keyboard-friendly
  - Performant and accessible
builtWith:
  - React Hooks (useState and useEffect)
  - HTML and CSS Flexbox
  - ES6 Fetch and Async/Await
  - Mobile-First Workflow
  - REST API
---

## Why I built this

This unguided project is part of the [Scrimba Frontend Developer Career Path](https://scrimba.com/learn/frontend), which I finished in November 2022.

The goal is to build a simple trivia quiz app using React, satisfying the following requirements:

- Two screens (start & questions)
- Pull 5 questions from the OTDB API
- Tally correct answers after "Check answers" is clicked
- Styled & polished

## Challenges and learnings

### Semantics and accessibility

Initially, I structured the answers as an unordered list and added an event listener that toggles the "selected" status for each list item on click. However, this presents a bug where users can select multiple answers for one question.

So, I turned the answers into **radio buttons**, which not only prevents the user from selecting multiple answers, but also improves accessibility for keyboard users. Following the design spec, I removed the radio buttons visually (I found [a way to hide radio buttons without affecting accessibility](https://stackoverflow.com/a/22462740)) and instead applied styling to the label itself whenever an answer is selected.

### When to fetch new data

This was tricky at first - I'm using `useEffect` to fetch the questions data from the OTDB API. I knew I had to put something in the dependency array to conditionally trigger the fetch operation, but what variable should I use?

Since I only want to fetch a new set of questions when the user finishes a game and clicks on the "Play again" button, I decided to add a `round` state in my dependency array. Initially, `round` will have a value of `1`, and when the user finishes a quiz and starts a new one, `round` will increase by 1, thus trigerring the fetch operation in the `useEffect` block.

The fetch operation happens as the Start page is loaded, so by the time the user clicks on the "Start quiz" button, the fetch request is already finished and the data is ready to be rendered on the Questions page.

### Processing fetched data

The API request returns an object, which contains an array of objects with the following structure:

<!-- prettier-ignore -->
```js
[
  {
    category: 'General Knowledge',
    type: 'multiple',
    difficulty: 'easy',
    question: 'Which American president appears on a one dollar bill?',
    correct_answer: 'George Washington',
    incorrect_answers: [
      'Thomas Jefferson',
      'Abraham Lincoln',
      'Benjamin Franklin',
    ],
  },

  // ...
]
```

In the early stages, I was fetching the data as-is, only applying transformations in the component-level. This includes combining `correct_answer` and `incorrect_answers` into a single array, and then shuffling the answers so the correct answer is not always the first one. However, the problem with this approach is that every time the app gets re-rendered, the answers get shuffled as well!

This is when I learned that when fetching data, it's better to create a new object that **stores only what you need**, and **applies data transformations upfront**. I created a callback function to handle data processing:

```js
function processData(item) {
  // Decode html entities in the questions and answers
  const question = decode(item.question)
  const correctAnswer = decode(item.correct_answer)
  const incorrectAnswers = item.incorrect_answers.map((answer) =>
    decode(answer)
  )

  // Combine and shuffle answers into a single array
  const answers = [correctAnswer, ...incorrectAnswers]
  shuffle(answers)

  return {
    question: question,
    answers: answers,
    correctAnswer: correctAnswer,
    // Set a unique identifier for each question
    id: nanoid(),
    // Add a property where we'll store the user's answer
    userAnswer: '',
  }
}
```

...which is called whenever I fetch new data:

```js
const response = await fetch(url)
const data = await response.json()
const questions = await data.results.map(processData)
```

The questions are stored in the state, ready to be passed as props to child components.

### Scoring

Once I settled on the data structure above, it was easy to add a `userAnswer` property. This has two benefits:

1. Scoring is as simple as checking if `userAnswer === correctAnswer` for each question. Since `userAnswer` has an empty string for its initial value, even if the user skips a question, the logic would simply count it as a wrong answer.

2. Having a `userAnswer` property in the state allows the answers to be implemented as **controlled components**, so there's a single source of truth.
