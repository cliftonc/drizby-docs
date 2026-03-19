---
title: Semantic Layer
description: Define metrics, dimensions, and measures once — use everywhere
sidebar:
  order: 0
---

![Semantic Layer](/docs/images/drizby_5.png)

The semantic layer is powered by [drizzle-cube](https://www.drizzle-cube.dev). It sits between your queries and the database, translating cube queries to SQL with security context enforcement.

## How It Works

1. **Define schemas** — Write Drizzle ORM table definitions or introspect them from your database with drizzle-kit.
2. **Create cubes** — Define dimensions, measures, and joins that describe your business logic.
3. **Query anywhere** — Dashboards, AI notebooks, the Cube API, and MCP clients all query through the semantic layer.

## Benefits

- **Consistent metrics** — Define a measure once, get the same result everywhere.
- **Security context** — Row-level security enforced at the query layer.
- **AI-friendly** — Semantic metadata helps AI agents generate accurate queries.
