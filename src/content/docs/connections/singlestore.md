---
title: SingleStore
description: Connect Drizby to SingleStore
---

Drizby connects to SingleStore using the `mysql2` driver. SingleStore is a high-performance, MySQL-compatible distributed database.

## Connection String

```
mysql://user:password@host:3306/database
```

| Field | Example |
|-------|---------|
| User | `admin` |
| Password | `secret` |
| Host | `svc-abc.singlestore.com` |
| Port | `3306` |
| Database | `mydb` |

## Schema Definition

SingleStore schemas use `singlestoreTable` and column types from `drizzle-orm/singlestore-core`:

```typescript
import { singlestoreTable, serial, varchar, int, double, timestamp } from 'drizzle-orm/singlestore-core'

export const transactions = singlestoreTable('transactions', {
  id: serial('id').primaryKey(),
  description: varchar('description', { length: 255 }).notNull(),
  amount: double('amount'),
  count: int('count'),
  createdAt: timestamp('created_at').defaultNow()
})
```

## Notes

- SingleStore uses the MySQL wire protocol, so the connection string format is the same as MySQL.
- Optimized for real-time analytics and high-throughput workloads.
