# Company Information Dashboard

A trending company dashboard built as a technical assignment. It displays company cards with company details and recent event materials.

## Features

- Fetches the included sample company data from the local `/api/companies` endpoint.
- Expands and collapses company cards, with Event and About views.
- Shows each company's most recent event and checks its report and presentation links before displaying them.
- Falls back through available company logos when an image fails to load.
- Uses TanStack Query to cache company data for five minutes.
- Shows loading skeletons and an error message while retrieving company data.

## Tech Stack

- Next.js 13.0.7 (App Router with a Pages API route)
- React 18.2.0 and TypeScript 4.9.4
- Tailwind CSS 3.4.17
- TanStack Query (`^5.107.1`)
- Jest (`^30.5.2`) and React Testing Library (`^16.3.3`)

## Requirements

- Node.js 18.14 or later and npm. Commands were checked with Node.js 20.20.2 and npm 10.8.2.

## Setup

From the project root, install the locked dependencies:

```bash
npm ci
```

## Run Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If port 3000 is already in use, Next.js selects another available port and prints its URL in the terminal.

## Production

Build the application, then start the production server:

```bash
npm run build
npm run start
```

The production server uses port 3000 by default. Set the `PORT` environment variable to use another port.

## Tests

Run the Jest test suite:

```bash
npm test
```

Tests are under `__tests__/` and cover the card components, Dashboard states, company data fetching, and PDF link checks. Network requests are mocked in tests.

## Project Structure

```text
app/                    App Router pages, providers, and UI components
pages/api/companies.ts  Local sample-data API route
lib/api/                Company data and PDF-checking functions
types/                  Shared TypeScript types
utils/                  Date formatting helper
public/                 Icons and static assets
__tests__/              Jest and React Testing Library tests
```
