# Quartr coding test

## Overview

This submission focuses on building a clean, maintainable implementation for the trending companies start page while keeping the solution intentionally small.

The original setup included an API route returning hardcoded data and a page-level async flow built on top of it. Since the provided company data is static and local to the repo, I chose to simplify the page implementation and focus on structure, semantics, accessibility, and maintainability rather than preserving unnecessary async complexity.

---

## What I changed

- Refactored the page into smaller, clearer pieces
- Kept reusable UI components generic
- Added a small transformation layer between raw source data and UI components
- Improved semantic HTML structure
- Added focused tests around the most important behavior
- Kept the implementation intentionally small and avoided unnecessary abstractions

---

## Structure

```text
app/
  /api
    /companies
      route.ts
  globals.css
  head.tsx
  layout.tsx
  page.tsx
components/
  CompanyCard.tsx
  CompaniesList.tsx
lib/
  /companies
      normalize-companies.ts
      mock-companies.ts
      companies.ts
  utils.ts
public/
  favicon.ico
test/
  api/
    companies.route.test.ts
  components/
    CompanyCard.test.tsx
    CompaniesList.test.tsx
  lib/
    normalize-companies.test.ts
    utils.test.ts
types/
  index.ts
  company.ts

```

## Notes and trade-offs

1. I used a shallow folder structure instead of deeper feature nesting. For this scope, keeping the structure easy to scan felt more valuable than introducing extra nesting such as components/companies/.

- Trade-off: It is slightly less optimized for future scale, but simpler to follow in a small take-home project. I would move toward a more feature-oriented structure if the feature surface grows.

2. I treated the provided companies data as raw, inconsistent source data and added a small transformation layer to clean and prepare it before rendering. This lets the UI components stay focused on presentation instead of data cleanup.

3. I kept the API contract stable instead of reshaping it for the UI. Even though the UI benefits from cleaner field names and derived values, I avoided changing the response shape directly because another client could depend on it.

- Trade-off: The frontend needs a small transformation step, but the API remains backward-compatible and safer to maintain.

4. Since the data is local and the transformation is synchronous, I kept getCompanies synchronous as well. I did not want to introduce async behavior before it was actually needed. This also allows the page to render without artificial loading or request error states.

- Trade-off: This keeps the implementation simpler for the current assignment, but it is optimized for a static dataset rather than a real remote backend.

5. I removed the unnecessary async fetching flow for the page because the provided company data is hardcoded in the repo.

- Trade-off: This removes unnecessary loading, network, and error-handling complexity, but it also means the page is not modeling remote data fetching behavior.

6. I kept reusable components generic and screen-specific composition specific. “Trending” is treated as page context, not as a reusable component type. Components like CompanyCard and CompanyList stay generic, while the page stays specific to the current screen.

- Trade-off: This adds a little more separation up front, but makes the generic UI reusable for future contexts such as top companies or search results.

7. I passed data into presentational components instead of letting them fetch or own data directly. That keeps components easier to test and reuse, and keeps data concerns closer to the page boundary.

- Trade-off: There is a small amount of prop plumbing, but the separation of concerns is clearer.

8. I did not add a dedicated loading.tsx or error.tsx route boundary. After removing unnecessary async fetching, the realistic failure modes are mostly missing or inconsistent fields rather than route-level or network failures.

- Trade-off: There is no artificial route-level loading or error UI for failures that cannot happen in this version, so defensive handling is instead focused on incomplete or inconsistent data at the rendering boundary.

9. Since the data is static, I did not add runtime request error handling. Instead, I added light defensive handling in the transformation and rendering layers for missing URLs, missing logos, missing events, and inconsistent strings.

10. I used Tailwind CSS for styling to move quickly while still producing a polished and maintainable UI.

- Trade-off: Tailwind CSS is a utility-first CSS framework, which can lead to larger CSS bundle sizes compared to using a CSS preprocessor or a CSS-in-JS solution. However, it is a popular choice for rapid UI development and provides a good balance of flexibility and performance.

11. I added a small number of focused tests instead of trying to maximize coverage. I prioritized tests around the transformation logic and the most important rendering behavior.

- Trade-off: Coverage is not exhaustive, but the test suite stays relevant and maintainable.

12. I kept tests in a dedicated test/ folder rather than colocating them throughout the app.

- Trade-off: Tests are slightly less colocated with the code they exercise, but easier to scan in a small project.

13. If we kept the API route as the page’s client-side data source, the benefit would be preserving the current async boundary and explicitly handling loading, error, empty, and success states.

- Trade-off: This would add complexity that is not really necessary for a hardcoded dataset.

---
