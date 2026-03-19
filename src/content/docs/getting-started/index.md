---
title: Introduction
description: What is Drizby and why use it
sidebar:
  order: 0
---

![Drizby home screen](/docs/images/drizby_1.png)

Drizby is an open-source AI analytics platform powered by [drizzle-cube](https://www.drizzle-cube.dev). It provides dashboards, agentic AI notebooks, a visual analysis builder, and a full semantic layer — all in a single self-hostable application.

## Key Features

- **AI-Powered Notebooks** — Ask questions in plain English. Multi-turn AI notebooks generate charts, tables, and insights automatically.
- **Dashboards & Charts** — Drag-and-drop grid dashboards with bar, line, area, pie, scatter, KPI cards, and data tables.
- **Semantic Layer** — Define metrics once with Drizzle schemas. Access them everywhere — dashboards, APIs, or AI agents.
- **MCP Server** — Expose your data to Claude, Copilot, and Cursor through the Model Context Protocol with OAuth 2.1.
- **Unlimited Users** — No per-seat pricing. Role-based access, group visibility, and 7 authentication methods.

## Supported Databases

Drizby supports any database that Drizzle ORM supports:

| Engine | Providers |
|--------|-----------|
| PostgreSQL | PostgreSQL, Neon, Supabase, PGlite, AWS Aurora |
| MySQL | MySQL, PlanetScale, TiDB |
| SQLite | SQLite, Turso |
| Snowflake | Snowflake |
| SingleStore | SingleStore |
| Databend | Databend |
| DuckDB | DuckDB |

## Architecture

Drizby is built on:

- **Backend:** Hono (TypeScript), Drizzle ORM, SQLite (internal DB)
- **Frontend:** React 18, TanStack Query, Recharts, Tailwind CSS, Monaco Editor
- **Semantic Layer:** drizzle-cube — compiles Drizzle schemas into analytics cubes
- **AI:** Anthropic Claude, OpenAI, Google Gemini (configurable)
- **Auth:** Session-based with Google OAuth, CASL role-based permissions
