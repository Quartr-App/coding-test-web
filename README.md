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

---

## Improvements Made

This section documents the changes applied to transform the project from its initial state into a production-ready codebase. The original project shipped with Next.js 13 (experimental App Router), React 18, a single page that dumped raw JSON via `JSON.stringify`, inline mock data in a Pages Router API endpoint, no components, no error handling, and minimal CSS.

### Framework & Tooling Upgrades

| Area                 | Before                              | After                                                                                                                        |
| -------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Next.js              | 13.0.7                              | 16.1.6                                                                                                                       |
| React                | 18.2.0                              | 19.2.4                                                                                                                       |
| TypeScript           | 4.9.4                               | 5.9.3                                                                                                                        |
| Package manager      | npm                                 | pnpm                                                                                                                         |
| Linting & formatting | ESLint (basic config)               | Biome                                                                                                                        |
| CSS                  | Few lines of plain CSS              | Tailwind CSS v4, modern CSS reset, CVA for type-safe component variants, and CSS logical properties                          |
| Next.js config       | JavaScript (`next.config.js`)       | TypeScript (`next.config.ts`) with env validation at startup                                                                 |

### Architecture & Project Structure

The codebase was reorganised into three clear layers:

* **`app/`** — Page routes, API route handlers, and page-level hooks
* **`components/`** — A reusable design system of UI primitives, decoupled from any page
* **`website/`** — Cross-cutting infrastructure (TanStack Query integration, metadata, styles, utilities)

This separation ensures that components remain portable, pages stay thin, and shared configuration lives in a single predictable location.

### Design System (Components)

Twelve component modules were built from scratch, following modern React patterns:

**Headless component architecture** — Three complex components (`List`, `Table`, `Navbar`) use a headless UI pattern where state is managed via `useReducer` and behaviour is exposed through prop-getter functions. This separates logic from presentation and makes the components reusable across different visual contexts.

**Compound component pattern** — Components expose sub-components via dot notation (e.g. `List.Item`, `Table.Head`, `Table.Cell`, `Navbar.Item`) for a declarative, composable API.

**Variant system** — All visual components use `class-variance-authority` (CVA) for type-safe style variants, ensuring that consumers pass valid variant values and that styles compose correctly.

**TypeScript generics** — Headless hooks like `useHeadlessList<T>` and `useHeadlessTable<T>` are fully generic, allowing typed item data to flow through without casts.

### Accessibility

Accessibility was treated as a first-class concern:

* `aria-label`, `aria-current="page"`, and `aria-hidden` attributes on navigation elements
* `role="list"` and `role="listitem"` on list components
* Row-level links in tables with `tabIndex` management so only one link per row is tabbable
* A `TouchTarget` component providing a minimum 44px hit area, hidden on precise pointer devices
* `<time dateTime="...">` semantic HTML for dates
* An `IsomorphicDate` component using `useSyncExternalStore` to handle server/client timezone differences without hydration mismatches
* Focus indicators on interactive elements (`focus:outline-2 focus:outline-offset-2`)
* `aria-live="polite"` on empty state messages
* WCAG-compliant contrast colour calculation for text on branded backgrounds (ticker badges)

### Data Fetching

Raw `useEffect` + `useState<any>` + `fetch` calls were replaced with a structured TanStack Query setup:

* **SSR hydration** — Every page prefetches data on the server via `getQueryClient().prefetchQuery()` and passes it to the client inside a `HydrationBoundary`, so the page renders with data immediately and avoids loading spinners on first paint
* **Suspense integration** — Client components use `useSuspenseQuery()` via custom hooks (`useTrendingCompanies`, `useCompany`, `useEvents`)
* **Query key factories** — Centralised in `website/integrations/tanstack-query/query-keys/` for consistency and cache invalidation
* **Prefetching on hover** — On the home page, hovering a company row prefetches its detail data, so navigation to the detail page feels instant

### API Layer

The single Pages Router endpoint with inline data was replaced by:

* **App Router Route Handlers** — `GET /api/companies`, `GET /api/companies/:id`, and `GET /api/events`
* **Input validation** — The company ID parameter is validated as numeric; invalid IDs return `400`, missing companies return `404`
* **Typed mock data** — Extracted to `app/api/mock-data.ts` with `Company` and `CompanyEvent` interfaces
* **Data enrichment** — The events endpoint aggregates events across companies and enriches each with `companyId` and `companyName`

### Pages & Features

Three full pages were implemented (up from one that dumped raw JSON):

| Page               | Description                                                                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Home**           | Trending companies list with logos, tickers, country flags, descriptions, and hover-prefetched navigation to detail pages                |
| **Company Detail** | Dynamic route with breadcrumb, branded header, external links, description, and an events table                                          |
| **Events**         | Cross-company event listing in a table with links back to company detail pages                                                           |

Each page generates proper metadata (including dynamic `generateMetadata` for company pages) and handles empty states gracefully.

### Error Handling

Three error boundaries were added where none existed before:

* **Global** (`app/global-error.tsx`) — Catches unhandled errors at the root level
* **Company detail** (`app/companies/[id]/error.tsx`) — Scoped to the company route
* **Events** (`app/events/error.tsx`) — Scoped to the events route

All provide a user-friendly message and a "Try again" button that calls `reset()`. The company page also uses `notFound()` when data is missing.

### Environment Validation

A Zod schema validates required environment variables (`NEXT_PUBLIC_BASE_URL`) at startup in `next.config.ts`. Invalid or missing values produce a clear error message and halt the build, preventing runtime surprises.

### Unit Tests

Unit tests were added using **Vitest** and **Testing Library** (React + DOM).

### Further Improvements (Not Implemented)

The following improvements were considered but not implemented due to time constraints:

* **End-to-end testing** — Playwright or Cypress tests covering critical user flows (navigation, data loading, error states) to complement the existing unit tests
* **Storybook** — A component catalogue for the design system, enabling visual regression testing, documentation, and isolated component development
* **CI/CD pipelines & deployment** — Automated pipelines (e.g. GitHub Actions) for linting, type-checking, testing, and deploying to a hosting platform (e.g. Vercel)
* **Audio player component** — A custom audio component for playing event recordings inline, leveraging the `audioUrl` field already present in the events schema.
