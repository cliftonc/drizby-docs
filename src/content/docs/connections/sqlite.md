---
title: SQLite
description: Connect Drizby to SQLite
---

Drizby supports SQLite via two providers.

## Providers

### better-sqlite3 (Recommended)

A synchronous, file-based SQLite driver. Drizby automatically applies WAL mode and foreign key pragmas on connection.

**Connection string:**

```
file:data/mydata.sqlite
```

| Field | Example |
|-------|---------|
| File path | `file:data/analytics.sqlite` |

The database file is created automatically if it doesn't exist.

### LibSQL / Turso

For [Turso](https://turso.tech) — an edge-optimized SQLite fork. Uses structured connection fields.

| Field | Required | Description |
|-------|----------|-------------|
| URL | Yes | Local file path or remote Turso database URL |
| Auth Token | No | Required for remote Turso databases |

**Local example:** `file:data/local.db`

**Remote example:** `libsql://your-db-name.turso.io`

## Schema Definition

SQLite schemas use `sqliteTable` and column types from `drizzle-orm/sqlite-core`:

```typescript
import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core'

export const events = sqliteTable('events', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  value: real('value'),
  category: text('category'),
  createdAt: integer('created_at', { mode: 'timestamp' })
})
```

## Notes

- SQLite is the default engine for the demo database created on first startup.
- Drizby's internal database also uses SQLite (via better-sqlite3).
