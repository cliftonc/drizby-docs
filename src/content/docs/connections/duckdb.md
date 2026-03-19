---
title: DuckDB
description: Connect Drizby to DuckDB
---

Drizby connects to DuckDB using the native `duckdb` Node.js driver. DuckDB is an in-process OLAP database optimized for analytical queries.

## Connection String

```
file:data/analytics.duckdb
```

| Field | Example |
|-------|---------|
| File path | `file:data/analytics.duckdb` |

The database file is created automatically if it doesn't exist.

## Schema Definition

DuckDB does not have a dedicated Drizzle ORM adapter. Queries are handled directly by the SemanticLayerCompiler using the DuckDB engine type.

You can define schemas using PostgreSQL-compatible syntax:

```typescript
import { pgTable, serial, text, real, integer, timestamp } from 'drizzle-orm/pg-core'

export const metrics = pgTable('metrics', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  value: real('value'),
  count: integer('count'),
  recordedAt: timestamp('recorded_at').defaultNow()
})
```

## Notes

- DuckDB runs in-process — no external server is needed.
- Ideal for analytical workloads on local or embedded datasets.
- Supports reading Parquet, CSV, and JSON files directly.
