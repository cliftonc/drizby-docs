---
title: Snowflake
description: Connect Drizby to Snowflake
---

Drizby connects to Snowflake using [drizzle-snowflake](https://www.npmjs.com/package/drizzle-snowflake) and the official `snowflake-sdk` driver.

## Connection Fields

Snowflake uses structured connection fields rather than a connection string:

| Field | Required | Example |
|-------|----------|---------|
| Account | Yes | `orgname-accountname` |
| Username | Yes | `my_user` |
| Password | Yes | `my_password` |
| Database | Yes | `MY_DB` |
| Warehouse | No | `COMPUTE_WH` |
| Schema | No | `PUBLIC` |
| Role | No | `ACCOUNTADMIN` |

## Schema Definition

Snowflake schemas use `snowflakeTable` and column types from `drizzle-snowflake`:

```typescript
import { snowflakeTable, integer, text, real, timestamp, varchar } from 'drizzle-snowflake'

export const employees = snowflakeTable('employees', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email'),
  salary: real('salary'),
  tags: varchar('tags', { length: 100 }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow()
})
```

## Notes

- Snowflake is cloud-only — you need a Snowflake account to connect.
- The `timestamp` column supports an optional `{ mode: 'date' | 'string' }` config. Defaults to `'date'`.
- Snowflake does not support array columns — use comma-separated strings in `varchar` instead.
