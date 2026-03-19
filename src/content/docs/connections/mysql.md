---
title: MySQL
description: Connect Drizby to MySQL
---

Drizby supports multiple MySQL providers.

## Providers

### mysql2 (Recommended)

The standard MySQL driver for Node.js.

**Connection string:**

```
mysql://user:password@host:3306/database
```

| Field | Example |
|-------|---------|
| User | `root` |
| Password | `secret` |
| Host | `localhost` |
| Port | `3306` |
| Database | `mydb` |

### PlanetScale

For [PlanetScale](https://planetscale.com) serverless MySQL. Uses structured connection fields.

| Field | Required | Example |
|-------|----------|---------|
| Host | Yes | `aws.connect.psdb.cloud` |
| Username | Yes | `your_username` |
| Password | Yes | `pscale_pw_...` |

Get your credentials from the PlanetScale dashboard.

### TiDB Serverless

For [TiDB Cloud](https://tidbcloud.com) serverless — a MySQL-compatible distributed database.

**Connection string:**

```
mysql://user:password@gateway01.us-east-1.prod.aws.tidbcloud.com:4000/database?ssl={}
```

## Schema Definition

MySQL schemas use `mysqlTable` and column types from `drizzle-orm/mysql-core`:

```typescript
import { mysqlTable, serial, varchar, int, timestamp, double } from 'drizzle-orm/mysql-core'

export const products = mysqlTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  price: double('price'),
  stock: int('stock'),
  createdAt: timestamp('created_at').defaultNow()
})
```
