---
title: Schemas
description: Define database schemas with Drizzle ORM
sidebar:
  order: 1
---

![Schema Editor](/docs/images/drizby-schema.png)

Schemas define the structure of your database tables using Drizzle ORM's type-safe table builders. Drizby includes a Monaco-powered schema editor with full TypeScript autocomplete.

## Introspecting Schemas

Drizby can automatically introspect your database and generate Drizzle schema files — no CLI required. From the Schema Editor page, click **Introspect** to pull your existing database structure.

The introspection flow:

1. **Pull** — Drizby runs `drizzle-kit pull` against your connection to discover all tables and columns.
2. **Review** — You're shown the discovered tables and can select which ones to include.
3. **Save** — The selected tables are saved as a schema file. If you deselect tables, AI filters the generated code to remove them cleanly.

### Supported Databases

Introspection is powered by drizzle-kit, which supports:

| Engine | Supported |
|--------|-----------|
| PostgreSQL (all providers) | Yes |
| MySQL (all providers) | Yes |
| SQLite (better-sqlite3) | Yes |
| LibSQL / Turso | Yes |
| SingleStore | Yes |
| Snowflake | No — write schemas manually |
| Databend | No — write schemas manually |
| DuckDB | No — write schemas manually |

For unsupported databases, create a schema file manually in the Schema Editor.

## Schema Editor

The built-in schema editor supports:

- TypeScript autocomplete for all Drizzle ORM column types
- Real-time type checking
- Import support for `drizzle-orm/pg-core`, `drizzle-orm/mysql-core`, `drizzle-orm/sqlite-core`, `drizzle-orm/singlestore-core`, `drizzle-snowflake`, and `drizzle-databend`

## Writing Schemas

Each database engine uses its own table builder and column types:

### PostgreSQL

```typescript
import { pgTable, serial, text, integer, real, timestamp } from 'drizzle-orm/pg-core'

export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  customer: text('customer').notNull(),
  amount: real('amount'),
  quantity: integer('quantity'),
  createdAt: timestamp('created_at').defaultNow()
})
```

### MySQL

```typescript
import { mysqlTable, serial, varchar, int, double, timestamp } from 'drizzle-orm/mysql-core'

export const products = mysqlTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  price: double('price'),
  stock: int('stock'),
  createdAt: timestamp('created_at').defaultNow()
})
```

### SQLite

```typescript
import { sqliteTable, integer, text, real } from 'drizzle-orm/sqlite-core'

export const events = sqliteTable('events', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  value: real('value'),
  category: text('category')
})
```

### Snowflake

```typescript
import { snowflakeTable, integer, text, real, timestamp, varchar } from 'drizzle-snowflake'

export const employees = snowflakeTable('employees', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  salary: real('salary'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow()
})
```

### Databend

```typescript
import { databendTable, int32, string, float64 } from 'drizzle-databend'

export const sales = databendTable('sales', {
  id: int32('id'),
  product: string('product'),
  revenue: float64('revenue')
})
```
