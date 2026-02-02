# coding-test-web

🎥 **UI Demo:** [Watch the UI walkthrough video](docs/ui-demo.MOV)

🗂️ **Database diagram** [Entity Relationship](docs/db-relationship-diagram.png)

A full-stack coding test application built as a monorepo.

## Architecture Overview

- **Client:** Next.js 13 (App Router), Ant Design, React Query
- **Server:** NestJS, TypeORM
- **Database:** Postgres 16 (Docker)
- **API Versioning:** Automatically derived from the server’s major version
- **Dev Setup:** Docker Compose (API + DB + seed) + Next.js dev server

## Repository Structure

```txt
├── client/   # Next.js 13 UI
└── server/   # NestJS API + Postgres (Docker Compose)
```

## Quick Start (Recommended)

cd first into each `client/` and `server/` to run the command for dependencies installation:

```zsh
npm install
```

From the repo root you can concurrently run `client/` and `server/` locally and connect to your docker with the commands below in one terminal:

```zsh
npm install
npm run dev
```

Then open:

- **UI:** http://localhost:3000
- **API:** http://localhost:8780/api/v1
- **Swagger:** http://localhost:8780/api/v1/docs

Stop everything:

```zsh
npm run stop
```

## Prerequisites

Make sure you have:

- Node.js (server Docker image uses Node 24)
- Docker

## How It Works

Running `npm run dev` from the repo root starts both sides of the app:

### Server (Docker Compose)

- `db`: Postgres 16 (localhost:5432)
- `api`: NestJS API (localhost:8780)
- `seed`: one-shot container that seeds companies + events

### Client

- Next.js dev server (localhost:3000)

You can also run them independently:

```zsh
npm run dev:server # server only (Docker)
npm run dev:client # client only (Next.js)
```

## API Versioning (Important)

The API base path is computed dynamically from the major version in `server/package.json`.

Examples:

- `1.0.1` → `/api/v1`
- `2.x.x` → `/api/v2`

This logic lives in:

- `server/src/main.ts`

⚠️ If the server major version changes, all API routes automatically move to the new versioned prefix.

## API Cheat Sheet

**Base path (current):**

- http://localhost:8780/api/v1

### Endpoints

#### `GET /api/v1`

Health check

#### `GET /api/v1/companies`

Returns companies with related events.

**Query Parameters**

| Param          | Type   | Notes                          |
|---------------|--------|--------------------------------|
| country       | string | `ALL` / `all` disables filtering |
| page          | number | min 1                          |
| limit         | number | min 1, max 100                 |
| companyId     | number | min 1                          |
| companyTicker | string | exact match                    |

Example:

```zsh
curl "http://localhost:8780/api/v1/companies?country=NO&page=1&limit=5"
```

## Client Notes

The home page renders the **Trending Companies** feature:

- Company list
- Pagination
- Country filter
- Company detail view with events

Data fetching uses Axios + React Query.

Hooks live in:

- `client/app/features/trending-companies/hooks/index.ts`

## Known Limitation (Intentional)

The API URL is currently hard-coded in the client:

- http://localhost:8780/api/v1/companies

This is intentional for simplicity in the coding test. In a production setup, this would be environment-driven (e.g. `NEXT_PUBLIC_API_BASE_URL`).

## Server Notes

### Running the API Without Docker

Nest loads environment variables from `server/.env`.

```zsh
cd server
cp .env.sample .env
npm install
npm run seed
npm run start:dev
```

For Docker-based commands, refer to:

- `server/Makefile`
- `server/README.md`

## Common Commands

From the repo root:

```zsh
npm run dev        # API (Docker) + Client (Next.js)
npm run dev:server # API only
npm run dev:client # Client only (Next.js)
npm run stop       # Docker Compose down
```

From `client/`:

```zsh
npm run dev
npm run build
npm run lint
```

## Troubleshooting

- **404s from the API?** Confirm the prefix matches the server major version (`/api/v1`).
- **UI network errors?** Make sure the API is running at http://localhost:8780.
- **No data showing up?** Re-run the seed job:

```zsh
docker compose -f server/docker-compose.yml run --rm seed
```

## UI Demo

🎥 **UI walkthrough video:**  
[UI walkthrough video](docs/ui-demo.MOV)
[Entity Relationship](docs/db-relationship-diagram.png)

The video demonstrates:

- Trending companies list
- Pagination
- Country filtering
- Company detail view with events
