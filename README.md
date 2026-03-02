# Before you begin

Before you start, we want to clarify expectations to ensure this assignment is a valuable use of your time and ours.

There is no time constraint on this task. We’re not evaluating how quickly you can produce something - we’re evaluating how you think and how you build.

The assignment itself is intentionally simple and narrowly scoped. However, we expect your solution to reflect a production-ready mindset.

When reviewing your submission, we will focus on:

* Clear structure and sound architecture
* Thoughtful abstractions
* Good naming, readability, and maintainability
* Handling of edge cases
* Sensible trade-offs and reasoning
* Code quality that would scale in a larger application

We’re less interested in “just making it work” and more interested in understanding how you approach building something clean, extensible, and robust. The devil is in the details and that is very important to us.

If anything in the brief is unclear, please don’t hesitate to ask clarifying questions, we’re happy to provide additional context. We will not give out details on how you should implement this.

## A note about the current codebase

This project is intentionally provided in an outdated and suboptimal state by default.

Parts of the structure, patterns, and implementation choices may feel old, inconsistent, or poorly organized. This is deliberate. The goal is not only to implement the required feature, but also to:

* Identify structural issues
* Improve readability and maintainability
* Apply modern best practices where appropriate

Make thoughtful decisions about what should (and should not) be refactored

You are free to refactor, restructure, or modernize the project as you see fit, as long as you can clearly explain your reasoning and trade-offs during the technical discussion.

## Installation

This project is based on NextJS 13, and requires node 16.13.0 or higher.

**Installation**

```bash
pnpm install
```

**Running the application**

```bash
pnpm run dev
```

## Your assignment

We are going to display a list of trending companies on our start page, your assigment is to create a list of companies that we can display on our start page. The design is not complete, but should give you a good idea on what direction to take. The code provided is functional, but it’s difficult to read and understand. It needs significant refactoring to improve its structure and maintainability.

You can find a link to the Figma [here](https://www.figma.com/file/PWNtHgOgjeYYGmQIYpLkm4/Quartr?node-id=0%3A1&t=49UGjItn5gFyMAku-0).

## Instructions

You can make any modifications or suggestions for modifications that you see fit. Fork this repository and deliver your results via a pull-request or send us an e-mail. You could also create a gist, for privacy reasons, and send us the link.

During a technical interview, we will discuss this task and have a closer look at the code together with you. You should be able to explain your considerations of the code implementation.

## Completion time

The time you spend on this test is not limited. The idea is to take your time, respect the assignment, and send us the result when you are happy with it. But please let us know if there are circumstances delaying your submission of the code.

## What we expect

* A clean and well-structured readable code, where it is easy to understand what is going on
* Organizing the code in a way where every function or component is responsible for only one thing
* Usage of Typescript, and good practices using interfaces where needed

## Appreciated with the implementation

⚠️ Those are not required, but can give you some advice how to make your task look even better.

* Unit and functional tests: a 100% coverage is not necessary, just make them pertinent
* Good accessibility practices
* Usage of the state co-location pattern

Technical constraints

* Use React 17+ and TypeScript
